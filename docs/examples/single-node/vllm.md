---
id: vllm-single
title: vLLM Single Node
---

# vLLM Single Node Deployment

Deploy vLLM inference service on a single Kubernetes node.

```yaml
apiVersion: rbgs.sgl-project.dev/v1
kind: RoleBasedGroup
metadata:
  name: vllm-single
spec:
  roles:
    - name: inference
      workloadType: StatefulSet
      replicas: 1
      roleSpec:
        template:
          spec:
            containers:
              - name: vllm
                image: vllm/vllm-openai:latest
                resources:
                  limits:
                    nvidia.com/gpu: 1
```

View the complete example: [vllm.yaml](https://github.com/sgl-project/rbg/blob/main/examples/single-node/vllm.yaml)