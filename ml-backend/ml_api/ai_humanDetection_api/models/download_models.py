import os
import urllib.request

# Ścieżka do folderu z modelami
MODEL_DIR = "ai_humanDetection_api/models"
os.makedirs(MODEL_DIR, exist_ok=True)

# Pliki do pobrania
files = {
    "deploy.prototxt": "https://raw.githubusercontent.com/chuanqi305/MobileNet-SSD/master/deploy.prototxt",
    "mobilenet_iter_73000.caffemodel": "https://github.com/chuanqi305/MobileNet-SSD/raw/master/mobilenet_iter_73000.caffemodel"
}

for filename, url in files.items():
    filepath = os.path.join(MODEL_DIR, filename)
    if not os.path.exists(filepath):
        print(f"Pobieranie {filename}...")
        urllib.request.urlretrieve(url, filepath)
        print(f"Zapisano w {filepath}")
    else:
        print(f"{filename} już istnieje, pomijam.")
