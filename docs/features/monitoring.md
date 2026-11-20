---
id: monitoring
title: Monitoring
---

# Monitoring

RBG workloads are standard Kubernetes Pods with RBG-specific labels, so you can monitor them with any Prometheus-compatible stack.

## Prerequisites

- Kubernetes 1.28 or newer.
- Prometheus Operator or another scraper that can discover Pod metrics endpoints.
- An inference engine that exposes Prometheus metrics.

## Metrics

SGLang and vLLM expose Prometheus metrics that can be scraped:

- **SGLang**: Metrics on port 9090, including request latency, token throughput, and GPU utilization.
- **vLLM**: Metrics on port 8000 via the `/metrics` endpoint.

Configure your scraper to target the Pods created by RBG.

## PodMonitor

If you use the Prometheus Operator, create a `PodMonitor` for the Pods owned by your RoleBasedGroup:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: PodMonitor
metadata:
  name: rbg-pod-monitor
  namespace: default
spec:
  selector:
    matchExpressions:
      - key: rbg.workloads.x-k8s.io/group-name
        operator: Exists
  namespaceSelector:
    any: true
  podMetricsEndpoints:
    - interval: 15s
      path: /metrics
      port: metrics
      relabelings:
        - sourceLabels:
            - __meta_kubernetes_pod_label_rbg_workloads_x_k8s_io_group_name
          targetLabel: rbg_group
        - sourceLabels:
            - __meta_kubernetes_pod_label_rbg_workloads_x_k8s_io_role_name
          targetLabel: rbg_role
        - sourceLabels:
            - __meta_kubernetes_pod_name
          targetLabel: pod
```

The exact metric port name depends on your Pod template. In the examples above, the container port is named `metrics`.

## Grafana

Install Prometheus and Grafana following the [SGLang monitoring documentation](https://github.com/sgl-project/sglang/blob/main/examples/monitoring/README.md).

- Grafana: `http://localhost:3000`
- Prometheus: `http://localhost:9090`

If you already have Prometheus running, import the [SGLang Grafana dashboard](https://github.com/sgl-project/sglang/blob/main/examples/monitoring/grafana/dashboards/json/sglang-dashboard.json).

## Example

A complete `PodMonitor` example is available in the repository:

[`podmonitor.yaml`](https://github.com/sgl-project/rbg/blob/main/examples/deprecated/v1alpha1/monitoring/podmonitor.yaml)
