const documentation = `
## API
\`\`\`tsx
<AutoComplete onSubmit={(input: string) => null}>
    <Input />
    <Options>
      <Option>Test</Option>
      <Option value="Test 2">Also a test</Option>
    </Options>
</AutoComplete>
\`\`\`

## Accessibility

This component implements the accessibility features described in [the W3C example for the matching component](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html) with some minor tweaks including:

- [Full keyboard controls](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html#kbd_label) with minor tweak:
  - Escape key does not clear the input field [in conformity with upcoming version 1.2](https://github.com/w3c/aria-practices/issues/1066).
- [ARIA attributes for roles, haspopup, owns, expanded, autocomplete, controls, activedescendant, labelledby and selected](https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html#rps_label) with minor tweak:
  - Includes a polite \`aria-live\` region for the list to allow async options.

Remember to add a \`<label for id />\` for the input field and option list, e.g.:

\`\`\`tsx
<label id="my-label" htmlFor="autocomplete">AutoComplete</label>
<AutoComplete id="autocomplete" aria-labelledby="my-label">
  ...
</AutoComplete>
\`\`\`

If your options are focussable, please ensure that they are not part of the tab order with \`tabindex="-1"\` since all focus is handled by the AutoComplete.

<p className="warning">If you plan on modifying the source code, please ensure that you still comply with <a href="https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html">the ARIA spec</a> since simple changes can require some tweaks to aria properties.</p>

<hr />
learn more [here](/story/components-autocomplete-study--page#version-3--option-list-without-datalist)
`

export default documentation
