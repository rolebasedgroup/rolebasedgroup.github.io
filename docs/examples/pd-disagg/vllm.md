---
id: vllm-pd
title: vLLM PD-Disaggregated
---

# vLLM prefill/decode-disaggregated deployment

For production PD-disaggregated vLLM, use the Mooncake transfer engine example.

```yaml
apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: vllm-pd
spec:
  roleTemplates:
    - name: vllm-base
      template:
        spec:
          containers:
            - name: vllm
              image: vllm/vllm-openai:latest
  roles:
    - name: prefill
      replicas: 1
      standalonePattern:
        templateRef:
          name: vllm-base
          patch:
            spec:
              containers:
                - name: vllm
                  args:
                    - --kv-transfer-config
                    - '{"kv_connector":"MooncakeConnector","kv_role":"kv_producer"}'
    - name: decode
      replicas: 1
      standalonePattern:
        templateRef:
          name: vllm-base
          patch:
            spec:
              containers:
                - name: vllm
                  args:
                    - --kv-transfer-config
                    - '{"kv_connector":"MooncakeConnector","kv_role":"kv_consumer"}'
```

Complete example: [`vllm-pd-disagg-with-mooncake-te.yaml`](https://github.com/sgl-project/rbg/blob/main/examples/inference/ecosystem/mooncake/mooncake-transfer-engine/vllm-pd-disagg-with-mooncake-te.yaml)
