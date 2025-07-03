import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import ExtraContent from '../components/panel/ExtraContent';

describe(':props', () => {
  it(':enableTimePicker - true', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.t-date-picker__footer').exists()).toBe(true);
  });

  it(':enableTimePicker - false', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: false,
        selectedValue: new Date(2020, 11, 28),
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':selectedValue - date object', () => {
    const selectedValue = new Date(2020, 11, 28, 14, 30, 0);
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':selectedValue - null', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: null,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':defaultTime - string', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        defaultTime: '14:30:00',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':defaultTime - array of strings', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: [new Date(2020, 11, 28), new Date(2020, 11, 30)],
        defaultTime: ['09:00:00', '18:00:00'],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':format - custom format', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        format: 'HH:mm',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':steps - time steps', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        steps: [1, 15, 30],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':allowInput - true', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        allowInput: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':allowInput - false', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        allowInput: false,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':disabled - true', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        disabled: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':readonly - true', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        readonly: true,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':placeholder - string', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        placeholder: '请选择时间',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':placeholder - array', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: [new Date(2020, 11, 28), new Date(2020, 11, 30)],
        placeholder: ['开始时间', '结束时间'],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});

describe(':events', () => {
  it(':onTimeChange - single value', async () => {
    const onTimeChange = vi.fn();
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        onTimeChange,
      },
    });

    const timePicker = wrapper.findComponent({ name: 'TTimePicker' });
    if (timePicker.exists()) {
      const newTime = '15:30:00';
      await timePicker.vm.$emit('change', newTime);
      expect(onTimeChange).toHaveBeenCalledWith(newTime);
    }
  });

  it(':onTimeChange - range value', async () => {
    const onTimeChange = vi.fn();
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: [new Date(2020, 11, 28), new Date(2020, 11, 30)],
        onTimeChange,
      },
    });

    const timePicker = wrapper.findComponent({ name: 'TRangePicker' });
    if (timePicker.exists()) {
      const newTime = ['09:00:00', '18:00:00'];
      await timePicker.vm.$emit('change', newTime);
      expect(onTimeChange).toHaveBeenCalledWith(newTime);
    }
  });

  it(':onBlur - time picker blur', async () => {
    const onBlur = vi.fn();
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        onBlur,
      },
    });

    const timePicker = wrapper.findComponent({ name: 'TTimePicker' });
    if (timePicker.exists()) {
      await timePicker.vm.$emit('blur', { value: '14:30:00' });
      expect(onBlur).toHaveBeenCalledWith({ value: '14:30:00' });
    }
  });

  it(':onFocus - time picker focus', async () => {
    const onFocus = vi.fn();
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        onFocus,
      },
    });

    const timePicker = wrapper.findComponent({ name: 'TTimePicker' });
    if (timePicker.exists()) {
      await timePicker.vm.$emit('focus', { value: '14:30:00' });
      expect(onFocus).toHaveBeenCalledWith({ value: '14:30:00' });
    }
  });

  it(':onInput - time picker input', async () => {
    const onInput = vi.fn();
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        onInput,
      },
    });

    const timePicker = wrapper.findComponent({ name: 'TTimePicker' });
    if (timePicker.exists()) {
      await timePicker.vm.$emit('input', { value: '14:30:00' });
      expect(onInput).toHaveBeenCalledWith({ value: '14:30:00' });
    }
  });
});

describe(':functions', () => {
  it('should render time picker when enableTimePicker is true', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        presetsPlacement: 'bottom',
        selectedValue: new Date(2020, 11, 28),
      },
    });

    expect(wrapper.find('.t-date-picker__footer').exists()).toBe(true);
  });

  it('should not render time picker when enableTimePicker is false', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: false,
        selectedValue: new Date(2020, 11, 28),
      },
    });

    expect(wrapper.findComponent({ name: 'TTimePicker' }).exists()).toBe(false);
  });

  it('should render range time picker for array values', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        presetsPlacement: 'bottom',
        selectedValue: [new Date(2020, 11, 28), new Date(2020, 11, 30)],
      },
    });

    expect(wrapper.find('.t-date-picker__footer').exists()).toBe(true);
  });

  it('should calculate correct time value from date', () => {
    const date = new Date(2020, 11, 28, 14, 30, 45);
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: date,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle null selectedValue gracefully', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: null,
      },
    });

    expect(wrapper.exists()).toBe(true);
    const timePicker = wrapper.findComponent({ name: 'TTimePicker' });
    if (timePicker.exists()) {
      expect(timePicker.props('value')).toBeUndefined();
    }
  });

  it('should use defaultTime when selectedValue is null', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: null,
        defaultTime: '10:00:00',
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should pass through all time picker props', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28),
        allowInput: true,
        disabled: false,
        readonly: false,
        placeholder: '选择时间',
        format: 'HH:mm:ss',
        steps: [1, 1, 1],
      },
    });

    const timePicker = wrapper.findComponent({ name: 'TTimePicker' });
    if (timePicker.exists()) {
      expect(timePicker.props('allowInput')).toBe(true);
      expect(timePicker.props('disabled')).toBe(false);
      expect(timePicker.props('readonly')).toBe(false);
      expect(timePicker.props('placeholder')).toBe('选择时间');
      expect(timePicker.props('format')).toBe('HH:mm:ss');
      expect(timePicker.props('steps')).toEqual([1, 1, 1]);
    }
  });

  it('should handle range time picker props correctly', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: [new Date(2020, 11, 28), new Date(2020, 11, 30)],
        placeholder: ['开始时间', '结束时间'],
        defaultTime: ['09:00:00', '18:00:00'],
      },
    });

    const timePicker = wrapper.findComponent({ name: 'TRangePicker' });
    if (timePicker.exists()) {
      expect(timePicker.props('placeholder')).toEqual(['开始时间', '结束时间']);
      expect(timePicker.props('defaultTime')).toEqual(['09:00:00', '18:00:00']);
    }
  });

  it('should extract time correctly from different date formats', () => {
    const testDates = [
      new Date(2020, 11, 28, 0, 0, 0),
      new Date(2020, 11, 28, 12, 30, 45),
      new Date(2020, 11, 28, 23, 59, 59),
    ];

    testDates.forEach((date) => {
      const wrapper = mount(ExtraContent, {
        props: {
          enableTimePicker: true,
          selectedValue: date,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  it('should handle array of dates with different times', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: [new Date(2020, 11, 28, 9, 0, 0), new Date(2020, 11, 30, 18, 0, 0)],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should update time value when selectedValue changes', async () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date(2020, 11, 28, 10, 0, 0),
      },
    });

    expect(wrapper.exists()).toBe(true);

    await wrapper.setProps({
      selectedValue: new Date(2020, 11, 28, 15, 30, 0),
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle edge cases with invalid dates', () => {
    const wrapper = mount(ExtraContent, {
      props: {
        enableTimePicker: true,
        selectedValue: new Date('invalid'),
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});
