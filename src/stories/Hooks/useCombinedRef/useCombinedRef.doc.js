const documentation = `
This hook synchronizes any number of ref and returns a new RefObject.  
It will call any ref callback and update any RefObject given with the returned ref.  

## API

\`\`\`tsx
const MyComponent = React.forwardRef<HTMLButtonElement, Props>(
  (props, forwardedRef) => {
    const ref = useCombinedRef(forwardedRef)
    return (
      <button ref={ref} />
    )
  }
)
\`\`\`

This hook takes a variadic ref array, allowing for any number of ref given as argument as follow: \`useCombinedRef(ref1, ref2, ref3, ...)\`
`

export default documentation
