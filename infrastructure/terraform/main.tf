locals { name = "${var.project_name}-${var.environment}" }
module "registry" { source = "./modules/registry"; name = local.name; enabled = var.provision_real_resources }
module "cluster" { source = "./modules/cluster"; name = local.name; enabled = var.provision_real_resources }
module "dns" { source = "./modules/dns"; name = local.name; enabled = var.provision_real_resources }
module "tls" { source = "./modules/tls"; name = local.name; enabled = var.provision_real_resources }
module "artifacts" { source = "./modules/artifacts"; name = local.name; enabled = var.provision_real_resources }
module "observability" { source = "./modules/observability"; name = local.name; enabled = var.provision_real_resources }
module "workload_identity" { source = "./modules/workload-identity"; name = local.name; enabled = var.provision_real_resources }
