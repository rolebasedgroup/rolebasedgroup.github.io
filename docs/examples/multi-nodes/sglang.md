---
id: sglang-multi
title: SGLang Aggregated Multi Node
---

# SGLang aggregated multi-node deployment

Use `leaderWorkerPattern` when one SGLang inference instance spans multiple Kubernetes nodes.

```yaml
apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: sglang-multi
spec:
  roles:
    - name: inference
      replicas: 2
      leaderWorkerPattern:
        size: 4
        restartPolicyConfig:
          type: RecreateRoleInstanceOnPodRestart
        template:
          spec:
            containers:
              - name: sglang
                image: lmsysorg/sglang:v0.5.9
                args:
                  - --model-path=Qwen/Qwen3-0.6B
                  - --tp-size=4
```

Each replica becomes one `RoleInstance` with one leader Pod and `size - 1` worker Pods.

Complete examples:

- [`agg-leader-worker.yaml`](https://github.com/sgl-project/rbg/blob/main/examples/inference/agg-leader-worker.yaml)
- [`dynamo/agg-multi-nodes.yaml`](https://github.com/sgl-project/rbg/blob/main/examples/inference/ecosystem/dynamo/agg-multi-nodes.yaml)
