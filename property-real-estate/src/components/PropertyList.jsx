
import React, { useMemo, useState } from "react";
import PropertyCard from "./PropertyCard";
import Filters from "./Filters";
import { loadFromLocal, saveToLocal } from "../utils/localStorage";
import MapView from "./MapView"; 

const PAGE_SIZE = 6;

export default function PropertyList({ properties }) {
  const [filters, setFilters] = useState({
    type: "",
    city: "",
    minPrice: 0,
    maxPrice: 200000,
    bedrooms: 0,
    amenities: [],
    sortBy: "newest",
    view: "grid",
  });

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState(loadFromLocal("favorites", []));

  const toggleFavorite = (id) => {
    let next;
    if (favorites.includes(id)) next = favorites.filter((f) => f !== id);
    else next = [...favorites, id];
    setFavorites(next);
    saveToLocal("favorites", next);
  };

  const filtered = useMemo(() => {
    let list = properties.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q)
      );
    }

    if (filters.type) list = list.filter((p) => p.type === filters.type);
    if (filters.city) list = list.filter((p) => p.city === filters.city);
    list = list.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );
    if (filters.bedrooms > 0)
      list = list.filter((p) => p.bedrooms >= filters.bedrooms);
    if (filters.amenities.length)
      list = list.filter((p) =>
        filters.amenities.every((a) => p.amenities.includes(a))
      );

    if (filters.sortBy === "price_low") list.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === "price_high")
      list.sort((a, b) => b.price - a.price);
    else list.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

    return list;
  }, [properties, filters, query]);

  const totalToShow = page * PAGE_SIZE;
  const results = filtered.slice(0, totalToShow);
  const hasMore = filtered.length > results.length;

  return (
    <>
      <aside className="card filters">
        <div className="card-body">
          
          <Filters
            filters={filters}
            setFilters={setFilters}
            query={query}
            setQuery={setQuery}
          />
        </div>
      </aside>

      <section style={{ gridColumn: "1 / -1" }}>
        <div className="results-header">
          <div>{filtered.length} results</div>
          <div>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
              className="select"
            >
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

       

        {filters.view === "map" ? <MapView points={filtered} /> : null}

        {filters.view === "list" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {results.map((p) => (
              <div key={p.id} className="card list-card" style={{ padding: 0 }}>
                <PropertyCard
                  property={p}
                  isFav={favorites.includes(p.id)}
                  onToggleFav={() => toggleFavorite(p.id)}
                  view={"list"}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid-cards">
            {results.map((p) => (
              <div
                key={p.id}
                className="card property-card"
                style={{ padding: 0 }}
              >
                <PropertyCard
                  property={p}
                  isFav={favorites.includes(p.id)}
                  onToggleFav={() => toggleFavorite(p.id)}
                  view={"grid"}
                />
              </div>
            ))}
          </div>
        )}

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 16 }}
        >
          {hasMore ? (
            <button className="btn-apply" onClick={() => setPage(page + 1)}>
              Load More
            </button>
          ) : (
            <div className="small-muted">No more results</div>
          )}
        </div>
      </section>
    </>
  );
}
