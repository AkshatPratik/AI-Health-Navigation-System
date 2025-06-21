"use client"

import type React from "react"
import { Star, Clock, MapPin, Building2, Users } from "lucide-react"
import { useEmergencyContext } from "../context/EmergencyContext"
import { calculateRoute } from "../services/routeService"

export const HospitalList: React.FC = () => {
  const { emergencyState, dispatch } = useEmergencyContext()
  const { nearbyHospitals, currentLocation, selectedEmergencyType } = emergencyState

  const handleHospitalSelect = async (hospitalId: string) => {
    const hospital = nearbyHospitals.find((h) => h.id === hospitalId)
    if (hospital && currentLocation) {
      dispatch({ type: "SELECT_HOSPITAL", payload: hospital })

      try {
        const route = await calculateRoute(currentLocation, hospital.location)
        dispatch({ type: "SET_ROUTE", payload: route })
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Error calculating route. Please try again.",
        })
      }
    }
  }

  const getAvailabilityColor = (availability: number) => {
    if (availability >= 75) return "text-success-500"
    if (availability >= 30) return "text-warning-500"
    return "text-error-500"
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Nearby Hospitals</h2>
        <p className="text-gray-600 text-sm">
          Showing hospitals equipped for {selectedEmergencyType?.name} emergencies
        </p>
      </div>

      {nearbyHospitals.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No hospitals found that specialize in {selectedEmergencyType?.name} care in your area.
          </p>
          <p className="text-gray-500 mt-2">Please try a different emergency type or location.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
          {nearbyHospitals.map((hospital) => (
            <button
              key={hospital.id}
              onClick={() => handleHospitalSelect(hospital.id)}
              className="w-full text-left block bg-white rounded-lg border border-gray-200 p-4 hover:border-primary-300 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">{hospital.name}</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" fill="#FBBF24" />
                  <span className="text-sm font-medium">{hospital.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="mt-2 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span>{hospital.distance.toFixed(1)} miles away</span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  <span>ETA: {hospital.eta} min</span>
                </div>

                <div className="flex items-center text-sm">
                  <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                  <span className={getAvailabilityColor(hospital.availability)}>
                    {hospital.availability}% capacity available
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2 text-gray-400" />
                  <span>
                    {hospital.specialists} specialists for {selectedEmergencyType?.name} care
                  </span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="text-primary-600 text-sm font-medium">Select for directions →</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
