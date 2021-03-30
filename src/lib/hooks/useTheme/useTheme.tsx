import React, {
  useState, Dispatch, useContext, useEffect,
} from 'react'
import Themes from './Themes'
import NoContextError from '../../errors/NoContextError'

export { Themes }

type ContextType = {
  theme: Themes,
  setTheme: Dispatch<Themes>,
}

const Context = React.createContext<ContextType | undefined>(undefined)

export type Props = {
  children: React.ReactNode,
  defaultTheme: Themes,
}

export const ThemeProvider = ({
  children, defaultTheme = Themes.light,
}: Props): React.ReactElement => {
  const [theme, setTheme] = useState(defaultTheme)
  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])
  return (
    <Context.Provider value={{ theme, setTheme }}>
      {children}
    </Context.Provider>
  )
}

const useTheme = (): ContextType => {
  const context = useContext(Context)
  if (context == null) {
    throw new NoContextError()
  }
  return context
}

export default useTheme
