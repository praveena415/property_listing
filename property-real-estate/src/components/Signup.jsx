
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp({ setUser }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const u = { email: cred.user.email, uid: cred.user.uid };
      setUser(u);
      localStorage.setItem("demoUser", JSON.stringify(u));
      navigate("/");
    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: "20px auto", padding: 18 }}>
      <h2>Create account</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" />
        <input className="input" value={pass} onChange={e => setPass(e.target.value)} placeholder="Password (min 6 char)" type="password" />
        <button className="btn-apply" type="submit">Sign Up</button>
      </form>
      {err && <div className="error" style={{ marginTop: 8 }}>{err}</div>}
      <p className="small-muted" style={{ marginTop: 10 }}>
        Already a member? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
}
