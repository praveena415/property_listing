// // src/components/PropertyList.jsx
// import React, { useMemo, useState } from "react";
// import PropertyCard from "./PropertyCard";
// import Filters from "./Filters";
// import { loadFromLocal, saveToLocal } from "../utils/localStorage";

// const PAGE_SIZE = 6;

// export default function PropertyList({ properties }) {
//   const [filters, setFilters] = useState({
//     type: "",
//     city: "",
//     minPrice: 0,
//     maxPrice: 200000,
//     bedrooms: 0,
//     amenities: [],
//     sortBy: "newest",
//     view: "grid"
//   });

//   const [query, setQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [favorites, setFavorites] = useState(loadFromLocal("favorites", []));

//   const toggleFavorite = (id) => {
//     const next = favorites.includes(id) ? favorites.filter(f => f !== id) : [...favorites, id];
//     setFavorites(next);
//     saveToLocal("favorites", next);
//   };

//   const filtered = useMemo(() => {
//     let list = properties.slice();

//     if (query.trim()) {
//       const q = query.toLowerCase();
//       list = list.filter(p =>
//         p.title.toLowerCase().includes(q) ||
//         p.description.toLowerCase().includes(q) ||
//         p.city.toLowerCase().includes(q)
//       );
//     }

//     if (filters.type) list = list.filter(p => p.type === filters.type);
//     if (filters.city) list = list.filter(p => p.city === filters.city);
//     list = list.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
//     if (filters.bedrooms > 0) list = list.filter(p => p.bedrooms >= filters.bedrooms);
//     if (filters.amenities.length) list = list.filter(p => filters.amenities.every(a => p.amenities.includes(a)));

//     if (filters.sortBy === "price_low") list.sort((a, b) => a.price - b.price);
//     else if (filters.sortBy === "price_high") list.sort((a, b) => b.price - a.price);
//     else list.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

//     return list;
//   }, [properties, filters, query]);

//   const totalToShow = page * PAGE_SIZE;
//   const results = filtered.slice(0, totalToShow);
//   const hasMore = filtered.length > results.length;

//   return (
//     <>
//       <aside className="card filters">
//         <div className="card-body">
//           <Filters filters={filters} setFilters={setFilters} />
//         </div>

//         <div style={{ padding: 14 }}>
//           <h4 style={{ margin: "8px 0" }}>Search</h4>
//           <input className="input" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search title, city, description" />
//         </div>

//         <div style={{ padding: 14 }}>
//           <h4 style={{ margin: "8px 0" }}>View</h4>
//           <div style={{ display: "flex", gap: 8 }}>
//             <button className={`btn-pill ${filters.view === "grid" ? "active" : ""}`} onClick={() => setFilters({ ...filters, view: "grid" })}>Grid</button>
//             <button className={`btn-pill ${filters.view === "list" ? "active" : ""}`} onClick={() => setFilters({ ...filters, view: "list" })}>List</button>
//             <button className={`btn-pill ${filters.view === "map" ? "active" : ""}`} onClick={() => setFilters({ ...filters, view: "map" })}>Map</button>
//           </div>
//         </div>
//       </aside>

//       <section style={{ gridColumn: "1 / -1" }}>
//         <div className="results-header">
//           <div>{filtered.length} results</div>
//           <div>
//             <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })} className="select">
//               <option value="newest">Newest</option>
//               <option value="price_low">Price: Low to High</option>
//               <option value="price_high">Price: High to Low</option>
//             </select>
//           </div>
//         </div>

//         {filters.view === "map" ? (
//           <div className="map-placeholder" style={{ marginBottom: 12 }}>Map placeholder — integrate leaflet or google maps</div>
//         ) : null}

//         {filters.view === "list" ? (
//           <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             {results.map(p => (
//               <div key={p.id} className="card list-card" style={{ padding: 0 }}>
//                 <PropertyCard property={p} isFav={favorites.includes(p.id)} onToggleFav={() => toggleFavorite(p.id)} view={"list"} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid-cards">
//             {results.map(p => (
//               <div key={p.id} className="card property-card" style={{ padding: 0 }}>
//                 <PropertyCard property={p} isFav={favorites.includes(p.id)} onToggleFav={() => toggleFavorite(p.id)} view={"grid"} />
//               </div>
//             ))}
//           </div>
//         )}

//         <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
//           {hasMore ? (
//             <button className="btn-apply" onClick={() => setPage(page + 1)}>Load More</button>
//           ) : (
//             <div className="small-muted">No more results</div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

// src/components/PropertyList.jsx
import React, { useMemo, useState } from "react";
import PropertyCard from "./PropertyCard";
import Filters from "./Filters";
import { loadFromLocal, saveToLocal } from "../utils/localStorage";

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
    view: "grid"
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
    list = list.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (filters.bedrooms > 0) list = list.filter((p) => p.bedrooms >= filters.bedrooms);
    if (filters.amenities.length) list = list.filter((p) => filters.amenities.every((a) => p.amenities.includes(a)));

    if (filters.sortBy === "price_low") list.sort((a, b) => a.price - b.price);
    else if (filters.sortBy === "price_high") list.sort((a, b) => b.price - a.price);
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
          {/* pass query & setQuery so Search lives inside Filters */}
          <Filters filters={filters} setFilters={setFilters} query={query} setQuery={setQuery} />
        </div>
      </aside>

      <section style={{ gridColumn: "1 / -1" }}>
        <div className="results-header">
          <div>{filtered.length} results</div>
          <div>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="select"
            >
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {filters.view === "map" ? (
          <div className="map-placeholder" style={{ marginBottom: 12 }}>
            Map placeholder — integrate leaflet or google maps here
          </div>
        ) : null}

        {filters.view === "list" ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {results.map((p) => (
              <div key={p.id} className="card list-card" style={{ padding: 0 }}>
                <PropertyCard property={p} isFav={favorites.includes(p.id)} onToggleFav={() => toggleFavorite(p.id)} view={"list"} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid-cards">
            {results.map((p) => (
              <div key={p.id} className="card property-card" style={{ padding: 0 }}>
                <PropertyCard property={p} isFav={favorites.includes(p.id)} onToggleFav={() => toggleFavorite(p.id)} view={"grid"} />
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
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
