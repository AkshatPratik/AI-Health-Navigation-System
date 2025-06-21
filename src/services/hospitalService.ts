import type { Hospital } from "../types/Hospital"

interface Location {
  lat: number
  lng: number
}

interface PlacesAPIResponse {
  predictions: Array<{
    placeId: string
    description: string
    distanceMeters?: number
    types?: string[]
    structuredFormat?: {
      mainText: string
    }
  }>
}

export const findNearbyHospitals = async (location: Location, emergencyType: string): Promise<Hospital[]> => {
  try {
    console.log("Searching for hospitals near:", location, "for emergency type:", emergencyType)

    // API request to find hospitals
    const response = await fetch("https://google-map-places-new-v2.p.rapidapi.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-FieldMask": "*",
        "x-rapidapi-host": "google-map-places-new-v2.p.rapidapi.com",
        "x-rapidapi-key": "88cf9bf963mshc7489e7f67ec14ep11ce1ejsncf5e1664ea49",
      },
      body: JSON.stringify({
        input: "Hospital",
        locationBias: {
          circle: {
            center: {
              latitude: location.lat,
              longitude: location.lng,
            },
            radius: 10000, // 10km radius
          },
        },
        includedPrimaryTypes: ["hospital", "health"],
        includeQueryPredictions: true,
      }),
    })

    if (!response.ok) {
      console.error("API response not OK:", response.status)
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data: PlacesAPIResponse = await response.json()
    console.log("API response:", data)

    // Transform API response to our Hospital type
    const hospitals: Hospital[] = data.predictions.map((prediction, index) => {
      // Calculate a pseudo-random location near the user for demonstration
      // In a real app, you would get the actual coordinates from a details API
      const randomOffset = () => (Math.random() - 0.5) * 0.05
      const hospitalLocation = {
        lat: location.lat + randomOffset(),
        lng: location.lng + randomOffset(),
      }

      // Calculate distance (this is an approximation)
      const distance = calculateDistance(location, hospitalLocation)

      // Generate realistic ETA based on distance
      const eta = Math.round(distance * 3) + Math.floor(Math.random() * 5)

      return {
        id: prediction.placeId || `h${index + 1}`,
        name: prediction.structuredFormat?.mainText || prediction.description,
        location: hospitalLocation,
        distance: distance,
        eta: eta,
        availability: Math.floor(Math.random() * 60) + 40, // Random availability between 40-100%
        specialists: Math.floor(Math.random() * 15) + 5, // Random number of specialists
        rating: Math.random() * 1.5 + 3.5, // Random rating between 3.5-5.0
        emergencyTypes: generateEmergencyTypes(emergencyType),
      }
    })

    console.log("Transformed hospitals:", hospitals)

    // If we got no results from the API, fall back to mock data
    if (hospitals.length === 0) {
      console.log("No hospitals found from API, using mock data")
      return getMockHospitals(location, emergencyType)
    }

    // Sort by a combination of distance, ETA, and availability score
    return hospitals.sort((a, b) => {
      // Calculate a score based on multiple factors
      const scoreA = a.distance * 0.3 + a.eta * 0.3 + (100 - a.availability) * 0.4
      const scoreB = b.distance * 0.3 + b.eta * 0.3 + (100 - b.availability) * 0.4
      return scoreA - scoreB
    })
  } catch (error) {
    console.error("Error fetching hospitals:", error)
    // Fall back to mock data if the API fails
    return getMockHospitals(location, emergencyType)
  }
}

// Generate a list of emergency types that includes the requested type
const generateEmergencyTypes = (requestedType: string): string[] => {
  const allTypes = ["cardiac", "trauma", "neurological", "respiratory", "pediatric", "poison", "general"]
  const result = [requestedType]

  // Always include general
  if (requestedType !== "general") {
    result.push("general")
  }

  // Add 1-3 random other types
  const numAdditional = Math.floor(Math.random() * 3) + 1
  const otherTypes = allTypes.filter((t) => t !== requestedType && t !== "general")

  for (let i = 0; i < numAdditional && i < otherTypes.length; i++) {
    const randomIndex = Math.floor(Math.random() * otherTypes.length)
    const type = otherTypes.splice(randomIndex, 1)[0]
    result.push(type)
  }

  return result
}

// Calculate distance using the Haversine formula
const calculateDistance = (point1: Location, point2: Location): number => {
  const R = 3958.8 // Earth's radius in miles
  const dLat = toRad(point2.lat - point1.lat)
  const dLon = toRad(point2.lng - point1.lng)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return Number(distance.toFixed(1))
}

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180)
}

// Fallback mock data function
const getMockHospitals = (location: Location, emergencyType: string): Hospital[] => {
  console.log("Using mock hospital data")
  const mockHospitals: Hospital[] = [
    {
      id: "h1",
      name: "Memorial General Hospital",
      location: { lat: location.lat + 0.02, lng: location.lng + 0.01 },
      distance: 1.2,
      eta: 8,
      availability: 85,
      specialists: 12,
      rating: 4.5,
      emergencyTypes: ["cardiac", "trauma", "neurological", "general"],
    },
    {
      id: "h2",
      name: "University Medical Center",
      location: { lat: location.lat - 0.01, lng: location.lng + 0.03 },
      distance: 2.4,
      eta: 15,
      availability: 65,
      specialists: 18,
      rating: 4.8,
      emergencyTypes: ["cardiac", "neurological", "respiratory", "pediatric", "general"],
    },
    {
      id: "h3",
      name: "Riverside Emergency Care",
      location: { lat: location.lat + 0.03, lng: location.lng - 0.02 },
      distance: 3.1,
      eta: 20,
      availability: 40,
      specialists: 8,
      rating: 4.2,
      emergencyTypes: ["trauma", "general", "poison"],
    },
    {
      id: "h4",
      name: "Downtown Health Center",
      location: { lat: location.lat - 0.02, lng: location.lng - 0.03 },
      distance: 4.5,
      eta: 28,
      availability: 95,
      specialists: 5,
      rating: 3.9,
      emergencyTypes: ["general", "respiratory", "poison"],
    },
    {
      id: "h5",
      name: "Children's Medical Institute",
      location: { lat: location.lat + 0.04, lng: location.lng + 0.05 },
      distance: 5.2,
      eta: 32,
      availability: 75,
      specialists: 15,
      rating: 4.7,
      emergencyTypes: ["pediatric", "general", "respiratory"],
    },
  ]

  // Filter hospitals by emergency type if specified
  let filteredHospitals = mockHospitals
  if (emergencyType !== "general") {
    filteredHospitals = mockHospitals.filter((hospital) => hospital.emergencyTypes.includes(emergencyType))
  }

  // Sort by a combination of distance, ETA, and availability score
  return filteredHospitals.sort((a, b) => {
    // Calculate a score based on multiple factors
    const scoreA = a.distance * 0.3 + a.eta * 0.3 + (100 - a.availability) * 0.4
    const scoreB = b.distance * 0.3 + b.eta * 0.3 + (100 - b.availability) * 0.4
    return scoreA - scoreB
  })
}
