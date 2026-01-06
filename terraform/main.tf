terraform {
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

# Cloudflare Pages project
resource "cloudflare_pages_project" "blog" {
  account_id        = var.cloudflare_account_id
  name              = "joelipper-blog"
  production_branch = "master"

  source {
    type = "github"
    config {
      owner                         = "joelip"
      repo_name                     = "joelipper_blog"
      production_branch             = "master"
      pr_comments_enabled           = true
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_deployment_setting    = "custom"
      preview_branch_includes       = ["*"]
      preview_branch_excludes       = ["master"]
    }
  }

  build_config {
    build_command   = "bundle exec middleman build"
    destination_dir = "build"
  }
}

# Custom domain for the Pages project
resource "cloudflare_pages_domain" "blog" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.blog.name
  domain       = var.domain
}

# DNS record pointing to Cloudflare Pages
resource "cloudflare_record" "blog" {
  zone_id         = var.cloudflare_zone_id
  name            = "@"
  content         = cloudflare_pages_project.blog.subdomain
  type            = "CNAME"
  proxied         = true
  allow_overwrite = true
  comment         = "Managed by Terraform - points to Cloudflare Pages"
}

# www redirect to apex domain
resource "cloudflare_record" "blog_www" {
  zone_id         = var.cloudflare_zone_id
  name            = "www"
  content         = cloudflare_pages_project.blog.subdomain
  type            = "CNAME"
  proxied         = true
  allow_overwrite = true
  comment         = "Managed by Terraform - www redirect"
}
