---
id: exclusive-topology
title: Exclusive Topology
---

# Exclusive Topology

RBG supports exclusive topology placement for performance-sensitive workloads.

## Hardware Affinity

Topology-aware placement with hardware affinity hierarchy:
- GPU-NVLink (highest)
- PCIe
- RDMA
- VPC (lowest)

## Configuration

Configure exclusive topology requirements in role spec.