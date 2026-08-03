variable "name" { type = string }
variable "enabled" { type = bool }
output "intent" { value = { kind = "observability-namespace", name = var.name, enabled = var.enabled } }
