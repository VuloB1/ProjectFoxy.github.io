# Página de Project Foxy

Sitio estático (HTML, CSS y JS sin dependencias). Se publica solo al hacer push a `main`.

## Qué se actualiza solo

La versión, los enlaces de descarga y el tamaño de cada archivo se leen de la última release de
`VuloB1/ProjectFoxy` en GitHub. Al publicar una versión nueva no hay que tocar nada aquí.

## Cambiar capturas, GIFs o videos de la galería

Los archivos están en `img/` (inglés) y `img/es/` (español). Cada pestaña de la galería es un
`<button data-shot="archivo.ext">` dentro de `#shot-tabs` en `index.html`.

- **Actualizar una captura:** reemplazá el archivo con el mismo nombre en `img/` y `img/es/`.
- **Poner un GIF:** dejalo en `img/es/` e `img/` y cambiá el `data-shot` de la pestaña (`efectos.gif`).
- **Poner un video:** igual, con `.mp4` o `.webm`; se reproduce solo, sin sonido y en bucle. Si el video no
  tiene texto de la interfaz, alcanza con dejarlo en `img/` y sirve para los dos idiomas.
- **Agregar una pestaña:** copiá un `<button>` de `#shot-tabs`, cambiá `data-shot` y los textos; el título
  y la frase se traducen en `EN` dentro de `app.js` (claves `shots.*`).

Tamaño recomendado: 1280×800 (relación 16:10). Para que la página cargue rápido, usá WebP en las capturas y
mantené los GIFs/videos por debajo de unos pocos MB.

## Cifras

Todas las cifras de la página («43 efectos», «38 filtros», «hasta 10 imágenes», «6 idiomas»…) viven en
`numbers.js`. Se cambian ahí y se actualizan en todos los textos, en español y en inglés (los textos usan
marcadores como `{effects}`). Si agregás un texto nuevo con una cifra, usá un marcador existente o sumá uno
nuevo en ese archivo.
