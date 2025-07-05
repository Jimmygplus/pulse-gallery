# Pulse Gallery

Pulse Gallery is a minimal image preview web application. The backend is built with FastAPI and stores image metadata in a SQLite database. The React front end displays a random image and lets you swipe or click to load the next one. Each view is recorded so you can track which images have been seen.

## Preview the project

1. **Install Python dependencies**
   ```bash
   pip install fastapi uvicorn sqlalchemy python-dotenv
   ```
2. **Initialize the database and import images**
   ```bash
   export DB_PATH=./data/database/db.sqlite3
   export IMAGE_DIR=./data/images
   python src/script/init_db.py
   python src/script/import_images.py
   ```
   Place any images you want to display inside `data/images` before running the import script.
3. **Start the backend**
   ```bash
   uvicorn src.backend.main:app --reload
   ```
4. **Install and run the frontend**
   ```bash
   cd src/frontend
   npm install
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser to preview the gallery.

## Project structure
- `src/backend` – FastAPI application and database models
- `src/frontend` – React client built with Vite and Tailwind
- `src/script` – Helper scripts to initialize and populate the database

See `AGENTS.md` for repository best practices.
