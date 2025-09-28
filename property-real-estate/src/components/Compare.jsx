
import React from "react";
import { loadFromLocal } from "../utils/localStorage";
import PROPERTY_DATA from "../data/properties";

export default function Compare() {
  const compare = loadFromLocal("compare", []);
  const list = PROPERTY_DATA.filter(p => compare.includes(p.id));

  if (list.length === 0) {
    return <div className="card" style={{ padding: 14 }}>❌No properties selected for comparison.</div>;
  }

  return (
    <div>
      <h2>📝Compare properties</h2>
      <div style={{ overflowX: "auto", marginTop: 12 }}>
        <table className="compare-table">
          <thead>
            <tr>
              <th>⚙️Feature</th>
              {list.map(p => <th key={p.id}>{p.title}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr><td>💰Price</td>{list.map(p => <td key={p.id}>₹{p.price.toLocaleString()}</td>)}</tr>
            <tr><td>🛌Bedrooms</td>{list.map(p => <td key={p.id}>{p.bedrooms}</td>)}</tr>
            <tr><td>📏Sqft</td>{list.map(p => <td key={p.id}>{p.sqft}</td>)}</tr>
            <tr><td>✨Amenities</td>{list.map(p => <td key={p.id}>{p.amenities.join(", ")}</td>)}</tr>
            <tr><td>📍City</td>{list.map(p => <td key={p.id}>{p.city}</td>)}</tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
