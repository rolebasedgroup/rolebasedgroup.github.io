---
id: revision
title: Revision
---

# Revision

RBG supports revision history for tracking changes to your inference service.

## Revision Management

Each update creates a revision, allowing rollback to previous configurations.

## Rollback

Rollback to a previous revision:

```bash
kubectl rbgs rollback <name> --revision=<revision-number>
```