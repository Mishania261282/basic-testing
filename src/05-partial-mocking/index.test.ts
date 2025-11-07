import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  // Возвращаем объект, который будет "заменять" оригинальный модуль
  return {
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
    // Для unmockedFunction мы хотим использовать реальную функцию из оригинального модуля.
    // Поэтому просто возвращаем ее.
    unmockedFunction: originalModule.unmockedFunction,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });
  // --- Перед каждым тестом ---
  // Очищаем вызовы моков, чтобы тесты были независимы
  beforeEach(() => {
    (mockOne as jest.Mock).mockClear();
    (mockTwo as jest.Mock).mockClear();
    (mockThree as jest.Mock).mockClear();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    // Вызываем функции, которые должны быть заменены на моки
    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toHaveBeenCalledTimes(1);
    expect(mockTwo).toHaveBeenCalledTimes(1);
    expect(mockThree).toHaveBeenCalledTimes(1);
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    // Вызываем функцию, которая не была мокирована (должна работать как обычно)
    unmockedFunction();

    // Проверяем, что console.log был вызван с ожидаемым сообщением
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');

    // Важно: восстанавливаем оригинальную console.log после теста
    consoleSpy.mockRestore();
  });
});
