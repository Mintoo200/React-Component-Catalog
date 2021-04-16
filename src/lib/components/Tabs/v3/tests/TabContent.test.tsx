import React from 'react'
import { shallow } from 'enzyme'
import TabContent from '../TabContent'
import Tabs from '../Tabs'

describe('Tab tests', (): void => {
  it('should render only the active tab', () => {
    const wrapper = shallow(
      <Tabs>
        <TabContent>
          <div>Content1</div>
          <div>Content2</div>
        </TabContent>
      </Tabs>,
    )
    expect(wrapper).not.toIncludeText('Content2')
  })
})
