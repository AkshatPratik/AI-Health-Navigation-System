import { EmergencyTypeSelector } from "./components/EmergencyTypeSelector"
import { LocationSelector } from "./components/LocationSelector"
import { MapView } from "./components/MapView"
import { HospitalList } from "./components/HospitalList"
import { RouteInfo } from "./components/RouteInfo"
import { Header } from "./components/Header"
import { useEmergencyContext } from "./context/EmergencyContext"

function App() {
  const { emergencyState } = useEmergencyContext()
  const { currentStep } = emergencyState

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:px-6 md:py-8 lg:px-8">
        {currentStep === "selectLocation" && <LocationSelector />}

        {currentStep === "selectEmergency" && <EmergencyTypeSelector />}

        {currentStep === "findingHospitals" && (
          <div className="animate-pulse-slow flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-primary-100 mb-4">
                <div className="w-12 h-12 rounded-full border-4 border-primary-500 border-t-transparent animate-spin"></div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Finding nearby hospitals...</h2>
              <p className="text-gray-600 mt-2">Please wait while we search for suitable facilities</p>
            </div>
          </div>
        )}

        {currentStep === "selectHospital" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <HospitalList />
            </div>
            <div className="lg:col-span-2">
              <MapView />
            </div>
          </div>
        )}

        {currentStep === "showRoute" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <RouteInfo />
            </div>
            <div className="lg:col-span-2">
              <MapView showRoute={true} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
