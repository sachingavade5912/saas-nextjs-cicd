resource "aws_lb" "saas_lb" {
  name = "saas-nextjs-lb"
  internal = false
  load_balancer_type = "application"

  subnets = aws_subnet.public_subnet[*].id
}

resource "aws_lb_target_group" "lb_tg" {
  name = "saas-lb-target-group"
  port = 3000
  protocol = "HTTP"
  vpc_id = aws_vpc.saas_vpc.id

  target_type = "ip"
}

resource "aws_lb_listener" "lb_listner" {
  load_balancer_arn = aws_lb.saas_lb.arn
  port = "80"
  protocol = "HTTP"

  default_action {
    type = "forward"
    target_group_arn = aws_lb_target_group.lb_tg.arn
  }
}