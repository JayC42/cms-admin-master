provider "aws" {
  region = var.aws_region
}

provider "aws" {
  alias  = "route53"
  region = "us-east-1"
  assume_role {
    role_arn = "arn:aws:iam::471112853972:role/Route53HostedZoneAccessRole"
  }
}