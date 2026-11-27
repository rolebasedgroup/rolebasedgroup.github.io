---
id: sglang-single
title: SGLang Aggregated Single Node
---

# SGLang aggregated single-node deployment

Use a `standalonePattern` role when one SGLang engine fits on one Kubernetes node.

```yaml
apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: sglang-single
spec:
  roles:
    - name: inference
      replicas: 1
      standalonePattern:
        template:
          spec:
            containers:
              - name: sglang
                image: lmsysorg/sglang:v0.5.9
                command:
                  - python3
                  - -m
                  - sglang.launch_server
                  - --model-path
                  - Qwen/Qwen3-0.6B
                  - --host
                  - 0.0.0.0
                  - --port
                  - "8001"
                  - --tp-size
                  - "1"
                resources:
                  limits:
                    nvidia.com/gpu: "1"
```

The controller creates a `RoleInstanceSet` for the role and one `RoleInstance` per replica.

Complete example: [`agg-standalone.yaml`](https://github.com/sgl-project/rbg/blob/main/examples/inference/agg-standalone.yaml)
