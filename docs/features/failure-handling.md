---
id: failure-handling
title: Failure Handling
---

# Failure Handling

RBG provides robust failure handling mechanisms for inference workloads.

## Restart Policy

Configure restart policies per role:

```yaml
roleSpec:
  restartPolicy: OnFailure
```

## Linked Recovery

Cross-role linked recovery ensures dependent roles recover together.