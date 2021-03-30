import React, { useContext } from 'react'
import { Context } from './Tabs'

type Props = {
  children: React.ReactNodeArray,
}

const TabContent = ({ children }: Props): React.ReactElement => {
  const { activeIndex } = useContext(Context)
  /* Renders only the current tab */
  return (
    <div className="content">
      {children[activeIndex]}
    </div>
  )
  /* Renders hidden tabs with `display: none;`
  * return (
  *   <div className="content">
  *     {React.Children.map(children, (child, index) => (
  *       <div
  *         key={index}
  *         className={`content ${activeIndex === index ? '' : 'hidden'}`}>
  *         {child}
  *       </div>
  *     ))}
  *   </div>
  * )
  */
}
export default TabContent
