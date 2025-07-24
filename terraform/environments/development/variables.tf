variable "environment" {
  type    = string
  default = "development"
}

variable "environment_short" {
  type    = string
  default = "dev"
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
  default = "development.admin.pfunstore.com"
}

# This certificate covers *.admin.pfunstore.com and admin.pfunstore.com
variable "acm_certificate_arn" {
  type    = string
  default = "arn:aws:acm:us-east-1:471112853972:certificate/c8dcc8fc-b0da-419b-bdaa-ef83cacdb597"
}