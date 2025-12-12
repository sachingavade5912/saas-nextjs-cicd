resource "aws_ecs_cluster" "saas-aws_ecs_cluster" {
  name = "saas-ecs-cluster"
}

data "aws_ecr_repositories" "saas_ecr_repository" {
  name = aws_ecr_repository.saas_ecr_repository.name
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
  policy_arn = "arn:iam:aws::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
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
      image = "${data.aws_ecr_repository.saas_ecr_repository.repositoty_url}:latest"
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
