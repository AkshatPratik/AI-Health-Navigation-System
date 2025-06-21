"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { Hospital } from "../types/Hospital"
import type { EmergencyType } from "../types/EmergencyType"
import type { Route } from "../types/Route"

type EmergencyStep = "selectLocation" | "selectEmergency" | "findingHospitals" | "selectHospital" | "showRoute"

interface EmergencyState {
  currentStep: EmergencyStep
  currentLocation: { lat: number; lng: number } | null
  selectedEmergencyType: EmergencyType | null
  nearbyHospitals: Hospital[]
  selectedHospital: Hospital | null
  route: Route | null
  error: string | null
}

type EmergencyAction =
  | { type: "SET_EMERGENCY_TYPE"; payload: EmergencyType }
  | { type: "SET_CURRENT_LOCATION"; payload: { lat: number; lng: number } }
  | { type: "SET_NEARBY_HOSPITALS"; payload: Hospital[] }
  | { type: "SELECT_HOSPITAL"; payload: Hospital }
  | { type: "SET_ROUTE"; payload: Route }
  | { type: "SET_STEP"; payload: EmergencyStep }
  | { type: "SET_ERROR"; payload: string }

const initialState: EmergencyState = {
  currentStep: "selectLocation",
  currentLocation: null,
  selectedEmergencyType: null,
  nearbyHospitals: [],
  selectedHospital: null,
  route: null,
  error: null,
}

const emergencyReducer = (state: EmergencyState, action: EmergencyAction): EmergencyState => {
  switch (action.type) {
    case "SET_EMERGENCY_TYPE":
      return {
        ...state,
        selectedEmergencyType: action.payload,
        currentStep: "findingHospitals",
      }
    case "SET_CURRENT_LOCATION":
      return {
        ...state,
        currentLocation: action.payload,
        error: null,
      }
    case "SET_NEARBY_HOSPITALS":
      return {
        ...state,
        nearbyHospitals: action.payload,
        currentStep: action.payload.length > 0 ? "selectHospital" : state.currentStep,
        error: action.payload.length === 0 ? "No hospitals found nearby" : null,
      }
    case "SELECT_HOSPITAL":
      return {
        ...state,
        selectedHospital: action.payload,
        currentStep: "showRoute",
      }
    case "SET_ROUTE":
      return {
        ...state,
        route: action.payload,
      }
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.payload,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

interface EmergencyContextProps {
  emergencyState: EmergencyState
  dispatch: React.Dispatch<EmergencyAction>
}

const EmergencyContext = createContext<EmergencyContextProps | undefined>(undefined)

export const EmergencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [emergencyState, dispatch] = useReducer(emergencyReducer, initialState)

  return <EmergencyContext.Provider value={{ emergencyState, dispatch }}>{children}</EmergencyContext.Provider>
}

export const useEmergencyContext = (): EmergencyContextProps => {
  const context = useContext(EmergencyContext)
  if (!context) {
    throw new Error("useEmergencyContext must be used within an EmergencyProvider")
  }
  return context
}
