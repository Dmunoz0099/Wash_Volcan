# 🚀 Deploy a GitHub + Vercel

Guía para subir tu proyecto a GitHub y desplegarlo en Vercel.

---

## **PARTE 1: Preparar Git Local**

### **1. Inicializar o verificar Git**

```bash
cd C:\Users\dmuno\Documents\volcan_carwash
git status
```

Si ves `fatal: not a git repository`, inicializa:
```bash
git init
```

---

### **2. Verificar que `.env` NO esté en el repositorio**

Verifica que tu `.gitignore` contiene `.env`:
```bash
cat .gitignore
```

Deberías ver `.env` en la lista (ya lo agregamos).

---

### **3. Agregar y Commit de todos los cambios**

```bash
git add .
git commit -m "Configurar Supabase, preparar para deploy"
```

O especifica solo los archivos importantes:
```bash
git add backend/ frontend/ .gitignore SETUP_SUPABASE.md DEPLOY_GITHUB_VERCEL.md
git commit -m "Configurar Supabase, preparar para deploy"
```

---

## **PARTE 2: Crear Repositorio en GitHub**

### **1. Ve a GitHub**

- Ve a https://github.com (inicia sesión o crea cuenta)
- Haz clic en **"New"** (botón verde arriba a la derecha)

---

### **2. Crear repositorio**

Completa así:
- **Repository name**: `volcan-carwash`
- **Description**: `App de reservas para lavado de autos`
- **Visibility**: `Public` (o `Private` si prefieres)
- **Initialize this repository with**: ✅ DESACTIVA TODAS las opciones

Haz clic en **"Create repository"**

---

### **3. Agregar repositorio remoto a tu Git local**

GitHub te mostrará una pantalla con comandos. Ejecuta:

```bash
git remote add origin https://github.com/TU_USUARIO/volcan-carwash.git
git branch -M main
git push -u origin main
```

Reemplaza `TU_USUARIO` con tu usuario de GitHub.

---

### **4. Verifica que está en GitHub**

Recarga la página de GitHub. Deberías ver tus archivos! ✅

---

## **PARTE 3: Deploy en Vercel**

### **1. Ve a Vercel**

- Ve a https://vercel.com
- Haz clic en **"Sign Up"** o inicia sesión con GitHub

---

### **2. Conectar repositorio**

1. Haz clic en **"Import Project"**
2. Selecciona **"Import Git Repository"**
3. Pega: `https://github.com/TU_USUARIO/volcan-carwash`
4. Haz clic en **"Continue"**

---

### **3. Configurar el proyecto**

En la página de configuración:

**Framework**: `Other` (selecciona esto)

**Root Directory**: 
- Para el **backend**: cambia a `./backend`
- Para el **frontend**: cambia a `./frontend`

⚠️ **Necesitarás hacer DOS deploys: uno para backend, otro para frontend**

---

### **4. Variables de Entorno (IMPORTANTE)**

Aquí es donde añades tus credenciales de Supabase **sin subirlas a GitHub**:

Haz clic en **"Environment Variables"** y agrega:

```
SUPABASE_URL = https://ybkenzbjzeeksiqmlxzf.supabase.co
SUPABASE_KEY = sb_publishable_nVJHMMxXS2YyzTE1C9_iTA_Kh4nDliM
EMAIL_USER = Javierperedaflair@gmail.com
EMAIL_PASSWORD = yapg nbol czmp fejd
OWNER_EMAIL = Javierperedaflair@gmail.com
```

---

### **5. Configurar Build**

Para **Backend**:
- **Build Command**: `npm install`
- **Output Directory**: `.`
- **Install Command**: `npm install`

Para **Frontend**:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

### **6. Deploy**

Haz clic en **"Deploy"** ✅

Vercel comenzará a desplegar. Espera unos minutos.

---

## **PARTE 4: Verificar que todo funciona**

Una vez desplegado:

### **Backend en Vercel:**
Vercel te dará una URL como:
```
https://volcan-carwash-backend.vercel.app
```

Abre en tu navegador:
```
https://volcan-carwash-backend.vercel.app/api/reservas
```

Deberías ver un JSON con las reservas (si las insertaste en Supabase).

### **Frontend en Vercel:**
Vercel te dará una URL como:
```
https://volcan-carwash-frontend.vercel.app
```

Abre y debería verse tu app React.

---

## **PARTE 5: Actualizar la API en Frontend (IMPORTANTE)**

Si tu frontend hace llamadas a la API local, necesitas actualizar las URLs:

En `frontend/src/App.jsx` (o donde hagas fetch):

❌ **Cambiar ESTO:**
```javascript
const response = await fetch('http://localhost:3001/api/reservas');
```

✅ **A ESTO:**
```javascript
const response = await fetch('https://volcan-carwash-backend.vercel.app/api/reservas');
```

O mejor aún, usa una variable de entorno en Vercel:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const response = await fetch(`${API_URL}/api/reservas`);
```

Luego en Vercel, agrega:
```
REACT_APP_API_URL = https://volcan-carwash-backend.vercel.app
```

---

## **⚠️ PROBLEMAS COMUNES**

### **Error: "no such file or directory"**
- Verifica que el **Root Directory** sea correcto (`./backend` o `./frontend`)

### **Error: "Cannot find module"**
- Verifica que `package.json` esté en la carpeta correcta
- Verifica que `npm install` está en **Build Command**

### **Frontend no puede llamar a Backend**
- Asegúrate que la URL del API sea la de Vercel, no `localhost:3001`

### **500 Error en Backend**
- Verifica que las variables de entorno estén en Vercel
- Verifica que Supabase esté activo y las credenciales sean correctas

---

## **✅ Resumen de URLs después del deploy**

| Parte | URL | Ejemplo |
|-------|-----|---------|
| Backend API | Tu URL de Vercel | `https://volcan-carwash-backend.vercel.app` |
| Frontend App | Tu URL de Vercel | `https://volcan-carwash-frontend.vercel.app` |
| Base de Datos | Supabase | `https://ybkenzbjzeeksiqmlxzf.supabase.co` |

---

**¡Listo! Tu app está en producción!** 🎉
