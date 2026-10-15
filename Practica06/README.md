# Práctica 06 – Diagrama de Secuencia de Pantallas (Sketches) de Netflix con 2 Roles

En continuidad con la **Práctica 03** (Business Model Canvas de Netflix), en esta práctica se diseñó e implementó el **Diagrama de Secuencia de Pantallas (Sketches)** interactivo de la aplicación móvil de **Netflix** considerando **2 roles principales**: **Espectador** (consumo, búsqueda y reproducción) y **Productor / Estudio** (Netflix Studio Hub y analítica de audiencia), generado con **Archify**. Cada pantalla es clicable y abre un panel lateral accesible con su propósito, elementos de interfaz y acción siguiente.

**[Ver el diagrama en GitHub Pages](https://edgar-cbr.github.io/Practicas_Integradora_230496/Practica06/netflix-secuencia-pantallas.html)**

### Diagrama de Secuencia de Pantallas - Netflix
![Vista previa del diagrama de secuencia de pantallas](/Practica06/netflix-secuencia-pantallas.visual-check.2048x1320.dark.png)

### Nota académica

Este trabajo es un ejercicio académico para la materia de **Integradora**. Los bocetos son wireframes de baja fidelidad y **no son las pantallas oficiales** de Netflix; el logotipo es una creación original en SVG inspirada en cintas cinematográficas de streaming, sin afiliación oficial con Netflix Inc. Solo se usó la paleta de colores y la arquitectura de navegación como referencia.

## Netflix <p align="center">
  <img src="/images/Netflix_App_Logo.svg" alt="Logotipo propio inspirado en Netflix" width="80" height="80">
</p>

Netflix es una plataforma multiplataforma de streaming bajo demanda. Con base en el modelo Canvas desarrollado en la **Práctica 03**, se identificaron dos recorridos complementarios:
1. **Espectador**: Ingresa mediante su perfil personal, navega por el catálogo y cartelera (Billboard), realiza búsquedas temáticas, consulta fichas de series/películas, reproduce con controles de streaming y gestiona su lista y descargas sin conexión.
2. **Productor / Estudio**: Accede al portal corporativo (Studio Hub), supervisa las horas de visualización globales (*Hours Viewed*), analiza curvas de retención por episodio, da seguimiento a entregas de control de calidad (QC) y revisa reportes de liquidación de regalías.

Una conexión directa entre carriles ilustra cómo las reproducciones del espectador alimentan en tiempo real las estadísticas de audiencia del productor.

## Evolución de los prompts

| Versión | Qué pidió | Qué corrigió después |
|---|---|---|
| v1 | Diagrama de secuencia de pantallas con 2 roles (espectador y productor), bocetos de baja fidelidad, flechas numeradas, estados alternos e interacción | Faltaba la identidad visual distintiva de la aplicación elegida |
| v2 | Aplicar la paleta de colores inspirada en Netflix (#E50914, #141414) y crear un logotipo propio en SVG, sin alterar la estructura | Los botones de rol solo filtraban visualmente, sin desplazar la vista al carril correspondiente |
| v3 | Navegación accesible al seleccionar rol: scroll suave al carril, animación de destello breve, foco accesible y respeto de `prefers-reduced-motion` | Versión final lista para publicación |

<details>
<summary>Prompt v1 — Diagrama de secuencia de pantallas</summary>

```
Usa Archify para generar el Diagrama de Secuencia de Pantallas (Sketches) de la aplicación móvil de Netflix, mostrando el recorrido de 2 roles: Espectador y Productor/Estudio.

Alcance y fidelidad:
- Representa pantallas típicas y reconocibles de cada rol con bocetos propios de baja fidelidad (wireframes en escala de grises dentro de marcos de teléfono móvil). No uses logotipos ni capturas oficiales de Netflix.
- Basa el contenido en funciones públicas de streaming y en el modelo Canvas de la Práctica 03; no inventes funciones ajenas.
- Indica en una nota que es un ejercicio académico.

Estructura del diagrama:
- Dos carriles horizontales (uno por rol), con nombre, ícono y subtítulo descriptivo.
- Cada carril contiene los bocetos de las pantallas dentro de marcos de teléfono con notch y barra de estado.
- Rol Espectador: Inicio de sesión / perfiles ("¿Quién está viendo?") → Inicio (Billboard y carruseles) → Buscar y explorar → Ficha de detalle de película/serie → Reproductor de video → Mi lista y descargas.
- Rol Productor / Estudio: Inicio de sesión corporativo (Studio Hub) → Panel principal (Dashboard) → Métricas de audiencia y retención → Catálogo y entregas QC → Ficha de producción y liquidación.
- Flechas numeradas entre pantallas con etiqueta de la acción que dispara el cambio.
- Pantallas de estados alternos fuera del flujo: Modo sin conexión, Búsqueda sin coincidencias y Contenido no disponible en la región.
- Flecha interactiva entre carriles mostrando cómo las reproducciones del espectador alimentan las métricas del productor.

Interacción:
- Al hacer clic en cualquier pantalla se abre un panel lateral con su nombre, propósito, elementos de interfaz y acción siguiente.
- Botones de rol para resaltar el recorrido elegido y atenuar el otro.
- Controles para alternar tema claro/oscuro y para restablecer la vista.

Diseño y código:
- Archivo HTML autocontenido, responsivo y con desplazamiento horizontal en pantallas reducidas.
- Accesible por teclado, visible focus, aria-pressed, aria-live y respeto a prefers-reduced-motion.

Salida: un archivo HTML autocontenido.
```
</details>

<details>
<summary>Prompt v2 — Paleta de colores y logotipo propio</summary>

```
Conserva exactamente las pantallas, el orden del flujo, las flechas y la lógica de interacción. Ajusta el estilo visual y la identidad:

Paleta de colores (inspirada en Netflix):
- Rojo de acento (#E50914) para botones principales, badges activos, flechas y elementos destacados.
- Negro (#141414) y gris oscuro (#1C1C1C, #262626) para fondos, marcos de teléfono y tarjetas.
- Grises neutros (#3D3D3D, #B3B3B3) para bordes y textos secundarios.
- Blanco (#FFFFFF) para textos principales con contraste superior a 4.5:1.
- Tema oscuro por defecto y tema claro adaptado manteniendo el rojo de acento.

Logotipo:
- Diseña un logotipo propio en SVG inline para la cabecera y favicon: una composición geométrica de cinta de celuloide / streaming en rojo y fondo negro, original y sin reproducir tipografías registradas.
- Agrega nota breve visible: "Ejercicio académico, no afiliado a Netflix".

Salida: archivo HTML actualizado.
```
</details>

<details>
<summary>Prompt v3 — Navegación al seleccionar un rol</summary>

```
Conserva el diseño, colores, pantallas y contenidos. Agrega navegación accesible e interactiva al seleccionar un rol:

- Al pulsar el botón "Espectador" o "Productor / Estudio", desplázate suavemente (scrollIntoView smooth) hasta el carril correspondiente.
- Si el carril ya está visible en la ventana, evita saltos de scroll innecesarios.
- Aplica un destello breve (animación de contorno rojo #E50914 de 1s de duración) sobre el carril al llegar.
- Mueve el foco del teclado al título del carril (tabindex="-1") y anuncia el cambio mediante región aria-live ("Mostrando el recorrido del espectador/productor").
- Respeta estrictamente prefers-reduced-motion (sin animaciones bruscas si el usuario tiene la preferencia activada).
- El botón "Restablecer" debe regresar la vista al estado inicial sin descolocar la página.

Salida: archivo HTML final optimizado.
```
</details>

## Revisión del resultado

- 2 roles con su recorrido completo de pantallas (Espectador y Productor/Estudio): Sí
- Bocetos de baja fidelidad en marcos móviles con flechas numeradas y estados alternos: Sí
- Paleta de colores inspirada en Netflix y logotipo propio en SVG: Sí
- Panel lateral con propósito, elementos de UI y acción siguiente por pantalla: Sí
- Navegación suave, animación de arribo accesible y regiones `aria-live`: Sí
- Soporte para tema claro y tema oscuro: Sí
- Probado en navegador y validado para publicación en GitHub Pages: Sí

## Descripción del diagrama

El diagrama organiza los sketches en dos carriles horizontales dentro de marcos de teléfono inteligente:

- **Espectador**:
  1. *Perfiles de usuario*: Selección de cuenta individual ("¿Quién está viendo?").
  2. *Inicio (Billboard)*: Estreno destacado con botón de reproducción inmediata y carruseles temáticos.
  3. *Buscar y Explorar*: Campo de búsqueda y lista del Top 10 hoy en el país.
  4. *Ficha de Detalle*: Sinopsis, temporadas, ficha técnica y botón de descarga.
  5. *Reproductor*: Ventana de streaming con controles de pausa, audio 5.1, subtítulos y salto de 10s.
  6. *Mi lista y Descargas*: Biblioteca personal y administración de almacenamiento local.

- **Productor / Estudio**:
  1. *Acceso a Studio Hub*: Autenticación corporativa con doble factor de seguridad.
  2. *Panel de Producción*: Resumen ejecutivo de horas vistas (*Hours Viewed*) y títulos activos.
  3. *Audiencia y Retención*: Curva de retención episodio por episodio y penetración regional.
  4. *Catálogo y Entregas*: Flujo de revisión de calidad (QC) de archivos maestros y subtitulado.
  5. *Ficha y Liquidación*: Métricas consolidadas de ranking y reporte financiero de regalías.

La flecha transversal central conecta ambos flujos reflejando cómo el consumo directo de los suscriptores impacta en las decisiones y compensaciones de los creadores de contenido.

## Autor

- **Edgar Cabrera Velazquez** / [@edgar-cbr](https://github.com/edgar-cbr)
- **Matrícula:** 230496
- **Materia:** Integradora (10° A)
