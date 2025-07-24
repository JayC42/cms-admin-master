data "aws_route53_zone" "primary" {
  provider = aws.route53
  name     = "pfunstore.com"
}

resource "aws_route53_record" "production_dns" {
  provider = aws.route53
  zone_id  = data.aws_route53_zone.primary.zone_id
  name     = var.environment == "production" ? "${var.domain}" : "${var.environment}.${var.domain}"
  type     = "A"

  alias {
    name                   = module.admin-portal-cloudfront.cloudfront_distribution_domain_name
    zone_id                = module.admin-portal-cloudfront.cloudfront_distribution_hosted_zone_id
    evaluate_target_health = true
  }
}

