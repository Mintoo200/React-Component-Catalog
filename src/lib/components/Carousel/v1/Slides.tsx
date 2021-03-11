import React, { useContext, useEffect } from 'react'
import Context from './Context'
import { ReducerActions } from './Reducer'
import Slide from './Slide'

export type Props = {
  children: React.ReactNode,
}

const Slides: React.FC<Props> = ({ children }) => {
  const { currentSlide, dispatch } = useContext(Context)
  let slideCount = 0
  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)
      // FIXME: React Hot-loader does cause problem here.
      // Reloading the page should fix count being 0
      // cf. https://github.com/gaearon/react-hot-loader/issues/304
      && (child as React.ReactElement).type === Slide) {
      slideCount += 1
      return React.cloneElement(child, {
        isActive: slideCount === currentSlide + 1,
      })
    }
    return child
  })
  useEffect(() => {
    dispatch({
      type: ReducerActions.setSlideCount,
      slideCount,
    })
  }, [JSON.stringify(children)])

  return (
    <div className="slides">{processedChildren}</div>
  )
}

export default Slides
