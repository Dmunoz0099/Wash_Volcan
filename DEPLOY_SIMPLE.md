# 🚀 Deploy Simple - Todo Junto en UN Proyecto Vercel

Ahora tu app funciona como UN SOLO proyecto: Backend + Frontend juntos.

---

## **Cómo Funciona Ahora**

```
┌─────────────────────────────────┐
│     VERCEL (UN PROYECTO)        │
│                                 │
│  Backend (Express.js)           │
│  + Frontend (React, compilado)  │
│                                 │
│  URL: https://volcan-carwash.vercel.app
└─────────────────────────────────┘
```

**Flujo:**
1. Vercel instala dependencias del backend: `npm install`
2. Backend ejecuta script `postinstall` que compila el frontend
3. Backend sirve archivos estáticos del frontend (dist/)
4. TODO en un solo URL

---

## **Paso 1: Actualizar el Frontend para API**

En `frontend/src/App.jsx` (o donde hagas fetch a la API):

### ❌ Cambiar ESTO:
```javascript
const API_URL = 'http://localhost:3001';
const response = await fetch(`${API_URL}/api/reservas`);
```

### ✅ A ESTO:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const response = await fetch(`${API_URL}/api/reservas`);
```

O más simple, en desarrollo usa localhost y en producción usa el mismo URL base:

```javascript
// Usar la URL relativa (automáticamente usa el mismo dominio)
const response = await fetch('/api/reservas');
```

---

## **Paso 2: Commit a GitHub**

```bash
cd C:\Users\dmuno\Documents\volcan_carwash

git add .
git commit -m "Configurar deploy único: backend sirve frontend compilado"
git push origin main
```

---

## **Paso 3: Deploy en Vercel**

1. Ve a https://vercel.com/dashboard
2. Haz clic en **"Add New..."** → **"Project"**
3. Selecciona tu repositorio: `volcan-carwash`
4. En la página de configuración:

### **Framework**: `Other`

### **Root Directory**: 
- Déjalo en `.` (raíz) o cámbialo a `./backend`
- Vercel detectará automáticamente los scripts

### **Build Command**: 
- Vercel debería detectar automáticamente: `npm run build`
- Si no, déjalo en blanco (usará el default)

### **Output Directory**: 
- Déjalo vacío (no es necesario en este caso)

### **Environment Variables**: Agrega estas:
```
SUPABASE_URL = https://ybkenzbjzeeksiqmlxzf.supabase.co
SUPABASE_KEY = sb_publishable_nVJHMMxXS2YyzTE1C9_iTA_Kh4nDliM
EMAIL_USER = Javierperedaflair@gmail.com
EMAIL_PASSWORD = yapg nbol czmp fejd
OWNER_EMAIL = Javierperedaflair@gmail.com
PORT = 3000
```

⚠️ **Nota:** En Vercel, cambia `PORT` a `3000` (no `3001`)

---

## **Paso 4: Deploy**

1. Haz clic en **"Deploy"**
2. Espera a que termine (3-5 minutos)
3. Vercel te dará una URL como:
   ```
   https://volcan-carwash.vercel.app
   ```

---

## **Verificar que Funciona**

Una vez deployed:

### **API:**
```
https://volcan-carwash.vercel.app/api/reservas
```
Debería mostrar un JSON con las reservas de Supabase.

### **Frontend:**
```
https://volcan-carwash.vercel.app
```
Debería mostrar tu app React.

---

## **Desarrollo Local**

Cuando estés desarrollando:

### **Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

### **Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Luego:
- Backend: http://localhost:3001
- Frontend: http://localhost:5173

El frontend llamará a `http://localhost:3001/api/...`

---

## **Estructura Ahora**

```
volcan_carwash/
├── backend/
│   ├── server.js          ← AHORA SIRVE LA APP REACT
│   ├── package.json       ← Con script "build"
│   └── ...
├── frontend/
│   ├── src/
│   ├── dist/              ← Se genera automáticamente
│   └── package.json
├── vercel.json            ← Configuración simple
└── ...
```

---

## **Si Algo Sale Mal**

### ❌ Error: "Cannot find module ../frontend/dist"
- El build del frontend no se ejecutó
- Verificar que npm install corrió: `npm install` en el backend
- Verificar que el frontend compila: `cd frontend && npm run build`

### ❌ Error: "Cannot GET /"
- El archivo index.html no está en el lugar correcto
- Verifica que `frontend/dist/index.html` existe

### ❌ 500 Error en API
- Verifica las Environment Variables en Vercel
- Verifica que Supabase esté funcionando

---

## ✅ Listo!

Tu app está desplegada en UN SOLO URL. Frontend + Backend juntos. 🎉

**URL Final:** `https://volcan-carwash.vercel.app`
