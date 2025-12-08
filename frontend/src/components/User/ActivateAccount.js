import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ActivateAccount() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    fetch(`http://localhost:8000/api/activate/${uid}/${token}/`,{ credentials: "include"})
      .then((res) => {
        if (res.ok) setStatus("success");
        else setStatus("error");
      });
  }, [uid, token]);

  return (
    <div>
      {status === "pending" && <p>Activating account...</p>}
      {status === "success" && <p>Account activated. You can login</p>}
      {status === "error" && <p>Incorrect activation link.</p>}
    </div>
  );
}
