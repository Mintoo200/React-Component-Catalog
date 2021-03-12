import { AxiosInstance } from 'axios'

export type APIClassConstructor<T extends APIClass> = new (axiosInstance: AxiosInstance) => T
export type BaseAPIClassConstructor = APIClassConstructor<APIClass>

export class APIClass {
  axios: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axios = axiosInstance
  }
}

export default APIClass
