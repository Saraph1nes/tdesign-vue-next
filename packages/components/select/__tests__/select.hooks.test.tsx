// @ts-nocheck
import { ref, computed } from 'vue';
import { describe, it, expect, vi } from 'vitest';
import { useSelectOptions, useKeyboardControl } from '../hooks';

const mockOptions = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
  { label: '选项3', value: '3', disabled: true },
  { label: '选项4', value: '4' },
];

const mockProps = {
  options: mockOptions,
  filterable: false,
  filter: null,
  multiple: false,
  creatable: false,
};

const mockKeys = computed(() => ({
  label: 'label',
  value: 'value',
  disabled: 'disabled',
}));

describe('useSelectOptions', () => {
  it('should initialize options correctly', () => {
    const inputValue = ref('');
    const result = useSelectOptions(mockProps, mockKeys, inputValue);

    expect(result.optionsList.value).toHaveLength(4);
    expect(result.optionsMap.value.size).toBe(4);
    expect(result.optionsMap.value.get('1')).toMatchObject({
      label: '选项1',
      value: '1',
    });
  });

  it('should filter options when inputValue changes', () => {
    const props = { ...mockProps, filterable: true };
    const inputValue = ref('选项1');
    const result = useSelectOptions(props, mockKeys, inputValue);

    expect(result.displayOptions.value.some((opt) => opt.label === '选项1')).toBe(true);
    expect(result.displayOptions.value.some((opt) => opt.label === '选项2')).toBe(false);
  });

  it('should use custom filter function', () => {
    const customFilter = vi.fn((filterWords, option) => option.value === '1');
    const props = { ...mockProps, filter: customFilter };
    const inputValue = ref('test');
    const result = useSelectOptions(props, mockKeys, inputValue);

    // 触发过滤
    result.filterMethods(mockOptions[0]);

    expect(customFilter).toHaveBeenCalledWith('test', mockOptions[0]);
  });

  it('should handle disabled options correctly', () => {
    const inputValue = ref('');
    const result = useSelectOptions(mockProps, mockKeys, inputValue);

    const disabledOption = result.optionsList.value.find((opt) => opt.value === '3');
    expect(disabledOption.disabled).toBe(true);
  });

  it('should support custom keys mapping', () => {
    const customOptions = [
      { name: '选项1', id: 'opt1' },
      { name: '选项2', id: 'opt2' },
    ];

    const customKeys = computed(() => ({
      label: 'name',
      value: 'id',
      disabled: 'disabled',
    }));

    const props = { ...mockProps, options: customOptions };
    const inputValue = ref('');
    const result = useSelectOptions(props, customKeys, inputValue);

    expect(result.optionsMap.value.get('opt1')).toMatchObject({
      name: '选项1',
      id: 'opt1',
    });
  });

  it('should handle empty options', () => {
    const props = { ...mockProps, options: [] };
    const inputValue = ref('');
    const result = useSelectOptions(props, mockKeys, inputValue);

    expect(result.optionsList.value).toHaveLength(0);
    expect(result.optionsMap.value.size).toBe(0);
  });

  it('should add creatable option when conditions met', () => {
    const props = {
      ...mockProps,
      creatable: true,
      filterable: true,
    };
    const inputValue = ref('新选项');
    const result = useSelectOptions(props, mockKeys, inputValue);

    // 验证是否添加了可创建的选项
    const creatableOption = result.displayOptions.value.find((opt) => opt.label === '新选项');
    expect(creatableOption).toBeDefined();
  });
});

