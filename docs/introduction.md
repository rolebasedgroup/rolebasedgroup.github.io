---
id: introduction
title: Introduction
slug: /
---

# RoleBasedGroup (RBG)

**RoleBasedGroup (RBG)** is a Kubernetes API for orchestrating distributed, stateful AI inference workloads with **multi-role collaboration** and **built-in service discovery**.

It provides a common deployment pattern for production LLM inference, especially **disaggregated architectures** such as prefill/decode separation.

## Why RBG?

Traditional Kubernetes primitives (e.g. plain StatefulSets / Deployments) are ill-suited for LLM inference services that:

- run as **multi-role topologies** (gateway / router / prefill / decode),
- are **performance-sensitive** to GPU / network topology,
- and require **atomic, cross-role operations** (deploy, upgrade, scale, failover).

RBG treats an inference service as a **role-based group**, not a loose set of workloads. It models the service as a **topologized, stateful, coordinated multi-role organism** and manages it as a single unit.

## Key Concepts

### Role

The basic scheduling and rollout unit. Each role (e.g. prefill, decode) has its own spec, lifecycle and policies.

### RoleBasedGroup

A group of roles that together form one logical service (e.g. one LLM inference deployment).

## Project Status

| Version | Kubernetes Version | LeaderWorkerSet Version |
|:-----------:|:------------------:|:-----------------------:|
|    main     |     >=v1.22.x      |        >=v0.7.0         |
|   v0.4.0    |     >=v1.28.x      |        >=v0.7.0         |
|   v0.3.0    |     >=v1.28.x      |        >=v0.6.0         |

## Community

- [Slack](https://sgl-fru7574.slack.com/archives/C098X0LQZV5)
- [GitHub Issues](https://github.com/sgl-project/rbg/issues)
- [SGLang Project](https://github.com/sgl-project/sglang)