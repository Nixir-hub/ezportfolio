from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from PIL import Image
import numpy as np
from ultralytics import YOLO

# Wczytanie pretrenowanego modelu YOLOv8
model = YOLO("yolov8n.pt")  # nano version fast and smooth

class PersonDetectView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        if 'image' not in request.FILES:
            return Response({"error": "No file"}, status=400)

        image_file = request.FILES['image']
        img = np.array(Image.open(image_file).convert("RGB"))

        # Predyction of  YOLOv8
        results = model.predict(img, conf=0.3)  # confidence threshold 0.3
        detections = []
        person_count = 0

        for r in results:
            for box, cls, conf in zip(r.boxes.xyxy, r.boxes.cls, r.boxes.conf):
                if int(cls) == 0:  # 0 = person in COCO
                    x1, y1, x2, y2 = box.tolist()
                    h, w, _ = img.shape
                    detections.append({
                        "bbox": [x1/w, y1/h, x2/w, y2/h],
                        "confidence": float(conf)
                    })
                    person_count += 1

        return Response({
            "detections": detections,
            "person_count": person_count
        })
