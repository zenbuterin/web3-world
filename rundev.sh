#!/bin/bash 
echo "Starting backend"
cd backend || exit
cargo run > backend.log 2>&1 &
BACKEND_PID=$!
cd .. > /dev/null
echo "Starting frontend"
cd frontend || exit
pnpm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
cd .. > /dev/null
echo "backend and frontend started."
echo "backend PID: $BACKEND_PID"
echo "frontend PID: $FRONTEND_PID"
cleanup() {
  echo "Stopping all services.."
  kill $BACKEND_PID $FRONTEND_PID
  exit 0
}

trap cleanup SIGINT

wait

