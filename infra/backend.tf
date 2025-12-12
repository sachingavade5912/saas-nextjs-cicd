terraform {
  backend "s3" {
    bucket  = "terraform-cicd-backend-bucket"
    key     = "saas-hosting/terraform.tfstate"
    region  = "ap-south-1"
    encrypt = true
  }
}