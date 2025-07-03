import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import MockDate from 'mockdate';
import RangePanel from '../components/panel/RangePanel';

describe('DatePicker RangePanel Component', () => {
  beforeAll(() => {
    MockDate.set('2020-12-28');
  });

  afterAll(() => {
    MockDate.reset();
  });

  describe(':props', () => {
    it(':mode - date', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
        },
      });

      expect(wrapper.find('.t-date-picker__range-panel').exists()).toBe(true);
      expect(wrapper.findAllComponents({ name: 'PanelContent' })).toHaveLength(2);
    });

    it(':mode - week', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'week',
          year: [2020, 2021],
          month: [11, 0],
        },
      });

      expect(wrapper.find('.t-date-picker__range-panel').exists()).toBe(true);
      expect(wrapper.findAllComponents({ name: 'PanelContent' })).toHaveLength(2);
    });

    it(':mode - month', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'month',
          year: [2020, 2021],
          month: [11, 0],
        },
      });

      expect(wrapper.find('.t-date-picker__range-panel').exists()).toBe(true);
      expect(wrapper.findAllComponents({ name: 'PanelContent' })).toHaveLength(2);
    });

    it(':mode - quarter', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'quarter',
          year: [2020, 2021],
          month: [11, 0],
        },
      });

      expect(wrapper.find('.t-date-picker__range-panel').exists()).toBe(true);
      expect(wrapper.findAllComponents({ name: 'PanelContent' })).toHaveLength(2);
    });

    it(':mode - year', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'year',
          year: [2020, 2030],
          month: [0, 0],
        },
      });

      expect(wrapper.find('.t-date-picker__range-panel').exists()).toBe(true);
      expect(wrapper.findAllComponents({ name: 'PanelContent' })).toHaveLength(2);
    });

    it(':year - array of numbers', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':month - array of numbers', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2020],
          month: [10, 11],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':firstDayOfWeek - 0', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          firstDayOfWeek: 0,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':firstDayOfWeek - 1', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          firstDayOfWeek: 1,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':activeValue - array of dates', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          activeValue: [new Date(2020, 11, 15), new Date(2021, 0, 15)],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':hoverValue - array of dates', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          hoverValue: [new Date(2020, 11, 20), new Date(2021, 0, 20)],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':rangeValue - array of dates', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          rangeValue: [new Date(2020, 11, 10), new Date(2021, 0, 10)],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':showWeekOfYear - true', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          showWeekOfYear: true,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':partial - left', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          partial: 'left',
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':partial - right', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          partial: 'right',
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':disableDate - function', () => {
      const disableDate = vi.fn().mockReturnValue(false);
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          disableDate,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe(':events', () => {
    it(':onCellClick', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          onCellClick,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 0) {
        const cellData = { text: '15', value: new Date(2020, 11, 15) };
        await panelContents[0].vm.$emit('cellClick', { cell: cellData, e: new Event('click'), partial: 'left' });
        expect(onCellClick).toHaveBeenCalledWith({ cell: cellData, e: expect.any(Event), partial: 'left' });
      }
    });

    it(':onCellMouseEnter', async () => {
      const onCellMouseEnter = vi.fn();
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          onCellMouseEnter,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 0) {
        const cellData = { text: '15', value: new Date(2020, 11, 15) };
        await panelContents[0].vm.$emit('cellMouseEnter', {
          cell: cellData,
          e: new Event('mouseenter'),
          partial: 'left',
        });
        expect(onCellMouseEnter).toHaveBeenCalledWith({ cell: cellData, e: expect.any(Event), partial: 'left' });
      }
    });

    it(':onCellMouseLeave', async () => {
      const onCellMouseLeave = vi.fn();
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          onCellMouseLeave,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 0) {
        const cellData = { text: '15', value: new Date(2020, 11, 15) };
        await panelContents[0].vm.$emit('cellMouseLeave', {
          cell: cellData,
          e: new Event('mouseleave'),
          partial: 'left',
        });
        expect(onCellMouseLeave).toHaveBeenCalledWith({ cell: cellData, e: expect.any(Event), partial: 'left' });
      }
    });

    it(':onRowClick', async () => {
      const onRowClick = vi.fn();
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'week',
          year: [2020, 2021],
          month: [11, 0],
          onRowClick,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 0) {
        const rowData = [{ text: '15', value: new Date(2020, 11, 15) }];
        await panelContents[0].vm.$emit('rowClick', { row: rowData, e: new Event('click'), partial: 'left' });
        expect(onRowClick).toHaveBeenCalledWith({ row: rowData, e: expect.any(Event), partial: 'left' });
      }
    });

    it(':onMonthChange', async () => {
      const onMonthChange = vi.fn();
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          onMonthChange,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 0) {
        await panelContents[0].vm.$emit('monthChange', 10, 'left');
        expect(onMonthChange).toHaveBeenCalledWith(10, 'left');
      }
    });

    it(':onYearChange', async () => {
      const onYearChange = vi.fn();
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          onYearChange,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 0) {
        await panelContents[0].vm.$emit('yearChange', 2022, 'left');
        expect(onYearChange).toHaveBeenCalledWith(2022, 'left');
      }
    });

    it(':onJumperClick', async () => {
      const onJumperClick = vi.fn();
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          onJumperClick,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 0) {
        await panelContents[0].vm.$emit('jumperClick', { trigger: 'next', e: new Event('click') }, 'left');
        expect(onJumperClick).toHaveBeenCalledWith({ trigger: 'next', e: expect.any(Event) }, 'left');
      }
    });
  });

  describe(':functions', () => {
    it('should render range panel structure correctly', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
        },
      });

      expect(wrapper.find('.t-date-picker__range-panel').exists()).toBe(true);
      expect(wrapper.findAllComponents({ name: 'PanelContent' })).toHaveLength(2);
    });

    it('should pass correct props to left panel', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          firstDayOfWeek: 1,
          showWeekOfYear: true,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 0) {
        const leftPanel = panelContents[0];
        expect(leftPanel.props('mode')).toBe('date');
        expect(leftPanel.props('year')).toBe(2020);
        expect(leftPanel.props('month')).toBe(11);
        expect(leftPanel.props('firstDayOfWeek')).toBe(1);
        expect(leftPanel.props('showWeekOfYear')).toBe(true);
      }
    });

    it('should pass correct props to right panel', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          firstDayOfWeek: 1,
          showWeekOfYear: true,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        const rightPanel = panelContents[1];
        expect(rightPanel.props('mode')).toBe('date');
        expect(rightPanel.props('year')).toBe(2021);
        expect(rightPanel.props('month')).toBe(0);
        expect(rightPanel.props('firstDayOfWeek')).toBe(1);
        expect(rightPanel.props('showWeekOfYear')).toBe(true);
      }
    });

    it('should pass active values to panels correctly', () => {
      const activeValue = [new Date(2020, 11, 15), new Date(2021, 0, 15)];
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          activeValue,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('activeValue')).toEqual(activeValue[0]);
        expect(panelContents[1].props('activeValue')).toEqual(activeValue[1]);
      }
    });

    it('should pass hover values to panels correctly', () => {
      const hoverValue = [new Date(2020, 11, 20), new Date(2021, 0, 20)];
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          hoverValue,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('hoverValue')).toEqual(hoverValue[0]);
        expect(panelContents[1].props('hoverValue')).toEqual(hoverValue[1]);
      }
    });

    it('should pass range value to both panels', () => {
      const rangeValue = [new Date(2020, 11, 10), new Date(2021, 0, 10)];
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          rangeValue,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('rangeValue')).toEqual(rangeValue);
        expect(panelContents[1].props('rangeValue')).toEqual(rangeValue);
      }
    });

    it('should handle partial prop correctly', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          partial: 'left',
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle disable date function correctly', () => {
      const disableDate = vi.fn().mockImplementation((date) => {
        return date.getDate() % 2 === 0;
      });

      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          disableDate,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('disableDate')).toBe(disableDate);
        expect(panelContents[1].props('disableDate')).toBe(disableDate);
      }
    });

    it('should handle same year different months', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2020],
          month: [10, 11],
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('year')).toBe(2020);
        expect(panelContents[0].props('month')).toBe(10);
        expect(panelContents[1].props('year')).toBe(2020);
        expect(panelContents[1].props('month')).toBe(11);
      }
    });

    it('should handle different years same months', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 11],
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('year')).toBe(2020);
        expect(panelContents[0].props('month')).toBe(11);
        expect(panelContents[1].props('year')).toBe(2021);
        expect(panelContents[1].props('month')).toBe(11);
      }
    });

    it('should emit events with correct partial information', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
          onCellClick,
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });

      // Test left panel
      if (panelContents.length > 0) {
        const cellData = { text: '15', value: new Date(2020, 11, 15) };
        await panelContents[0].vm.$emit('cellClick', { cell: cellData, e: new Event('click') });
        expect(onCellClick).toHaveBeenCalledWith(expect.objectContaining({ cell: cellData, partial: 'left' }));
      }

      // Test right panel
      if (panelContents.length > 1) {
        const cellData = { text: '15', value: new Date(2021, 0, 15) };
        await panelContents[1].vm.$emit('cellClick', { cell: cellData, e: new Event('click') });
        expect(onCellClick).toHaveBeenCalledWith(expect.objectContaining({ cell: cellData, partial: 'right' }));
      }
    });

    it('should handle month mode correctly', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'month',
          year: [2020, 2021],
          month: [0, 0],
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('mode')).toBe('month');
        expect(panelContents[1].props('mode')).toBe('month');
      }
    });

    it('should handle quarter mode correctly', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'quarter',
          year: [2020, 2021],
          month: [0, 0],
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('mode')).toBe('quarter');
        expect(panelContents[1].props('mode')).toBe('quarter');
      }
    });

    it('should handle year mode correctly', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'year',
          year: [2020, 2030],
          month: [0, 0],
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('mode')).toBe('year');
        expect(panelContents[1].props('mode')).toBe('year');
        expect(panelContents[0].props('year')).toBe(2020);
        expect(panelContents[1].props('year')).toBe(2030);
      }
    });

    it('should handle week mode correctly', () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'week',
          year: [2020, 2021],
          month: [11, 0],
        },
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('mode')).toBe('week');
        expect(panelContents[1].props('mode')).toBe('week');
      }
    });

    it('should update panel props when year or month changes', async () => {
      const wrapper = mount(RangePanel, {
        props: {
          mode: 'date',
          year: [2020, 2021],
          month: [11, 0],
        },
      });

      await wrapper.setProps({
        year: [2021, 2022],
        month: [0, 1],
      });

      const panelContents = wrapper.findAllComponents({ name: 'PanelContent' });
      if (panelContents.length > 1) {
        expect(panelContents[0].props('year')).toBe(2021);
        expect(panelContents[0].props('month')).toBe(0);
        expect(panelContents[1].props('year')).toBe(2022);
        expect(panelContents[1].props('month')).toBe(1);
      }
    });
  });
});
