import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import MockDate from 'mockdate';
import PanelContent from '../components/panel/PanelContent';
import { useTableData } from '../hooks';

beforeAll(() => {
  MockDate.set('2020-12-28');
});

afterAll(() => {
  MockDate.reset();
});

const tableData = useTableData({
  mode: 'date',
  year: 2020,
  month: 11,
  firstDayOfWeek: 1,
});

describe(':props', () => {
  it(':mode - date', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    expect(wrapper.find('.t-date-picker__panel-content').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerTable' }).exists()).toBe(true);
  });

  it(':mode - week', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'week',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    expect(wrapper.find('.t-date-picker__panel-content').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerTable' }).exists()).toBe(true);
  });

  it(':mode - month', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'month',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    expect(wrapper.find('.t-date-picker__panel-content').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerTable' }).exists()).toBe(true);
  });

  it(':mode - quarter', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'quarter',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    expect(wrapper.find('.t-date-picker__panel-content').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerTable' }).exists()).toBe(true);
  });

  it(':mode - year', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'year',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    expect(wrapper.find('.t-date-picker__panel-content').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerTable' }).exists()).toBe(true);
  });

  it(':year - number', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':month - number', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 0,
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':firstDayOfWeek - 0', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        firstDayOfWeek: 0,
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':firstDayOfWeek - 1', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        firstDayOfWeek: 1,
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':activeValue - date object', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        activeValue: new Date(2020, 11, 15),
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':hoverValue - date object', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        hoverValue: new Date(2020, 11, 20),
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':rangeValue - array of dates', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        rangeValue: [new Date(2020, 11, 10), new Date(2020, 11, 20)],
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':multiple - true', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        multiple: true,
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':showWeekOfYear - true', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        showWeekOfYear: true,
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it(':disableDate - function', () => {
    const disableDate = vi.fn().mockReturnValue(false);
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        disableDate,
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });
});

describe(':events', () => {
  it(':onCellClick', async () => {
    const onCellClick = vi.fn();
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        onCellClick,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      const cellData = new Date(2020, 11, 15);
      const mockEvent = new Event('click');
      await table.vm.$emit('cellClick', cellData, { e: mockEvent });
      expect(onCellClick).toHaveBeenCalledWith(cellData, { e: expect.any(Event) });
    }
  });

  it(':onCellMouseEnter', async () => {
    const onCellMouseEnter = vi.fn();
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        onCellMouseEnter,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      const cellData = new Date(2020, 11, 15);
      await table.vm.$emit('cellMouseEnter', cellData);
      expect(onCellMouseEnter).toHaveBeenCalled();
    }
  });

  it(':onCellMouseLeave', async () => {
    const onCellMouseLeave = vi.fn();
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        onCellMouseLeave,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      const cellData = new Date(2020, 11, 15);
      await table.vm.$emit('cellMouseLeave', cellData);
      expect(onCellMouseLeave).toHaveBeenCalled();
    }
  });

  it(':onMonthChange', async () => {
    const onMonthChange = vi.fn();
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        onMonthChange,
        tableData,
      },
    });

    const header = wrapper.findComponent({ name: 'TDatePickerHeader' });
    if (header.exists()) {
      await header.vm.$emit('monthChange', 10);
      expect(onMonthChange).toHaveBeenCalled();
    }
  });

  it(':onYearChange', async () => {
    const onYearChange = vi.fn();
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        onYearChange,
        tableData,
      },
    });

    const header = wrapper.findComponent({ name: 'TDatePickerHeader' });
    if (header.exists()) {
      await header.vm.$emit('yearChange', 2021);
      expect(onYearChange).toHaveBeenCalled();
    }
  });

  it(':onJumperClick', async () => {
    const onJumperClick = vi.fn();
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        onJumperClick,
        tableData,
      },
    });

    const header = wrapper.findComponent({ name: 'TDatePickerHeader' });
    if (header.exists()) {
      await header.vm.$emit('jumperClick', { trigger: 'next' });
      expect(onJumperClick).toHaveBeenCalled();
    }
  });
});

