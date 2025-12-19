import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ActivateAccount() {
  const { uidb64, token } = useParams();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/activate/${uidb64}/${token}/`, {
      credentials: "include"
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));

        if (res.ok) {
          setStatus("success");
          setMessage("Account activated successfully.");
        } else {
          setStatus("error");
          setMessage(data.error || "Incorrect token.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Error with connection to backend.");
      });
  }, [uidb64, token]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
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
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {status === "pending" && <p>Activating account...</p>}
        {status === "success" && (
          <>
            <p style={{ color: "green" }}>{message}</p>
            <button
              onClick={() => navigate("/login")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Go to Login
            </button>
          </>
        )}
        {status === "error" && <p style={{ color: "red" }}>{message}</p>}
      </div>
    </div>
  );
}
