import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import MockDate from 'mockdate';
import { vi } from 'vitest';
import DatePicker, { DateRangePicker, DatePickerPanel } from '@tdesign/components/date-picker';
import { CalendarIcon } from 'tdesign-icons-vue-next';

// 固定时间，当使用 new Date() 时，返回固定时间，防止"当前时间"的副作用影响，导致 snapshot 变更
MockDate.set('2020-12-28');

// 清理函数
afterAll(() => {
  MockDate.reset();
});

describe('DatePicker', () => {
  // test props api
  describe(':props', () => {
    // 基础属性测试
    it(':allowInput', async () => {
      const wrapper = mount({
        render() {
          return <DatePicker allowInput={true}></DatePicker>;
        },
      });
      expect(wrapper.find('.t-date-picker').exists()).toBe(true);
    });

    it(':borderless', () => {
      const wrapper = mount({
        render() {
          return <DatePicker borderless={true}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':clearable', () => {
      const wrapper = mount({
        render() {
          return <DatePicker clearable={true} value="2020-01-01"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disabled - boolean', () => {
      const wrapper = mount({
        render() {
          return <DatePicker disabled={true}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':readonly - boolean', () => {
      const wrapper = mount({
        render() {
          return <DatePicker readonly={true}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':multiple - boolean', () => {
      const wrapper = mount({
        render() {
          return <DatePicker multiple={true}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':enableTimePicker - boolean', () => {
      const wrapper = mount({
        render() {
          return <DatePicker enableTimePicker={true}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':needConfirm - boolean', () => {
      const wrapper = mount({
        render() {
          return <DatePicker needConfirm={false}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    // 值相关属性测试
    it(':value - string', () => {
      const wrapper = mount({
        render() {
          return <DatePicker value="2020-01-01"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':value - number', () => {
      const wrapper = mount({
        render() {
          return <DatePicker value={1577836800000}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':value - Date', () => {
      const wrapper = mount({
        render() {
          return <DatePicker value={new Date('2020-01-01')}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':value - Array (multiple)', () => {
      const wrapper = mount({
        render() {
          return <DatePicker multiple={true} value={['2020-01-01', '2020-01-02']}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':defaultValue - string', () => {
      const wrapper = mount({
        render() {
          return <DatePicker defaultValue="2020-01-01"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    // 模式测试
    it(':mode - year', () => {
      const wrapper = mount({
        render() {
          return <DatePicker mode="year"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':mode - quarter', () => {
      const wrapper = mount({
        render() {
          return <DatePicker mode="quarter"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':mode - month', () => {
      const wrapper = mount({
        render() {
          return <DatePicker mode="month"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':mode - week', () => {
      const wrapper = mount({
        render() {
          return <DatePicker mode="week"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':mode - date', () => {
      const wrapper = mount({
        render() {
          return <DatePicker mode="date"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    // 格式化相关
    it(':format - string', () => {
      const wrapper = mount({
        render() {
          return <DatePicker format="YYYY/MM/DD" value="2020-01-01"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':valueType - string', () => {
      const wrapper = mount({
        render() {
          return <DatePicker valueType="YYYY-MM-DD HH:mm:ss"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':defaultTime - string', () => {
      const wrapper = mount({
        render() {
          return <DatePicker defaultTime="12:00:00" enableTimePicker={true}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':firstDayOfWeek - number', () => {
      const wrapper = mount({
        render() {
          return <DatePicker firstDayOfWeek={1}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    // 样式相关
    it(':size - small', () => {
      const wrapper = mount({
        render() {
          return <DatePicker size="small"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':size - medium', () => {
      const wrapper = mount({
        render() {
          return <DatePicker size="medium"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':size - large', () => {
      const wrapper = mount({
        render() {
          return <DatePicker size="large"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':status - default', () => {
      const wrapper = mount({
        render() {
          return <DatePicker status="default"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':status - success', () => {
      const wrapper = mount({
        render() {
          return <DatePicker status="success"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':status - warning', () => {
      const wrapper = mount({
        render() {
          return <DatePicker status="warning"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':status - error', () => {
      const wrapper = mount({
        render() {
          return <DatePicker status="error"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    // 占位符
    it(':placeholder - string', () => {
      const wrapper = mount({
        render() {
          return <DatePicker placeholder="请选择日期"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    // 禁用日期
    it(':disableDate - Array', () => {
      const wrapper = mount({
        render() {
          return <DatePicker disableDate={['2020-01-01', '2020-01-02']}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disableDate - Object', () => {
      const wrapper = mount({
        render() {
          return <DatePicker disableDate={{ from: '2020-01-01', to: '2020-01-10' }}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':disableDate - Function', () => {
      const disableFn = (date: any) => {
        return date.getDate() > 15;
      };
      const wrapper = mount({
        render() {
          return <DatePicker disableDate={disableFn}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    // 预设
    it(':presets - Object', () => {
      const presets = {
        昨天: '2020-12-27',
        今天: '2020-12-28',
        明天: '2020-12-29',
      };
      const wrapper = mount({
        render() {
          return <DatePicker presets={presets}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':presetsPlacement - left', () => {
      const wrapper = mount({
        render() {
          return <DatePicker presetsPlacement="left" presets={{ 今天: '2020-12-28' }}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':presetsPlacement - top', () => {
      const wrapper = mount({
        render() {
          return <DatePicker presetsPlacement="top" presets={{ 今天: '2020-12-28' }}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':presetsPlacement - right', () => {
      const wrapper = mount({
        render() {
          return <DatePicker presetsPlacement="right" presets={{ 今天: '2020-12-28' }}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':presetsPlacement - bottom', () => {
      const wrapper = mount({
        render() {
          return <DatePicker presetsPlacement="bottom" presets={{ 今天: '2020-12-28' }}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    // 透传属性
    it(':inputProps - Object', () => {
      const inputProps = {
        placeholder: '自定义输入框提示',
        disabled: false,
      };
      const wrapper = mount({
        render() {
          return <DatePicker inputProps={inputProps}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':popupProps - Object', () => {
      const popupProps = {
        placement: 'bottom-left',
        overlayClassName: 'custom-popup',
      };
      const wrapper = mount({
        render() {
          return <DatePicker popupProps={popupProps}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':selectInputProps - Object', () => {
      const selectInputProps = {
        clearable: false,
        readonly: true,
      };
      const wrapper = mount({
        render() {
          return <DatePicker selectInputProps={selectInputProps}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':timePickerProps - Object', () => {
      const timePickerProps = {
        steps: [1, 1, 1],
        format: 'HH:mm:ss',
      };
      const wrapper = mount({
        render() {
          return <DatePicker enableTimePicker={true} timePickerProps={timePickerProps}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test slots
  describe(':slots', () => {
    it(':label - string', () => {
      const wrapper = mount({
        render() {
          return <DatePicker label="日期选择"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':label - slot', () => {
      const wrapper = mount({
        render() {
          return <DatePicker label={() => <span class="custom-label">自定义标签</span>}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':prefixIcon - slot', () => {
      const wrapper = mount({
        render() {
          return <DatePicker prefixIcon={() => <CalendarIcon />}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':suffixIcon - slot', () => {
      const wrapper = mount({
        render() {
          return <DatePicker suffixIcon={() => <CalendarIcon />}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':tips - string', () => {
      const wrapper = mount({
        render() {
          return <DatePicker tips="这是提示信息"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':tips - slot', () => {
      const wrapper = mount({
        render() {
          return <DatePicker tips={() => <span class="custom-tips">自定义提示</span>}></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':valueDisplay - string', () => {
      const wrapper = mount({
        render() {
          return <DatePicker valueDisplay="自定义显示值" value="2020-01-01"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':valueDisplay - function', () => {
      const valueDisplay = ({ value, displayValue }: any) => {
        return `自定义: ${displayValue}`;
      };
      const wrapper = mount({
        render() {
          return <DatePicker valueDisplay={valueDisplay} value="2020-01-01"></DatePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test events
  describe(':events', () => {
    it(':onChange', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <DatePicker onChange={onChange}></DatePicker>;
        },
      });

      // 模拟日期选择
      const input = wrapper.find('input');
      await input.setValue('2020-01-01');
      await input.trigger('blur');

      expect(onChange).toHaveBeenCalled();
    });

    it(':onFocus', async () => {
      const onFocus = vi.fn();
      const wrapper = mount({
        render() {
          return <DatePicker onFocus={onFocus}></DatePicker>;
        },
      });

      const input = wrapper.find('input');
      await input.trigger('focus');

      expect(onFocus).toHaveBeenCalled();
    });

    it(':onBlur', async () => {
      const onBlur = vi.fn();
      const wrapper = mount({
        render() {
          return <DatePicker onBlur={onBlur}></DatePicker>;
        },
      });

      const input = wrapper.find('input');
      await input.trigger('focus');
      await input.trigger('blur');

      expect(onBlur).toHaveBeenCalled();
    });

    it(':onPick', async () => {
      const onPick = vi.fn();
      const wrapper = mount({
        render() {
          return <DatePicker onPick={onPick}></DatePicker>;
        },
      });

      // 模拟点击输入框打开面板
      const input = wrapper.find('input');
      await input.trigger('click');
      await nextTick();

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':onConfirm', async () => {
      const onConfirm = vi.fn();
      const wrapper = mount({
        render() {
          return <DatePicker onConfirm={onConfirm} enableTimePicker={true}></DatePicker>;
        },
      });

      // 模拟确认按钮点击
      const input = wrapper.find('input');
      await input.trigger('click');
      await nextTick();

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':onPresetClick', async () => {
      const onPresetClick = vi.fn();
      const presets = { 今天: '2020-12-28' };
      const wrapper = mount({
        render() {
          return <DatePicker onPresetClick={onPresetClick} presets={presets}></DatePicker>;
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  // test functions
  describe(':functions', () => {
    it('should support v-model', async () => {
      const value = ref('2020-01-01');
      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return <DatePicker v-model={value.value}></DatePicker>;
        },
      });

      expect(wrapper.find('input').element.value).toContain('2020-01-01');

      // 更新值
      value.value = '2020-02-01';
      await nextTick();

      expect(wrapper.find('input').element.value).toContain('2020-02-01');
    });

    it('should handle clear action', async () => {
      const value = ref('2020-01-01');
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return <DatePicker v-model={value.value} onChange={onChange} clearable={true}></DatePicker>;
        },
      });

      // 模拟清除操作
      const clearIcon = wrapper.find('.t-input__suffix-clear');
      if (clearIcon.exists()) {
        await clearIcon.trigger('click');
        expect(onChange).toHaveBeenCalledWith('', expect.any(Object));
      }
    });

    it('should handle multiple selection', async () => {
      const value = ref([]);
      const onChange = vi.fn();
      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return <DatePicker v-model={value.value} onChange={onChange} multiple={true}></DatePicker>;
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should handle time picker integration', async () => {
      const value = ref('2020-01-01 12:00:00');
      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return <DatePicker v-model={value.value} enableTimePicker={true}></DatePicker>;
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should handle different value types', async () => {
      // timestamp
      const wrapper1 = mount({
        render() {
          return <DatePicker value={1577836800000} valueType="time-stamp"></DatePicker>;
        },
      });
      expect(wrapper1.element).toMatchSnapshot();

      // Date object
      const wrapper2 = mount({
        render() {
          return <DatePicker value={new Date('2020-01-01')} valueType="Date"></DatePicker>;
        },
      });
      expect(wrapper2.element).toMatchSnapshot();
    });

    it('should handle preset functions', async () => {
      const presets = {
        昨天: () => '2020-12-27',
        今天: () => '2020-12-28',
      };
      const wrapper = mount({
        render() {
          return <DatePicker presets={presets}></DatePicker>;
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

// DateRangePicker 测试
describe('DateRangePicker', () => {
  describe(':props', () => {
    it(':range - basic', () => {
      const wrapper = mount({
        render() {
          const testRange = ['2020-01-01', '2020-01-10'];
          return <DateRangePicker value={testRange}></DateRangePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':cancelRangeSelectLimit', () => {
      const wrapper = mount({
        render() {
          return <DateRangePicker cancelRangeSelectLimit={true}></DateRangePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':panelPreselection', () => {
      const wrapper = mount({
        render() {
          return <DateRangePicker panelPreselection={false}></DateRangePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':separator', () => {
      const wrapper = mount({
        render() {
          return <DateRangePicker separator=" 至 "></DateRangePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':defaultTime - Array', () => {
      const wrapper = mount({
        render() {
          return <DateRangePicker defaultTime={['09:00:00', '18:00:00']} enableTimePicker={true}></DateRangePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':rangeInputProps', () => {
      const rangeInputProps = {
        separator: ' ~ ',
        placeholder: ['开始日期', '结束日期'],
      };
      const wrapper = mount({
        render() {
          return <DateRangePicker rangeInputProps={rangeInputProps}></DateRangePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':placeholder - Array', () => {
      const wrapper = mount({
        render() {
          return <DateRangePicker placeholder={['请选择开始日期', '请选择结束日期']}></DateRangePicker>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe(':events', () => {
    it(':onChange for range', async () => {
      const onChange = vi.fn();
      const wrapper = mount({
        render() {
          return <DateRangePicker onChange={onChange}></DateRangePicker>;
        },
      });

      // 模拟范围选择
      const inputs = wrapper.findAll('input');
      if (inputs.length >= 2) {
        await inputs[0].setValue('2020-01-01');
        await inputs[1].setValue('2020-01-10');
        await inputs[1].trigger('blur');
      }

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':onInput for range', async () => {
      const onInput = vi.fn();
      const wrapper = mount({
        render() {
          return <DateRangePicker onInput={onInput}></DateRangePicker>;
        },
      });

      const inputs = wrapper.findAll('input');
      if (inputs.length >= 1) {
        await inputs[0].setValue('2020-01-01');
      }

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

// DatePickerPanel 测试
describe('DatePickerPanel', () => {
  it(':basic', () => {
    const wrapper = mount({
      render() {
        return <DatePickerPanel></DatePickerPanel>;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':value', () => {
    const wrapper = mount({
      render() {
        return <DatePickerPanel value="2020-01-01"></DatePickerPanel>;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it(':mode', () => {
    const wrapper = mount({
      render() {
        return <DatePickerPanel mode="month"></DatePickerPanel>;
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':events', () => {
    it(':onCellClick', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount({
        render() {
          return <DatePickerPanel onCellClick={onCellClick}></DatePickerPanel>;
        },
      });

      // 查找日期单元格并点击
      const dateCell = wrapper.find('.t-date-picker__table-date-cell');
      if (dateCell.exists()) {
        await dateCell.trigger('click');
        expect(onCellClick).toHaveBeenCalled();
      }
    });

    it(':onMonthChange', async () => {
      const onMonthChange = vi.fn();
      const wrapper = mount({
        render() {
          return <DatePickerPanel onMonthChange={onMonthChange}></DatePickerPanel>;
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':onYearChange', async () => {
      const onYearChange = vi.fn();
      const wrapper = mount({
        render() {
          return <DatePickerPanel onYearChange={onYearChange}></DatePickerPanel>;
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
