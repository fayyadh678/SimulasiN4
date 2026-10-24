import { describe, expect, it } from 'vitest';
import { formatDuration, formatElapsed, formatPercent } from './format';

describe('format helpers', () => {
  it('memformat timer 115 menit', () => {
    expect(formatDuration(115 * 60 * 1000)).toBe('01:55:00');
    expect(formatDuration(0)).toBe('00:00:00');
    expect(formatDuration(-5000)).toBe('00:00:00');
  });

  it('memformat durasi pengerjaan', () => {
    expect(formatElapsed(0)).toBe('0 menit');
    expect(formatElapsed(65 * 60 * 1000)).toBe('1 jam 5 menit');
  });

  it('memformat persentase satu desimal', () => {
    expect(formatPercent(97.0588235)).toBe('97.1%');
  });
});