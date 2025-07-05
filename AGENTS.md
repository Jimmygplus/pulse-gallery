# AGENTS

This repository contains a simple FastAPI backend and React front end. Follow these best practices when modifying files.

## Code checks
Run these commands before committing any changes:

```bash
# Lint TypeScript and React code
cd src/frontend && npm run lint
cd ..

# Ensure all Python files compile
python3 -m py_compile $(git ls-files '*.py')
```

## Development tips
- Start the backend with `uvicorn src.backend.main:app --reload`.
- Start the React dev server by running `npm run dev` in `src/frontend`.
- Keep commit messages clear and document any new features in the README.
