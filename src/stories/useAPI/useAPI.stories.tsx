/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Story } from '@storybook/react'
import useAPI, { APIContext, Props as APIContextProps } from '../../lib/hooks/useAPI/useAPI'
import APIClass, { APIClassConstructor } from '../../lib/hooks/useAPI/APIClass'
import { AxiosResponse } from 'axios'

export default {
  title: 'useAPI/useAPI',
}

type CancelablePromise<ReturnType> = {
  promise: Promise<ReturnType>,
  cancel: () => void,
}

function makeCancelable<ReturnType>(promise: Promise<ReturnType>): CancelablePromise<ReturnType> {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise<ReturnType>((resolve, reject) => {
    promise.then(
      val => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
      error => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

class myAPI extends APIClass {
  async getFile(): Promise<AxiosResponse> {
    return this.axios.get('/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FTabs%2Fv1%2FTabs%2Etsx/raw?ref=master')
  }

  async getFileWithTimeout(timer = 1000): Promise<AxiosResponse> {
    const response = await this.getFile()
    await setTimeout(() => null, timer)
    return response
  }
}

const Component: React.FC<{timeout?: boolean}> = ({ timeout = false }) => {
  const [file, setFile] = useState(null as string)
  const API = useAPI<myAPI>()
  useEffect(() => {
    let promise = null as CancelablePromise<AxiosResponse>
    if (timeout) {
      promise = makeCancelable<AxiosResponse>(API.getFileWithTimeout())
      promise.promise.then((response) => setFile(response.data))
    } else {
      promise = makeCancelable<AxiosResponse>(API.getFile())
      promise.promise.then((response) => setFile(response.data))
    }
    return () => promise.cancel()
  }, [])
  return (
    <div style={{ whiteSpace: 'pre' }}>
      {(file != null) ? file : 'waiting...'}
    </div>
  )
}

const Template: Story<APIContextProps<APIClassConstructor<myAPI>>> = (args) => (
  <APIContext {...args}>
    <Component />
  </APIContext>
)

export const Default = Template.bind({})
Default.args = {
  url: 'https://gitlab.com/api/v4',
  APIClass: myAPI,
}

const Template2: Story<APIContextProps<APIClassConstructor<myAPI>>> = (args) => {
  const [content, setContent] = useState(
    <Component timeout />,
  )
  useEffect(() => {
    setTimeout(() => {
      setContent(null)
    }, 100)
  }, [])

  return (
    <APIContext {...args}>
      {content}
    </APIContext>
  )
}

export const Unmount = Template2.bind({})
Unmount.args = {
  url: 'https://gitlab.com/api/v4',
  APIClass: myAPI,
}
