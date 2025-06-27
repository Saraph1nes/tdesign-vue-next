// @ts-nocheck
import { ref } from 'vue';
import { describe, it, expect } from 'vitest';
import { getSingleContent, getMultipleContent, getNewMultipleValue } from '../utils';

const mockOptionsMap = ref(
  new Map([
    ['1', { label: '选项1', value: '1' }],
    ['2', { label: '选项2', value: '2' }],
    ['3', { label: '选项3', value: '3' }],
    [1, { label: '数字选项1', value: 1 }],
    [true, { label: '布尔选项', value: true }],
  ]),
);

describe('getSingleContent', () => {
  it('should return label for existing option', () => {
    const result = getSingleContent('1', mockOptionsMap);
    expect(result).toBe('选项1');
  });

  it('should return value string for non-existing option', () => {
    const result = getSingleContent('not-exist', mockOptionsMap);
    expect(result).toBe('not-exist');
  });

  it('should handle number values', () => {
    const result = getSingleContent(1, mockOptionsMap);
    expect(result).toBe('数字选项1');
  });

  it('should handle boolean values', () => {
    const result = getSingleContent(true, mockOptionsMap);
    expect(result).toBe('布尔选项');
  });

  it('should handle null/undefined values', () => {
    const result1 = getSingleContent(null, mockOptionsMap);
    expect(result1).toBe('null');

    const result2 = getSingleContent(undefined, mockOptionsMap);
    expect(result2).toBe('undefined');
  });

  it('should handle empty string values', () => {
    const result = getSingleContent('', mockOptionsMap);
    expect(result).toBe('');
  });

  it('should handle zero values', () => {
    const result = getSingleContent(0, mockOptionsMap);
    expect(result).toBe('0');
  });
});

describe('getMultipleContent', () => {
  it('should return array of labels for existing options', () => {
    const result = getMultipleContent(['1', '2'], mockOptionsMap);
    expect(result).toEqual(['选项1', '选项2']);
  });

  it('should return array with value strings for non-existing options', () => {
    const result = getMultipleContent(['1', 'not-exist'], mockOptionsMap);
    expect(result).toEqual(['选项1', 'not-exist']);
  });

  it('should handle empty array', () => {
    const result = getMultipleContent([], mockOptionsMap);
    expect(result).toEqual([]);
  });

  it('should handle mixed value types', () => {
    const result = getMultipleContent(['1', 1, true], mockOptionsMap);
    expect(result).toEqual(['选项1', '数字选项1', '布尔选项']);
  });

  it('should filter out null/undefined results', () => {
    // 模拟一个会返回 null label 的选项
    const mockMapWithNull = ref(
      new Map([
        ['1', { label: '选项1', value: '1' }],
        ['2', { label: null, value: '2' }],
      ]),
    );

    const result = getMultipleContent(['1', '2'], mockMapWithNull);
    expect(result).toEqual(['选项1']); // 应该过滤掉 null 的结果
  });

  it('should handle options with empty string labels', () => {
    const mockMapWithEmpty = ref(
      new Map([
        ['1', { label: '选项1', value: '1' }],
        ['2', { label: '', value: '2' }],
      ]),
    );

    const result = getMultipleContent(['1', '2'], mockMapWithEmpty);
    expect(result).toEqual(['选项1']); // 应该过滤掉空字符串
  });
});

describe('getNewMultipleValue', () => {
  it('should add option when not in current value', () => {
    const currentValue = ['1', '2'];
    const result = getNewMultipleValue(currentValue, '3');

    expect(result.value).toEqual(['1', '2', '3']);
    expect(result.isCheck).toBe(true);
  });

  it('should remove option when already in current value', () => {
    const currentValue = ['1', '2', '3'];
    const result = getNewMultipleValue(currentValue, '2');

    expect(result.value).toEqual(['1', '3']);
    expect(result.isCheck).toBe(false);
  });

  it('should handle empty current value', () => {
    const currentValue = [];
    const result = getNewMultipleValue(currentValue, '1');

    expect(result.value).toEqual(['1']);
    expect(result.isCheck).toBe(true);
  });

  it('should handle single item array', () => {
    const currentValue = ['1'];
    const result = getNewMultipleValue(currentValue, '1');

    expect(result.value).toEqual([]);
    expect(result.isCheck).toBe(false);
  });

  it('should not mutate original array', () => {
    const currentValue = ['1', '2'];
    const originalValue = [...currentValue];

    getNewMultipleValue(currentValue, '3');

    expect(currentValue).toEqual(originalValue);
  });

  it('should handle different value types', () => {
    const currentValue = [1, '2', true];
    const result1 = getNewMultipleValue(currentValue, '3');
    const result2 = getNewMultipleValue(currentValue, 1);

    expect(result1.value).toEqual([1, '2', true, '3']);
    expect(result1.isCheck).toBe(true);

    expect(result2.value).toEqual(['2', true]);
    expect(result2.isCheck).toBe(false);
  });

  it('should handle duplicate values correctly', () => {
    const currentValue = ['1', '1', '2']; // 包含重复值
    const result = getNewMultipleValue(currentValue, '1');

    // 应该只移除第一个匹配的值
    expect(result.value).toEqual(['1', '2']);
    expect(result.isCheck).toBe(false);
  });

  it('should maintain order when adding new value', () => {
    const currentValue = ['3', '1', '4'];
    const result = getNewMultipleValue(currentValue, '2');

    expect(result.value).toEqual(['3', '1', '4', '2']);
    expect(result.isCheck).toBe(true);
  });

  it('should maintain order when removing value', () => {
    const currentValue = ['3', '1', '4', '2'];
    const result = getNewMultipleValue(currentValue, '1');

    expect(result.value).toEqual(['3', '4', '2']);
    expect(result.isCheck).toBe(false);
  });
});
