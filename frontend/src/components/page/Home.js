import React, { useState, useEffect } from "react";
import { Carousel, Container, Row, Col, Card } from "react-bootstrap";
import { useLanguage } from "../contexts/language_context_provider";

export default function Home() {
  const { t } = useLanguage();

  const slides = [
    {
      title: t("slide1_title"),
      text: t("slide1_text"),
      bg: "https://via.placeholder.com/1200x400?text=Slide+1"
    },
    {
      title: t("slide2_title"),
      text: t("slide2_text"),
      bg: "https://via.placeholder.com/1200x400?text=Slide+2"
    },
    {
      title: t("slide3_title"),
      text: t("slide3_text"),
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
            </div>0
          </Carousel.Item>
        ))}
      </Carousel>

      <Container className="mt-5">
        <h2 className="text-center mb-4">{t("about_me_heading")}</h2>

        <Row>
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t("experience_title")}</Card.Title>
                <Card.Text>{t("experience_text")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t("projects_title")}</Card.Title>
                <Card.Text>{t("experience_text")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{t("contact_title")}</Card.Title>
                <Card.Text>{t("contact_text")}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
