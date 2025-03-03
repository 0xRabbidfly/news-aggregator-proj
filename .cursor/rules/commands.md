# Command Execution Standards

## Environment
- Operating System: Windows 11
- Shell: PowerShell
- Package Manager: pnpm
- Python Environment: venv

## Command Rules
1. All commands MUST use PowerShell syntax
2. No Unix/Linux commands allowed
3. No Git Bash or WSL commands allowed
4. Use proper PowerShell path separators (backslashes)

## Common Commands
```powershell
# Project Setup
Set-Location $projectDir
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt

# Frontend
Set-Location frontend
pnpm install
pnpm dev

# Backend
Set-Location backend
.\venv\Scripts\Activate.ps1
python -m uvicorn src.main:app --reload

# Git Operations
git checkout -b "feature/new-branch"
git add .
git commit -m "commit message"
git push origin HEAD
```

## Error Handling
1. Always use try/catch blocks for risky operations
2. Use proper PowerShell error handling
3. Check exit codes after command execution
4. Use proper path validation

## Path Handling
1. Use Join-Path for path construction
2. Use Resolve-Path for path resolution
3. Use Test-Path before operations
4. Always use relative paths from workspace root 