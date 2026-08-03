variable "name" { type = string }
variable "enabled" { type = bool }
output "intent" { value = { kind = "container-registry", name = var.name, enabled = var.enabled } }
