import React from 'react'
import { shallow } from 'enzyme'
import Tab from '../Tab'

describe('Tab tests', () => {
  it('should render a button', () => {
    const wrapper = shallow(<Tab />)
    expect(wrapper).toContainMatchingElement('button')
  })
  it('should not render its children', () => {
    const child = <div id="child" />
    const wrapper = shallow(<Tab>{child}</Tab>)
    expect(wrapper).not.toContainReact(child)
  })
})
