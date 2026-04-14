---
id: api
title: RoleBasedGroup API
---

# RoleBasedGroup API

## RoleBasedGroup Spec

```yaml
apiVersion: rbgs.sgl-project.dev/v1
kind: RoleBasedGroup
metadata:
  name: my-inference
spec:
  roles:
    - name: prefill
      workloadType: StatefulSet
      replicas: 2
      roleSpec:
        # Role-specific configuration
    - name: decode
      workloadType: LeaderWorkerSet
      replicas: 4
      roleSpec:
        # Role-specific configuration
```

## Role Types

| Type | Description |
|------|-------------|
| `StatefulSet` | Stateful workloads with stable network identity |
| `Deployment` | Stateless workloads |
| `LeaderWorkerSet` | Multi-node distributed inference |

## RoleBasedGroup Status

```yaml
status:
  roles:
    - name: prefill
      readyReplicas: 2
    - name: decode
      readyReplicas: 4
  conditions:
    - type: Ready
      status: "True"
```

For complete API reference, see the [CRD definitions](https://github.com/sgl-project/rbg/tree/main/config/crd/bases).