variable "environment" {
  type    = string
  default = "production"
}

variable "environment_short" {
  type    = string
  default = "prod"
}

variable "aws_region" {
  type    = string
  default = "ap-east-1"
}

variable "domain" {
  type    = string
  default = "admin.pfunstore.com"
}

variable "s3_bucket_name" {
  type    = string
  default = "admin.pfunstore.com"
}

# This certificate covers *.admin.pfunstore.com and admin.pfunstore.com
variable "acm_certificate_arn" {
  type    = string
  default = "arn:aws:acm:us-east-1:183295455751:certificate/953fc3ae-dea4-410e-801c-41ab98c38e51"
}