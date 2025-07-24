data "aws_cloudfront_cache_policy" "this" {
  # This is "CachingOptimized" from the AWS managed policies
  id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
}

module "admin-portal-cloudfront" {
  source  = "terraform-aws-modules/cloudfront/aws"
  version = "~> 3.2.2"

  origin = {
    s3 = {
      domain_name           = module.admin-portal-dev-s3_bucket.s3_bucket_bucket_regional_domain_name
      origin_id             = var.s3_bucket_name
      origin_access_control = "admin-portal-dev-s3"
    }
  }

  enabled                      = true
  is_ipv6_enabled              = true
  comment                      = "PFun Store Admin Portal Development"
  default_root_object          = "index.html"
  price_class                  = "PriceClass_All"
  create_origin_access_control = true

  origin_access_control = {
    admin-portal-dev-s3 = {
      description      = "Admin Portal (Dev) CloudFront access to S3"
      origin_type      = "s3"
      signing_behavior = "always"
      signing_protocol = "sigv4"
    }
  }

  default_cache_behavior = {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = var.s3_bucket_name
    cache_policy_id        = data.aws_cloudfront_cache_policy.this.id
    viewer_protocol_policy = "redirect-to-https"
    use_forwarded_values   = false
  }

  viewer_certificate = {
    acm_certificate_arn      = var.acm_certificate_arn
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }

  aliases = ["${var.environment}.${var.domain}"]

  custom_error_response = [
    {
      error_code            = 403
      response_page_path    = "/index.html"
      response_code         = 200
      error_caching_min_ttl = 0
    },
    {
      error_code            = 404
      response_page_path    = "/index.html"
      response_code         = 200
      error_caching_min_ttl = 0
    }
  ]

  tags = {
    "project"     = "pfunstore",
    "environment" = var.environment
  }
}

# Output the CloudFront domain name
output "cloudfront_domain_name" {
  value = module.admin-portal-cloudfront.cloudfront_distribution_domain_name
}

# Output the CloudFront distribution ID
output "cloudfront_distribution_id" {
  value = module.admin-portal-cloudfront.cloudfront_distribution_id
}