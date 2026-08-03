variable "name" { type = string }
variable "enabled" { type = bool }
output "intent" { value = { kind = "tls-certificate", name = var.name, enabled = var.enabled } }
