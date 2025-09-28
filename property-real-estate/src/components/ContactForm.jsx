
import React, { useState } from "react";

export default function ContactForm({ property }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function validate() {
    const e = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!(email)) e.email = "Please enter a valid email.";
    if (!(phone)) e.phone = "Please enter a valid phone number.";
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {     
      console.log("Inquiry", { propertyId: property.id, name, email, phone, message });
      setSent(true);
      setName(""); setEmail(""); setPhone(""); setMessage("");
    }
  }

  if (sent) {
    return (
      <div className="thank">
        <h3>🙏Thanks — we got it!</h3>
        <p className="small-muted">✅Your message has been sent to the agent. Expect a reply soon.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
      {errors.name && <div className="error">{errors.name}</div>}

      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      {errors.email && <div className="error">{errors.email}</div>}

      <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone" />
      {errors.phone && <div className="error">{errors.phone}</div>}

      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message (optional)" rows={3} />

      <button type="submit" className="btn-send">📝Send Inquiry</button>
    </form>
  );
}
