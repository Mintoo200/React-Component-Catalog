import React from 'react'
import { shallow } from 'enzyme'
import Tab from '../../Tab'

describe('Tab tests', (): void => {
  it('should render a button', () => {
    const wrapper = shallow(<Tab label="test" />)
    expect(wrapper).toContainMatchingElement('button')
  })
  it('should render its children in template', (): void => {
    const child = <div id="child" />
    const wrapper = shallow(<Tab label="test">{child}</Tab>)
    expect(wrapper.find('#child').parent()).toMatchSelector('template')
  })
})
