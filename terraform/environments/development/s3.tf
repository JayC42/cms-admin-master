module "admin-portal-dev-s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = var.s3_bucket_name
  acl    = "private"

  versioning = {
    enabled = false
  }

  control_object_ownership = true
  object_ownership         = "BucketOwnerPreferred"

  attach_policy = true
  policy        = data.aws_iam_policy_document.s3_bucket_policy.json

  website = {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    "project"     = "pfunstore",
    "environment" = var.environment
  }
}

data "aws_iam_policy_document" "s3_bucket_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${module.admin-portal-dev-s3_bucket.s3_bucket_arn}/*"]
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [module.admin-portal-cloudfront.cloudfront_distribution_arn]
    }
  }
}

# Output the S3 bucket domain name
output "s3_bucket_domain_name" {
  value = module.admin-portal-dev-s3_bucket.s3_bucket_bucket_regional_domain_name
}