import { useState } from 'react'

let lastID = 0
export default function useID(): number {
  const [id] = useState(lastID)
  lastID += 1
  return id
}
