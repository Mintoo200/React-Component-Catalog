import React from 'react'
import { shallow } from 'enzyme'
import TabList from '../TabList'
import Tab from '../Tab'
import NoContextError from '../../../../errors/NoContextError'

describe('Tab tests', (): void => {
  it('should throw when click on tab with no context', () => {
    const wrapper = shallow(
      <TabList>
        <Tab>Tab</Tab>
      </TabList>,
    )
    const tab = wrapper.find(Tab)
    expect(() => tab.simulate('click')).toThrow(NoContextError)
  })
})
