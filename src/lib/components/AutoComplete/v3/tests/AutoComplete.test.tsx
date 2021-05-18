import React from 'react'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
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
          <Option>Test</Option>
          <Option value="Test 2">Also a test</Option>
        </Options>
      </AutoComplete>,
    )
    const input = screen.getByRole('textbox')
    const list = screen.getByText('Test')
    expect(input).not.toHaveFocus()
    expect(list).not.toBeVisible()
    input.focus()
    expect(input).toHaveFocus()
    expect(list).toBeVisible()
  })
})
