# FormServices

**FormServices** es un servicio minimalista en Node.js para recibir formularios con información personal y subir archivos (PDF/DOC) del currículum de los usuarios. Las respuestas se almacenan en una base de datos PostgreSQL y los archivos se guardan en el servidor, accesibles mediante un enlace de descarga.

## Características

- Recepción de formularios con:
  - Nombre completo
  - Teléfono celular
  - Correo electrónico
  - Archivo (PDF/DOC) para el currículum
- Almacenamiento de datos en PostgreSQL
- Almacenamiento de archivos en el servidor con enlaces de descarga

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/tu_usuario/FormServices.git
   cd FormServices
