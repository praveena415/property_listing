
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn({ setUser }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const fromPath = location.state?.from?.pathname || "/";

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, pass);
      const u = { email: userCred.user.email, uid: userCred.user.uid };
      setUser(u);
      localStorage.setItem("demoUser", JSON.stringify(u));
      
      navigate(fromPath, { replace: true });
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: "20px auto", padding: 18 }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
        <input className="input" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Password" type="password" />
        <button className="btn-apply" type="submit">Sign In</button>
      </form>
      {err && <div className="error" style={{ marginTop: 8 }}>{err}</div>}
      <p className="small-muted" style={{ marginTop: 10 }}>
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
}
