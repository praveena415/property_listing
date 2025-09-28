
import React from "react";
import { loadFromLocal } from "../utils/localStorage";
import PROPERTY_DATA from "../data/properties";
import PropertyCard from "./PropertyCard";

export default function Favorites() {
  const fav = loadFromLocal("favorites", []);
  const list = PROPERTY_DATA.filter(p => fav.includes(p.id));

  return (
    <div>
      <h2>Your favorites</h2>
      {list.length === 0 ? (
        <div className="card" style={{ padding: 14 }}>You haven't saved any properties yet. Click ♥ on listings to save them here.</div>
      ) : (
        <div className="grid-cards" style={{ marginTop: 12 }}>
          {list.map(p => <div key={p.id} className="card" style={{ padding: 0 }}><PropertyCard property={p} isFav={true} onToggleFav={() => {}} view={"grid"} /></div>)}
        </div>
      )}
    </div>
  );
}
