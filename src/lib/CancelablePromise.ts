import CanceledError from './errors/CanceledError'

export type CancelablePromise<ReturnType> = {
  promise: Promise<ReturnType>,
  cancel: () => void,
}

export default
function makeCancelable<ReturnType>(promise: Promise<ReturnType>): CancelablePromise<ReturnType> {
  let hasCanceled = false

  const wrappedPromise = new Promise<ReturnType>((resolve, reject) => {
    promise.then(
      (val) => ((hasCanceled) ? reject(new CanceledError('Canceled')) : resolve(val)),
      (error) => ((hasCanceled) ? reject(new CanceledError('Canceled')) : reject(error)),
    )
  })

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true
    },
  }
}
