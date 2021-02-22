import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import 'jest-enzyme'

Enzyme.configure({ adapter: new Adapter() })

/* eslint-disable */
const previousConsole = console.error
console.error = (message) => {
  previousConsole(message)
  throw new Error(message)
}
