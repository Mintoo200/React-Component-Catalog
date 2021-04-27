import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Tabs from '../Tabs'
import Tab from '../Tab'

import '../../style.css'

describe('Tabs tests', (): void => {
  it('should render the content of the active tab', (): void => {
    render(
      <>
        <style>{'.hidden { display: none; }'}</style>
        <Tabs>
          <Tab label="Salut">
            Content
          </Tab>
          <Tab label="Salut 2">
            Content 2
          </Tab>
        </Tabs>
      </>,
    )
    expect(screen.getByText('Content')).toBeVisible()
  })
  it('should render hidden tabs as hidden', (): void => {
    render(
      <>
        <style>{'.hidden { display: none; }'}</style>
        <Tabs>
          <Tab label="Salut">
            Content
          </Tab>
          <Tab label="Salut 2">
            Content 2
          </Tab>
        </Tabs>
      </>,
    )
    expect(screen.getByText('Content 2')).not.toBeVisible()
  })
  it('should switch shown tab on click', (): void => {
    render(
      <>
        <style>{'.hidden { display: none; }'}</style>
        <Tabs>
          <Tab label="Salut">
            Content
          </Tab>
          <Tab label="Salut 2">
            Content 2
          </Tab>
        </Tabs>
      </>,
    )
    userEvent.click(screen.getByText('Salut 2'))
    expect(screen.getByText('Content')).not.toBeVisible()
    expect(screen.getByText('Content 2')).toBeVisible()
  })
})
