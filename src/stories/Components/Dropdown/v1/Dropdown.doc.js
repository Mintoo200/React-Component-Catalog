const documentation = `
## API
\`\`\`tsx
<Dropdown aria-label="My Dropdown">
  <button type="button">Link 1</button>
  <Menu label={<button type="button">Submenu 1</button>}>
    <button type="button">Link 2</button>
    <Menu label={<button type="button">Submenu 2</button>}>
      <button type="button">Link 3</button>
    </Menu>
    <button type="button">Link 4</button>
  </Menu>
</Dropdown>
\`\`\`

If you want to use a custom component for the buttons or links, you will need to forward a ref and the following props to the button itself:

\`\`\`tsx
{
  role: string,
  aria-haspopup: boolean | 'dialog' | 'menu' | 'false' | 'true' | 'listbox' | 'tree' | 'grid',
  aria-expanded: boolean | 'false' | 'true',
  tabIndex: number,
}
\`\`\`

e.g.: 

\`\`\`tsx
const MyButton = React.forwardRef<HTMLButtonElement, MyButtonProps>(
  (props, ref) => (
    <div>
      ...
      <button
        ref={ref}
        tabIndex={props.tabIndex}
        role={props.role}
        aria-haspopup={props['aria-haspopup']}
        aria-expanded={props['aria-expanded']}>
        {props.children}
      </button>
      ...
    </div>
  ),
)
\`\`\`

Modifying the source code might cause react-hot-reload to fail (cf. [the related issue on Github](https://github.com/gaearon/react-hot-loader/issues/304)). Reloading the page should fix the issue.

## Accessibility

This component implements the accessibility features described in [the W3C example for the matching component](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/menubar/menubar-1/menubar-1.html) including:

- [Full keyboard controls](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/menubar/menubar-1/menubar-1.html#kbd_label)
- [aria attributes for roles, labels, haspopup and expanded](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/menubar/menubar-1/menubar-1.html#rps_label)

Remember to have your \`Dropdown\` wrapped in a \`<nav aria-label />\` element if it is the main navigation menu of your page.
<br />
<br />
<br />
learn more about the component in [the Study page](/story/components-dropdown-study--page#version-1---label-as-prop)
`

export default documentation
