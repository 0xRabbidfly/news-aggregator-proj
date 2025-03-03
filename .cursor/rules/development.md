## Package Manager Requirements

This project strictly requires the use of pnpm (>= 9.0.0) as the package manager. Other package managers (npm, yarn) are not supported.

### Why pnpm?
- Disk efficiency through content-addressable storage
- Strict dependency management preventing phantom dependencies
- Faster installation times
- Built-in monorepo support
- Consistent dependency resolution

### Installation
```bash
# Install pnpm if not already installed
npm install -g pnpm

# Verify installation and version
pnpm --version
```

## Project Structure
```
backend/
├── src/
│   ├── api/            # FastAPI route handlers
│   ├── models/         # Data models and schemas
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── main.py         # Application entry point
└── requirements.txt    # Python dependencies

frontend/
├── src/
│   ├── app/           # Next.js pages
│   ├── components/    # React components
│   │   ├── atoms/    # Basic UI components
│   │   ├── molecules/# Composite components
│   │   └── organisms/# Complex components
│   ├── services/     # API services
│   ├── hooks/        # Custom React hooks
│   └── utils/        # Utility functions
└── package.json      # Frontend dependencies
```


### Environment Setup
```bash
# Backend (.env)
NEWS_API_KEY=your_key_here
PORT=8000
HOST=0.0.0.0
ENVIRONMENT=development

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

## WINDOWS ENVIRONMENT REQUIREMENTS
This project MUST use PowerShell commands. Unix commands are NOT allowed.

### PowerShell Command Standards
Common Unix to PowerShell translations:
```powershell
# Directory Navigation
cd -> Set-Location
ls -> Get-ChildItem
pwd -> Get-Location
mkdir -> New-Item -ItemType Directory
rm -> Remove-Item
cp -> Copy-Item
mv -> Move-Item

# File Operations
touch -> New-Item -ItemType File
cat -> Get-Content
echo -> Write-Output

# Process Management
ps -> Get-Process
kill -> Stop-Process

# Environment
export VAR=value -> $env:VAR = "value"
printenv -> Get-ChildItem Env:
```

### Command Execution Rules
1. ALWAYS use PowerShell syntax
2. Use semicolons (;) to chain commands
3. Use proper error handling with try/catch
4. Use full paths when necessary
5. Always activate virtual environment using:
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

## Error Prevention
1. Backend:
   - Validate environment variables at startup
   - Use proper type hints
   - Handle API rate limits
   - Log errors properly

2. Frontend:
   - Use TypeScript strict mode
   - Implement error boundaries
   - Handle loading states
   - Validate API responses

## Development Workflow
1. Start Backend:
   ```powershell
   Set-Location backend
   .\venv\Scripts\Activate.ps1
   python -m uvicorn src.main:app --reload
   ```

2. Start Frontend:
   ```powershell
   Set-Location frontend
   npm run dev
   ```

3. API Integration:
   - Always include error handling
   - Use proper TypeScript types
   - Handle loading states
   - Implement proper caching

   # Debugging

### Development Environment
- Build Configuration
  - Use Turbopack in development for faster builds:
    ```json
    // package.json
    {
      "scripts": {
        "dev": "next dev --turbopack"
      }
    }
    ```
  - Handle Fast Refresh properly:
    - Use proper module boundaries
    - Avoid side effects in module scope
    - Keep state initialization in useEffect/useState
  - Configure proper error boundaries for runtime errors

### Modes
# Handling Debugging Model
- When asked to enter "Debugger Mode" please follow this exact sequence:
  
  1. Reflect on 5-7 different possible sources of the problem
  2. Distill those down to 1-2 most likely sources
  3. Add additional logs to validate your assumptions and track the transformation of data structures throughout the application control flow before we move onto implementing the actual code fix
  4. Use the "getConsoleLogs", "getConsoleErrors", "getNetworkLogs" & "getNetworkErrors" tools to obtain any newly added web browser logs
  5. Obtain the server logs as well if accessible - otherwise, ask me to copy/paste them into the chat
  6. Deeply reflect on what could be wrong + produce a comprehensive analysis of the issue
  7. Suggest additional logs if the issue persists or if the source is not yet clear
  8. Once a fix is implemented, ask for approval to remove the previously added logs

# Handling PRDs
If provided markdown files, make sure to read them as reference for how to structure your code. Do not update the markdown files at all unless otherwise asked to do so. Only use them for reference and examples of how to structure your code.

# Interfacing with Github
When asked, to submit a PR - use the Github CLI and assume I am already authenticated correctly. When asked to create a PR follow this process:

1. git status - to check if there are any changes to commit
2. git add . - to add all the changes to the staging area (IF NEEDED)
3. git commit -m "your commit message" - to commit the changes (IF NEEDED)
4. git push - to push the changes to the remote repository (IF NEEDED)
5. git branch - to check the current branch
6. git log main..[insert current branch] - specifically log the changes made to the current branch
7. git diff --name-status main - check to see what files have been changed
8. gh pr create --title "Title goes here..." --body "Example body..."

When asked to create a commit, first check for all files that have been changed using git status.Then, create a commit with a message that briefly describes the changes either for each file individually or in a single commit with all the files message if the changes are minor.

When writing a message for the PR, do not include new lines in the message. Just write a single long message.