import { AxiosResponse } from 'axios'
import APIClass from '../../../lib/hooks/useAPI/APIClass'

class mySecondAPI extends APIClass {
  async getFile(): Promise<AxiosResponse> {
    return this.axios.get('/projects/24477877/repository/files/src%2Flib%2Fcomponents%2FTabs%2Fv2%2FTabs%2Etsx/raw?ref=master')
  }
}

export default mySecondAPI
