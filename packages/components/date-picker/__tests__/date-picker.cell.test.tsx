import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import dayjs from 'dayjs';
import Cell from '../components/base/Cell';

const mockDate = new Date('2020-12-28');

describe(':props', () => {
  it(':text - string', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
      },
    });
    expect(wrapper.find('.t-date-picker__cell-inner').text()).toBe('28');
  });

  it(':text - number', () => {
    const wrapper = mount(Cell, {
      props: {
        text: 28,
        value: mockDate,
      },
    });
    expect(wrapper.find('.t-date-picker__cell-inner').text()).toBe('28');
  });

  it(':value - Date', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it(':active - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        active: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--active');
  });

  it(':active - false', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        active: false,
      },
    });
    expect(wrapper.classes()).not.toContain('t-date-picker__cell--active');
  });

  it(':highlight - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        highlight: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--highlight');
  });

  it(':disabled - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        disabled: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--disabled');
  });

  it(':startOfRange - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        startOfRange: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--active-start');
  });

  it(':endOfRange - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        endOfRange: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--active-end');
  });

  it(':hoverHighlight - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        hoverHighlight: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--hover-highlight');
  });

  it(':hoverStartOfRange - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        hoverStartOfRange: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--hover-start');
  });

  it(':hoverEndOfRange - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        hoverEndOfRange: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--hover-end');
  });

  it(':additional - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        additional: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--additional');
  });

  it(':now - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        now: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--now');
  });

  it(':firstDayOfMonth - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '1',
        value: new Date('2020-12-01'),
        firstDayOfMonth: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--first-day-of-month');
  });

  it(':lastDayOfMonth - true', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '31',
        value: new Date('2020-12-31'),
        lastDayOfMonth: true,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell--last-day-of-month');
  });

  it(':time - string', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: new Date(mockDate),
        time: '12:30:45',
      },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it(':dayjsObj - Dayjs', () => {
    const dayjsObj = dayjs(mockDate);
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        dayjsObj,
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});

describe(':events', () => {
  it(':onClick - basic', async () => {
    const onClick = vi.fn();
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: new Date(mockDate),
        onClick,
      },
    });

    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalledWith(expect.any(Date), { e: expect.any(MouseEvent) });
  });

  it(':onClick - disabled should not trigger', async () => {
    const onClick = vi.fn();
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: new Date(mockDate),
        disabled: true,
        onClick,
      },
    });

    await wrapper.trigger('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it(':onClick - with time', async () => {
    const onClick = vi.fn();
    const testDate = new Date(mockDate);
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: testDate,
        time: '14:30:45',
        onClick,
      },
    });

    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalled();
    // 验证时间是否被设置
    expect(testDate.getHours()).toBe(14);
    expect(testDate.getMinutes()).toBe(30);
    expect(testDate.getSeconds()).toBe(45);
  });

  it(':onClick - with AM/PM time', async () => {
    const onClick = vi.fn();
    const testDate = new Date(mockDate);
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: testDate,
        time: '02:30:00 PM',
        onClick,
      },
    });

    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalled();
    // PM 2:30 应该转换为 14:30
    expect(testDate.getHours()).toBe(14);
  });

  it(':onClick - with 12 AM time', async () => {
    const onClick = vi.fn();
    const testDate = new Date(mockDate);
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: testDate,
        time: '12:00:00 AM',
        onClick,
      },
    });

    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalled();
    // 12 AM 应该转换为 0 点
    expect(testDate.getHours()).toBe(0);
  });

  it(':onMouseEnter - basic', async () => {
    const onMouseEnter = vi.fn();
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: new Date(mockDate),
        onMouseEnter,
      },
    });

    await wrapper.trigger('mouseenter');
    expect(onMouseEnter).toHaveBeenCalledWith(expect.any(Date));
  });

  it(':onMouseEnter - disabled should not trigger', async () => {
    const onMouseEnter = vi.fn();
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: new Date(mockDate),
        disabled: true,
        onMouseEnter,
      },
    });

    await wrapper.trigger('mouseenter');
    expect(onMouseEnter).not.toHaveBeenCalled();
  });

  it(':onMouseEnter - with time', async () => {
    const onMouseEnter = vi.fn();
    const testDate = new Date(mockDate);
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: testDate,
        time: '16:45:30',
        onMouseEnter,
      },
    });

    await wrapper.trigger('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();
    // 验证时间是否被设置
    expect(testDate.getHours()).toBe(16);
    expect(testDate.getMinutes()).toBe(45);
    expect(testDate.getSeconds()).toBe(30);
  });
});

describe(':functions', () => {
  it('should render as td element', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
      },
    });
    expect(wrapper.element.tagName).toBe('TD');
  });

  it('should have correct class structure', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
      },
    });
    expect(wrapper.classes()).toContain('t-date-picker__cell');
    expect(wrapper.find('.t-date-picker__cell-inner').exists()).toBe(true);
  });

  it('should handle multiple states combination', () => {
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: mockDate,
        active: true,
        highlight: true,
        startOfRange: true,
        now: true,
      },
    });

    expect(wrapper.classes()).toContain('t-date-picker__cell--active');
    expect(wrapper.classes()).toContain('t-date-picker__cell--highlight');
    expect(wrapper.classes()).toContain('t-date-picker__cell--active-start');
    expect(wrapper.classes()).toContain('t-date-picker__cell--now');
  });

  it('should handle time with milliseconds', async () => {
    const onClick = vi.fn();
    const testDate = new Date(mockDate);
    const wrapper = mount(Cell, {
      props: {
        text: '28',
        value: testDate,
        time: '12:30:45:123',
        onClick,
      },
    });

    await wrapper.trigger('click');
    expect(onClick).toHaveBeenCalled();
    expect(testDate.getHours()).toBe(12);
    expect(testDate.getMinutes()).toBe(30);
    expect(testDate.getSeconds()).toBe(45);
    expect(testDate.getMilliseconds()).toBe(123);
  });

  it('should preserve other date properties when setting time', async () => {
    const onClick = vi.fn();
    const testDate = new Date('2020-05-15');
    const wrapper = mount(Cell, {
      props: {
        text: '15',
        value: testDate,
        time: '08:00:00',
        onClick,
      },
    });

    await wrapper.trigger('click');
    expect(testDate.getFullYear()).toBe(2020);
    expect(testDate.getMonth()).toBe(4); // May = 4
    expect(testDate.getDate()).toBe(15);
    expect(testDate.getHours()).toBe(8);
  });
});
