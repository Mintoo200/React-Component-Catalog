import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'
import '@testing-library/jest-dom/extend-expect'

Enzyme.configure({ adapter: new Adapter() })

/* eslint-disable no-console */
const previousConsole = console.error
console.error = (message: string) => {
  previousConsole(message)
  throw new Error(message)
}
/* eslint-enable no-console */
