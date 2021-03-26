import axios from 'axios'
import React from 'react'
import BaseAPIClass, { BaseAPIClassConstructor } from '../APIClass'

export const Context = React.createContext(null as BaseAPIClass)

export type Props<T extends BaseAPIClassConstructor> = {
  url: string,
  token?: string,
  APIClass: T,
  children: React.ReactNode,
}

function APIContext<T extends BaseAPIClassConstructor>(
  {
    url, APIClass, token, children,
  }: Props<T>,
): React.ReactElement {
  const options = {
    baseURL: url,
    headers: null as unknown,
  }
  if (token != null) {
    options.headers = {
      Authorization: `Bearer ${token}`,
    }
  }
  const axiosInstance = axios.create(options)
  const APIInstance = new APIClass(axiosInstance)
  return (
    <Context.Provider value={APIInstance}>
      {children}
    </Context.Provider>
  )
}

export default APIContext
