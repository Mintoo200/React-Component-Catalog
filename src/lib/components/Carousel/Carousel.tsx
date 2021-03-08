import React, {
  useState, useContext, useEffect, Dispatch,
} from 'react'
import NoContextError from '../Errors/NoContextError'
import './style.css'

const CarouselContext = React.createContext({
  slideComponent: [],
  setSlideComponent: (() => { throw new NoContextError() }) as Dispatch<[]>,
  isPlaying: false,
  setIsPlaying: (() => { throw new NoContextError() }) as Dispatch<boolean>,
  currentIndex: 0,
  setCurrentIndex: (() => { throw new NoContextError() }) as Dispatch<number>,
})

export type CarouselProps = {
  children: React.ReactElement,
  isPlaying?: boolean,
}

export const Carousel = ({ children, isPlaying = false }: CarouselProps): React.ReactElement => {
  const [slideComponent, setSlideComponent] = useState([])
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(isPlaying)
  const [currentIndex, setCurrentIndex] = useState(0)

  const carouselContext = {
    slideComponent,
    setSlideComponent: (value) => setSlideComponent(value),
    isPlaying: isCurrentlyPlaying,
    setIsPlaying: (value) => setIsCurrentlyPlaying(value),
    currentIndex,
    setCurrentIndex: (value) => setCurrentIndex(value),
  }

  const carouselChildren = React.Children.map(children, (child) => React.cloneElement(child, {
    onNumberOfSlidesChanged: (newNumber) => setSlideComponent(newNumber),
  }))

  return (
    <CarouselContext.Provider value={carouselContext}>
      <div className="carousel">{carouselChildren}</div>
    </CarouselContext.Provider>
  )
}

export type SlidesProps = {
  children: React.ReactNode,
  onNumberOfSlidesChanged?: (_: React.ReactNode) => void,
}

export const Slides: React.FC<SlidesProps> = ({ children, onNumberOfSlidesChanged }) => {
  const { currentIndex, setCurrentIndex, isPlaying } = useContext(CarouselContext)
  const numberOfSlidesChildren = React.Children.count(children)

  useEffect(() => {
    if (isPlaying) {
      const timeout = setTimeout(
        () => {
          setCurrentIndex((currentIndex + 1) % numberOfSlidesChildren)
        }, 3000,
      )
      return () => clearTimeout(timeout)
    }
    return null
  }, [isPlaying, setCurrentIndex, currentIndex, numberOfSlidesChildren])

  useEffect(() => {
    onNumberOfSlidesChanged(children)
  }, [children, onNumberOfSlidesChanged])

  return <ul className="Slide">{children[currentIndex]}</ul>
}

export type SlideProps = {
  children: React.ReactNode,
}

export const Slide: React.FC<SlideProps> = ({ children }) => <><li>{children}</li></>

export type SlideNavItemsProps = {
  navType?: string,
}

export const SlideNavItems: React.FC<SlideNavItemsProps> = ({ navType = 'bullet' }) => {
  const {
    currentIndex, setCurrentIndex, slideComponent, setIsPlaying,
  } = useContext(CarouselContext)

  return (
    <>
      {slideComponent.map((element, index) => (
        <li key={index}>
          <button
            type="button"
            tabIndex={0}
            onClick={() => { setIsPlaying(false); return setCurrentIndex(index) }}
            onKeyDown={(e) => { if (e.key === 'Enter') { setCurrentIndex(index) } }}
            className={currentIndex === index ? 'btn' : 'btn'}>
            {navType === 'bullet' ? <div className={currentIndex === index ? 'bulletActive' : 'bullet'} /> : index}
          </button>
        </li>
      ))}
    </>
  )
}

export type SlideNavProps = {
  className: string,
  navType?: string,
}

export const SlideNav: React.FC<SlideNavProps> = ({ className, navType }) => (
  <><ul className={className}><SlideNavItems navType={navType} /></ul></>
)

export type PlayPauseProps = {
  children: React.ReactNode,
}

export const PlayPause: React.FC<PlayPauseProps> = ({ children }) => {
  const { isPlaying, setIsPlaying } = useContext(CarouselContext)

  return (
    <button
      type="button"
      className="btn"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') { setIsPlaying(!isPlaying) } }}
      onClick={() => setIsPlaying(!isPlaying)}>
      { isPlaying ? children[1] : children[0] }
    </button>
  )
}

export type PreviousProps = {
  children: React.ReactNode,
}

export const Previous: React.FC<PreviousProps> = ({ children }) => {
  const { currentIndex, setCurrentIndex, slideComponent } = useContext(CarouselContext)

  return (
    <button
      type="button"
      className="btn"
      tabIndex={0}
      onClick={() => (
        setCurrentIndex((currentIndex - 1 + slideComponent.length) % slideComponent.length)
      )}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setCurrentIndex((currentIndex - 1 + slideComponent.length) % slideComponent.length)
        }
      }}>
      {children}
    </button>
  )
}

export type NextProps = {
  children: React.ReactNode,
}

export const Next: React.FC<NextProps> = ({ children }) => {
  const { currentIndex, setCurrentIndex, slideComponent } = useContext(CarouselContext)

  return (
    <button
      type="button"
      className="btn"
      tabIndex={0}
      onClick={() => setCurrentIndex((currentIndex + 1) % slideComponent.length)}
      onKeyDown={(e) => { if (e.key === 'Enter') { setCurrentIndex((currentIndex + 1) % slideComponent.length) } }}>
      {children}
    </button>
  )
}

export default Carousel
