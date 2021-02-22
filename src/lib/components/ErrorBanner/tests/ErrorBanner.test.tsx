import React from 'react'
import { shallow } from 'enzyme'
import Banner from '../ErrorBanner'

describe('Error Banner tests', (): void => {
  it('should render', (): void => {
    const wrapper = shallow(<Banner />)
    expect(wrapper).toExist()
  })
  it('should render the message when provided', (): void => {
    const message = 'This is a message'
    const wrapper = shallow(<Banner message={message} />)
    expect(wrapper).toIncludeText(message)
  })
  it('should render the children when provided', (): void => {
    const child = <div id="child" />
    const wrapper = shallow(<Banner>{child}</Banner>)
    expect(wrapper).toContainReact(child)
  })
})
