"use client"

import type React from "react"
import { MapPin, Crosshair } from "lucide-react"
import { LocationPicker } from "../hooks/useLocation"
import { useEmergencyContext } from "../context/EmergencyContext"

export const LocationSelector: React.FC = () => {
  const { emergencyState, dispatch } = useEmergencyContext()
  const { currentLocation, error } = emergencyState

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    dispatch({ type: "SET_CURRENT_LOCATION", payload: location })
  }

  const handleContinue = () => {
    if (currentLocation) {
      dispatch({ type: "SET_STEP", payload: "selectEmergency" })
    }
  }

  const handleUseCurrentLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      handleLocationSelect({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Unable to get your location. Please select manually or try again.",
      })
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Where are you?</h2>
        <p className="mt-2 text-lg text-gray-600">Select your location to find nearby hospitals</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-error-50 border border-error-500 rounded-md">
          <p className="text-error-500">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <button
          onClick={handleUseCurrentLocation}
          className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Crosshair className="mr-2 h-5 w-5 text-gray-400" />
          Use my current location
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-gray-50 text-sm text-gray-500">or select on map</span>
          </div>
        </div>

        <LocationPicker onLocationSelect={handleLocationSelect} initialLocation={currentLocation || undefined} />

        <button
          onClick={handleContinue}
          disabled={!currentLocation}
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <MapPin className="mr-2 h-5 w-5" />
          Continue with selected location
        </button>
      </div>
    </div>
  )
}
