variable "name" { type = string }
variable "enabled" { type = bool }
output "intent" { value = { kind = "ci-workload-identity", name = var.name, enabled = var.enabled } }
