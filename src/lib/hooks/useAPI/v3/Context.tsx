import axios from 'axios'
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react'
import NoContextError from '../../../errors/NoContextError'
import BaseAPIClass, { BaseAPIClassConstructor } from '../APIClass'

export type AddAPIFunction = (name: string, API: BaseAPIClass) => void
export type RemoveAPIFunction = (name: string) => void

type ContextType = {
  APIs: Record<string, BaseAPIClass>,
  addAPI: AddAPIFunction,
  removeAPI: RemoveAPIFunction,
}

export const Context = React.createContext<ContextType>({
  APIs: {},
  addAPI: (() => { throw new NoContextError() }),
  removeAPI: (() => { throw new NoContextError() }),
})

export type ContextProps = {
  children: React.ReactNode,
}

export const APIContext = ({ children }: ContextProps): React.ReactElement => {
  const [APIs, setAPIs] = useState<Record<string, BaseAPIClass>>({})
  const addAPI = useCallback((name, APIInstance) => {
    // setAPIs with callback because if you call addAPI multiple times
    // in quick succession, calling it with the new state would overwrite
    // all calls except the last one.
    setAPIs((previousState) => ({
      ...previousState,
      [name]: APIInstance,
    }))
  }, [JSON.stringify(APIs), setAPIs])
  const removeAPI = useCallback((name) => {
    setAPIs((previousState) => ({
      ...previousState,
      [name]: null,
    }))
  }, [JSON.stringify(APIs), setAPIs])
  return (
    <Context.Provider value={{ APIs, addAPI, removeAPI }}>
      {children}
    </Context.Provider>
  )
}

export type APIProps<T extends BaseAPIClassConstructor> = {
  children?: React.ReactNode,
  url: string,
  APIClass: T,
  name?: string,
  token?: string,
}

export function API<T extends BaseAPIClassConstructor>({
  children, url, APIClass, name = 'default', token,
}: APIProps<T>): React.ReactElement {
  const { addAPI, removeAPI } = useContext(Context)
  useEffect(() => {
    let headers
    if (token != null) {
      headers = {
        Authorization: `Bearer ${token}`,
      }
    }
    const axiosInstance = axios.create({ baseURL: url, headers })
    const APIInstance = new APIClass(axiosInstance)
    addAPI(name, APIInstance)

    return () => removeAPI(name)
  }, [url, APIClass, name])

  return (<>{children}</>)
}

export default APIContext
