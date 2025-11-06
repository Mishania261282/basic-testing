import { simpleCalculator, Action } from './index';

const testCases = [
  // Addition cases
  {
    a: 1,
    b: 2,
    action: Action.Add,
    expected: 3,
    description: '1 + 2 should be 3',
  },
  {
    a: 2,
    b: 2,
    action: Action.Add,
    expected: 4,
    description: '2 + 2 should be 4',
  },
  {
    a: 3,
    b: 2,
    action: Action.Add,
    expected: 5,
    description: '3 + 2 should be 5',
  },
  {
    a: -1,
    b: 1,
    action: Action.Add,
    expected: 0,
    description: '-1 + 1 should be 0',
  },
  {
    a: 0,
    b: 0,
    action: Action.Add,
    expected: 0,
    description: '0 + 0 should be 0',
  },
  // Subtraction cases
  {
    a: 5,
    b: 2,
    action: Action.Subtract,
    expected: 3,
    description: '5 - 2 should be 3',
  },
  {
    a: 10,
    b: 10,
    action: Action.Subtract,
    expected: 0,
    description: '10 - 10 should be 0',
  },
  {
    a: 2,
    b: 5,
    action: Action.Subtract,
    expected: -3,
    description: '2 - 5 should be -3',
  },
  {
    a: -1,
    b: -1,
    action: Action.Subtract,
    expected: 0,
    description: '-1 - (-1) should be 0',
  },

  // Multiplication cases
  {
    a: 2,
    b: 3,
    action: Action.Multiply,
    expected: 6,
    description: '2 * 3 should be 6',
  },
  {
    a: 5,
    b: 0,
    action: Action.Multiply,
    expected: 0,
    description: '5 * 0 should be 0',
  },
  {
    a: -2,
    b: 3,
    action: Action.Multiply,
    expected: -6,
    description: '-2 * 3 should be -6',
  },
  {
    a: -2,
    b: -3,
    action: Action.Multiply,
    expected: 6,
    description: '-2 * -3 should be 6',
  },

  // Division cases
  {
    a: 6,
    b: 3,
    action: Action.Divide,
    expected: 2,
    description: '6 / 3 should be 2',
  },
  {
    a: 10,
    b: 2,
    action: Action.Divide,
    expected: 5,
    description: '10 / 2 should be 5',
  },
  {
    a: 0,
    b: 5,
    action: Action.Divide,
    expected: 0,
    description: '0 / 5 should be 0',
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    `should perform $action correctly: $description`,
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
