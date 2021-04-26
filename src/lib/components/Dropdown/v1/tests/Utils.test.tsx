import React from 'react'
import {
  findFirstMatchingElement, findNextMatching, isCharacter, matchFirstCharacter, shiftArray,
} from '../Utils'

describe('Utils tests', () => {
  describe('isCharacter tests', () => {
    it('should return true if given a character', () => {
      expect(isCharacter('a')).toBe(true)
    })
    it('should return false if given more than a character', () => {
      expect(isCharacter('Shift')).toBe(false)
    })
    it('should return false if given a nullish value', () => {
      expect(isCharacter(null)).toBe(false)
    })
  })
  describe('matchFirstCharacter tests', () => {
    it('should return true if the first character matches', () => {
      expect(matchFirstCharacter('Hello', 'H')).toBe(true)
    })
    it('should ignore the case', () => {
      expect(matchFirstCharacter('Hello', 'h')).toBe(true)
    })
    it('should return false if the the first character does not match', () => {
      expect(matchFirstCharacter('Hello', 'e')).toBe(false)
    })
    it('should return false if the key is not a single character', () => {
      expect(matchFirstCharacter('Hello', 'Hello')).toBe(false)
    })
    it('should return false if given null as text', () => {
      expect(matchFirstCharacter(null, 'a')).toBe(false)
    })
    it('should return false if given null as key', () => {
      expect(matchFirstCharacter('Hello', null)).toBe(false)
    })
  })
  describe('shiftArray tests', () => {
    it('should shift the array', () => {
      const array = [0, 1, 2, 3, 4]
      const shiftedArray = shiftArray(array, 2)
      expect(shiftedArray).toEqual([2, 3, 4, 0, 1])
    })
  })
  describe('findFirstMatchingElement tests', () => {
    it('should return the index of the first matching element in the array', () => {
      const refs = new Array(5).fill(null).map((item, index) => ({
        current: {
          textContent: index.toString(),
        },
      }))
      expect(findFirstMatchingElement(refs, '1')).toBe(1)
    })
    it('should return -1 if no match found', () => {
      const refs = new Array(5).fill(null).map((item, index) => ({
        current: {
          textContent: index.toString(),
        },
      }))
      expect(findFirstMatchingElement(refs, '10')).toBe(-1)
    })
    it('should still work with some nulls', () => {
      const refs = new Array(5).fill(null).map((item, index) => ({
        current: {
          textContent: index.toString(),
        },
      }))
      refs[0].current = null
      refs[1].current.textContent = null
      expect(findFirstMatchingElement(refs, '2')).toBe(2)
    })
  })
  describe('findNextMatching tests', () => {
    it('should return the index of the next matching element in the array', () => {
      const refs = new Array(5).fill(null).map((item, index) => ({
        current: {
          textContent: index.toString(),
        },
      }))
      expect(findNextMatching(refs, '2', 1)).toBe(2)
    })
    it('should return the index of the next matching element even when current element is matching', () => {
      const refs = new Array(5).fill(null).map(() => ({
        current: {
          textContent: '0',
        },
      }))
      expect(findNextMatching(refs, '0', 1)).toBe(2)
    })
    it('should return -1 if not found', () => {
      const refs = new Array(5).fill(null).map((item, index) => ({
        current: {
          textContent: index.toString(),
        },
      }))
      expect(findNextMatching(refs, '10', 1)).toBe(-1)
    })
    it('should still work with some nulls', () => {
      const refs = new Array(5).fill(null).map((item, index) => ({
        current: {
          textContent: index.toString(),
        },
      }))
      refs[2].current = null
      refs[3].current.textContent = null
      expect(findNextMatching(refs, '4', 1)).toBe(4)
    })
  })
})
