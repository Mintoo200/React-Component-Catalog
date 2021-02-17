import React from 'react'
import {shallow} from 'enzyme'
import Banner from '../ErrorBanner'

describe('Error Banner tests', () => {
  it('should render', () => {
    const wrapper = shallow(<Banner />)
    expect(wrapper).toExist()
  })
  it('should render the message when provided', () => {
    const message = "This is a message"
    const wrapper = shallow(<Banner message={message} />)
    expect(wrapper).toIncludeText(message)
  })
  it('should render the children when provided', () => {
    const child = <div id="child" />
    const wrapper = shallow(<Banner>{child}</Banner>)
    expect(wrapper).toContainReact(child)
  })
})