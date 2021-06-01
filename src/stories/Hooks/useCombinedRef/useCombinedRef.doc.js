// FIXME: cf. https://github.com/storybookjs/storybook/issues/14605
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import 'react-syntax-highlighter'

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

<p className="warning">This hook does not have a lot of use cases</p>

It is cleaner to use a combination of custom types and \`useImperativeHandle\` as follow:

\`\`\`diff
  function MyParentComponent(props) {
-   const ref = useRef<HTMLElement>()
+   const ref = useRef<FocussableElement>()
    useLayoutEffect(() => {
      if (shouldFocusChild) {
        ref?.current?.focus()
      }
    }, [ref])
    return <MyChildComponent ref={ref} />
  }

+ type FocussableElement = {
+   focus: () => void
+   // and that's it, no textContent, no nothing (although you can add any other property if needed)
+ }

- const MyChildComponent = forwardRef<HTMLElement, PropsType>((props, forwardedRef) => {
+ const MyChildComponent = forwardRef<FocussableElement, PropsType>((props, forwardedRef) => {
-   const ref = useCombinedRef(forwardedRef)
+   const ref = useRef<HTMLDivElement>()
+   useImperativeHandle((forwardedRef) => {
+     focus: () => ref?.current?.focus()
+   })
    useLayoutEffect(() => {
      if (shouldFocus) {
        ref?.current?.focus()
      }
    }, [ref])
    return <div ref={ref} />
  })
\`\`\`

The new version allows 2 things:

1. No internal is exposed to the parent component, it gets a ref that matches the interface with a clear contract (which is that the item is focussable) => that means that the ref will **always** be focussable, no matter how you implement focus in the child, and also that it is impossible in the parent to use other properties that are not part of the interface and would depend on the implementation details of the child (e.g. trying to access the "disabled" property because you know the element is a button would cause problems if you refactor your child component and changed the button to something else)
2. You limit the number of variables that need to be synced: most of the time \`useCombinedRef\` needs to create a RefObject that is synced to the forwarded ref because the forwardedRef could be a [callback ref](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs) so, every time the ref changes, you need to call the forwarded ref or set its current property whereas this is automatically handled by \`useImperativeHandle\` (cf. [this sandbox](https://codesandbox.io/s/useimperativehandle-with-ref-callback-59ztx?file=/src/App.tsx)).
`

export default documentation
