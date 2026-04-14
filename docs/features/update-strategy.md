---
id: update-strategy
title: Update Strategy
---

# Update Strategy

RBG supports multiple update strategies for rolling out changes to your inference service.

## Rolling Update

Configure rolling update strategy for graceful upgrades:

```yaml
updateStrategy:
  type: RollingUpdate
  rollingUpdate:
    maxUnavailable: 1
    maxSurge: 1
```

## Coordinated Updates

Cross-role coordinated upgrades ensure atomicity across all roles.