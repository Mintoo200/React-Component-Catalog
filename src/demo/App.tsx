import React, { useState } from 'react'
import ErrorBanner from '../lib/components/ErrorBanner/ErrorBanner'
import Tabs from '../lib/components/Tabs/v1/Tabs'
import Tab from '../lib/components/Tabs/v1/Tab'

const App: React.FC = () => {
  const [error, setError] = useState(null)
  // capture Console.error to add error banner
  /* eslint-disable no-console */
  const previousConsole = console.error
  console.error = (message: string) => {
    setError(message)
    return previousConsole(message)
  }
  /* eslint-enable no-console */
  return (
    <div>
      {error && <ErrorBanner message={error} />}
      <Tabs>
        <Tab label="This is the first tab">
          This is the content of the tab
        </Tab>
        <Tab label="This is the second tab">
          This is the content of the second tab
        </Tab>
      </Tabs>
    </div>
  )
}

export default App
