import React, { useState, useEffect } from "react";
import { Carousel, Container, Row, Col, Card } from "react-bootstrap";

export default function Home() {
  const slides = [
    {
      title: "Witaj na moim portfolio",
      text: "Przykładowy opis pierwszego slajdu",
      bg: "https://via.placeholder.com/1200x400?text=Slide+1"
    },
    {
      title: "Projekty i doświadczenie",
      text: "Opis drugiego slajdu",
      bg: "https://via.placeholder.com/1200x400?text=Slide+2"
    },
    {
      title: "Kontakt i informacje",
      text: "Opis trzeciego slajdu",
      bg: "https://via.placeholder.com/1200x400?text=Slide+3"
    },
  ];

  const [windowHeight, setWindowHeight] = useState(window.innerHeight * 0.6);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight * 0.6);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Slider */}
      <Carousel fade>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: `${windowHeight}px`,
                backgroundImage: `
                  linear-gradient(
                    rgba(0,0,0,0.5),
                    rgba(0,0,0,0.5)
                  ),
                  url(${slide.bg})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center text-white p-3 rounded">
                <h3>{slide.title}</h3>
                <p>{slide.text}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Kafelki z informacjami */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">O mnie</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Doświadczenie</Card.Title>
                <Card.Text>Kilka lat doświadczenia w tworzeniu aplikacji webowych.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Projekty</Card.Title>
                <Card.Text>Portfolio projektów w React, Django, AI i innych technologiach.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Kontakt</Card.Title>
                <Card.Text>Email, LinkedIn, GitHub — wszystko w jednym miejscu.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
