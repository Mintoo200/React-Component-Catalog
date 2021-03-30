import React from 'react'
import { Story } from '@storybook/react'
import useTheme, { ThemeProvider, Props as ThemeProviderProps, Themes } from '../../../lib/hooks/useTheme/useTheme'

import './style.css'

export default {
  title: 'Hooks/useTheme/useTheme',
}

const ThemeButton = () => {
  const { theme, setTheme } = useTheme()
  return (
    <button
      type="button"
      className="theme-button"
      onClick={() => setTheme(theme === Themes.light ? Themes.dark : Themes.light)}>
      {`set ${theme === Themes.light ? Themes.dark : Themes.light} theme`}
    </button>
  )
}

const Template: Story<ThemeProviderProps> = (args) => (
  <ThemeProvider {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <ThemeButton />,
  ],
}
