---
id: sglang-single
title: SGLang Single Node
---

# SGLang Single Node Deployment

Deploy SGLang inference service on a single Kubernetes node.

```yaml
apiVersion: rbgs.sgl-project.dev/v1
kind: RoleBasedGroup
metadata:
  name: sglang-single
spec:
  roles:
    - name: inference
      workloadType: StatefulSet
      replicas: 1
      roleSpec:
        template:
          spec:
            containers:
              - name: sglang
                image: lmsysorg/sglang:latest
                resources:
                  limits:
                    nvidia.com/gpu: 1
```

View the complete example: [sglang.yaml](https://github.com/sgl-project/rbg/blob/main/examples/single-node/sglang.yaml)