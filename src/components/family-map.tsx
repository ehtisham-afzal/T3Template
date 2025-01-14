"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

const familyMembers = [
  { id: 1, position: [34.5553, 69.2075], name: "Ehtisham" },
  { id: 2, position: [31.5204, 74.3587], name: "Zeeshan" },
  { id: 3, position: [24.8607, 67.0011], name: "Sinan" },
  { id: 4, position: [33.6844, 73.0479], name: "Rohan" },
]


export default function FamilyMap() {
  return (
    <MapContainer
      center={[30.3753, 69.3451]}
      zoom={5}
      style={{ height: "400px", width: "100%", borderRadius: "0.5rem" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {familyMembers.map((location) => (
        <Marker key={location.id} position={location.position as [number, number]}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
