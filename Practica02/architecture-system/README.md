# Arquitectura del sistema móvil Flutter

**Visualiza el diagrama:** [Abrir arquitectura interactiva en GitHub Pages](https://edgar-cbr.github.io/Practicas_Integradora_230496/Practica02/architecture-system/architecture-system.html)

![Diagrama](/Practica02/architecture-system/architecture-system.visual-check.2048x1320.dark.png)

## Descripción del diagrama

El diagrama representa una arquitectura inicial para una aplicación móvil desarrollada con Flutter. La aplicación cliente se comunica por HTTPS con una API REST construida con FastAPI. La autenticación se gestiona mediante Keycloak: el cliente inicia sesión y obtiene tokens, y la API valida esos tokens antes de atender las solicitudes.

FastAPI conecta con dos almacenes según el tipo de información: PostgreSQL para datos relacionales y MongoDB para documentos. La aplicación también consume un servicio externo de mapas basado en Leaflet. El esquema distingue los límites de confianza de la aplicación y los datos, los servicios externos de identidad y mapas, y las herramientas de control de versiones.

Para el desarrollo y la ejecución local se muestran Docker y Docker Compose; para el control de cambios, Git y GitHub. Las vistas interactivas permiten explorar el recorrido de ejecución de la aplicación, el entorno de desarrollo y los límites de confianza entre el cliente, la API, los datos y los servicios externos.
