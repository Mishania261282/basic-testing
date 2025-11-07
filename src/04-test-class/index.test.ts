// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 200;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 400;
    const amount = 600;
    const account = getBankAccount(initialBalance);
    const balance = account.getBalance();
    expect(() => account.withdraw(amount)).toThrow(InsufficientFundsError);
    expect(() => account.withdraw(amount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(1000);
    const balance = account.getBalance();
    const toAccount = getBankAccount(0);
    expect(() => account.transfer(1200, toAccount)).toThrow(
      InsufficientFundsError,
    );
    expect(() => account.transfer(1200, toAccount)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(200, account)).toThrow(TransferFailedError);
    expect(() => account.transfer(200, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const initialBalance = 400;
    const amount = 200;
    const account = getBankAccount(initialBalance);
    expect(account.deposit(amount).getBalance()).toBe(600);
  });

  test('should withdraw money', () => {
    const initialBalance = 400;
    const amount = 200;
    const account = getBankAccount(initialBalance);
    expect(account.withdraw(amount).getBalance()).toBe(200);
  });

  test('should transfer money', () => {
    const account = getBankAccount(1000);
    const toAccount = getBankAccount(0);
    expect(account.transfer(200, toAccount).getBalance()).toBe(800);
    expect(toAccount.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const fetchBalance = jest.fn().mockResolvedValue(100);
    const account = getBankAccount(200);
    account.fetchBalance = fetchBalance;
    expect(await account.fetchBalance()).toBe(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const fetchBalance = jest.fn().mockResolvedValue(100);
    const account = getBankAccount(200);
    account.fetchBalance = fetchBalance;
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(200);
    jest.spyOn(account, 'fetchBalance').mockReturnValue(Promise.resolve(null));
    expect(() => account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
