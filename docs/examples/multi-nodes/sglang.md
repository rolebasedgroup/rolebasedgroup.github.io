---
id: sglang-multi
title: SGLang Multi Node
---

# SGLang Multi Node Deployment

Deploy SGLang inference service across multiple Kubernetes nodes using LeaderWorkerSet.

```yaml
apiVersion: rbgs.sgl-project.dev/v1
kind: RoleBasedGroup
metadata:
  name: sglang-multi
spec:
  roles:
    - name: inference
      workloadType: LeaderWorkerSet
      replicas: 4
      roleSpec:
        leaderWorkerTemplate:
          leaderTemplate:
            spec:
              containers:
                - name: sglang-leader
                  image: lmsysorg/sglang:latest
```

View the complete example: [sglang.yaml](https://github.com/sgl-project/rbg/blob/main/examples/multi-nodes/sglang.yaml)