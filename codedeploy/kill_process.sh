#!/bin/bash

echo "Remove existing containers";
docker compose down || true;