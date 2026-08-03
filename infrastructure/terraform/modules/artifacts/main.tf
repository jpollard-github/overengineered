variable "name" { type = string }
variable "enabled" { type = bool }
output "intent" { value = { kind = "artifact-object-storage", name = var.name, enabled = var.enabled } }
