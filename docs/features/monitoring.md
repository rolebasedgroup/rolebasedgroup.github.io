---
id: monitoring
title: Monitoring
---

# Monitoring

RBG integrates with Prometheus for monitoring inference workloads.

## Metrics

Key metrics exposed:
- Pod status per role
- Resource utilization
- Request latency

## Prometheus Integration

Deploy Prometheus to monitor RBG workloads:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: rbgs-monitor
spec:
  selector:
    matchLabels:
      app: rbgs-controller
  endpoints:
  - port: metrics
```