import React from 'react'
import { shallow } from 'enzyme'
import Tabs from '../Tabs'
import Tab from '../Tab'

describe('Tabs tests', (): void => {
  it('should render the Tabs', (): void => {
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
    // Here is why I don't like TS:
    // The following error is caused by the selector type being "string"
    // Where it is strongly recommended to use the constructor instead of the name
    expect(wrapper).toContainMatchingElements(2, 'Tab')
  })
  it('should render the content of the tabs', (): void => {
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
  it('should render hidden tabs as hidden', (): void => {
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
  it('should switch shown tab on click', (): void => {
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
