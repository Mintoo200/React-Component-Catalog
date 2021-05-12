import axios from 'axios'
import React from 'react'
import BaseAPIClass, { BaseAPIClassConstructor } from '../APIClass'

export const Context = React.createContext<BaseAPIClass>(null)

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
  let headers
  if (token != null) {
    headers = {
      Authorization: `Bearer ${token}`,
    }
  }
  const axiosInstance = axios.create({ baseURL: url, headers })
  const APIInstance = new APIClass(axiosInstance)
  return (
    <Context.Provider value={APIInstance}>
      {children}
    </Context.Provider>
  )
}

export default APIContext
