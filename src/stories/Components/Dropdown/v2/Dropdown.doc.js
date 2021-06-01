const documentation = `
## API
\`\`\`tsx
<Dropdown>
  <button type="button">Link 1</button>
  <Menu>
    <Label><button type="button">Submenu 1</button></Label>
    <Content>
      <button type="button">Link 2</button>
      <Menu>
        <Label><button type="button">Submenu 2</button></Label>
        <Content><button type="button">Link 3</button></Content>
      </Menu>
      <button type="button">Link 4</button>
    </Content>
  </Menu>
</Dropdown>

// or

<Dropdown>
  <button type="button">Link 1</button>
  <Menu>
    <Label><button type="button">Submenu 1</button></Label>
    <button type="button">Link 2</button>
    <Menu>
      <Label><button type="button">Submenu 2</button></Label>
      <button type="button">Link 3</button>
    </Menu>
    <button type="button">Link 4</button>
  </Menu>
</Dropdown>
\`\`\`
For this implementation, the \`Content\` component is only used to clarify that everything that is not a \`Label\` is the content. It is therefore not mendatory.
learn more [here](/story/components-dropdown-study--page#version-2---label-as-component)
`

export default documentation
