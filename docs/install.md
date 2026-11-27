---
id: install
title: Installation
---

# Installation

Install RBG into a Kubernetes cluster.

## Prerequisites

- Kubernetes 1.28 or newer.
- At least one node with 1 CPU and 1 GiB memory available for the RBG controller manager.
- `kubectl` configured to communicate with the cluster.
- For Helm installation: Helm 3.8 or newer.
- Network access to GitHub, if you install the latest release by tag.

## Install a released version

The recommended path is the published Helm chart.

This command uses the GitHub release redirect and does not require the `gh` CLI:

```bash
VERSION=$(curl -fsSL -o /dev/null \
  -w '%{url_effective}' \
  https://github.com/sgl-project/rbg/releases/latest \
  | sed -E 's#.*/tag/v([^/]+)$#\1#')

helm upgrade --install rbgs \
  https://github.com/sgl-project/rbg/releases/download/v${VERSION}/rbgs-${VERSION}.tgz \
  --namespace rbgs-system \
  --create-namespace \
  --wait
```

Wait for the controller to become available:

```bash
kubectl wait deploy/rbgs-controller-manager \
  -n rbgs-system \
  --for=condition=available \
  --timeout=5m
```

Verify the installed CRDs:

```bash
kubectl get crd \
  rolebasedgroups.workloads.x-k8s.io \
  rolebasedgroupsets.workloads.x-k8s.io \
  roleinstancesets.workloads.x-k8s.io \
  roleinstances.workloads.x-k8s.io \
  rolebasedgroupscalingadapters.workloads.x-k8s.io \
  coordinatedpolicies.workloads.x-k8s.io \
  clusterengineruntimeprofiles.workloads.x-k8s.io
```

## Install from source

If you are testing a local checkout, use the generated kubectl manifest or Helm chart:

```bash
# kubectl
kubectl apply --server-side -f ./deploy/kubectl/manifests.yaml

# Helm
helm upgrade --install rbgs ./deploy/helm/rbgs \
  --namespace rbgs-system \
  --create-namespace \
  --wait
```

The Makefile shortcuts are also available:

```bash
make helm-deploy
```

## CRD upgrader

The Helm chart installs and upgrades CRDs with a `pre-install`/`pre-upgrade` Job. It is enabled by default.

| Key | Description | Default |
|---|---|---|
| `crdUpgrade.enabled` | Enable the CRD upgrader Job | `true` |
| `crdUpgrade.image.repository` | CRD upgrader image repository | `rolebasedgroup/rbgs-upgrade-crd` |
| `crdUpgrade.image.tag` | CRD upgrader image tag | chart app version |
| `crdUpgrade.ttlSecondsAfterFinished` | Job TTL after completion | `259200` |
| `crdUpgrade.backoffLimit` | Job retry limit | `3` |
| `crdUpgrade.tolerations` | Job Pod tolerations | `[{operator: Exists}]` |
| `crdUpgrade.nodeSelector` | Job Pod node selector | `{}` |

To manage CRDs yourself:

```bash
kubectl apply --server-side -f config/crd/bases/

helm upgrade --install rbgs deploy/helm/rbgs \
  --namespace rbgs-system \
  --create-namespace \
  --set crdUpgrade.enabled=false \
  --wait
```

## Deprecated workload types

The chart keeps compatibility for `v1alpha1` `Deployment`, `StatefulSet`, and `LeaderWorkerSet` roles while migration is in progress.

| Value | Behavior |
|---|---|
| `true` | Compatibility mode. Existing deprecated roles continue to reconcile; new uses are rejected. |
| `false` | Strict mode. Deprecated role types are rejected and their RBAC/watches are disabled. |

For a new installation with no legacy objects, set:

```bash
--set controller.deprecatedWorkloadTypes.enabled=false
```

Existing users should complete the [v1alpha1 to v1alpha2 migration](/docs/migration-v1alpha1-to-v1alpha2) before switching to strict mode.

## Uninstall

For Helm:

```bash
# Controller only; CRDs and RBG resources are preserved
helm uninstall rbgs --namespace rbgs-system

# Optional: delete CRDs and all RBG-owned resources
kubectl delete -f config/crd/bases/
```

For the kubectl manifest:

```bash
kubectl delete -f deploy/kubectl/manifests.yaml
```
