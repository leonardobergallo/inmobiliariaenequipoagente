# 🔍 Diagnóstico: App No Se Ve en iPhone

## ✅ Verificaciones Rápidas

### 1. ¿Estás usando Safari?
- ❌ **Chrome/Firefox no funcionan** para instalar PWAs en iOS
- ✅ **Solo Safari** puede instalar PWAs en iPhone

### 2. ¿La URL es HTTPS?
- ✅ Vercel proporciona HTTPS automáticamente
- Verifica que la URL empiece con `https://`

### 3. ¿Hay errores en la consola?
1. Abre Safari en tu iPhone
2. Ve a la URL de Vercel
3. Toca el botón "Compartir" → "Mostrar código fuente"
4. O usa Safari en Mac con "Desarrollador" → "iPhone" conectado

---

## 🐛 Problemas Comunes y Soluciones

### Problema: Pantalla en Blanco

**Causas posibles:**
1. Error de JavaScript bloqueando la carga
2. Service Worker bloqueando recursos
3. Problema con localStorage

**Solución:**
1. **Limpiar cache y Service Worker:**
   - Safari → Ajustes → Safari → "Limpiar historial y datos de sitios web"
   - O mantén presionado el botón de recargar → "Limpiar cache"

2. **Verificar en modo incógnito:**
   - Abre Safari en modo privado
   - Ve a la URL
   - Si funciona, es un problema de cache

3. **Desactivar Service Worker temporalmente:**
   - Safari → Ajustes → Avanzado → "Activar JavaScript" (debe estar activado)
   - No hay forma fácil de desactivar SW en iOS, pero limpiar cache ayuda

---

### Problema: "No se puede conectar"

**Causas posibles:**
1. Problema de red
2. URL incorrecta
3. Vercel no ha terminado el deploy

**Solución:**
1. Verifica tu conexión a internet
2. Verifica que la URL sea correcta
3. Espera 1-2 minutos después del deploy
4. Intenta desde otra red (WiFi vs datos móviles)

---

### Problema: "La página no responde"

**Causas posibles:**
1. JavaScript bloqueado
2. Error en el código
3. Problema con el Service Worker

**Solución:**
1. **Verificar JavaScript:**
   - Safari → Ajustes → Safari → "Activar JavaScript" (debe estar ON)

2. **Limpiar todo:**
   - Safari → Ajustes → Safari → "Limpiar historial y datos de sitios web"
   - Reinicia Safari

3. **Probar en otro dispositivo:**
   - Si funciona en otro dispositivo, es problema específico del iPhone

---

## 🔧 Pasos de Diagnóstico

### Paso 1: Verificar que la App Carga
1. Abre Safari en tu iPhone
2. Ve a la URL de Vercel
3. Deberías ver:
   - Una pantalla de carga (spinner)
   - Luego el onboarding o login

### Paso 2: Verificar Errores
1. Si ves pantalla en blanco:
   - Toca y mantén presionado el botón de recargar
   - Selecciona "Limpiar cache y recargar"

2. Si sigue sin funcionar:
   - Abre Safari en modo privado
   - Ve a la URL
   - Si funciona, es problema de cache

### Paso 3: Verificar Service Worker
1. La app debería funcionar incluso si el SW falla
2. Si no carga nada, puede ser un error de JavaScript

---

## 📱 Cómo Probar en iPhone

### Opción 1: Desde Safari en iPhone
1. Abre Safari
2. Ve a la URL de Vercel
3. Debería cargar automáticamente

### Opción 2: Desde Safari en Mac (con iPhone conectado)
1. Conecta tu iPhone a tu Mac
2. En Mac: Safari → Desarrollador → [Tu iPhone]
3. Abre la URL en el iPhone
4. En Mac puedes ver la consola de errores

### Opción 3: Usar Herramientas de Desarrollo
1. En Mac: Safari → Preferencias → Avanzado → "Mostrar menú Desarrollador"
2. Conecta iPhone
3. Safari → Desarrollador → [Tu iPhone] → [URL]
4. Verás errores en la consola

---

## ✅ Checklist de Verificación

- [ ] Estás usando **Safari** (no Chrome)
- [ ] La URL es **HTTPS** (no HTTP)
- [ ] JavaScript está **activado** en Safari
- [ ] Has **limpiado el cache** de Safari
- [ ] Has esperado **1-2 minutos** después del deploy
- [ ] La conexión a internet **funciona**
- [ ] Has probado en **modo privado**
- [ ] Has probado en **otro dispositivo**

---

## 🚨 Si Nada Funciona

### Último Recurso: Reinstalar
1. **Elimina la app instalada** (si está instalada)
2. **Limpia todo el cache:**
   - Safari → Ajustes → Safari → "Limpiar historial y datos de sitios web"
3. **Reinicia el iPhone**
4. **Vuelve a abrir Safari**
5. **Ve a la URL de Vercel**
6. **Instala de nuevo**

---

## 📞 Información para Reportar

Si necesitas ayuda, proporciona:

1. **Modelo de iPhone:** (ej: iPhone 13, iPhone 14 Pro)
2. **Versión de iOS:** (Ajustes → General → Acerca de)
3. **Versión de Safari:** (misma ubicación)
4. **Mensaje de error:** (si hay alguno)
5. **Qué ves:** (pantalla en blanco, error, etc.)
6. **URL exacta:** (la que estás usando)

---

## 💡 Tips Adicionales

1. **Primera carga puede ser lenta:** Espera 10-15 segundos
2. **Service Worker puede tardar:** Primera vez tarda más en registrar
3. **Cache puede causar problemas:** Limpia cache regularmente durante desarrollo
4. **Prueba en modo privado:** Ayuda a identificar problemas de cache

---

**¿Sigue sin funcionar?** Verifica los logs de Vercel para ver si hay errores en el build o deploy.

