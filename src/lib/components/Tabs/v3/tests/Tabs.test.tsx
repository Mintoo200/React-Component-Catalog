import React from 'react'
import { render, screen } from '@testing-library/react'
import Tabs from '../Tabs'
import Tab from '../Tab'
import TabList from '../TabList'
import TabContent from '../TabContent'

import '../../style.css'

describe('Tabs tests', (): void => {
  it('should render the content of the active tab', (): void => {
    render(
      <>
        <style>{'.hidden { display: none; }'}</style>
        <Tabs>
          <TabList>
            <Tab>Tab1</Tab>
            <Tab>Tab2</Tab>
          </TabList>
          <TabContent>
            <div>Content1</div>
            <div>Content2</div>
          </TabContent>
        </Tabs>
      </>,
    )
    expect(screen.getByText('Content1')).toBeVisible()
  })
  it('should render hidden tabs as hidden', (): void => {
    render(
      <>
        <style>{'.hidden { display: none; }'}</style>
        <Tabs>
          <TabList>
            <Tab>Tab1</Tab>
            <Tab>Tab2</Tab>
          </TabList>
          <TabContent>
            <div>Content1</div>
            <div>Content2</div>
          </TabContent>
        </Tabs>
      </>,
    )
    expect(screen.getByText('Content2')).not.toBeVisible()
  })
  it('should switch shown tab on click', (): void => {
    render(
      <>
        <style>{'.hidden { display: none; }'}</style>
        <Tabs>
          <TabList>
            <Tab>Tab1</Tab>
            <Tab>Tab2</Tab>
          </TabList>
          <TabContent>
            <div>Content1</div>
            <div>Content2</div>
          </TabContent>
        </Tabs>
      </>,
    )
    screen.getByText('Tab2').click()
    expect(screen.getByText('Content1')).not.toBeVisible()
    expect(screen.getByText('Content2')).toBeVisible()
  })
})
