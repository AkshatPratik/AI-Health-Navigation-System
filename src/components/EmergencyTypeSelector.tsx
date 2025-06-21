"use client"

import type React from "react"
import { Heart, Stethoscope, Bone, Brain, Pill, Thermometer, Skull } from "lucide-react"
import { useEmergencyContext } from "../context/EmergencyContext"
import type { EmergencyType } from "../types/EmergencyType"
import { findNearbyHospitals } from "../services/hospitalService"

export const EmergencyTypeSelector: React.FC = () => {
  const { emergencyState, dispatch } = useEmergencyContext()

  const emergencyTypes: EmergencyType[] = [
    {
      id: "cardiac",
      name: "Cardiac",
      icon: <Heart className="h-10 w-10 mb-3 text-accent-500" />,
      description: "Heart attack, chest pain, or other heart-related emergencies",
    },
    {
      id: "trauma",
      name: "Trauma",
      icon: <Bone className="h-10 w-10 mb-3 text-accent-500" />,
      description: "Severe injuries, fractures, or accidents",
    },
    {
      id: "neurological",
      name: "Neurological",
      icon: <Brain className="h-10 w-10 mb-3 text-accent-500" />,
      description: "Stroke, seizure, or other brain-related emergencies",
    },
    {
      id: "respiratory",
      name: "Respiratory",
      icon: <Stethoscope className="h-10 w-10 mb-3 text-accent-500" />,
      description: "Breathing difficulties, asthma attacks, or COPD exacerbations",
    },
    {
      id: "pediatric",
      name: "Pediatric",
      icon: <Thermometer className="h-10 w-10 mb-3 text-accent-500" />,
      description: "Emergencies involving children",
    },
    {
      id: "poison",
      name: "Poisoning",
      icon: <Pill className="h-10 w-10 mb-3 text-accent-500" />,
      description: "Ingestion of toxic substances or drug overdoses",
    },
    {
      id: "general",
      name: "General",
      icon: <Skull className="h-10 w-10 mb-3 text-accent-500" />,
      description: "General medical emergencies",
    },
  ]

  const handleEmergencySelect = async (emergencyType: EmergencyType) => {
    dispatch({ type: "SET_EMERGENCY_TYPE", payload: emergencyType })

    if (emergencyState.currentLocation) {
      try {
        // Set a loading message
        dispatch({
          type: "SET_ERROR",
          payload: "Searching for hospitals that specialize in " + emergencyType.name + " care...",
        })

        const hospitals = await findNearbyHospitals(emergencyState.currentLocation, emergencyType.id)

        // Clear any error message
        dispatch({ type: "SET_ERROR", payload: null })

        dispatch({ type: "SET_NEARBY_HOSPITALS", payload: hospitals })
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: "Error finding nearby hospitals. Please try again.",
        })
        dispatch({ type: "SET_STEP", payload: "selectEmergency" })
      }
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">What's the emergency?</h2>
        <p className="mt-2 text-lg text-gray-600">Select the type of emergency to find the most suitable hospital</p>
      </div>

      {emergencyState.error && (
        <div className="mb-6 p-4 bg-error-500 bg-opacity-10 border border-error-500 rounded-md">
          <p className="text-error-500">{emergencyState.error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleEmergencySelect(type)}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col items-center text-center border border-gray-200 hover:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {type.icon}
            <h3 className="text-xl font-semibold text-gray-800">{type.name}</h3>
            <p className="mt-2 text-gray-600 text-sm">{type.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
