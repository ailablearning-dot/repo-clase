import { describe, expect, it } from 'vitest';
import { compute } from '../lib/engine';
import { CalcError } from '../types/calculator';

describe('motor de cálculo', () => {
  it('suma básica', () => {
    expect(compute('2+3')).toBe('5');
  });

  it('precedencia de operadores', () => {
    expect(compute('2+3×4')).toBe('14');
  });

  it('paréntesis', () => {
    expect(compute('(2+3)×4')).toBe('20');
  });

  it('potencias', () => {
    expect(compute('2^10')).toBe('1024');
  });

  it('raíz cuadrada', () => {
    expect(compute('√(16)')).toBe('4');
  });

  it('log base 10', () => {
    expect(compute('log(100)')).toBe('2');
  });

  it('logaritmo natural', () => {
    expect(compute('ln(e)')).toBe('1');
  });

  it('seno de 30 grados', () => {
    expect(compute('sin(30)')).toBe('0.5');
  });

  it('coseno de 0', () => {
    expect(compute('cos(0)')).toBe('1');
  });

  it('factorial', () => {
    expect(compute('5!')).toBe('120');
  });

  it('constante pi', () => {
    const r = parseFloat(compute('π'));
    expect(Math.abs(r - Math.PI)).toBeLessThan(1e-10);
  });

  it('unario negativo', () => {
    expect(compute('−5+3')).toBe('-2');
  });

  it('división por cero lanza CalcError', () => {
    expect(() => compute('1÷0')).toThrow(CalcError);
  });

  it('raíz de negativo lanza CalcError', () => {
    expect(() => compute('√(−4)')).toThrow(CalcError);
  });

  it('log de cero lanza CalcError', () => {
    expect(() => compute('log(0)')).toThrow(CalcError);
  });

  it('factorial de negativo lanza CalcError', () => {
    expect(() => compute('(−1)!')).toThrow(CalcError);
  });

  it('expresión incompleta lanza CalcError', () => {
    expect(() => compute('2+')).toThrow(CalcError);
  });
});
