# brayansstivens.github.io

Portfolio personal con estética de consola. HTML, CSS y JavaScript sin dependencias. GitHub Pages sirve `main` tal cual; las páginas se generan en local con un script de Node.

Dos vistas:

- **perfil** (por defecto): todo el contenido visible, pensado para quien no es técnico.
- **terminal** (`/#terminal` o Ctrl+K): una shell con `ls`, `cd`, `cat`, `open`, autocompletado con Tab e historial.

Dos idiomas, cada uno con su URL prerenderizada: `/` (español) y `/en/` (inglés).

## Editar

- Textos (es/en), renderizado y sistema de archivos de la terminal: `content.js`.
- Comportamiento (vistas, terminal, idioma): `main.js`.
- Plantilla HTML y metadatos SEO: `src/index.html`.
- Estilos y tokens de diseño: `styles.css`.

Después de tocar `content.js` o `src/index.html`, regenera las páginas y haz commit del resultado:

```bash
node scripts/build.mjs
```

Esto escribe `index.html`, `en/index.html` y `sitemap.xml`.

El CV en PDF (`cv/`, es/en) también sale de `content.js`; regenéralo cuando cambien los textos (usa Chrome en local):

```bash
node scripts/cv.mjs
```

Las capturas de Pitangus (`img/pitangus/`) se tomaron de una instancia demo aislada con la organización ficticia Lapis Labs (`make demo FULL=1`), nunca de una instancia con datos reales.

## Probar en local

```bash
python3 -m http.server 8000
```

Y abre http://localhost:8000.
