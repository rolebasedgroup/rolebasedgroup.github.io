---
id: variables
title: Labels, Annotations and Environment Variables
---

# Labels, Annotations and Environment Variables

RBG injects specific labels, annotations, and environment variables into Pods for service discovery and coordination.

## Labels

| Label | Description |
|-------|-------------|
| `rbg.sgl-project.dev/role` | Role identifier |
| `rbg.sgl-project.dev/role-id` | Unique role ID |
| `rbg.sgl-project.dev/group` | RoleBasedGroup name |

## Annotations

| Annotation | Description |
|------------|-------------|
| `rbg.sgl-project.dev/role-spec` | Role specification hash |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `RBG_ROLE` | Current role name |
| `RBG_ROLE_ID` | Unique role ID |
| `RBG_GROUP_NAME` | RoleBasedGroup name |

## Service Discovery

Pods can use these variables to discover other roles in the same RoleBasedGroup.