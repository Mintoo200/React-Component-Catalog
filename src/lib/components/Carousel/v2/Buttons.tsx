import React from 'react'
import useCarousel from './Context'
import { ReducerActions } from './Reducer'

export type Props = {
  children?: React.ReactNode,
}

export const Play = ({ children = null }: Props): React.ReactElement => {
  const { isPlaying, dispatch } = useCarousel()

  const Button = (): React.ReactElement => {
    if (!children) {
      return <>{isPlaying ? 'Pause' : 'Play'}</>
    }
    if (React.Children.count(children) === 1) {
      return <>{children}</>
    }
    return (
      <>{isPlaying ? (children as React.ReactNode[])[1] : (children as React.ReactNode[])[0]}</>
    )
  }

  return (
    <button
      onClick={() => dispatch({
        type: ReducerActions.togglePlay,
      })}
      type="button">
      <Button />
    </button>
  )
}

export const Next = ({ children = null }: Props): React.ReactElement => {
  const { dispatch } = useCarousel()
  return (
    <button
      onClick={() => dispatch({
        type: ReducerActions.nextSlide,
      })}
      type="button">
      {children != null ? children : 'Next'}
    </button>
  )
}

export const Previous = ({ children = null }: Props): React.ReactElement => {
  const { dispatch } = useCarousel()
  return (
    <button
      onClick={() => dispatch({
        type: ReducerActions.previousSlide,
      })}
      type="button">
      {children != null ? children : 'Previous'}
    </button>
  )
}
