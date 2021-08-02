const documentation = `
## API
\`\`\`tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <ModalTitle>My title</ModalTitle>
  <ModalContent>Try clicking outside of the modal or pressing 'Escape'!</ModalContent>
</Modal>
\`\`\`

## Accessibility
This component implements the accessibility specification described on [the W3C example page for the dialog component](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/dialog-modal/dialog.html).

Most notably:

- Traps the focus in the modal when opened.
- Pressing \`Escape\` closes the modal.
- Closing the modal returns the focus to the last focussed item.
- Has the attributes \`role="dialog"\`, \`aria-modal="true"\` and \`aria-labelledby="title-id"\`

To keep your component accessible, remember to:

- Focus the first element of the content when openning
  - If the first element is not in the viewport, focus the first element of the modal even if it is not normally focussable to avoid automatically scrolling.
  - If the content does not warrant any user interraction, focus the button used to close the overlay to ease the user experience
- Add the \`aria-describedby="paragraph-id"\` prop if the content contains a paragraph that describes the primary message

learn more [here](/story/components-modal-study--page#version-4---sub-components-with-context)
`

export default documentation
