import React, { useState } from 'react';
import ErrorBanner from '../lib/components/ErrorBanner/ErrorBanner'

const App = () => {
  const [error, setError] = useState(null)
  // capture Console.error to add error banner
  const previousConsole = console.error
  console.error = (message) => {
    setError(message)
    return previousConsole(message)
  }
  return (
    <div>
      {error && <ErrorBanner message={error} />}
    </div>
  )
}

export default App;
