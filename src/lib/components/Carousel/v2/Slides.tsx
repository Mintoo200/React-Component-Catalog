import React, { useEffect } from 'react'
import useCarousel from './Context'
import { ReducerActions } from './Reducer'
import Slide from './Slide'

export type Props = {
  children: React.ReactNode,
}

const Slides = ({ children }: Props): React.ReactElement => {
  const {
    currentSlide, isPlaying, timer, dispatch,
  } = useCarousel()
  let slideCount = 0
  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)
      // FIXME: React Hot-loader does cause problem here.
      // Reloading the page should fix count being 0
      // cf. https://github.com/gaearon/react-hot-loader/issues/304
      && child.type === Slide) {
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
      count: slideCount,
    })
  }, [JSON.stringify(children)])
  useEffect(() => {
    if (isPlaying) {
      const timeout = setTimeout(() => {
        dispatch({
          type: ReducerActions.nextSlide,
        })
      }, timer)
      return () => clearTimeout(timeout)
    }
    return null
  }, [isPlaying, currentSlide])

  return (
    <div className="slides">{slideCount > 0 ? processedChildren : 'No slides'}</div>
  )
}

export default Slides
