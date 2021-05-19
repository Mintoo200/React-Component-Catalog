import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AutoComplete from '../AutoComplete'
import Input from '../Input'
import Options from '../Options'
import Option from '../Option'

function renderWithStyle(ui: React.ReactElement, ...args: unknown[]) {
  return render(
    <>
      <style>{'.hidden { display: none; }'}</style>
      {ui}
    </>,
    ...args,
  )
}
const onSubmit = jest.fn()

describe('AutoComplete tests', () => {
  it('should display the list only if focussed', () => {
    renderWithStyle(
      <>
        <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
        <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
          <Input />
          <Options>
            <Option>Value</Option>
          </Options>
        </AutoComplete>
      </>,
    )
    const input = screen.getByRole('textbox')
    const list = screen.getByText('Value')
    expect(input).not.toHaveFocus()
    expect(list).not.toBeVisible()
    input.focus()
    expect(input).toHaveFocus()
    expect(list).toBeVisible()
  })
  it('should filter the list when typing in the input field', () => {
    renderWithStyle(
      <>
        <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
        <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
          <Input />
          <Options>
            <Option>First value</Option>
            <Option>Second value</Option>
          </Options>
        </AutoComplete>
      </>,
    )
    const input = screen.getByRole('textbox')
    const first = screen.getByText('First value')
    const second = screen.getByText('Second value')
    input.focus()
    expect(input).toHaveFocus()
    expect(first).toBeVisible()
    expect(second).toBeVisible()
    userEvent.type(input, 'Second')
    expect(first).not.toBeVisible()
    expect(second).toBeVisible()
  })
  it('should filter the list on text and value', () => {
    renderWithStyle(
      <>
        <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
        <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
          <Input />
          <Options>
            <Option>First value</Option>
            <Option value="Second value">Hello</Option>
            <Option value="Hello">Third value</Option>
          </Options>
        </AutoComplete>
      </>,
    )
    const input = screen.getByRole('textbox')
    const first = screen.getByText('First value')
    const second = screen.getByText('Hello')
    const third = screen.getByText('Third value')
    input.focus()
    expect(input).toHaveFocus()
    expect(first).toBeVisible()
    expect(second).toBeVisible()
    expect(third).toBeVisible()
    userEvent.type(input, 'value')
    expect(first).toBeVisible()
    expect(second).toBeVisible()
    expect(third).toBeVisible()
  })
  it('should ignore the case when filtering', () => {
    renderWithStyle(
      <>
        <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
        <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
          <Input />
          <Options>
            <Option>Value</Option>
          </Options>
        </AutoComplete>
      </>,
    )
    const input = screen.getByRole('textbox')
    const option = screen.getByText('Value')
    input.focus()
    expect(input).toHaveFocus()
    expect(option).toBeVisible()
    userEvent.type(input, 'vaLUe')
    expect(option).toBeVisible()
  })
  it('should call onSubmit on click with the text if no value provided', () => {
    renderWithStyle(
      <>
        <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
        <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
          <Input />
          <Options>
            <Option>Text</Option>
          </Options>
        </AutoComplete>
      </>,
    )
    const input = screen.getByRole('textbox')
    const value = screen.getByText('Text')
    input.focus()
    expect(input).toHaveFocus()
    expect(value).toBeVisible()
    userEvent.click(value)
    expect(onSubmit).toHaveBeenCalledWith('Text')
  })
  it('should call onSubmit on click with the value if provided', () => {
    renderWithStyle(
      <>
        <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
        <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
          <Input />
          <Options>
            <Option value="Value">Text</Option>
          </Options>
        </AutoComplete>
      </>,
    )
    const input = screen.getByRole('textbox')
    const value = screen.getByText('Text')
    input.focus()
    expect(input).toHaveFocus()
    expect(value).toBeVisible()
    userEvent.click(value)
    expect(onSubmit).toHaveBeenCalledWith('Value')
  })
  it('should reset the focussed item when closing the list', () => {
    renderWithStyle(
      <>
        <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
        <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
          <Input />
          <Options>
            <Option>First</Option>
            <Option>Second</Option>
          </Options>
        </AutoComplete>
      </>,
    )
    const input = screen.getByRole('textbox')
    input.focus()
    expect(input).toHaveFocus()
    userEvent.keyboard('{ArrowDown}')
    userEvent.keyboard('{Escape}')
    userEvent.keyboard('{ArrowDown}')
    userEvent.keyboard('{Enter}')
    expect(onSubmit).toHaveBeenCalledWith('First')
  })
  describe('Keyboard controls tests', () => {
    it('should submit the content of the input when pressing enter', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>Text</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
      userEvent.type(input, 'Hello')
      userEvent.keyboard('{Enter}')
      expect(onSubmit).toHaveBeenCalledWith('Hello')
    })
    it('should submit the selected option when pressing enter after arrow select', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>Text</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
      userEvent.keyboard('{ArrowDown}')
      userEvent.keyboard('{Enter}')
      expect(onSubmit).toHaveBeenCalledWith('Text')
    })
    it('should select the next option when pressing down arrow', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>First</Option>
              <Option>Second</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
      userEvent.keyboard('{ArrowDown}')
      userEvent.keyboard('{Enter}')
      expect(onSubmit).toHaveBeenCalledWith('First')
    })
    it('should select the previous option when pressing up arrow', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>First</Option>
              <Option>Second</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
      userEvent.keyboard('{ArrowDown}')
      userEvent.keyboard('{ArrowDown}')
      userEvent.keyboard('{ArrowUp}')
      userEvent.keyboard('{Enter}')
      expect(onSubmit).toHaveBeenCalledWith('First')
    })
    it('should select the input field when pressing down arrow on the last option', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>First</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
      userEvent.keyboard('{ArrowDown}')
      userEvent.keyboard('{ArrowDown}')
      userEvent.keyboard('{Enter}')
      expect(onSubmit).toHaveBeenCalledWith('')
    })
    it('should select the last option when pressing up arrow on the input field', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>First</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
      userEvent.keyboard('{ArrowUp}')
      userEvent.keyboard('{Enter}')
      expect(onSubmit).toHaveBeenCalledWith('First')
    })
    it('should close the list when pressing escape', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>Text</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
      const options = screen.getByRole('listbox')
      expect(options).toBeVisible()
      userEvent.keyboard('{Escape}')
      expect(options).not.toBeVisible()
    })
    it('should open the list when focussing the next item', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>Text</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
      const options = screen.getByRole('listbox')
      expect(options).toBeVisible()
      userEvent.keyboard('{Escape}')
      expect(options).not.toBeVisible()
      userEvent.keyboard('{ArrowDown}')
      expect(options).toBeVisible()
    })
    it('should open the list when focussing the previous item', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>Text</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
      const options = screen.getByRole('listbox')
      expect(options).toBeVisible()
      userEvent.keyboard('{Escape}')
      expect(options).not.toBeVisible()
      userEvent.keyboard('{ArrowUp}')
      expect(options).toBeVisible()
    })
  })
  describe('a11y tests', () => {
    it('should render a combobox element with the appropriate role and aria attributes', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>Text</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveAttribute('aria-expanded', 'false')
      const input = screen.getByRole('textbox')
      input.focus()
      const options = screen.getByRole('listbox')
      expect(combobox).toHaveAttribute('aria-haspopup', 'listbox')
      expect(combobox).toHaveAttribute('aria-owns', options.id)
      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })
    it('should render a text input element with the appropriate role and aria attributes', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>Text</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      const options = screen.getByRole('listbox')
      expect(input).toHaveAttribute('aria-autocomplete', 'list')
      expect(input).toHaveAttribute('aria-controls', options.id)
      expect(input).not.toHaveAttribute('aria-activedescendant')
      userEvent.keyboard('{ArrowDown}')
      expect(input).toHaveAttribute('aria-activedescendant', options.children[0].id)
    })
    it('should render a listbox element with the appropriate role', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>Text</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      const options = screen.getByRole('listbox')
      expect(options).toBeInTheDocument()
    })
    it('should render the option elements with the appropriate role and aria attributes', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>Text</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(1)
      expect(options[0]).toHaveAttribute('aria-selected', 'false')
      userEvent.keyboard('{ArrowDown}')
      expect(options[0]).toHaveAttribute('aria-selected', 'true')
    })
    it('should be "labelable"', () => {
      renderWithStyle(
        <>
          <label id="my-label" htmlFor="autocomplete">My AutoComplete</label>
          <AutoComplete onSubmit={onSubmit} id="autocomplete" aria-labelledby="my-label">
            <Input />
            <Options>
              <Option>Text</Option>
            </Options>
          </AutoComplete>
        </>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      const options = screen.getByRole('listbox')
      expect(options).toHaveAttribute('aria-labelledby', 'my-label')
      expect(input).toHaveAttribute('id', 'autocomplete')
    })
  })
})
