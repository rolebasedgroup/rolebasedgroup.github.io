---
title: Introducing RoleBasedGroup
authors: [sglang]
tags: [announcement]
---

# Introducing RoleBasedGroup

RoleBasedGroup (RBG) is a Kubernetes API for orchestrating distributed, stateful AI inference workloads.

## Why RBG?

Traditional Kubernetes primitives are ill-suited for LLM inference services that:
- Run as multi-role topologies (gateway/router/prefill/decode)
- Are performance-sensitive to GPU/network topology
- Require atomic, cross-role operations

RBG treats an inference service as a **role-based group**, managing it as a single coordinated unit.

## The SCOPE Framework

RBG provides five core capabilities:

- **Stable** - Topology-aware deterministic operations
- **Coordination** - Cross-role policy engine
- **Orchestration** - Role dependencies and startup sequences
- **Performance** - Topology-aware placement
- **Extensible** - Future-proof deployment abstraction

## Getting Started

Check out our [Quick Start Guide](/docs/quick_start) to begin deploying LLM inference services with RBG.