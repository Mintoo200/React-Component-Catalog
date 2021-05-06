import '@testing-library/jest-dom/extend-expect'

function replaceStr(msg: string, ...placeholders: string[]) {
  let count = 0
  return msg.replace(/%s/g, () => {
    const result = placeholders[count]
    count += 1
    return result
  })
}

/* eslint-disable no-console */
const previousConsole = console.error
console.error = (...args: [string, ...string[]]) => {
  previousConsole(...args)
  throw new Error(replaceStr(...args))
}
/* eslint-enable no-console */
