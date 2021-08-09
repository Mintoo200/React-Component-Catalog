import React from 'react'

const links = {
  general: 'https://gitlab.com/Mintoo200/react-component-catalog/-/issues/new?issuable_template=component_suggestion',
  comment: 'https://gitlab.com/Mintoo200/react-component-catalog/-/merge_requests/41/diffs',
}

export type Props = {
  general?: boolean
}

const SuggestionBadge = ({ general = false }: Props): React.ReactElement => (
  <a href={general ? links.general : links.comment}>
    <button className="badge try-it" type="button">
      Suggest
    </button>
  </a>
)

export default SuggestionBadge
