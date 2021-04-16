import React from 'react'
import { shallow } from 'enzyme'
import TabList from '../TabList'
import Tab from '../Tab'
import NoContextError from '../../../../errors/NoContextError'

describe('Tab tests', (): void => {
  it('should throw when rendering with no context', () => {
    expect(() => shallow(
      <TabList>
        <Tab>Tab</Tab>
      </TabList>,
    )).toThrow(NoContextError)
  })
})
