---
title: "Deploying Services with Docker"
date: 2024-09-10
categories: ["DevOps"]
tags: ["Docker", "CI/CD"]
content_types: ["Note"]
authors: ["Your Name"]
summary: "Notes on containerizing Go services and setting up multi-stage builds for production."
thumbnail: ""
thumb_label: "Docker"
---

Containerization has become the standard for deploying backend services. Docker provides a consistent environment from development through production, eliminating the classic "works on my machine" problem.

## Multi-Stage Builds

For Go services, multi-stage builds dramatically reduce the final image size. The build stage compiles the binary, and the runtime stage copies only what is needed.

```dockerfile
# Build stage
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /server ./cmd/server

# Runtime stage
FROM alpine:3.19
RUN apk --no-cache add ca-certificates
COPY --from=builder /server /server
EXPOSE 8080
ENTRYPOINT ["/server"]
```

This approach produces images under 20MB instead of the 800MB+ you get from a full Go SDK image.

## Health Checks

Every production container should define a health check. Docker uses this to determine whether the container is functioning correctly and can restart unhealthy containers automatically.

```yaml
healthcheck:
  test: ["CMD", "wget", "--spider", "http://localhost:8080/healthz"]
  interval: 30s
  timeout: 5s
  retries: 3
```

## Compose for Local Development

Docker Compose ties multiple services together. A typical setup includes the application, a database, and perhaps a message broker. Keep your `docker-compose.yml` focused on development — production orchestration belongs in Kubernetes or similar platforms.

## CI/CD Integration

Automate your builds with GitHub Actions or GitLab CI. Tag-based deployments ensure that only reviewed and tested code reaches production. Use build caching to speed up repeated builds.
