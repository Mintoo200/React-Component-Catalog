const documentation = `
## API
\`\`\`tsx
<Overlay isOpen onClose={() => setIsOpen()}>
  <div onClick={(event: React.MouseEvent) => event.stopPropagation()}>
    Content of the overlay
  </div>
</Overlay>
\`\`\`

## Accessibility
This component implements the accessibility specification described on [the W3C example page for the dialog component](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/dialog-modal/dialog.html).

Most notably:

- Traps the focus in the overlay when openned.
- Pressing \`Escape\` closes the overlay.
- Closing the overlay returns the focus to the last focussed item.

To keep your component accessible, remember to:

- Focus the first element of the content when openning
  - If the first element is not in the viewport, focus the first element of the modal even if it is not normally focussable to avoid automatically scrolling.
  - If the content does not warrant any user interraction, focus the button used to close the overlay to ease the user experience
- Add the proper attributes to the content of the overlay:
  - \`role="dialog"\`
  - \`aria-modal="true"\`
  - \`aria-labelledby="title-id"\`
  - \`aria-describedby="paragraph-id"\` if the content contains a paragraph that describes the primary message

When in doubt, you can find a suitable example for your specific component on [the dialog example page of the W3C specification](https://www.w3.org/TR/2019/NOTE-wai-aria-practices-1.1-20190814/examples/dialog-modal/dialog.html).
`

export default documentation
