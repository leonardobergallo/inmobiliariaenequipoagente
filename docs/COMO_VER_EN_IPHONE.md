# 📱 Cómo Ver la App en tu iPhone

## 🚀 Opción 1: Desde Vercel (Recomendado)

### Paso 1: Obtén la URL de Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Busca tu proyecto **"inmobiliariaenequipoagente"**
3. Verás una URL como: `https://inmobiliariaenequipoagente.vercel.app`
   - O puede ser: `https://inmobiliariaenequipoagente-xxxxx.vercel.app`
4. **Copia esa URL**

### Paso 2: Abre en tu iPhone

1. **Abre Safari** en tu iPhone (⚠️ IMPORTANTE: debe ser Safari, no Chrome)
2. **Pega la URL** de Vercel en la barra de direcciones
3. **Presiona "Ir"** o Enter
4. ¡La app debería cargar!

### Paso 3: Instala como App (Opcional)

1. Toca el botón **Compartir** 📤 (cuadrado con flecha arriba)
2. Desplázate hacia abajo
3. Toca **"Agregar a pantalla de inicio"**
4. Personaliza el nombre si quieres
5. Toca **"Agregar"**
6. ¡Listo! La app aparecerá como icono en tu pantalla de inicio

---

## 🏠 Opción 2: Desde tu Computadora (Desarrollo Local)

### Paso 1: Inicia el servidor

```bash
npm run dev
```

Verás algo como:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.XXX:5173/
```

### Paso 2: Encuentra tu IP

1. En Windows, abre PowerShell
2. Ejecuta: `ipconfig`
3. Busca **"IPv4"** → algo como `192.168.1.XXX`
4. **Copia esa IP**

### Paso 3: Abre en tu iPhone

1. Asegúrate de que tu iPhone y tu PC estén en la **misma red WiFi**
2. Abre **Safari** en tu iPhone
3. Escribe: `http://TU-IP:5173` (reemplaza TU-IP con tu IP)
   - Ejemplo: `http://192.168.1.100:5173`
4. ¡La app debería cargar!

---

## ✅ Verificar que Funciona

- ✅ La app carga sin errores
- ✅ Puedes navegar entre páginas
- ✅ Los iconos se ven correctamente
- ✅ El diseño se adapta al móvil

---

## 🐛 Problemas Comunes

### "No puedo acceder desde Vercel"
- Verifica que el deploy se completó correctamente
- Revisa los logs en Vercel
- Espera unos minutos (a veces tarda en propagarse)

### "No carga en mi iPhone"
- Verifica que estás usando **Safari** (no Chrome)
- Asegúrate de que la URL es correcta
- Verifica tu conexión a internet

### "No aparece 'Agregar a pantalla de inicio'"
- Debes usar **Safari** (no otros navegadores)
- La URL debe ser **HTTPS** (Vercel lo tiene automáticamente)
- En desarrollo local, iOS no permite instalar PWAs sin HTTPS

---

## 📱 Requisitos

- ✅ iPhone con iOS 11.3 o superior
- ✅ Safari (no Chrome ni otros navegadores)
- ✅ Conexión a internet
- ✅ Para instalar: HTTPS (Vercel lo tiene)

---

## 🎯 Resumen Rápido

1. **Vercel**: Ve a vercel.com → Copia la URL → Ábrela en Safari en tu iPhone
2. **Local**: `npm run dev` → Copia la IP → `http://TU-IP:5173` en Safari

¡Listo! 🚀

