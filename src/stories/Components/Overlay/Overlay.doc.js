const documentation = `
## API
\`\`\`tsx
<Overlay isOpen onClose={() => setIsOpen()}>
  <div onClick={(event: React.MouseEvent) => event.stopPropagation()}>
    Content of the overlay
  </div>
</Overlay>
\`\`\`
**Remember to stop the click propagation if you want the overlay to stay open when you click on your content!** \n
e.g.:\n
\`\`\`tsx
const childClickHandler = (event: React.MouseEvent) => {
  event.stopPropagation()
}
\`\`\`
`

export default documentation
