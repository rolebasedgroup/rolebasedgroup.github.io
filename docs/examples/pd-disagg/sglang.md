---
id: sglang-pd
title: SGLang PD-Disaggregated
---

# SGLang PD-Disaggregated Deployment

Deploy prefill/decode disaggregated inference with SGLang.

```yaml
apiVersion: rbgs.sgl-project.dev/v1
kind: RoleBasedGroup
metadata:
  name: sglang-pd
spec:
  roles:
    - name: prefill
      workloadType: StatefulSet
      replicas: 2
      roleSpec:
        # Prefill configuration
    - name: decode
      workloadType: LeaderWorkerSet
      replicas: 4
      roleSpec:
        # Decode configuration
```

![rbg-pd](https://raw.githubusercontent.com/sgl-project/rbg/main/doc/img/rbg-pd.jpg)

View the complete example: [SGLang PD-Disagg](https://github.com/sgl-project/rbg/tree/main/examples/inference/)