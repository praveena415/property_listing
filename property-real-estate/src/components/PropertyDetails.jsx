
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PROPERTY_DATA from "../data/properties";
import ContactForm from "./ContactForm";
import { loadFromLocal, saveToLocal } from "../utils/localStorage";

export default function PropertyDetails() {
  const { id } = useParams();
  const pid = Number(id);
  const property = PROPERTY_DATA.find((p) => p.id === pid);
  const [activeImg, setActiveImg] = useState(0);
  const [favorites, setFavorites] = useState(loadFromLocal("favorites", []));
  const [compare, setCompare] = useState(loadFromLocal("compare", []));

  useEffect(() => saveToLocal("favorites", favorites), [favorites]);
  useEffect(() => saveToLocal("compare", compare), [compare]);

  if (!property) return <div className="card card-body">Sorry — property not found.</div>;

  const toggleFav = () => {
    const next = favorites.includes(property.id)
      ? favorites.filter((x) => x !== property.id)
      : [...favorites, property.id];
    setFavorites(next);
  };

  const toggleCompare = () => {
    const next = compare.includes(property.id)
      ? compare.filter((x) => x !== property.id)
      : [...compare, property.id];
    setCompare(next);
  };

  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="details-grid">
        <div>
          <div className="hero">
            <img src={property.images[activeImg]} alt={property.title} />
          </div>

          <div className="thumbs" style={{ marginTop: 12 }}>
            {property.images.map((img, i) => (
              <div
                key={i}
                className={`thumb ${i === activeImg ? "active" : ""}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt={`thumb-${i}`} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14 }}>
            <h2 style={{ margin: 0 }}>{property.title}</h2>
            <div className="property-price" style={{ marginTop: 6 }}>
              ₹{property.price.toLocaleString()}
            </div>
            <div className="property-meta" style={{ marginTop: 4 }}>
              {property.bedrooms} beds • {property.sqft} sqft • {property.city}
            </div>

            <section style={{ marginTop: 14 }}>
              <h4>Description</h4>
              <p className="small-muted">{property.description}</p>
            </section>

            <section style={{ marginTop: 14 }}>
              <h4>Amenities</h4>
              <ul>
                {property.amenities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <aside>
          <div className="agent-box">
            <div className="agent-info">
              <div style={{ fontWeight: 700 }}>{property.agent.name}</div>
              <div className="small-muted">{property.agent.email}</div>
              <div className="small-muted">{property.agent.phone}</div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button className="btn-outline" onClick={toggleFav}>
                {favorites.includes(property.id) ? "Remove Favorite" : "Add to Favorites"}
              </button>
              <button className="btn-outline" onClick={toggleCompare}>
                {compare.includes(property.id) ? "Remove" : "Compare"}
              </button>
            </div>

            <div style={{ marginTop: 12 }}>
              <ContactForm property={property} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
