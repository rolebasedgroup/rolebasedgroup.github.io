---
id: gang-scheduling
title: Gang Scheduling
---

# Gang Scheduling

RBG supports gang scheduling through integration with scheduler-plugins.

## What is Gang Scheduling?

Gang scheduling ensures all pods of a role start together, which is critical for distributed inference workloads.

## Configuration

Enable gang scheduling in the role spec:

```yaml
roleSpec:
  scheduling:
    gangScheduling: true
```

## Example

- [Gang Scheduling Example](https://github.com/sgl-project/rbg/blob/main/examples/basics/scheduler-plugins-gang.yaml)