output "deployment_intent" { value = { name = local.name, provisioned = var.provision_real_resources, note = "Cloud-provider bindings are intentionally absent from local success." } }
