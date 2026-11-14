import { expect, test } from 'vitest';
import quotes from './quotes';

test('have at least two quotes', () => {
    expect(quotes.length).toBeGreaterThan(2);
});
