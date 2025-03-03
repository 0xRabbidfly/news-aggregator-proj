You are an expert in Python, FastAPI, and scalable API development.

Key Principles

- Write concise, technical responses with accurate Python examples.
- Use functional, declarative programming; avoid classes where possible.
- Prefer iteration and modularization over code duplication.
- Use descriptive variable names with auxiliary verbs (e.g., is_active, has_permission).
- Use lowercase with underscores for directories and files (e.g., routers/user_routes.py).
- Favor named exports for routes and utility functions.
- Use the Receive an Object, Return an Object (RORO) pattern.

Python/FastAPI

- Use def for pure functions and async def for asynchronous operations.
- Use type hints for all function signatures. Prefer Pydantic models over raw dictionaries for input validation.
- File structure: exported router, sub-routes, utilities, static content, types (models, schemas).
- Avoid unnecessary curly braces in conditional statements.
- For single-line statements in conditionals, omit curly braces.
- Use concise, one-line syntax for simple conditional statements (e.g., if condition: do_something()).

Error Handling and Validation

- Prioritize error handling and edge cases:
  - Handle errors and edge cases at the beginning of functions.
  - Use early returns for error conditions to avoid deeply nested if statements.
  - Place the happy path last in the function for improved readability.
  - Avoid unnecessary else statements; use the if-return pattern instead.
  - Use guard clauses to handle preconditions and invalid states early.
  - Implement proper error logging and user-friendly error messages.
  - Use custom error types or error factories for consistent error handling.

Dependencies

- FastAPI
- Pydantic v2
- Async database libraries like asyncpg or aiomysql
- SQLAlchemy 2.0 (if using ORM features)

FastAPI-Specific Guidelines

- Use functional components (plain functions) and Pydantic models for input validation and response schemas.
- Use declarative route definitions with clear return type annotations.
- Use def for synchronous operations and async def for asynchronous ones.
- Minimize @app.on_event("startup") and @app.on_event("shutdown"); prefer lifespan context managers for managing startup and shutdown events.
- Use middleware for logging, error monitoring, and performance optimization.
- Optimize for performance using async functions for I/O-bound tasks, caching strategies, and lazy loading.
- Use HTTPException for expected errors and model them as specific HTTP responses.
- Use middleware for handling unexpected errors, logging, and error monitoring.
- Use Pydantic's BaseModel for consistent input/output validation and response schemas.

Performance Optimization

- Minimize blocking I/O operations; use asynchronous operations for all database calls and external API requests.
- Implement caching for static and frequently accessed data using tools like Redis or in-memory stores.
- Optimize data serialization and deserialization with Pydantic.
- Use lazy loading techniques for large datasets and substantial API responses.

Key Conventions

1. Rely on FastAPI's dependency injection system for managing state and shared resources.
2. Prioritize API performance metrics (response time, latency, throughput).
3. Limit blocking operations in routes:
   - Favor asynchronous and non-blocking flows.
   - Use dedicated async functions for database and external API operations.
   - Structure routes and dependencies clearly to optimize readability and maintainability.

Refer to FastAPI documentation for Data Models, Path Operations, and Middleware for best practices.

### CORS Configuration
- Never use allow_origins=["*"] with allow_credentials=True
- Always specify exact frontend URLs in allow_origins
- Use environment variables for frontend URLs
- Development: Allow necessary methods and headers
- Production: Restrict to specific methods and headers
- Always validate CORS configuration in both development and production

### Python Package Structure
- Always create `__init__.py` in each directory to make it a proper Python package
- Use absolute imports from project root (e.g., `from src.models.news import Article`)
- Run FastAPI with proper module path: `uvicorn src.main:app --reload`
- Set PYTHONPATH="." in development environment
- Consider using `pyproject.toml` for modern Python packaging

#### Directory Structure
```
backend/
├── src/
│   ├── __init__.py    # Empty file, marks directory as package
│   ├── api/
│   │   └── __init__.py
│   ├── models/
│   │   └── __init__.py
│   ├── services/
│   │   └── __init__.py
│   └── main.py
```

#### Import Standards
✅ Correct:
```python
from src.models.news import Article
from src.services.sentiment import analyze_sentiment
```

❌ Incorrect:
```python
from ..models.news import Article  # Relative imports are error-prone
from models.news import Article    # Missing src root
```

#### Preventing Import Errors
1. Always run server from backend root:
   ```powershell
   cd backend
   .\venv\Scripts\Activate.ps1
   python -m uvicorn src.main:app --reload
   ```

2. Set PYTHONPATH in .env:
   ```
   PYTHONPATH=.
   ```

3. If ModuleNotFoundError occurs:
   - Verify current directory is backend root
   - Check PYTHONPATH setting
   - Confirm __init__.py exists in all directories
   - Use absolute imports from src/
   - Restart development server