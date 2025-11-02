// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  // Тест на сложение
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Add });
    expect(result).toBe(8);
  });

  // Тест на вычитание
  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
    expect(result).toBe(6);
  });

  // Тест на умножение
  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 7, b: 6, action: Action.Multiply });
    expect(result).toBe(42);
  });

  // Тест на деление
  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 20, b: 5, action: Action.Divide });
    expect(result).toBe(4);
  });

  // Тест на возведение в степень
  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  // Тест на невалидное действие
  test('should return null for invalid action', () => {
    // Имитируем передачу строки, которая не является допустимым значением Action
    const result = simpleCalculator({
      a: 10,
      b: 5,
      action: 'invalid_action' as unknown as Action,
    });
    expect(result).toBeNull();
  });

  // Тест на невалидные аргументы
  test('should return null for invalid arguments', () => {
    // Имитируем передачу строки вместо числа
    const result = simpleCalculator({ a: 'hello', b: 5, action: Action.Add });
    expect(result).toBeNull();
  });
});
