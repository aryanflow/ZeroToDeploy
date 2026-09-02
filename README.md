# ZeroToDeploy

Interactive DevOps tutorials: **run commands, watch the system change.** Simulated terminals and live panels. Nothing touches production.

<p align="center">
  <img src="docs/screenshot.png" alt="ZeroToDeploy landing page" width="900">
</p>

## How it works

1. **Hub** — optional demo: try `git status` in 5 seconds
2. **Concept slides** — mental model first (THE IDEA, THE LOOP)
3. **Workbench** — terminal + visual panel + daily commands on one screen
4. **Go deeper** — branches, Dockerfile, VPC, etc. Use dots to jump; add `?workbench` to skip ahead

## Modules

| Module | Slides | Time |
|--------|--------|------|
| [**Git**](modules/git/index.html) | 8 | ~16 min |
| [**Docker**](modules/docker/index.html) | 8 | ~18 min |
| [**Terraform**](modules/terraform/index.html) | 8 | ~18 min |
| [**Kubernetes**](modules/kubernetes/index.html) | 8 | ~18 min |
| [**AWS Core**](modules/aws/index.html) | 8 | ~20 min |
| [**CI/CD**](modules/cicd/index.html) | 8 | ~18 min |

**All modules:** ~108 min · 48 slides · $0 cloud spend

## What's in the workbench

- **Terminal** — type commands or tap chips; output is simulated but consistent
- **Visual panel** — files zones (Git), containers (Docker), cluster (K8s), resources (AWS/Terraform), runs (CI/CD)
- **Daily commands** — 12–15 commands in typical use order; each row has **RUN**
- **Concept slides** — mental models when you want them; not required first

## Quick start

```bash
open index.html
# or
python3 -m http.server 8080
# → http://localhost:8080
```

Links open at **THE IDEA**. Add `?workbench` to jump straight to practice.

## Project structure

```
ZeroToDeploy/
├── index.html          # hub + demo terminal
├── assets/             # deck-engine, hub-terminal, brand
└── modules/
    ├── git/
    ├── docker/
    ├── terraform/
    ├── kubernetes/
    ├── aws/
    └── cicd/
```

## Philosophy

- **Concepts, then practice** — two slides of mental model, then the workbench
- **Simulated, not real** — nothing breaks, nothing bills
- **Standalone topics** — pick any module; no required order
