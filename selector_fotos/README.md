# Selector de Fotos - XV Años Natalia Estévez

Selector de fotos interactivo para los XV años de Natalia Estévez Guardián (6 de diciembre 2025).

## 📸 Características

- **112 fotos** optimizadas en formato WebP (~85-95% reducción de tamaño)
- Selector interactivo con categorías:
  - 📸 **Impresión**: Máximo 100 fotos
  - 📱 **Redes Sociales**: Sin límite
  - 💌 **Invitaciones Web**: Sin límite
  - ❌ **Descartadas**: Sin límite

## 🎨 Paleta de Colores

El diseño utiliza los colores de la invitación de Natalia:
- **Azul Cielo**: #87ceeb (Color principal)
- **Azul Medio**: #5a9bd5 (Acentos)
- **Azul Claro**: #d4e9f7 (Fondos claros)
- **Azul Oscuro**: #2c5f7f #4a90c4 (Textos y contrastes)
- **Fondo**: #f0f8ff (Azul muy claro)

## 📂 Estructura del Proyecto

```
selector_fotos/
├── selector.html       # Página principal del selector
├── photos/            # 112 fotos en formato WebP
│   ├── foto_001.webp
│   ├── foto_002.webp
│   └── ... foto_112.webp
├── js/
│   └── selector.js    # Lógica del selector
├── convert_to_webp.py # Script de conversión
└── README.md          # Este archivo
```

## 🚀 Uso

1. Abrir `selector.html` en un navegador web
2. Click en cada foto para clasificarla
3. Usar los filtros para ver categorías específicas
4. Exportar selecciones por WhatsApp cuando termine

## 🔄 Reconversión de Fotos

Si necesitas reconvertir las fotos desde las originales:

```bash
python convert_to_webp.py
```

**Ubicación de fotos originales**: `F:\2025\12\6\SI`

## 📊 Estadísticas de Conversión

- **Total de fotos**: 112
- **Exitosas**: 112
- **Errores**: 0
- **Reducción promedio**: 85-95% del tamaño original
- **Tamaño total antes**: ~350 MB
- **Tamaño total después**: ~35 MB

## 💡 Características del Selector

### Sistema de Clasificación
- Click en una foto para abrir el modal de selección
- Selecciona una o varias categorías para cada foto
- Las fotos pueden tener múltiples categorías simultáneamente
- Indicadores visuales de colores para cada categoría

### Filtros
- Filtra por cualquier categoría
- Contador en tiempo real de fotos por categoría
- Alertas cuando excedes los límites recomendados

### Exportación
- Enviar reporte completo por WhatsApp
- Compartir selecciones con otras personas
- Limpiar todas las selecciones si es necesario

### Sugerencias de Video
- Sección especial para sugerencias de edición de video
- Marca minutos y segundos específicos
- Agrega descripción de cambios sugeridos

## 🎯 Límites Recomendados

- **Impresión**: 100 fotos (para álbum físico)
- **Redes Sociales**: Sin límite (para compartir en Facebook, Instagram, etc.)

## 📱 Contacto

**Producciones Foro 7**
- Teléfono: 477-920-3776
- Servicios: Fotografía, Video, Dron e Invitaciones Web

---

© 2025 - Natalia Estévez Guardián XV Años
