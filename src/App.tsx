import { ButtonGroup, Container, Form } from "react-bootstrap";
import CanvasImageGenerator from "./CanvasImageGenerator.tsx";
import React, { useState } from "react";

const i18n: { [lang: string]: { [key: string]: string } } = {
  ge: {
    chooseLanguage: "აირჩიე ენა",
    enterName: "შეიყვანე შენი სახელი",
    download: "გადმოწერე",
  },
  en: {
    chooseLanguage: "Choose your language",
    enterName: "Enter your name",
    download: "Download",
  },
};

function App() {
  const [language, setLanguage] = useState("ge");
  const [name, setName] = useState("");
  const t = (key: string) => i18n[language][key] || key;
  const backgroundImageUrl = `./template-${language}.png`;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLanguage(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Container className="py-4 text-center">
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className={"mb-5 text-center"}>
          <Form.Label>{t("chooseLanguage")}</Form.Label>
          <ButtonGroup className="d-block">
            <input
              id="ge"
              type="radio"
              name="language"
              value="ge"
              className="btn-check"
              checked={language === "ge"}
              onChange={handleLanguageChange}
            />
            <label className="btn btn-lg btn-outline-danger" htmlFor="ge">
              ქართული
            </label>
            <input
              id="en"
              type="radio"
              name="language"
              value="en"
              className="btn-check"
              checked={language === "en"}
              onChange={handleLanguageChange}
            />
            <label className="btn btn-lg btn-outline-primary" htmlFor="en">
              English
            </label>
          </ButtonGroup>
        </Form.Group>
        <Form.Group className={"mb-5 text-center"}>
          <Form.Label>{t("enterName")}</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            style={{ maxWidth: "26rem", margin: "auto" }}
            // placeholder={t("enterName")}
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
      </Form>
      <CanvasImageGenerator
        width={1000}
        height={707}
        name={name}
        backgroundImageUrl={backgroundImageUrl}
        downloadButtonLabel={t("download")}
      />
    </Container>
  );
}

export default App;
