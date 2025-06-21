"use client"

import React from "react"
import { Phone, Clock, Car, Users, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useEmergencyContext } from "../context/EmergencyContext"

export const RouteInfo: React.FC = () => {
  const { emergencyState } = useEmergencyContext()
  const { selectedHospital, route, selectedEmergencyType } = emergencyState

  if (!selectedHospital || !route) {
    return <div className="bg-white p-6 rounded-xl shadow-sm">Loading route information...</div>
  }

  // Simulate a hospital notification being sent
  const [notified, setNotified] = React.useState(false)
  const [callInitiated, setCallInitiated] = React.useState(false)

  const handleNotifyHospital = () => {
    // In a real app, this would trigger an API call to notify the hospital
    setNotified(true)
  }

  const handleEmergencyCall = () => {
    // In a real app, this would initiate a phone call
    setCallInitiated(true)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Route to Hospital</h2>
        <div className="mt-1 flex items-center space-x-1">
          <p className="text-lg font-medium text-primary-600">{selectedHospital.name}</p>
          <span className="text-gray-400">•</span>
          <p className="text-sm text-gray-600">{selectedEmergencyType?.name} emergency</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* ETA Information */}
        <div className="bg-primary-50 p-4 rounded-lg border border-primary-100">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="font-medium text-primary-700">Estimated Time of Arrival</h3>
          </div>
          <div className="ml-7">
            <p className="text-3xl font-bold text-primary-700">{selectedHospital.eta} min</p>
            <p className="text-sm text-primary-600 mt-1">Distance: {selectedHospital.distance.toFixed(1)} miles</p>
          </div>
        </div>

        {/* Route Information */}
        <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
          <div className="p-4">
            <div className="flex items-center mb-2">
              <Car className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-700">Traffic Conditions</h3>
            </div>
            <p className="ml-7 text-sm text-gray-600">
              {route.trafficLevel === "low"
                ? "Light traffic, optimal route selected"
                : route.trafficLevel === "medium"
                  ? "Moderate traffic, best alternative route selected"
                  : "Heavy traffic, delays expected"}
            </p>
          </div>

          <div className="p-4">
            <div className="flex items-center mb-2">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="font-medium text-gray-700">Medical Team Status</h3>
            </div>
            <p className="ml-7 text-sm text-gray-600">
              {selectedHospital.specialists} specialists for {selectedEmergencyType?.name} care available
            </p>
          </div>

          {route.trafficLevel === "high" && (
            <div className="p-4 bg-warning-50">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-5 w-5 text-warning-500 mr-2" />
                <h3 className="font-medium text-warning-700">Traffic Alert</h3>
              </div>
              <p className="ml-7 text-sm text-warning-600">
                Heavy traffic detected on route. Consider using emergency vehicle services if available.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleNotifyHospital}
            disabled={notified}
            className={`w-full flex items-center justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium transition-colors duration-200 ${
              notified
                ? "bg-success-500 text-white border-success-500 cursor-default"
                : "bg-accent-500 text-white border-accent-500 hover:bg-accent-600"
            }`}
          >
            {notified ? (
              <>
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Hospital Notified
              </>
            ) : (
              "Notify Hospital of Arrival"
            )}
          </button>

          <button
            onClick={handleEmergencyCall}
            disabled={callInitiated}
            className={`w-full flex items-center justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium transition-colors duration-200 ${
              callInitiated
                ? "bg-gray-300 text-gray-700 border-gray-300 cursor-default"
                : "bg-white text-accent-600 border-accent-300 hover:bg-accent-50"
            }`}
          >
            <Phone className="h-5 w-5 mr-2" />
            {callInitiated ? "Call Initiated..." : "Call Emergency Services"}
          </button>
        </div>
      </div>
    </div>
  )
}
