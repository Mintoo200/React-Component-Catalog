import React, { useContext } from 'react'
import axios from 'axios'
import BaseAPIClass, { BaseAPIClassConstructor } from './APIClass'

const Context = React.createContext({
  url: null as string,
  APIInstance: null as BaseAPIClass,
})

export type Props<T extends BaseAPIClassConstructor> = {
  url: string,
  APIClass: T
  children: React.ReactNode,
}

export function APIContext<T extends BaseAPIClassConstructor>(
  { url, APIClass, children }: Props<T>,
): React.ReactElement {
  const axiosInstance = axios.create({
    baseURL: url,
  })
  const APIInstance = new APIClass(axiosInstance)
  return (
    <Context.Provider value={{ url, APIInstance }}>
      {children}
    </Context.Provider>
  )
}

// FIXME: The generic type T does not exist at runtime,
// it is therefore impossible to ensure that APIInstance
// actually extends T. I can return an instance of T
// but not ensure that it actually is an instance of it.
// If you get a 'is not a function' error, you probably
// don't have the right class stored in the context
function useAPI<T extends BaseAPIClass>(): T {
  const { APIInstance } = useContext(Context)
  return APIInstance as T
}

export default useAPI
