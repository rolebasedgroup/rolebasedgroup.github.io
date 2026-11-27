---
id: quick_start
title: Quick Start
---

RoleBasedGroup (RBG) is a custom resource that models a group of roles, the pod pattern used by each role, and the relationships between those roles. It manages multi-role inference workloads that need coordinated scheduling, lifecycle management, rolling updates, and optional gang-scheduling.

## Deploy a minimal RoleBasedGroup

After installing RBG, create a single-role service with one Pod per instance:

```yaml
apiVersion: workloads.x-k8s.io/v1alpha2
kind: RoleBasedGroup
metadata:
  name: quickstart
spec:
  roles:
    - name: inference
      replicas: 1
      standalonePattern:
        template:
          spec:
            containers:
              - name: inference
                image: example/inference:latest
                resources:
                  limits:
                    nvidia.com/gpu: "1"
```

```bash
kubectl apply -f quickstart.yaml
kubectl get rolebasedgroup quickstart
```

## Conceptual View

![rbg](https://raw.githubusercontent.com/sgl-project/rbg/main/doc/img/rbg.jpg)

## Key Features

- [Multi Roles](/docs/features/multiroles)
- [Workload Patterns](/docs/features/patterns)
- [Role Dependencies](/docs/features/role-dependencies)
- [Autoscaling](/docs/features/autoscaler)
- [Update Strategy](/docs/features/update-strategy)
- [Coordinated Policy](/docs/features/coordinated-policy)
- [Failure Handling](/docs/features/failure-handling)
- [Gang Scheduling](/docs/features/gang-scheduling)
- [Exclusive Topology](/docs/features/exclusive-topology)
- [Monitoring](/docs/features/monitoring)

## PD Colocation

When a request comes into an LLM inference engine, the system will first take the user input to generate the first token (**prefill**), then generate outputs token-by-token autoregressively (**decode**). A request usually consists of one prefill step, and multiple decoding steps until termination.

![colocation](https://raw.githubusercontent.com/sgl-project/rbg/main/doc/img/colocation.png)

### Aggregated Deployment (Single Node)

When the model is small enough that a single Kubernetes Node can load all model files, you can deploy the LLM inference service on a single node using aggregated deployment.

![single-node](https://raw.githubusercontent.com/sgl-project/rbg/main/doc/img/single-node.jpg)

#### Aggregated inference examples

- [Aggregated Standalone](https://github.com/sgl-project/rbg/tree/main/examples/inference/agg-standalone.yaml)
- [Aggregated Leader-Worker](https://github.com/sgl-project/rbg/tree/main/examples/inference/agg-leader-worker.yaml)

### Aggregated Deployment (Multi Nodes with Tensor Parallelism)

When the model is too large for a single Node to load all files, use multi-node distributed inference with tensor parallelism.

![multi-nodes](https://raw.githubusercontent.com/sgl-project/rbg/main/doc/img/multi-nodes.jpg)

#### Multi-node aggregated examples

- [Aggregated Multi-Node (Dynamo)](https://github.com/sgl-project/rbg/tree/main/examples/inference/ecosystem/dynamo/agg-multi-nodes.yaml)

## PD Disaggregated

Colocating the two phases and batching the computation of prefill and decoding across all users and requests not only leads to strong prefill-decoding interferences but also couples the resource allocation and parallelism plans for both phases. Disaggregating the prefill and decoding computation improves the performance of large language models (LLMs) serving.

![pd-disagg](https://raw.githubusercontent.com/sgl-project/rbg/main/doc/img/pd-disagg.jpg)

### PD-disagg inference examples

Deploying PD-disagg inference service with RBG.

![rbg-pd](https://raw.githubusercontent.com/sgl-project/rbg/main/doc/img/rbg-pd.jpg)

- [PD-Disaggregated Standalone](https://github.com/sgl-project/rbg/tree/main/examples/inference/pd-disagg-standalone.yaml)
- [PD-Disaggregated Leader-Worker](https://github.com/sgl-project/rbg/tree/main/examples/inference/pd-disagg-leader-worker.yaml)
- [PD-Disaggregated Multi-Node (Dynamo)](https://github.com/sgl-project/rbg/tree/main/examples/inference/ecosystem/dynamo/pd-disagg-multi-nodes.yaml)

## Ecosystem Integration

For advanced deployments with NVIDIA Dynamo or Mooncake KV Cache:

- [Dynamo Integration](https://github.com/sgl-project/rbg/tree/main/examples/inference/ecosystem/dynamo/)
- [Mooncake Integration](https://github.com/sgl-project/rbg/tree/main/examples/inference/ecosystem/mooncake/)

See [Ecosystem Integration](/docs/features/ecosystem-integration) for detailed documentation.