describe('useKeyboardControl', () => {
  it('should initialize with correct default values', () => {
    const mockParams = {
      displayOptions: ref([]),
      optionsList: ref([]),
      innerPopupVisible: ref(false),
      setInnerPopupVisible: vi.fn(),
      selectPanelRef: ref(null),
      isFilterable: ref(false),
      isRemoteSearch: ref(false),
      getSelectedOptions: vi.fn(),
      setInnerValue: vi.fn(),
      onCheckAllChange: vi.fn(),
      isCheckAll: ref(false),
      innerValue: ref(null),
      popupContentRef: ref(null),
      multiple: false,
      max: 0,
    };

    const result = useKeyboardControl(mockParams);

    expect(result.hoverIndex.value).toBe(-1);
    expect(result.virtualFilteredOptions.value).toEqual([]);
    expect(result.filteredOptions.value).toEqual([]);
  });

  it('should handle key down events correctly', () => {
    const setInnerPopupVisible = vi.fn();
    const setInnerValue = vi.fn();

    const mockParams = {
      displayOptions: ref(mockOptions),
      optionsList: ref(mockOptions),
      innerPopupVisible: ref(false),
      setInnerPopupVisible,
      selectPanelRef: ref(null),
      isFilterable: ref(false),
      isRemoteSearch: ref(false),
      getSelectedOptions: vi.fn(() => []),
      setInnerValue,
      onCheckAllChange: vi.fn(),
      isCheckAll: ref(false),
      innerValue: ref(null),
      popupContentRef: ref(null),
      multiple: false,
      max: 0,
    };

    const result = useKeyboardControl(mockParams);

    // 测试 ArrowDown 键
    const mockEvent = {
      key: 'ArrowDown',
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };

    result.handleKeyDown(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(setInnerPopupVisible).toHaveBeenCalledWith(true, expect.any(Object));
  });

  it('should handle Enter key to select option', () => {
    const setInnerValue = vi.fn();
    const getSelectedOptions = vi.fn(() => []);

    const mockParams = {
      displayOptions: ref(mockOptions),
      optionsList: ref(mockOptions),
      innerPopupVisible: ref(true),
      setInnerPopupVisible: vi.fn(),
      selectPanelRef: ref(null),
      isFilterable: ref(false),
      isRemoteSearch: ref(false),
      getSelectedOptions,
      setInnerValue,
      onCheckAllChange: vi.fn(),
      isCheckAll: ref(false),
      innerValue: ref(null),
      popupContentRef: ref(null),
      multiple: false,
      max: 0,
    };

    const result = useKeyboardControl(mockParams);

    // 设置 hover 索引
    result.hoverIndex.value = 0;

    // 测试 Enter 键
    const mockEvent = {
      key: 'Enter',
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };

    result.handleKeyDown(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(setInnerValue).toHaveBeenCalledWith('1', expect.any(Object));
  });

  it('should handle Escape key to close popup', () => {
    const setInnerPopupVisible = vi.fn();

    const mockParams = {
      displayOptions: ref(mockOptions),
      optionsList: ref(mockOptions),
      innerPopupVisible: ref(true),
      setInnerPopupVisible,
      selectPanelRef: ref(null),
      isFilterable: ref(false),
      isRemoteSearch: ref(false),
      getSelectedOptions: vi.fn(() => []),
      setInnerValue: vi.fn(),
      onCheckAllChange: vi.fn(),
      isCheckAll: ref(false),
      innerValue: ref(null),
      popupContentRef: ref(null),
      multiple: false,
      max: 0,
    };

    const result = useKeyboardControl(mockParams);

    // 测试 Escape 键
    const mockEvent = {
      key: 'Escape',
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };

    result.handleKeyDown(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(setInnerPopupVisible).toHaveBeenCalledWith(false, expect.any(Object));
  });

  it('should skip disabled options when navigating', () => {
    const mockParams = {
      displayOptions: ref(mockOptions),
      optionsList: ref(mockOptions),
      innerPopupVisible: ref(true),
      setInnerPopupVisible: vi.fn(),
      selectPanelRef: ref(null),
      isFilterable: ref(false),
      isRemoteSearch: ref(false),
      getSelectedOptions: vi.fn(() => []),
      setInnerValue: vi.fn(),
      onCheckAllChange: vi.fn(),
      isCheckAll: ref(false),
      innerValue: ref(null),
      popupContentRef: ref(null),
      multiple: false,
      max: 0,
    };

    const result = useKeyboardControl(mockParams);

    // 模拟多次按下 ArrowDown 键
    const mockEvent = {
      key: 'ArrowDown',
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };

    // 第一次按下，应该跳到索引 0（选项1）
    result.handleKeyDown(mockEvent);
    expect(result.hoverIndex.value).toBe(0);

    // 第二次按下，应该跳到索引 1（选项2）
    result.handleKeyDown(mockEvent);
    expect(result.hoverIndex.value).toBe(1);

    // 第三次按下，应该跳过索引 2（禁用的选项3），直接到索引 3（选项4）
    result.handleKeyDown(mockEvent);
    expect(result.hoverIndex.value).toBe(3);
  });

  it('should handle multiple selection with max limit', () => {
    const setInnerValue = vi.fn();
    const getSelectedOptions = vi.fn(() => [mockOptions[0]]);

    const mockParams = {
      displayOptions: ref(mockOptions),
      optionsList: ref(mockOptions),
      innerPopupVisible: ref(true),
      setInnerPopupVisible: vi.fn(),
      selectPanelRef: ref(null),
      isFilterable: ref(false),
      isRemoteSearch: ref(false),
      getSelectedOptions,
      setInnerValue,
      onCheckAllChange: vi.fn(),
      isCheckAll: ref(false),
      innerValue: ref(['1']),
      popupContentRef: ref(null),
      multiple: true,
      max: 1,
    };

    const result = useKeyboardControl(mockParams);

    // 设置 hover 索引到第二个选项
    result.hoverIndex.value = 1;

    // 测试 Enter 键
    const mockEvent = {
      key: 'Enter',
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    };

    result.handleKeyDown(mockEvent);

    // 由于已达到最大选择数量，不应该调用 setInnerValue
    expect(setInnerValue).not.toHaveBeenCalled();
  });
});
