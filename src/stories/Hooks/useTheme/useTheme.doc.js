const documentation = `
<p className="warning">Using CSS variables, this hook will not work with Internet Explorer as of version 11.0</p>

## API

\`\`\`tsx
<ThemeProvider>
  <MyComponent />
</ThemeProvider>

const MyComponent = () => {
  const {theme, setTheme} = useTheme()
  return (
    ...
  )
}
\`\`\`
\`\`\`css
body[data-theme="light"] {
  --primary: black;
  --secondary: white;
}

body[data-theme="dark"] {
  --primary: white;
  --secondary: black;
}

.theme-button {
  color: var(--primary);
  background: var(--secondary);
}
\`\`\`

## Optionnal props

\`defaultTheme\`: defaults to \`Themes.light\`
`

export default documentation
