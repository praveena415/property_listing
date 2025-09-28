
import React from "react";
import PropertyList from "./PropertyList";

export default function Home({ user, properties }) {
  return (
    <div>
      <div style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Find your next place</h1>
        <p className="small-muted" style={{ marginTop: 6 }}>
          Explore curated listings — filter, favorite, compare, and contact agents easily.
        </p>
      </div>

      <div className="grid-4">
        <PropertyList properties={properties} />
      </div>
    </div>
  );
}
