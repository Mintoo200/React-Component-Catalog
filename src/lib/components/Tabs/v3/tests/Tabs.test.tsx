import React from 'react'
import { shallow } from 'enzyme'
import Tabs from '../Tabs'
import Tab from '../Tab'
import TabList from '../TabList'
import TabContent from '../TabContent'

describe('Tabs tests', (): void => {
  it('should render a context', () => {
    const wrapper = shallow(
      <Tabs>
        <TabList>
          <Tab>Tab1</Tab>
          <Tab>Tab2</Tab>
        </TabList>
        <TabContent>
          <div>Content1</div>
          <div>Content2</div>
        </TabContent>
      </Tabs>,
    )
    expect(wrapper).toContainMatchingElement('ContextProvider')
  })
})
