const documentation = `
## API
\`\`\`tsx
<AutoComplete
  getOptions={async () => {
    // API calls
    return [
      { value: 'My First Value', label: 'This is the label for the first value' },
      { value: 'My Second Value', label: 'Also with a label' },
      { value: 'My Third Value' },
      { value: 'My Fourth Value', label: 'Notice how the third value had no label' },
    ]
  }}
  onSubmit={(input: string) => null} />
\`\`\`
learn more [here](/story/components-autocomplete-study--page#version-2--options-as-function)
`

export default documentation
