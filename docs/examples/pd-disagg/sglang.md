---
id: sglang-pd
title: SGLang PD-Disaggregated
---

# SGLang prefill/decode-disaggregated deployment

Model prefill and decode as separate roles, then use `CoordinatedPolicy` if you need coordinated updates or scaling.

```yaml
apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: sglang-pd
spec:
  roles:
    - name: prefill
      replicas: 2
      standalonePattern:
        template:
          spec:
            containers:
              - name: sglang
                image: lmsysorg/sglang:v0.5.9
                args:
                  - --disaggregation-mode=prefill
    - name: decode
      replicas: 4
      leaderWorkerPattern:
        size: 2
        template:
          spec:
            containers:
              - name: sglang
                image: lmsysorg/sglang:v0.5.9
                args:
                  - --disaggregation-mode=decode
```

Complete examples:

- [`pd-disagg-standalone.yaml`](https://github.com/sgl-project/rbg/blob/main/examples/inference/pd-disagg-standalone.yaml)
- [`pd-disagg-leader-worker.yaml`](https://github.com/sgl-project/rbg/blob/main/examples/inference/pd-disagg-leader-worker.yaml)
- [`sgl-pd-disagg-with-mooncake-te.yaml`](https://github.com/sgl-project/rbg/blob/main/examples/inference/ecosystem/mooncake/mooncake-transfer-engine/sgl-pd-disagg-with-mooncake-te.yaml)
