import React from 'react'
import { shallow } from 'enzyme'
import Tabs from '../Tabs'
import Tab from '../Tab'

describe('Tabs tests', () => {
  it('should render the Tabs', () => {
    const wrapper = shallow(
      <Tabs>
        <Tab label="Salut">
          Content
        </Tab>
        <Tab label="Salut 2">
          Content 2
        </Tab>
      </Tabs>,
    )
    expect(wrapper).toContainMatchingElements(2, Tab)
  })
  it('should render the content of the tabs', () => {
    const wrapper = shallow(
      <Tabs>
        <Tab label="Salut">
          Content
        </Tab>
        <Tab label="Salut 2">
          Content 2
        </Tab>
      </Tabs>,
    )
    expect(wrapper).toIncludeText('Content')
  })
  it('should render hidden tabs as hidden', () => {
    const wrapper = shallow(
      <Tabs>
        <Tab label="Salut">
          Content
        </Tab>
        <Tab label="Salut 2">
          Content 2
        </Tab>
      </Tabs>,
    )
    expect(wrapper).toContainExactlyOneMatchingElement('.content-hidden')
  })
  it('should switch shown tab on click', () => {
    const wrapper = shallow(
      <Tabs>
        <Tab label="Salut">
          Content
        </Tab>
        <Tab label="Salut 2">
          Content 2
        </Tab>
      </Tabs>,
    )
    wrapper.find(Tab).last().simulate('click')
    const firstTab = wrapper.find('.content').first()
    expect(firstTab).toHaveClassName('content-hidden')
  })
})
