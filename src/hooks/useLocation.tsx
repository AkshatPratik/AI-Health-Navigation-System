"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"

interface Location {
  lat: number
  lng: number
}

interface LocationPickerProps {
  onLocationSelect: (location: Location) => void
  initialLocation?: Location
}

export const LocationPicker: React.FC<LocationPickerProps> = ({ onLocationSelect, initialLocation }) => {
  const [position, setPosition] = useState<Location | null>(initialLocation || null)

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const newPos = { lat: e.latlng.lat, lng: e.latlng.lng }
        setPosition(newPos)
        onLocationSelect(newPos)
      },
    })

    return position ? <Marker position={[position.lat, position.lng]} /> : null
  }

  return (
    <div className="h-[400px] rounded-xl overflow-hidden shadow-sm">
      <MapContainer center={initialLocation || [40.7128, -74.006]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  )
}

export const useLocation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCurrentLocation = useCallback((): Promise<Location> => {
    return new Promise((resolve, reject) => {
      setLoading(true)
      setError(null)

      if (!navigator.geolocation) {
        setLoading(false)
        const error = "Geolocation is not supported by your browser"
        setError(error)
        reject(new Error(error))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false)
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (err) => {
          setLoading(false)
          const errorMessage = `Error getting location: ${err.message}`
          setError(errorMessage)
          reject(new Error(errorMessage))
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
      )
    })
  }, [])

  return {
    getCurrentLocation,
    loading,
    error,
  }
}
