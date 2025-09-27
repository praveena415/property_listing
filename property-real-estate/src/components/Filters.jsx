// src/components/Filters.jsx
import React, { useState, useEffect } from "react";

const AMENITIES = ["Pool", "Gym", "Parking", "Garden", "Garage", "Play Area"];

export default function Filters({ filters, setFilters, query, setQuery }) {
  // local price inputs (so the user can type and then click Apply)
  const [localMin, setLocalMin] = useState(filters.minPrice ?? "");
  const [localMax, setLocalMax] = useState(filters.maxPrice ?? "");
  const [status, setStatus] = useState(""); // show small feedback

  // keep local inputs in sync when parent filters change (optional)
  useEffect(() => {
    setLocalMin(filters.minPrice ?? "");
    setLocalMax(filters.maxPrice ?? "");
  }, [filters.minPrice, filters.maxPrice]);

  const toggleAmenity = (name) => {
    const next = filters.amenities.includes(name)
      ? filters.amenities.filter((a) => a !== name)
      : [...filters.amenities, name];
    setFilters({ ...filters, amenities: next });
  };

  // Apply handler — type is button so it doesn't submit any form
  const applyPrice = (e) => {
    // defensive: prevent any default (if wrapped in a form)
    if (e && e.preventDefault) e.preventDefault();

    // normalize inputs: allow empty -> 0 or parse numbers
    const min = localMin === "" ? 0 : Number(localMin);
    const max = localMax === "" ? 999999999 : Number(localMax);

    if (Number.isNaN(min) || Number.isNaN(max)) {
      setStatus("Please enter valid numbers.");
      setTimeout(() => setStatus(""), 2500);
      return;
    }

    // if user mistakenly swapped min/max, swap them for convenience
    let finalMin = min;
    let finalMax = max;
    if (min > max) {
      finalMin = max;
      finalMax = min;
    }

    setFilters({ ...filters, minPrice: finalMin, maxPrice: finalMax });
    setStatus(`Price applied: ₹${finalMin.toLocaleString()} – ₹${finalMax.toLocaleString()}`);

    // clear status after a short delay
    setTimeout(() => setStatus(""), 2500);
  };

  return (
    <div>
      <h3>Filters</h3>

      {/* ---------- Top row: type | city | price+apply | bedrooms ---------- */}
      <div className="filters-row">
        <div className="filters-col">
          <label className="label">Property type</label>
          <select
            className="select"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            aria-label="Property type"
          >
            <option value="">Any</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Office">Office</option>
          </select>
        </div>

        <div className="filters-col">
          <label className="label">City</label>
          <select
            className="select"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            aria-label="City"
          >
            <option value="">Any</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>
        </div>

        <div className="filters-col">
          <label className="label">Price range (₹)</label>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              className="input"
              type="number"
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
              aria-label="Min price"
              placeholder="Min"
            />
            <input
              className="input"
              type="number"
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
              aria-label="Max price"
              placeholder="Max"
            />
            {/* make sure this is type="button" so it never triggers a form submit */}
            <button
              type="button"
              className="btn-apply"
              onClick={applyPrice}
              aria-label="Apply price"
            >
              Apply
            </button>
          </div>

          {/* small inline status text */}
          {status && <div style={{ marginTop: 8, fontSize: 13, color: "#0b1220" }}>{status}</div>}
        </div>

        <div className="filters-col">
          <label className="label">Bedrooms: {filters.bedrooms}+</label>
          <input
            type="range"
            min="0"
            max="6"
            value={filters.bedrooms}
            onChange={(e) => setFilters({ ...filters, bedrooms: Number(e.target.value) })}
            aria-label="Bedrooms"
          />
        </div>
      </div>

      {/* ---------- Second row: amenities | search | view ---------- */}
      <div className="filters-row" style={{ marginTop: 12, alignItems: "flex-end" }}>
        <div className="filters-col amenities-col">
          <label className="label">Amenities</label>
          <div style={{ marginTop: 6 }}>
            {AMENITIES.map((a) => (
              <button
                key={a}
                className={`btn-pill ${filters.amenities.includes(a) ? "active" : ""}`}
                onClick={() => toggleAmenity(a)}
                aria-pressed={filters.amenities.includes(a)}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div className="filters-col">
          <label className="label">Search</label>
          <input
            className="input"
            placeholder="Search title, city, description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search listings"
          />
        </div>

        <div className="filters-col">
          <label className="label">View</label>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className={`btn-pill ${filters.view === "grid" ? "active" : ""}`}
              onClick={() => setFilters({ ...filters, view: "grid" })}
              aria-pressed={filters.view === "grid"}
            >
              Grid
            </button>
            <button
              className={`btn-pill ${filters.view === "list" ? "active" : ""}`}
              onClick={() => setFilters({ ...filters, view: "list" })}
              aria-pressed={filters.view === "list"}
            >
              List
            </button>
            <button
              className={`btn-pill ${filters.view === "map" ? "active" : ""}`}
              onClick={() => setFilters({ ...filters, view: "map" })}
              aria-pressed={filters.view === "map"}
            >
              Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
