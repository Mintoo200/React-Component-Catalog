import '@testing-library/jest-dom/extend-expect'

/* eslint-disable no-console */
const previousConsole = console.error
console.error = (message: string) => {
  previousConsole(message)
  throw new Error(message)
}
/* eslint-enable no-console */
