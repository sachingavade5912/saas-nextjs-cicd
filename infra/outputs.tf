output "load_balancer_url" {
  value = aws_lb.saas_lb.dns_name
}