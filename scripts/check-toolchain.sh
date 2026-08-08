#!/bin/sh

set -eu

echo "Node:"
node --version

echo "npm:"
npm --version

echo "Verilator:"
verilator --version

echo "GCC:"
g++ --version | head -n 1
