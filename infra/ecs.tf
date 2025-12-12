resource "aws_ecs_cluster" "saas_aws_ecs_cluster" {
  name = "saas-ecs-cluster"
}

data "aws_ecr_repository" "saas_ecr_repository" {
  name = aws_ecr_repository.saas-nextjs-repository.name
}

# IAM Role for ECS Task Execution
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "ecsTaskExecutionRole"
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      },
    ]
  })
}

# IAM Role Policy Attachment
resource "aws_iam_role_policy_attachment" "ecs_task_execution_policy_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = aws_iam_role.ecs_task_execution_role.arn
}

resource "aws_ecs_task_definition" "saas_app" {
  family                   = "nextjs-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 1024
  memory                   = 2048

  execution_role_arn = aws_iam_role.ecs_task_execution_role.arn


  container_definitions = jsonencode([
    {
      name  = "saas-nextjs-app"
      image = "${data.aws_ecr_repository.saas_ecr_repository.repository_url}:latest"
      essential : true
      portMappings = [
        {
          container_port = 3000
          host_port      = 3000
        }
      ]
    }
  ])
}

resource "aws_ecs_service" "ecs_service" {
  name = "saas-ecs-service"
  cluster = aws_ecs_cluster.saas_aws_ecs_cluster.id
  task_definition = aws_ecs_task_definition.saas_app.arn
  desired_count = 1
  iam_role = aws_iam_role.ecs_task_execution_role.arn
  launch_type = "FARGATE"

  network_configuration {
    subnets = [ for subnets in aws_subnet.public : subnet.id ]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.lb_tg.arn
    container_name = "saas-nextjs-app"
    container_port = 3000
  }
}
