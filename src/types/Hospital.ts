export interface Hospital {
  id: string
  name: string
  location: {
    lat: number
    lng: number
  }
  distance: number // in miles
  eta: number // in minutes
  availability: number // percentage of capacity available
  specialists: number // number of specialists available for the emergency type
  rating: number // out of 5
  emergencyTypes: string[] // types of emergencies the hospital can handle
}
