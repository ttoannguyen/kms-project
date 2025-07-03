# Star Farm Project

A platform that allows experts to easily store documents and automatically generate formatted files for input into [Dataverse](https://CTU.EDU.VN/).

## 📦 Features

- Expert-friendly document management
- Auto-generation of standardized files
- Integration with Dataverse via API
- Fullstack app (React + Express)
- Redis caching for performance

---

## 🛠 Environment Variables

### Backend (`.env`)

```env
DB_PORT=5432                             # PostgreSQL database port
API_BASE_URL=http://localhost:3000/api  # Base URL for backend API
REDIS_URL=redis://localhost:6379        # Redis connection URL
DATAVERSE_BASE_URL=https://demo.dataverse.org/api  # Dataverse server URL
```

### Frontend (`.env`)

```env
VITE_API_BASE_URL=http://localhost:3000/api  # Pointing to backend API
```
