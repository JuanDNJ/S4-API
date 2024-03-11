import {suma, getAcudit} from "../src/utils"
// sum.test.js
import { expect, describe, it } from 'vitest'

describe("Funcion sumar", ( ) => {
  it('should be declared', () => {
    expect(typeof suma).toBe('function');
  });
  it('adds 1 + 2 to equal 3', () => {
    expect(suma(1, 2)).toBe(3)
  });
  it('retorna un numero', () => {
    expect(suma(1, 2)).toBeTypeOf('number')
  });
}) 

describe("Funcion getAcudit", ( ) => {
  it('should be declared ', () => {
    expect(typeof getAcudit).toBe('function');
  });
  
}) 

