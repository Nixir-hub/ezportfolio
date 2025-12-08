import { useState, useRef, useEffect } from "react";
import {useLanguage} from "../contexts/language_context_provider";
export default function PersonDetect() {
const [image, setImage] = useState(null);
const [detections, setDetections] = useState([]);
const [personCount, setPersonCount] = useState(0);
const imgRef = useRef(null);
const canvasRef = useRef(null);
const handleUpload = async (e) => {
const file = e.target.files[0];
if (!file) return;
const url = URL.createObjectURL(file);
setImage(url);
const formData = new FormData();
formData.append("image", file);

try {
  const res = await fetch("http://localhost:8001/api/cv/person-detect/", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  setDetections(data.detections);
  setPersonCount(data.person_count);
} catch (err) {
  console.error("Detection Error:", err);
}

};

const drawCanvas = () => {
if (!imgRef.current || !canvasRef.current) return;
const canvas = canvasRef.current;
const ctx = canvas.getContext("2d");
const img = imgRef.current;


// ustawienie wymiarów canvas zgodnie z wyświetlanym obrazem
canvas.width = img.width;
canvas.height = img.height;
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

detections.forEach(d => {
  const [x1, y1, x2, y2] = d.bbox;
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.strokeRect(
    x1 * canvas.width,
    y1 * canvas.height,
    (x2 - x1) * canvas.width,
    (y2 - y1) * canvas.height
  );
});


};
const { t } = useLanguage()
useEffect(() => {
drawCanvas();
const handleResize = () => drawCanvas();
window.addEventListener("resize", handleResize);
return () => window.removeEventListener("resize", handleResize);
}, [image, detections]);

const handleDownload = () => {
if (!canvasRef.current) return;
const link = document.createElement("a");
link.download = "person_detection.png";
link.href = canvasRef.current.toDataURL("image/png");
link.click();
};

return (
<div style={{
display: "flex",
justifyContent: "center",
padding: "20px"
}}>
<div style={{
width: "100%",
maxWidth: "400px",
background: "#fff",
borderRadius: "12px",
boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
padding: "20px",
textAlign: "center"
}}> <h2>{t('humanDetection')} (YOLOv8)</h2>
<input type="file" onChange={handleUpload} style={{ marginBottom: "10px" }} />
{personCount > 0 && <p>{t('numberPerson')}: {personCount}</p>}
<div style={{ position: "relative", width: "100%", marginTop: "10px" }}>
{image && (
<>
<img
ref={imgRef}
src={image}
alt="upload"
style={{ width: "100%", display: "block", borderRadius: "8px" }}
onLoad={drawCanvas}
/>
<canvas
ref={canvasRef}
style={{
position: "absolute",
top: 0,
left: 0,
width: "100%",
height: "100%",
pointerEvents: "none",
borderRadius: "8px"
}}
/>
</>
)} </div>
{image && (
<button
onClick={handleDownload}
style={{
marginTop: "15px",
padding: "10px 20px",
background: "#007bff",
color: "#fff",
border: "none",
borderRadius: "8px",
cursor: "pointer"
}}
>
{t('download')} </button>
)} </div> </div>
);
}
