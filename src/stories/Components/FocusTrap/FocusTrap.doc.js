const documentation = `
## API
\`\`\`tsx
<FocusTrap active={active}>
  <button type="button">My Focussable Item</button>
</FocusTrap>
\`\`\`

<p className="warning">
  Contrary to the <a href="https://github.com/focus-trap/focus-trap">focus-trap library</a>, this component allows focus of the body of the page and anything that is not part of the page (e.g. the url bar, previous, next and refresh buttons, ...).
  This is mainly to comply with <a href="https://www.w3.org/TR/WCAG20-TECHS/G21.html">ensuring that users are not trapped in content</a>.
</p>
<p className="warning">
  To maintain a semantic HTML page, please consider using <a href="/story/hooks-usefocustrap-usefocustrap--default">the hook version for this component (<code>Hooks > useFocusTrap</code>)</a>.
</p>
`

export default documentation
