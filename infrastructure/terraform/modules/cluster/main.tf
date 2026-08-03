variable "name" { type = string }
variable "enabled" { type = bool }
output "intent" { value = { kind = "kubernetes-cluster", name = var.name, enabled = var.enabled } }
