import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ActivateAccount() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    fetch(`http://localhost:8000/api/activate/${uid}/${token}/`)
      .then((res) => {
        if (res.ok) setStatus("success");
        else setStatus("error");
      });
  }, [uid, token]);

  return (
    <div>
      {status === "pending" && <p>Aktywuję konto...</p>}
      {status === "success" && <p>Konto aktywowane! Możesz się zalogować.</p>}
      {status === "error" && <p>Nieprawidłowy link aktywacyjny.</p>}
    </div>
  );
}
