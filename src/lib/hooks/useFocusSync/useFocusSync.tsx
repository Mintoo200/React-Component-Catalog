import React, {
  RefObject, useContext, useLayoutEffect, useState,
} from 'react'

type ContextType = {
  refs: RefObject<HTMLElement>[];
  currentFocus: HTMLElement | null;
  setCurrentFocus: React.Dispatch<HTMLElement | null>;
  addRef: React.Dispatch<RefObject<HTMLElement>>;
};

const Context = React.createContext<ContextType | undefined>(undefined)

export function SyncProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [refs, setRefs] = useState<RefObject<HTMLElement>[]>([])
  const [currentFocus, setCurrentFocus] = useState<HTMLElement | null>(null)
  function addRef(ref: RefObject<HTMLElement>) {
    if (!refs.some((item) => item === ref)) {
      const newRefs = [...refs, ref]
      setRefs(newRefs)
    }
  }
  return (
    <Context.Provider
      value={{
        refs,
        currentFocus,
        setCurrentFocus,
        addRef,
      }}>
      {children}
    </Context.Provider>
  )
}

function useSyncContext() {
  const context = useContext(Context)
  if (context == null) {
    throw new Error('No Context')
  }

  return context
}

export type SyncObject = {
  hasFocus: boolean,
  hasDirectFocus: boolean,
  hasIndirectFocus: boolean,
  syncFocus: (event: React.FocusEvent<HTMLElement>) => void,
}

export function useSyncFocus(ref: RefObject<HTMLElement>): SyncObject {
  const {
    currentFocus, addRef, setCurrentFocus,
  } = useSyncContext()
  useLayoutEffect(() => {
    addRef(ref)
  }, [ref, addRef])
  function syncFocus(event: React.FocusEvent<HTMLElement>) {
    if (event.type === 'blur') {
      const newTarget = event.relatedTarget
      const focussedElement = newTarget instanceof HTMLElement ? newTarget : null
      setCurrentFocus(focussedElement)
    } else {
      setCurrentFocus(event.target)
    }
  }
  const hasFocus = currentFocus && ref.current?.contains(currentFocus)
  const hasDirectFocus = currentFocus && ref.current === currentFocus
  return {
    hasFocus,
    hasDirectFocus,
    hasIndirectFocus: hasFocus && !hasDirectFocus,
    syncFocus,
  }
}

export default useSyncFocus
