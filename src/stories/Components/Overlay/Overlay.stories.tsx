import React, { useLayoutEffect, useRef, useState } from 'react'
import { Story } from '@storybook/react'
import Overlay from '../../../lib/components/Overlay/Overlay'
import documentation from './Overlay.doc'

import './style.css'

export default {
  title: 'Components/Overlay/♿ Overlay',
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

function Example1Component({ isOpen = false }) {
  const ref = useRef<HTMLParagraphElement>()
  useLayoutEffect(() => {
    if (isOpen) {
      ref?.current?.focus()
    }
  }, [isOpen])
  return (
    /* eslint-disable-next-line max-len */
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    <div
      className="overlay-content"
      onClick={(event: React.MouseEvent) => event.stopPropagation()}
      role="dialog"
      aria-modal
      aria-labelledby="overlay-toggle-button"
      aria-describedby="overlay-content-1">
      <p id="overlay-content-1" ref={ref}>This is the content of the overlay.</p>
      <p>Try clicking outside this box or pressing &lsquo;Esc&rsquo;!</p>
    </div>
  )
}

const Template1: Story = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button type="button" id="overlay-toggle-button" onClick={() => setIsOpen(true)}>Try Me!</button>
      <Overlay {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="overlay-wrapper">
          <Example1Component isOpen={isOpen} />
        </div>
      </Overlay>
    </>
  )
}

export const Default = Template1.bind({})
Default.args = {}

function Modal({ isOpen = false }) {
  const ref = useRef<HTMLInputElement>()
  useLayoutEffect(() => {
    if (isOpen) {
      ref?.current?.focus()
    }
  }, [isOpen])
  return (
    /* eslint-disable-next-line max-len */
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
    <div
      className="modal"
      onClick={(event: React.MouseEvent) => event.stopPropagation()}
      onKeyPress={() => null}
      role="dialog"
      aria-modal
      aria-labelledby="modal-title">
      <div className="header">
        <h3 id="modal-title">Welcome to my custom modal!</h3>
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
        <input ref={ref} placeholder="You can type in here if you want :)" />
        <br />
        also, a submit button that does nothing:
        <br />
        <button type="submit">Submit</button>
      </div>
    </div>
  )
}

const ModalTemplate: Story = (args) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button type="button" id="overlay-toggle-button" onClick={() => setIsOpen(true)}>Try Me!</button>
      <Overlay {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="overlay-wrapper">
          <Modal isOpen={isOpen} />
        </div>
      </Overlay>
    </>
  )
}

export const CustomModal = ModalTemplate.bind({})
CustomModal.args = {}

// Tutorial with custom template to allow refs

function TutorialComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const button = useRef(null)
  const focusRef = useRef(null)
  useLayoutEffect(() => {
    if (isOpen) {
      focusRef?.current?.focus()
    }
  }, [isOpen])
  const offset = button?.current?.getBoundingClientRect()
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
          className="tutorial-bubble"
          role="dialog"
          aria-modal
          aria-labelledby="overlay-toggle-button"
          aria-describedby="overlay-content-2">
          <p ref={focusRef} id="overlay-content-2">When you click on this button, this tutorial pop-up appears</p>
        </div>
      </Overlay>
    </>
  )
}

const Template2: Story = () => <TutorialComponent />

const code = `
function TutorialComponent() {
  const [isOpen, setIsOpen] = useState(false)
  const button = useRef(null)
  const focusRef = useRef(null)
  useLayoutEffect(() => {
    if (isOpen) {
      focusRef?.current?.focus()
    }
  }, [isOpen])
  const offset = button?.current?.getBoundingClientRect()
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
          className="tutorial-bubble"
          role="dialog"
          aria-modal
          aria-labelledby="overlay-toggle-button"
          aria-describedby="overlay-content-2">
          <p ref={focusRef} id="overlay-content-2">When you click on this button, this tutorial pop-up appears</p>
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
