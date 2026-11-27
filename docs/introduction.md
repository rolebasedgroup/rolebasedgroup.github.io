---
id: introduction
title: Introduction
slug: /
---

# RoleBasedGroup (RBG)

**RoleBasedGroup (RBG)** is a Kubernetes API for orchestrating distributed, stateful AI inference workloads with **multi-role collaboration**, **native workload patterns**, and **built-in service discovery**.

It provides a common deployment model for production LLM inference, especially for multi-role and prefill/decode-disaggregated architectures.

## Why RBG?

Plain Kubernetes workload primitives work well for stateless applications, but LLM inference services are different:

- They run as **multi-role topologies** — gateway, router, tokenizer, prefill, decode, KV cache, and transfer components.
- They are **performance-sensitive** to GPU, NVLink, PCIe, RDMA, and network topology.
- They need **atomic, cross-role operations** for deployment, upgrade, scaling, and failover.
- They need **stable identity and discovery** for tensor-parallel and disaggregated serving.
- They often require **coordinated rollouts** so prefill and decode do not drift into incompatible versions.

RBG models the service as a role-based group and manages it as one unit, while still exposing Kubernetes-native status and control.

## Key concepts

| Concept | Description |
|---|---|
| **Role** | The basic scheduling, rollout, and scaling unit. Each role has its own replicas, pod pattern, dependencies, and policies. |
| **RoleBasedGroup** | A group of roles that together form one logical inference service. |
| **RoleBasedGroupSet** | Manages multiple RoleBasedGroups created from the same topology template. |
| **RoleInstance** | One inference instance for a role: a standalone Pod, a leader/worker Pod group, or a custom multi-component Pod group. |
| **RoleInstanceSet** | The native workload that owns and reconciles the RoleInstances for one role. |
| **RoleBasedGroupScalingAdapter** | A scale-target adapter that lets HPA/KEDA/KPA scale an individual role. |
| **CoordinatedPolicy** | Cross-role update and scaling policy with max-skew and progression controls. |
| **ClusterEngineRuntimeProfile** | Cluster-scoped reusable runtime configuration that is injected into role Pods. |

## Native workload patterns

RBG v1alpha2 introduces role patterns instead of asking users to choose a generic Kubernetes workload kind:

- **StandalonePattern** — one Pod per instance.
- **LeaderWorkerPattern** — one leader and one or more workers per instance.
- **CustomComponentsPattern** — multiple named components with explicit lifecycle ordering and discovery.

These patterns map directly to common inference topologies and let RBG reason about readiness, restart, and rollout semantics at the correct granularity.

## Feature overview

RBG provides the SCOPE capabilities:

- **Stable** — topology-aware deterministic operations and unique role identity.
- **Coordination** — cross-role policies, coordinated updates, linked recovery, and coordinated scaling.
- **Orchestration** — role dependencies, startup ordering, and topology-aware service discovery.
- **Performance** — gang scheduling, exclusive topology, hardware affinity, and port allocation.
- **Extensible** — declarative APIs, reusable role templates, and engine runtime profiles.

## API and compatibility

The current API version is **`workloads.x-k8s.io/v1alpha2`**.

The legacy `v1alpha1` API and the `Deployment`, `StatefulSet`, and `LeaderWorkerSet` role workload types are deprecated and kept only for migration compatibility. New installations should use the v1alpha2 patterns. Existing users should follow the [migration guide](/docs/migration-v1alpha1-to-v1alpha2).

## Project status

| Version | API | Kubernetes | Notes |
|---|---|---|---|
| main / 0.9.x development | `v1alpha2` | Kubernetes 1.28+ | RoleInstanceSet, patterns, coordinated policy, runtime profiles, warmup |
| 0.8.x | `v1alpha2` | Kubernetes 1.28+ | v1alpha2 conversion, scaling adapters, gang scheduling, port allocator |
| 0.7.x | `v1alpha2` | Kubernetes 1.28+ | Stable v1alpha2 release |
| 0.6.x | `v1alpha1` and early `v1alpha2` | Kubernetes 1.28+ | Coordinated scaling, InstanceSet |

## Community

- [Slack](https://sgl-fru7574.slack.com/archives/C098X0LQZV5)
- [GitHub Issues](https://github.com/sgl-project/rbg/issues)
- [SGLang Project](https://github.com/sgl-project/sglang)
