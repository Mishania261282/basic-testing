import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const valueToResolve = { data: 'some data' };
    const resolved = await resolveValue(valueToResolve);
    expect(resolved).toBe(valueToResolve);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Specific error message';
    // Jest предоставляет утилиту .toThrow() для проверки выбрасываемых ошибок.
    // Эта утилита ожидает функцию, которая *выбрасывает* ошибку.
    expect(() => throwError(errorMessage)).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    // Если сообщение не передано, должно выброситься "Oops!"
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    // Проверяем, что выбрасывается именно экземпляр нашего класса MyAwesomeError
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
    // Также можно проверить сообщение, если это необходимо
    expect(() => throwCustomError()).toThrow(
      'This is my awesome custom error!',
    );
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    // Для асинхронных функций, которые должны отклонить промис (reject),
    // мы используем .rejects.toThrow()
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
    // Или с сообщением
    await expect(rejectCustomError()).rejects.toThrow(
      'This is my awesome custom error!',
    );
  });
});
