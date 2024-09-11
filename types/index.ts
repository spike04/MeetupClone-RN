export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  image_uri: string
}

export interface Attendance {
  created_at: string
  event_id: number
  id: number
  user_id: string
}
