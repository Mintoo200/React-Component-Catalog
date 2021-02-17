import React, { useState } from 'react';
import ErrorBanner from '../lib/components/ErrorBanner/ErrorBanner'
import Tabs from '../lib/components/Tabs/Tabs'
import Tab from '../lib/components/Tabs/Tab'

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
      <Tabs>
        <Tab label="This is the first tab">
          "This is the content of the tab"
        </Tab>
        <Tab label="This is the second tab">
          "This is the content of the second tab"
        </Tab>
      </Tabs>
    </div>
  )
}

export default App;
