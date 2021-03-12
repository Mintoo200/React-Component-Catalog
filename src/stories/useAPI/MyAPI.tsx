import { AxiosResponse } from 'axios'
import APIClass from '../../lib/hooks/useAPI/APIClass'

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

export default myAPI
