# PHISHBLOCKER Security Analyzer

Plataforma de análisis de seguridad inspirada en terminales tácticas de hackers profesionales. Analiza URLs maliciosas y archivos sospechosos en busca de amenazas mediante heurísticas y reglas de entropía/MIME.

## Características

- 🔒 **Frontend Brutalista (React/Vite)**: Diseño único asimétrico que imita una terminal hacker.
- ⚙️ **Backend FastAPI**: Arquitectura asíncrona de alto rendimiento.
- 🗄️ **Base de datos SQLite + SQLAlchemy**: Almacena historiales con persistencia total.
- 📜 **Alembic Migrations**: Control de esquemas de bases de datos.

## Prerrequisitos

- **Node.js** (v18 o superior)
- **Python** (v3.10 o superior)

## Instalación Paso a Paso

1. **Clonar/Abrir el Repositorio**
   Navega a la carpeta principal `security-analyzer/`.

2. **Configuración del Backend (Python)**
   Abre una terminal y dirígete a `backend/`:
   \`\`\`bash
   cd backend
   python -m venv venv
   
   # Activar en Windows (Powershell):
   .\\venv\\Scripts\\activate
   
   # Activar en Linux/Mac:
   source venv/bin/activate
   
   # Instalar dependencias
   pip install -r requirements.txt
   \`\`\`

3. **Configuración del Frontend (React + Vite)**
   Abre otra terminal y dirígete a `frontend/`:
   \`\`\`bash
   cd frontend
   npm install
   \`\`\`

## Base de Datos y Migraciones

La base de datos utiliza SQLite (`security_analyzer.db`).

Para inicializar las tablas utilizando **Alembic**:
(Asegúrate de estar en el directorio `backend` con tu entorno virtual activado)

\`\`\`bash
alembic upgrade head
\`\`\`

Si necesitas generar una migración adicional por cambios en `models.py`:
\`\`\`bash
alembic revision --autogenerate -m "Descripción"
alembic upgrade head
\`\`\`

### Poblar la base de datos con datos de prueba
\`\`\`bash
python seed.py
\`\`\`

## Cómo Arrancar la Plataforma

Necesitas ejecutar dos procesos concurrentes en terminales separadas.

**1. Levantar el Backend:**
Desde la carpeta `backend/` con el entorno virtual activado:
\`\`\`bash
uvicorn main:app --reload
\`\`\`
El API correrá en `http://localhost:8000`.

**2. Levantar el Frontend:**
Desde la carpeta `frontend/`:
\`\`\`bash
npm run dev
\`\`\`
Accede a la URL indicada (usualmente `http://localhost:5173`).

## Configuración Opcional (VirusTotal)

Actualmente, el backend hace uso de análisis heurísticos en el código local. Sin embargo, la API está preparada para integrarse con VirusTotal. Puedes modificar las funciones en `analyzer.py` para usar el parámetro `virustotal_api_key`. Para implementarlo a nivel global, podrías agregar la API Key en un archivo `.env` dentro de `backend/` e inyectarla donde sea necesario.
