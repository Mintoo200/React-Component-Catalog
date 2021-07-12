import { RefObject } from 'react'

export function isCharacter(key: string): boolean {
  return key != null && key.length === 1 && key !== ' '
}

export function matchFirstCharacter(text: string, key: string): boolean {
  return text != null
    && key != null
    && text.substring(0, 1).toLowerCase() === key.toLowerCase()
}

export function shiftArray<T>(array: T[], from: number): T[] {
  const newArray = array.slice(from).concat(array.slice(0, from))
  return newArray
}

export type TextContent = {
  textContent?: string
}

export function findFirstMatchingElement(
  array: RefObject<TextContent>[],
  match: string,
): number {
  const predicate = (item: RefObject<TextContent>) => (
    matchFirstCharacter(item?.current?.textContent, match)
  )
  return array.findIndex(predicate)
}

export function findNextMatching(
  array: RefObject<TextContent>[],
  match: string,
  from: number,
): number {
  const shiftedArray = shiftArray(array, from + 1)
  const newShiftedIndex = findFirstMatchingElement(shiftedArray, match)
  if (newShiftedIndex === -1) {
    return newShiftedIndex
  }
  return (newShiftedIndex + from + 1) % array.length
}
