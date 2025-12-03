#!/bin/bash
cd /tmp/kavia/workspace/code-generation/simple-todo-manager-1705-1714/frontend_react_todo_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

