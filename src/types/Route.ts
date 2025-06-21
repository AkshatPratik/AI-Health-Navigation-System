export interface Route {
  path: [number, number][] // array of [lat, lng] coordinates
  distance: number // in miles
  duration: number // in minutes
  trafficLevel: "low" | "medium" | "high"
}
