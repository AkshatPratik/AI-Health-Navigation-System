"use client"

import React from "react"
import { Ambulance, Heart, Menu, X } from "lucide-react"
import { useEmergencyContext } from "../context/EmergencyContext"

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const { emergencyState, dispatch } = useEmergencyContext()

  const handleReset = () => {
    dispatch({ type: "SET_STEP", payload: "selectEmergency" })
    setMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Ambulance className="h-8 w-8 text-accent-500" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">EmergencyPath</h1>
            {emergencyState.selectedEmergencyType && (
              <div className="ml-4 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium hidden md:block">
                {emergencyState.selectedEmergencyType.name} Emergency
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              New Emergency
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-slide-up">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <button
              onClick={handleReset}
              className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-primary-700 hover:text-primary-900 hover:bg-primary-50"
            >
              <Heart className="mr-3 h-5 w-5" />
              New Emergency
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
