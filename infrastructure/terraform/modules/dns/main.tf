variable "name" { type = string }
variable "enabled" { type = bool }
output "intent" { value = { kind = "dns-zone", name = var.name, enabled = var.enabled } }
