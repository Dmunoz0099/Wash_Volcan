# 🗄️ Setup Supabase - Volcán Wash

Guía paso a paso para configurar la base de datos en Supabase.

---

## **1. Crear Proyecto en Supabase**

1. Ve a https://supabase.com
2. Haz clic en **"New Project"** (o inicia sesión si es necesario)
3. Completa los datos:
   - **Project name**: `volcan-wash`
   - **Database password**: Crea una contraseña segura (guárdala)
   - **Region**: Selecciona el más cercano (ej: `us-east-1`)
4. Haz clic en **Create New Project**
5. Espera 2-3 minutos a que se cree

---

## **2. Obtener Credenciales**

Una vez creado el proyecto:

### **SUPABASE_URL:**
1. Ve a **Settings → API** (en el menú izquierdo)
2. Copia **Project URL** 
3. Guárdalo en tu `.env` como `SUPABASE_URL`

### **SUPABASE_KEY:**
1. En **Settings → API**, busca **"Project API keys"**
2. Copia la **`anon` public key** (la primera)
3. Guárdalo en tu `.env` como `SUPABASE_KEY`

---

## **3. Crear Tablas**

1. En Supabase, ve a **SQL Editor** (menú izquierdo)
2. Haz clic en **"New Query"**
3. Copia y pega este SQL:

```sql
CREATE TABLE reservas (
  id BIGSERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  telefono TEXT NOT NULL,
  email TEXT NOT NULL,
  servicio TEXT NOT NULL,
  tipo_vehiculo TEXT NOT NULL,
  adicionales TEXT DEFAULT '',
  fecha TEXT NOT NULL,
  hora TEXT NOT NULL,
  direccion TEXT NOT NULL,
  precio_total INTEGER NOT NULL,
  estado TEXT DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE horarios_bloqueados (
  id BIGSERIAL PRIMARY KEY,
  fecha TEXT NOT NULL,
  hora TEXT NOT NULL,
  UNIQUE(fecha, hora)
);

CREATE INDEX idx_reservas_fecha ON reservas(fecha);
CREATE INDEX idx_reservas_hora ON reservas(hora);
```

4. Haz clic en **▶ Run** (o Ctrl+Enter)

---

## **4. Insertar Datos de Ejemplo (OPCIONAL - para testing)**

1. En **SQL Editor**, haz clic en **"New Query"**
2. Abre el archivo `backend/sample-data.sql` en tu editor
3. Copia TODO el contenido
4. Pega en la query de Supabase
5. Haz clic en **▶ Run**

Esto insertará 10 reservas de ejemplo y horarios bloqueados para testear.

---

## **5. Configurar Variables de Entorno**

1. Abre `backend/.env`
2. Completa:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your-anon-public-key
   ```
3. Guarda el archivo

---

## **6. Instalar Dependencias**

Desde la carpeta `backend/`:

```bash
npm install
```

---

## **7. Testear la Conexión**

1. Inicia el servidor:
   ```bash
   npm run dev
   ```

2. Abre en tu navegador:
   ```
   http://localhost:3001/api/reservas
   ```

3. Deberías ver un JSON con las reservas (vacío o con datos si insertaste ejemplos)

---

## **8. (OPCIONAL) Row Level Security (RLS)**

Para producción, es recomendable habilitar RLS:

1. En Supabase, ve a **Authentication → Policies**
2. Habilita RLS en las tablas
3. Crea políticas según tus necesidades de acceso

---

## **Troubleshooting**

### ❌ Error: `SUPABASE_URL y SUPABASE_KEY son requeridas`
- Verifica que el `.env` tenga las variables correctas
- No hay espacios extras alrededor del `=`

### ❌ Error: `Failed to connect to database`
- Verifica que `SUPABASE_URL` sea correcto (termina en `.supabase.co`)
- Verifica que `SUPABASE_KEY` sea la clave **public** (anon), no la secret

### ❌ No aparecen datos en `/api/reservas`
- Ejecuta el `sample-data.sql` en Supabase
- Verifica que las tablas existan en **SQL Editor**

### ❌ Error: `table "reservas" does not exist`
- Ejecuta nuevamente el SQL de creación de tablas
- Verifica que no haya errores en la query

---

## **Próximos Pasos**

1. ✅ Backend funciona con Supabase
2. 📱 Conectar frontend a la API (si aún no lo has hecho)
3. 🚀 Deploy en Vercel
4. 🔒 Implementar autenticación (si es necesario)

---

**¿Problemas?** Revisa los logs en `backend/` y la consola de Supabase → **Logs** para errores.
