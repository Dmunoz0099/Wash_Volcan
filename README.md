# 🚗 Volcán Wash - Sistema de Reservas

App web para gestionar reservas de lavado de autos con frontend en React y backend en Express.js + Supabase.

---

## 📁 Estructura del Proyecto

```
volcan_carwash/
├── backend/              # API Express.js
│   ├── server.js        # Servidor principal
│   ├── database.js      # Conexión Supabase
│   ├── email.js         # Envío de emails
│   ├── package.json
│   └── .env             # Variables de entorno (NO SUBIR A GIT)
│
├── frontend/            # App React
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── components/
│   ├── package.json
│   └── vite.config.js
│
├── SETUP_SUPABASE.md              # Guía de configuración Supabase
├── DEPLOY_GITHUB_VERCEL.md        # Guía de deploy
├── vercel.json                    # Configuración Vercel
├── .gitignore                     # Archivos a ignorar en Git
└── README.md                      # Este archivo
```

---

## 🚀 Quick Start

### **1. Instalar dependencias**

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### **2. Configurar Supabase**

1. Ve a https://supabase.com y crea un proyecto
2. Copia tu `SUPABASE_URL` y `SUPABASE_KEY`
3. Crea las tablas ejecutando el SQL en `SETUP_SUPABASE.md`
4. Actualiza `backend/.env` con tus credenciales

---

### **3. Ejecutar localmente**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

- Backend: http://localhost:3001
- Frontend: http://localhost:5173

---

## 📊 Base de Datos (Supabase)

### **Tablas**

**`reservas`**
```sql
id (PK), nombre, telefono, email, servicio, tipo_vehiculo, 
adicionales, fecha, hora, direccion, precio_total, estado, created_at
```

**`horarios_bloqueados`**
```sql
id (PK), fecha, hora
```

---

## 🔧 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/horarios-disponibles?fecha=YYYY-MM-DD` | Horarios disponibles |
| GET | `/api/reservas` | Listar reservas |
| POST | `/api/reservas` | Crear reserva |
| PATCH | `/api/reservas/:id` | Actualizar estado |

---

## 📧 Funcionalidades

- ✅ Reservar horarios de lavado
- ✅ Ver disponibilidad en tiempo real
- ✅ Notificaciones por email (cliente + propietario)
- ✅ Gestión de horarios bloqueados (mantenimiento)
- ✅ Estados de reserva (pendiente, confirmada, completada, cancelada)

---

## 🌐 Deploy

### **GitHub**
```bash
git add .
git commit -m "Deploy inicial"
git push origin main
```

### **Vercel**
Ver `DEPLOY_GITHUB_VERCEL.md` para instrucciones completas.

URLs después del deploy:
- Backend: `https://volcan-carwash-backend.vercel.app`
- Frontend: `https://volcan-carwash-frontend.vercel.app`

---

## ⚙️ Variables de Entorno

**Backend (`backend/.env`)**
```env
SUPABASE_URL=https://...supabase.co
SUPABASE_KEY=sb_publishable_...
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
OWNER_EMAIL=owner@gmail.com
PORT=3001
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:3001
```

---

## 🐛 Troubleshooting

### Conexión a Supabase fallida
- Verifica `SUPABASE_URL` y `SUPABASE_KEY` en `.env`
- Asegúrate de usar la clave `anon` (pública), no `service_role`

### Frontend no conecta con Backend
- En desarrollo: usa `http://localhost:3001`
- En producción: usa la URL de Vercel del backend

### Emails no se envían
- Habilita "contraseñas de aplicación" en Gmail
- Verifica `EMAIL_USER` y `EMAIL_PASSWORD` en `.env`

---

## 📝 Licencia

MIT

---

**¿Preguntas?** Revisa los archivos `.md` en la raíz del proyecto.
