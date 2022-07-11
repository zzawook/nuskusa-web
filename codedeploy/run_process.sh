#!/bin/bash

cd /home/ubuntu/nuskusa-backend;
sudo git pull origin main;
docker compose build;
docker compose up -d;