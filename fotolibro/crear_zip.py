#!/usr/bin/env python3
"""
Script para crear ZIP de las fotos del fotolibro
XV Anos Natalia Estevez
"""

import zipfile
import os
from pathlib import Path

# Configuracion
PHOTOS_DIR = Path(__file__).parent / "photos"
OUTPUT_ZIP = Path(__file__).parent / "Natalia_XV_Fotolibro.zip"

def create_zip():
    print("=" * 50)
    print("CREANDO ZIP DEL FOTOLIBRO")
    print("=" * 50)

    # Obtener todas las fotos JPG
    photos = sorted(PHOTOS_DIR.glob("*.jpg"))

    if not photos:
        print(f"No se encontraron fotos en {PHOTOS_DIR}")
        return

    print(f"Encontradas {len(photos)} fotos")
    print(f"Creando ZIP: {OUTPUT_ZIP}")
    print("-" * 50)

    with zipfile.ZipFile(OUTPUT_ZIP, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for i, photo in enumerate(photos, 1):
            # Nombre dentro del ZIP
            arcname = f"Natalia_XV_Fotolibro/{photo.name}"
            zipf.write(photo, arcname)
            print(f"[{i}/{len(photos)}] {photo.name}")

    # Mostrar tamano del ZIP
    zip_size = OUTPUT_ZIP.stat().st_size / (1024 * 1024)  # MB

    print("-" * 50)
    print(f"ZIP creado exitosamente!")
    print(f"Archivo: {OUTPUT_ZIP}")
    print(f"Tamano: {zip_size:.2f} MB")
    print(f"Fotos incluidas: {len(photos)}")

if __name__ == "__main__":
    create_zip()
