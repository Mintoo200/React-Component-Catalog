import React from 'react'
import { Story } from '@storybook/react'
import useTheme, { ThemeProvider, Props as ThemeProviderProps, Themes } from '../../../lib/hooks/useTheme/useTheme'
import documentation from './useTheme.doc'

import './style.css'

export default {
  title: 'Hooks/useTheme/useTheme',
  component: ThemeProvider,
  parameters: {
    componentSource: {
      url: [
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseTheme%2FuseTheme%2Etsx/raw?ref=master',
        'https://gitlab.com/api/v4/projects/24477877/repository/files/src%2Flib%2Fhooks%2FuseTheme%2FThemes%2Etsx/raw?ref=master',
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
  defaultTheme: Themes.dark,
  children: [
    <ThemeButton />,
  ],
}
