
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ points = [] }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [20.5937, 78.9629],
        zoom: 5,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    points.forEach((p) => {
      if (p.location) {
        const marker = L.marker([p.location.lat, p.location.lng]).addTo(
          mapRef.current
        );
        marker.bindPopup(`<b>${p.title}</b><br/>₹${p.price.toLocaleString()}`);
      }
    });

    if (points.length > 0) {
      const group = L.featureGroup(
        points.map((p) => L.marker([p.location.lat, p.location.lng]))
      );
      mapRef.current.fitBounds(group.getBounds().pad(0.2));
    }
  }, [points]);

  return (
    <div
      id="map"
      style={{ height: "500px", width: "100%", marginTop: "16px" }}
    />
  );
}
