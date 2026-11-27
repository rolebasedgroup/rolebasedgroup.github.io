---
id: vllm-single
title: vLLM Aggregated Single Node
---

# vLLM aggregated single-node deployment

vLLM uses the same v1alpha2 `standalonePattern` as other engines.

```yaml
apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: vllm-single
spec:
  roles:
    - name: inference
      replicas: 1
      standalonePattern:
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
                  - --tensor-parallel-size=1
                resources:
                  limits:
                    nvidia.com/gpu: "1"
```

See [`ecosystem-integration`](/docs/features/ecosystem-integration) for the vLLM integration details.
