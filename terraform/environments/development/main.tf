terraform {
  required_version = ">= 1.9.1"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.87.0" 
    }
  }
  cloud {
    organization = "destijltech"

    workspaces {
      project = "pfunstore-admin"
      name    = "pfunstore-admin-development"
    }
  }
} 