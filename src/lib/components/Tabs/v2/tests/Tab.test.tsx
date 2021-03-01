import React from 'react'
import { shallow } from 'enzyme'
import Tab from '../Tab'

describe('Tab tests', (): void => {
  it('should render a button', () => {
    const wrapper = shallow(<Tab>Tab</Tab>)
    expect(wrapper).toContainMatchingElement('button')
  })
})
