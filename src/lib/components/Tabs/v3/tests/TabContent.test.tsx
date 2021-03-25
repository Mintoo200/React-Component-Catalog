import React from 'react'
import { shallow } from 'enzyme'
import TabContent from '../TabContent'
import { Context } from '../Tabs'

describe('Tab tests', (): void => {
  it('should render only the active tab', () => {
    const wrapper = shallow(
      <TabContent>
        <div>Content1</div>
        <div>Content2</div>
      </TabContent>,
      { Context },
    )
    expect(wrapper).not.toIncludeText('Content2')
  })
})
