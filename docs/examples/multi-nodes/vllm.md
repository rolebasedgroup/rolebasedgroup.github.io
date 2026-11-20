---
id: vllm-multi
title: vLLM Aggregated Multi Node
---

# vLLM aggregated multi-node deployment

For tensor-parallel vLLM, use `leaderWorkerPattern` and set `size` to the tensor-parallel size.

```yaml
apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: vllm-multi
spec:
  roles:
    - name: inference
      replicas: 1
      leaderWorkerPattern:
        size: 4
        restartPolicyConfig:
          type: RecreateRoleInstanceOnPodRestart
        template:
          spec:
            containers:
              - name: vllm
                image: vllm/vllm-openai:latest
                command:
                  - vllm
                  - serve
                args:
                  - Qwen/Qwen3-0.6B
                  - --tensor-parallel-size=4
```

RBG injects the leader address and worker index so distributed engines can form a process group without an external registry.
