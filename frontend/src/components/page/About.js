import { useLanguage } from "../contexts/language_context_provider";

export default function About() {
  const { t } = useLanguage();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        background: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px 40px",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          maxWidth: "900px",
          width: "100%",
          textAlign: "left",
        }}
      >
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
          {t("aboutTitle")}
        </h1>

        <p style={{ lineHeight: "1.6", fontSize: "16px", marginBottom: "10px" }}>
          {t("aboutDescription")}
        </p>

        <h3>{t("techStackTitle")}</h3>
        <ul style={{ lineHeight: "1.6", fontSize: "16px" }}>
          <li>{t("techFrontend")}</li>
          <li>{t("techBackend")}</li>
          <li>{t("techMLBackend")}</li>
          <li>{t("techDatabase")}</li>
        </ul>

        <h3>{t("featuresTitle")}</h3>
        <ul style={{ lineHeight: "1.6", fontSize: "16px" }}>
          <li>{t("featureRegistration")}</li>
          <li>{t("featurePasswordReset")}</li>
          <li>{t("featureInteractiveCharts")}</li>
          <li>{t("featureMLPersonDetection")}</li>
          <li>{t("featureContainerized")}</li>
          <li>{t("featureDockerCompose")}</li>
        </ul>

        <p style={{ marginTop: "20px", fontStyle: "italic", fontSize: "14px" }}>
          {t("deploymentInfo")}
        </p>
      </div>
    </div>
  );
}
