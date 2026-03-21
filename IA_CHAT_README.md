# 🤖 IA Chat - Página Protegida

Esta es una página privada accesible solo con contraseña en `pablomachado.dev/ia`

## Características

- 🔒 **Protección por contraseña**: Solo accesible con la contraseña maestra
- 🤖 **Integración con Kimi 2.5**: Usa la API de Moonshot AI
- 💾 **Persistencia local**: Los mensajes se guardan en localStorage
- 📥 **Exportación a Markdown**: Descarga tu conversación como archivo .md
- ⚙️ **Prompt de sistema configurable**: Personaliza el comportamiento de la IA
- 🎨 **Diseño oscuro**: Interfaz minimalista con fondo negro
- 🤫 **Sin enlaces públicos**: No hay acceso desde la página principal

## Configuración

### Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
KIMI_API_KEY=tu_api_key_de_moonshot
```

Obtén tu API key en: https://platform.moonshot.cn/

### Contraseña

La contraseña está hardcodeada en el archivo `pages/ia.tsx` (línea 19). Es la contraseña larga que proporcionaste.

## Despliegue

Esta página requiere un servidor Node.js porque usa API routes de Next.js. No funciona con exportación estática.

### Opciones de hosting recomendadas:

1. **Vercel** (recomendado): `vercel --prod`
2. **Railway**: Conecta tu repo y despliega
3. **Render**: Servicio web con Node.js
4. **Servidor propio**: `npm run build && npm start`

### Construcción local:

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## Uso

1. Ve a `pablomachado.dev/ia`
2. Ingresa la contraseña
3. ¡Comienza a chatear con Kimi!

### Funcionalidades:

- **Enter**: Enviar mensaje
- **Shift + Enter**: Nueva línea
- **⚙️ Configuración**: Define el prompt del sistema
- **💾 Exportar**: Descarga la conversación como .md
- **🗑️ Borrar**: Limpia todo el historial

## Seguridad

- ✅ La API key nunca se expone al cliente
- ✅ La contraseña se verifica solo en el cliente (para esta implementación simple)
- ✅ La página tiene `noindex, nofollow` para evitar indexación
- ✅ Sin enlaces desde la página principal

## Notas

- Los datos se guardan en el navegador (localStorage)
- Si cambias de navegador o dispositivo, perderás el historial
- Usa la función de exportar para hacer backup de conversaciones importantes
