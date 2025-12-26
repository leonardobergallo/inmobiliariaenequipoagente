# 🔄 Cambiar Nombre del Repositorio en GitHub

## 📋 Pasos para Cambiar el Nombre

### 1. En GitHub (Web)

1. **Ve a tu repositorio**: https://github.com/leonardobergallo/inmobiliariaenequipo
2. **Haz clic en "Settings"** (Configuración) - está en la parte superior del repositorio
3. **Desplázate hacia abajo** hasta la sección **"Repository name"**
4. **Cambia el nombre** de `inmobiliariaenequipo` a `inmobiliariaenequipoagente`
5. **Haz clic en "Rename"** (Renombrar)
6. **Confirma** el cambio

### 2. Actualizar Remote Local (Después del cambio)

Después de cambiar el nombre en GitHub, ejecuta:

```bash
git remote set-url origin https://github.com/leonardobergallo/inmobiliariaenequipoagente.git
```

O si prefieres SSH:
```bash
git remote set-url origin git@github.com:leonardobergallo/inmobiliariaenequipoagente.git
```

### 3. Verificar

```bash
git remote -v
```

Deberías ver la nueva URL.

## ⚠️ Notas Importantes

- ✅ **Las URLs antiguas seguirán funcionando** (GitHub redirige automáticamente)
- ✅ **No se pierden datos** al cambiar el nombre
- ✅ **Vercel se actualizará automáticamente** si está conectado
- ⚠️ **Actualiza cualquier referencia** al nombre antiguo en documentación

## 🔗 URL Nueva

Después del cambio, la nueva URL será:
- **Web**: https://github.com/leonardobergallo/inmobiliariaenequipoagente
- **Clone**: `https://github.com/leonardobergallo/inmobiliariaenequipoagente.git`

