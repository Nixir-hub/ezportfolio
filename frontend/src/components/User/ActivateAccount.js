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

          setTimeout(() => navigate("/login"), 2500);
        } else {
          setStatus("error");
          setMessage(data.error || "Incorrect token.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Error with connection to database.");
      });
  }, [uidb64, token]);

  return (
    <div style={{ padding: "20px" }}>
      {status === "pending" && <p>Activating account</p>}
      {status === "success" && <p>{message}</p>}
      {status === "error" && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}
