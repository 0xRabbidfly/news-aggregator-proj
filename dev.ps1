# Start the backend server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; `$env:PYTHONPATH='.'; .\venv\Scripts\Activate.ps1; python -m uvicorn src.main:app --reload"

# Start the frontend development server
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; pnpm dev" 