import axios from 'axios'
import React from 'react'
import BaseAPIClass, { BaseAPIClassConstructor } from '../../APIClass'

export const Context = React.createContext({} as Record<string, BaseAPIClass>)

export type SingleAPIProps<T extends BaseAPIClassConstructor> = {
  url: string,
  token?: string,
  APIClass: T,
  children: React.ReactNode,
}

export type MultiAPIProps = {
  APIs: {
    name: string,
    url: string,
    token?: string,
    APIClass: BaseAPIClassConstructor,
  }[],
  children: React.ReactNode,
}

function isMultiAPI<T extends BaseAPIClassConstructor>(props: Props<T>): props is MultiAPIProps {
  return (props as MultiAPIProps).APIs != null
}

export type Props<T extends BaseAPIClassConstructor> = SingleAPIProps<T>|MultiAPIProps

function MultiAPIContext(
  { APIs, children }: MultiAPIProps,
): React.ReactElement {
  const APIInstances = {} as Record<string, BaseAPIClass>
  APIs.forEach(({
    name, url, APIClass, token,
  }) => {
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
    APIInstances[name] = APIInstance
  })
  return (
    <Context.Provider value={APIInstances}>
      {children}
    </Context.Provider>
  )
}

function SingleAPIContext<T extends BaseAPIClassConstructor>(
  {
    url, APIClass, token, children,
  }: SingleAPIProps<T>,
): React.ReactElement {
  return (
    <MultiAPIContext APIs={[
      {
        name: 'default',
        url,
        token,
        APIClass,
      },
    ]}>
      {children}
    </MultiAPIContext>
  )
}

export function APIContext<T extends BaseAPIClassConstructor>(
  props: Props<T>,
): React.ReactElement {
  if (isMultiAPI(props)) {
    return <MultiAPIContext {...props} />
  }
  return (
    <SingleAPIContext {...props} />
  )
}

export default APIContext