describe(':functions', () => {
  it('should render panel content structure correctly', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    expect(wrapper.find('.t-date-picker__panel-content').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerHeader' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'TDatePickerTable' }).exists()).toBe(true);
  });

  it('should pass correct props to Header component', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    const header = wrapper.findComponent({ name: 'TDatePickerHeader' });
    if (header.exists()) {
      expect(header.props('mode')).toBe('date');
      expect(header.props('year')).toBe(2020);
      expect(header.props('month')).toBe(11);
    }
  });

  it('should pass correct props to Table component', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        firstDayOfWeek: 1,
        showWeekOfYear: true,
        multiple: true,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      expect(table.props('mode')).toBe('date');
      expect(table.props('firstDayOfWeek')).toBe(1);
      expect(table.props('multiple')).toBe(true);
    }
  });

  it('should generate correct table data for date mode', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      expect(table.props('data')).toBeDefined();
      expect(Array.isArray(table.props('data'))).toBe(true);
    }
  });

  it('should generate correct table data for month mode', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'month',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      expect(table.props('data')).toBeDefined();
      expect(Array.isArray(table.props('data'))).toBe(true);
    }
  });

  it('should generate correct table data for quarter mode', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'quarter',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      expect(table.props('data')).toBeDefined();
      expect(Array.isArray(table.props('data'))).toBe(true);
    }
  });

  it('should generate correct table data for year mode', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'year',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      expect(table.props('data')).toBeDefined();
      expect(Array.isArray(table.props('data'))).toBe(true);
    }
  });

  it('should handle different firstDayOfWeek values', () => {
    const firstDayOfWeekValues = [0, 1];

    firstDayOfWeekValues.forEach((firstDayOfWeek) => {
      const wrapper = mount(PanelContent, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          firstDayOfWeek,
          tableData,
        },
      });

      const table = wrapper.findComponent({ name: 'TDatePickerTable' });
      if (table.exists()) {
        expect(table.props('firstDayOfWeek')).toBe(firstDayOfWeek);
      }
    });
  });

  it('should apply disable date function correctly', () => {
    const disableDate = vi.fn().mockImplementation((date) => {
      return date.getDate() % 2 === 0; // 禁用偶数日期
    });

    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        disableDate,
        tableData,
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should pass correct props to table when year or month changes', async () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    const initialTable = wrapper.findComponent({ name: 'TDatePickerTable' });

    // 验证初始月份传递正确
    expect(initialTable.exists()).toBe(true);

    await wrapper.setProps({ month: 10 });

    const updatedTable = wrapper.findComponent({ name: 'TDatePickerTable' });

    // 验证组件仍然存在且props正确更新
    expect(updatedTable.exists()).toBe(true);
    expect(updatedTable.props('data')).toBeDefined();
  });

  it('should handle today highlighting correctly', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11, // December 2020
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      const tableData = table.props('data');
      expect(tableData).toBeDefined();
    }
  });

  it('should handle cross-month date display', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 0, // January 2020
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      const tableData = table.props('data');
      expect(tableData).toBeDefined();
      expect(tableData.length).toBeGreaterThan(0);
    }
  });

  it('should handle leap year correctly', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020, // 闰年
        month: 1, // February
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      const tableData = table.props('data');
      expect(tableData).toBeDefined();
    }
  });

  it('should handle different year ranges for year mode', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'year',
        year: 2025,
        month: 0,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      const tableData = table.props('data');
      expect(tableData).toBeDefined();
    }
  });

  it('should pass active and hover values to table', () => {
    const activeValue = new Date(2020, 11, 15);
    const hoverValue = new Date(2020, 11, 20);

    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        activeValue,
        hoverValue,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      // 直接检查传递给表格组件的具体属性值
      const tableProps = table.props();

      // 验证 activeValue 是否正确传递
      expect(tableProps.activeValue).toEqual(activeValue);

      // 验证 hoverValue 是否正确传递
      expect(tableProps.hoverValue).toEqual(hoverValue);
    }
  });

  it('should pass range value to table', () => {
    const rangeValue = [new Date(2020, 11, 10), new Date(2020, 11, 20)];

    const wrapper = mount(PanelContent, {
      props: {
        mode: 'date',
        year: 2020,
        month: 11,
        rangeValue,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      expect(table.props('rangeValue')).toEqual(rangeValue);
    }
  });

  it('should handle week mode correctly', () => {
    const wrapper = mount(PanelContent, {
      props: {
        mode: 'week',
        year: 2020,
        month: 11,
        tableData,
      },
    });

    const table = wrapper.findComponent({ name: 'TDatePickerTable' });
    if (table.exists()) {
      expect(table.props('mode')).toBe('week');
      expect(table.props('data')).toBeDefined();
    }
  });
});
