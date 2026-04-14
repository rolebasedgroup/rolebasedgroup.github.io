---
id: quick_start
title: Quick Start
---

# Quick Start

RoleBasedGroup (RBG) is a custom resource that models a group of roles (each role represents a workload type and set of pods) and the relationships between them.

## Conceptual View

![rbg](https://raw.githubusercontent.com/sgl-project/rbg/main/doc/img/rbg.jpg)

## Key Features

- [Multi Roles](/docs/features/multiroles)
- [Autoscaling](/docs/features/autoscaler)
- [Update Strategy](/docs/features/update-strategy)
- [Failure Handling](/docs/features/failure-handling)
- [Gang Scheduling](/docs/features/gang-scheduling)
- [Monitoring](/docs/features/monitoring)

## PD Colocation

When a request comes into an LLM inference engine, the system will first take the user input to generate the first token (**prefill**), then generate outputs token-by-token autoregressively (**decode**).

![colocation](https://raw.githubusercontent.com/sgl-project/rbg/main/doc/img/colocation.png)

## Example Deployments

### Single Node Examples

- [SGLang](https://github.com/sgl-project/rbg/blob/main/examples/single-node/sglang.yaml)
- [vLLM](https://github.com/sgl-project/rbg/blob/main/examples/single-node/vllm.yaml)

### Multi Nodes Examples

- [SGLang](https://github.com/sgl-project/rbg/blob/main/examples/multi-nodes/sglang.yaml)
- [vLLM](https://github.com/sgl-project/rbg/blob/main/examples/multi-nodes/vllm.yaml)

### PD-Disaggregated Examples

- [SGLang PD-Disagg](https://github.com/sgl-project/rbg/tree/main/examples/inference/)
- [Others](https://github.com/sgl-project/rbg/tree/main/examples/inference/ecosystem/)