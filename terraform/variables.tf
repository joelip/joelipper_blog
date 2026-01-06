variable "cloudflare_api_token" {
  description = "Cloudflare API token with Pages and DNS permissions"
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID"
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for joelipper.com"
  type        = string
}

variable "domain" {
  description = "Custom domain for the site"
  type        = string
  default     = "joelipper.com"
}
