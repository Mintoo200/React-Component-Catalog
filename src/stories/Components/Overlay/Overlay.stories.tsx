import React, { useRef, useState } from 'react'
import { Story } from '@storybook/react'
import Overlay, { Props as OverlayProps } from '../../../lib/components/Overlay/Overlay'
import documentation from './Overlay.doc'

import './style.css'

export default {
  title: 'Components/Overlay/Overlay',
  component: Overlay,
  argTypes: {
    isOpen: {
      control: false,
    },
  },
  parameters: {
    controls: { hideNoControlsWarning: true },
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FOverlay%2FOverlay%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FOverlay%2Fstyle%2Ecss/raw?ref=master',
      ],
      language: 'javascript',
    },
    docs: {
      description: {
        component: documentation,
      },
    },
  },
}

const Template: Story<OverlayProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>Try Me!</button>
      <Overlay {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <div className="overlay-wrapper">
      <div
        className="overlay-content"
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
        onKeyPress={() => null}
        role="presentation">
        This is the content of the overlay.
        <br />
        Try clicking outside this box or pressing &lsquo;Esc&rsquo;!
      </div>
    </div>,
  ],
}

export const CustomModal = Template.bind({})
CustomModal.args = {
  children: [
    <div className="overlay-wrapper">
      <div
        className="modal"
        onClick={(event: React.MouseEvent) => event.stopPropagation()}
        onKeyPress={() => null}
        role="presentation">
        <div className="header">
          <h3>Welcome to my custom modal!</h3>
          <button
            className="quit"
            type="button"
            onClick={() => {
              // very dirty but Storybook's interface doesn't really
              // allow me to control my component
              const event = new KeyboardEvent('keydown', {
                key: 'Escape',
              })
              document.dispatchEvent(event)
            }}>
            x
          </button>
        </div>
        <hr />
        <div className="modal-content">
          There is an input for example:
          <br />
          <input placeholder="You can type in here if you want :)" />
          <br />
          also, a submit button that does nothing:
          <br />
          <button type="submit">Submit</button>
        </div>
      </div>
    </div>,
  ],
}

// Tutorial with custom template to allow refs

const TutorialComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const button = useRef(null)
  const offset = button.current && button.current.getBoundingClientRect()
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} ref={button}>Try Me!</button>
      <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          style={{
            position: 'fixed',
            top: offset && (offset.top + offset.height + 15),
            left: offset && offset.left,
          }}
          className="tutorial-bubble">
          When you click on this button, this tutorial pop-up appears
        </div>
      </Overlay>
    </>
  )
}

const Template2: Story<Record<string, never>> = (args) => <TutorialComponent {...args} />

const code = `
const TutorialComponent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const button = useRef(null)
  const offset = button.current && button.current.getBoundingClientRect()
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} ref={button}>Try Me!</button>
      <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div
          style={{
            position: 'fixed',
            top: offset && (offset.top + offset.height + 15),
            left: offset && offset.left,
          }}
          className="tutorial-bubble">
          When you click on this button, this tutorial pop-up appears
        </div>
      </Overlay>
    </>
  )
}
`

export const Tutorial = Template2.bind({})
Tutorial.args = {}
Tutorial.parameters = {
  docs: {
    source: {
      code,
    },
  },
}
