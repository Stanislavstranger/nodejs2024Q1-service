.PHONY: build-postgres build-node

build-postgres:
    @echo "Building PostgreSQL image..."
    docker build -t my_postgres_image -f Dockerfile.postgres .
    @echo "PostgreSQL image built successfully."

build-node:
    @echo "Building Node.js application image..."
    docker build -t my_nodejs_app -f Dockerfile.node .
    @echo "Node.js application image built successfully."

build: build-postgres build-node
