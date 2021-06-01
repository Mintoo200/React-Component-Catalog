const documentation = `
## API
\`\`\`tsx
<Form
  onChange={(formState: FormState) => null}
  onSubmit={(formState: FormState) => null}>
  <input id="my-input" />
  <button type="submit">Submit</button>
</Form>

type FormState = {
  valid: boolean,
  content: Record<string, FieldValue<unknown>>,
}

type FieldValue<T> = {
  validity: ValidityState,
  pristine: boolean,
  value: T,
}

// ValidityState = {
//   badInput: boolean,
//   customError: boolean,
//   patternMismatch: boolean,
//   rangeOverflow: boolean,
//   rangeUnderflow: boolean,
//   stepMismatch: boolean,
//   tooLong: boolean,
//   tooShort: boolean,
//   typeMismatch: boolean,
//   valid: boolean,
//   valueMissing: boolean,
// }
\`\`\`
\`onChange\` is called after each edit in the form, **including when an input looses its pristine state**.  
**It is also called after the first render**, before any edit, with the default value for each field.  
\`onSubmit\` is called on click on any component with \`type="submit"\`  
\`ValidityState\` [reference](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState).
`

export default documentation
