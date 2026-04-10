import { describe, it, expect } from 'vitest';
import { cx } from '@/utils/cx';

describe('cx', () => {
  it('merges multiple class strings', () => {
    expect(cx('foo', 'bar')).toBe('foo bar');
  });

  it('handles undefined values', () => {
    expect(cx('foo', undefined, 'bar')).toBe('foo bar');
  });

  it('handles false values', () => {
    expect(cx('foo', false as unknown as string, 'bar')).toBe('foo bar');
  });

  it('handles empty string', () => {
    expect(cx('')).toBe('');
  });

  it('deduplicates conflicting Tailwind text color classes (last wins)', () => {
    const result = cx('text-red-500', 'text-blue-500');
    expect(result).toBe('text-blue-500');
    expect(result).not.toContain('text-red-500');
  });

  it('deduplicates conflicting Tailwind background classes (last wins)', () => {
    const result = cx('bg-red-500', 'bg-blue-500');
    expect(result).toBe('bg-blue-500');
  });

  it('keeps non-conflicting classes', () => {
    const result = cx('text-sm', 'font-bold', 'text-blue-500');
    expect(result).toContain('text-sm');
    expect(result).toContain('font-bold');
    expect(result).toContain('text-blue-500');
  });

  it('returns empty string for no arguments', () => {
    expect(cx()).toBe('');
  });
});
