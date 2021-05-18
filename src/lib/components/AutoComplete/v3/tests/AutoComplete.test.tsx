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
      <AutoComplete onSubmit={onSubmit}>
        <Input />
        <Options>
          <Option>Value</Option>
        </Options>
      </AutoComplete>,
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
      <AutoComplete onSubmit={onSubmit}>
        <Input />
        <Options>
          <Option>First value</Option>
          <Option>Second value</Option>
        </Options>
      </AutoComplete>,
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
      <AutoComplete onSubmit={onSubmit}>
        <Input />
        <Options>
          <Option>First value</Option>
          <Option value="Second value">Hello</Option>
          <Option value="Hello">Third value</Option>
        </Options>
      </AutoComplete>,
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
      <AutoComplete onSubmit={onSubmit}>
        <Input />
        <Options>
          <Option>Value</Option>
        </Options>
      </AutoComplete>,
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
      <AutoComplete onSubmit={onSubmit}>
        <Input />
        <Options>
          <Option>Text</Option>
        </Options>
      </AutoComplete>,
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
      <AutoComplete onSubmit={onSubmit}>
        <Input />
        <Options>
          <Option value="Value">Text</Option>
        </Options>
      </AutoComplete>,
    )
    const input = screen.getByRole('textbox')
    const value = screen.getByText('Text')
    input.focus()
    expect(input).toHaveFocus()
    expect(value).toBeVisible()
    userEvent.click(value)
    expect(onSubmit).toHaveBeenCalledWith('Value')
  })
  describe('Keyboard controls tests', () => {
    it('should submit the content of the input when pressing enter', () => {
      renderWithStyle(
        <AutoComplete onSubmit={onSubmit}>
          <Input />
          <Options>
            <Option>Text</Option>
          </Options>
        </AutoComplete>,
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
        <AutoComplete onSubmit={onSubmit}>
          <Input />
          <Options>
            <Option>Text</Option>
          </Options>
        </AutoComplete>,
      )
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
      userEvent.keyboard('{ArrowDown}')
      userEvent.keyboard('{Enter}')
      expect(onSubmit).toHaveBeenCalledWith('Text')
    })
  })
})
