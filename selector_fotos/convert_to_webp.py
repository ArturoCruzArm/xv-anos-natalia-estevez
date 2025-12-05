#!/usr/bin/env python3
"""
Script para convertir imágenes JPG a formato WebP
Optimizado para selector de fotos de XV Años
"""

from PIL import Image
import os
from pathlib import Path

# Configuración
SOURCE_DIR = Path(r"F:\2025\12\6\SI")
OUTPUT_DIR = Path(r"D:\eventos\xv-anos-natalia-estevez\selector_fotos\photos")
QUALITY = 85  # Calidad WebP (0-100)
MAX_DIMENSION = 1920  # Dimensión máxima para optimizar tamaño

def convert_to_webp(source_path, output_path, quality=QUALITY):
    """Convierte una imagen a formato WebP con corrección de orientación EXIF"""
    try:
        with Image.open(source_path) as img:
            # IMPORTANTE: Corregir orientación EXIF antes de procesar
            # Esto asegura que las fotos rotadas se vean correctamente
            try:
                from PIL import ImageOps
                img = ImageOps.exif_transpose(img)
            except Exception:
                pass  # Si no hay EXIF, continuar normalmente

            # Convertir a RGB si es necesario
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')

            # Redimensionar si es muy grande (mantener proporción)
            width, height = img.size
            if max(width, height) > MAX_DIMENSION:
                if width > height:
                    new_width = MAX_DIMENSION
                    new_height = int(height * (MAX_DIMENSION / width))
                else:
                    new_height = MAX_DIMENSION
                    new_width = int(width * (MAX_DIMENSION / height))
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

            # Guardar como WebP
            img.save(output_path, 'WEBP', quality=quality, method=6)
            return True
    except Exception as e:
        print(f"Error procesando {source_path.name}: {str(e)}")
        return False

def main():
    # Crear directorio de salida si no existe
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Obtener todas las imágenes JPG
    jpg_files = sorted(SOURCE_DIR.glob("*.JPG")) + sorted(SOURCE_DIR.glob("*.jpg"))

    if not jpg_files:
        print(f"No se encontraron archivos JPG en {SOURCE_DIR}")
        return

    print(f"Encontradas {len(jpg_files)} fotos")
    print(f"Convirtiendo a WebP...")
    print("-" * 60)

    successful = 0
    failed = 0

    for idx, jpg_file in enumerate(jpg_files, 1):
        output_file = OUTPUT_DIR / f"foto_{idx:03d}.webp"

        print(f"[{idx}/{len(jpg_files)}] {jpg_file.name} -> {output_file.name}", end=" ")

        if convert_to_webp(jpg_file, output_file):
            # Mostrar reducción de tamaño
            original_size = jpg_file.stat().st_size / 1024 / 1024  # MB
            new_size = output_file.stat().st_size / 1024 / 1024  # MB
            reduction = ((original_size - new_size) / original_size) * 100

            print(f"OK ({original_size:.2f}MB -> {new_size:.2f}MB, -{reduction:.1f}%)")
            successful += 1
        else:
            print("ERROR")
            failed += 1

    print("-" * 60)
    print(f"\nResumen:")
    print(f"  [OK] Convertidas exitosamente: {successful}")
    print(f"  [ERROR] Errores: {failed}")
    print(f"  Total: {len(jpg_files)}")
    print(f"\nArchivos guardados en: {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
