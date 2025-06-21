import type { Route } from "../types/Route"

interface Location {
  lat: number
  lng: number
}

// This is a mock service - in a real app, this would use the Google Maps Directions API
export const calculateRoute = async (origin: Location, destination: Location): Promise<Route> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Calculate the path using a simplified version of the A* algorithm
  // In a real app, this would come from the Maps API
  const path = generatePath(origin, destination)

  // Randomly select a traffic level for demo purposes
  const trafficLevels = ["low", "medium", "high"] as const
  const trafficLevel = trafficLevels[Math.floor(Math.random() * trafficLevels.length)]

  return {
    path,
    distance: calculateDistance(origin, destination),
    duration: Math.floor(calculateDistance(origin, destination) * 4), // rough estimate: 4 min per mile
    trafficLevel,
  }
}

// Generate a path between two points (simplified for demo)
const generatePath = (origin: Location, destination: Location): [number, number][] => {
  const path: [number, number][] = []

  // Start with the origin
  path.push([origin.lat, origin.lng])

  // Generate some waypoints to make the path look realistic
  const steps = 8
  for (let i = 1; i < steps; i++) {
    const progress = i / steps

    // Add some randomness to make the path look more natural
    const jitter = 0.002 * (Math.random() - 0.5)

    path.push([
      origin.lat + (destination.lat - origin.lat) * progress + jitter,
      origin.lng + (destination.lng - origin.lng) * progress + jitter,
    ])
  }

  // End with the destination
  path.push([destination.lat, destination.lng])

  return path
}

// Calculate distance using the Haversine formula (for demo purposes)
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
