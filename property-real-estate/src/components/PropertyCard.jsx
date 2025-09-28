
import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property, isFav, onToggleFav, view }) {
  return (
    <div style={{ display: "flex", flexDirection: view === "list" ? "row" : "column" }}>
      <div className="property-media">
        <img src={property.images[0]} alt={property.title} />
      </div>

      <div className="property-info">
        <Link to={`/property/${property.id}`} className="property-title">{property.title}</Link>
        <div className="property-meta">{property.city} • {property.bedrooms} beds • {property.sqft} sqft</div>
        <div className="property-price">₹{property.price.toLocaleString()}</div>
        <div className="small-muted" style={{ marginTop: 6 }}>{property.description.slice(0, 110)}…</div>

        <div className="card-actions">
          <Link to={`/property/${property.id}`} className="btn-outline">View details →</Link>
          <button className="btn-fav" onClick={onToggleFav}>{isFav ? "♥ Remove" : "♡ Favorite"}</button>
        </div>
      </div>
    </div>
  );
}
