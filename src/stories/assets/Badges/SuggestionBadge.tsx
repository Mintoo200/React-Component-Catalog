import React from 'react'

const links = {
  general: 'https://gitlab.com/Mintoo200/test-lib/-/issues/new?issuable_template=component_suggestion',
  comment: 'https://gitlab.com/Mintoo200/test-lib/-/merge_requests/41/diffs',
}

export type Props = {
  general?: boolean
}

const SuggestionBadge: React.FC<Props> = ({ general = false }) => (
  <a href={general ? links.general : links.comment}>
    <button className="badge try-it" type="button">
      Suggest
    </button>
  </a>
)

export default SuggestionBadge
