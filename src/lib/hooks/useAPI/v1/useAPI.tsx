import { useContext } from 'react'
import BaseAPIClass from '../APIClass'
import { Context } from './Context'

// FIXME: The generic type T does not exist at runtime,
// it is therefore impossible to ensure that APIInstance
// actually extends T. I can return an instance of T
// but not ensure that it actually is an instance of it.
// If you get a 'is not a function' error, you probably
// don't have the right class stored in the context
function useAPI<T extends BaseAPIClass>(name:string = null): T {
  const APIInstances = useContext(Context)
  return APIInstances[(name != null) ? name : 'default'] as T
}

export default useAPI
