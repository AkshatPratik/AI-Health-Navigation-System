"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet"
import L from "leaflet"
import { useEmergencyContext } from "../context/EmergencyContext"
import type { Hospital } from "../types/Hospital"

// Define custom marker icons
const currentLocationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const hospitalIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

const selectedHospitalIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

// Component to recenter the map view
const MapUpdater: React.FC<{
  center: [number, number]
  hospitals: Hospital[]
  selectedHospital: Hospital | null
}> = ({ center, hospitals, selectedHospital }) => {
  const map = useMap()

  useEffect(() => {
    // Center the map on the current location
    map.setView(center, 13)

    // If we have hospitals and a selected hospital, fit bounds to include them
    if (selectedHospital) {
      const bounds = L.latLngBounds([center, [selectedHospital.location.lat, selectedHospital.location.lng]])
      map.fitBounds(bounds, { padding: [50, 50] })
    } else if (hospitals.length > 0) {
      const points = [center, ...hospitals.map((h) => [h.location.lat, h.location.lng] as [number, number])]
      map.fitBounds(L.latLngBounds(points), { padding: [50, 50] })
    }
  }, [map, center, hospitals, selectedHospital])

  return null
}

interface MapViewProps {
  showRoute?: boolean
}

export const MapView: React.FC<MapViewProps> = ({ showRoute = false }) => {
  const { emergencyState } = useEmergencyContext()
  const { currentLocation, nearbyHospitals, selectedHospital, route } = emergencyState
  const mapRef = useRef<L.Map | null>(null)

  // If no current location yet, show a placeholder
  if (!currentLocation) {
    return (
      <div className="bg-gray-100 animate-pulse h-[400px] md:h-[600px] rounded-xl flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    )
  }

  const center: [number, number] = [currentLocation.lat, currentLocation.lng]

  return (
    <div className="h-[400px] md:h-[600px] bg-white rounded-xl shadow-sm overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Current location marker */}
        <Marker position={center} icon={currentLocationIcon}>
          <Popup>Your current location</Popup>
        </Marker>

        {/* Hospital markers */}
        {!showRoute &&
          nearbyHospitals.map((hospital) => (
            <Marker key={hospital.id} position={[hospital.location.lat, hospital.location.lng]} icon={hospitalIcon}>
              <Popup>
                <div>
                  <h3 className="font-medium">{hospital.name}</h3>
                  <p className="text-sm">{hospital.distance.toFixed(1)} miles away</p>
                  <p className="text-sm">ETA: {hospital.eta} min</p>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* Selected hospital marker */}
        {showRoute && selectedHospital && (
          <Marker position={[selectedHospital.location.lat, selectedHospital.location.lng]} icon={selectedHospitalIcon}>
            <Popup>
              <div>
                <h3 className="font-medium">{selectedHospital.name}</h3>
                <p className="text-sm">{selectedHospital.distance.toFixed(1)} miles away</p>
                <p className="text-sm">ETA: {selectedHospital.eta} min</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Route polyline */}
        {showRoute && route && <Polyline positions={route.path} color="#0070F3" weight={5} opacity={0.7} />}

        <MapUpdater center={center} hospitals={nearbyHospitals} selectedHospital={selectedHospital} />
      </MapContainer>
    </div>
  )
}
