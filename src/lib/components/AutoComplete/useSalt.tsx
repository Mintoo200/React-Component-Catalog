let salt = 0

const useSalt = (): number => {
  const result = salt
  salt += 1
  return result
}

export default useSalt
