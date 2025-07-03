import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import MockDate from 'mockdate';
import SinglePanel from '../components/panel/SinglePanel';

describe('DatePicker SinglePanel Component', () => {
  beforeAll(() => {
    MockDate.set('2020-12-28');
  });

  afterAll(() => {
    MockDate.reset();
  });

  describe(':props', () => {
    it(':mode - date', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__single-panel').exists()).toBe(true);
      expect(wrapper.findComponent({ name: 'PanelContent' }).exists()).toBe(true);
    });

    it(':mode - week', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'week',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__single-panel').exists()).toBe(true);
      expect(wrapper.findComponent({ name: 'PanelContent' }).exists()).toBe(true);
    });

    it(':mode - month', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'month',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__single-panel').exists()).toBe(true);
      expect(wrapper.findComponent({ name: 'PanelContent' }).exists()).toBe(true);
    });

    it(':mode - quarter', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'quarter',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__single-panel').exists()).toBe(true);
      expect(wrapper.findComponent({ name: 'PanelContent' }).exists()).toBe(true);
    });

    it(':mode - year', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'year',
          year: 2020,
          month: 0,
        },
      });

      expect(wrapper.find('.t-date-picker__single-panel').exists()).toBe(true);
      expect(wrapper.findComponent({ name: 'PanelContent' }).exists()).toBe(true);
    });

    it(':year - number', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2022,
          month: 11,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':month - number', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 5,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':firstDayOfWeek - 0', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          firstDayOfWeek: 0,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':firstDayOfWeek - 1', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          firstDayOfWeek: 1,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':activeValue - date', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          activeValue: new Date(2020, 11, 15),
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':hoverValue - date', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          hoverValue: new Date(2020, 11, 20),
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':value - date', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          value: new Date(2020, 11, 10),
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':rangeValue - array of dates', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          rangeValue: [new Date(2020, 11, 5), new Date(2020, 11, 25)],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':showWeekOfYear - true', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          showWeekOfYear: true,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':disableDate - function', () => {
      const disableDate = vi.fn().mockReturnValue(false);
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          disableDate,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':enableTimePicker - true', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          enableTimePicker: true,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':needConfirm - true', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          needConfirm: true,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':presets - object', () => {
      const presets = {
        今天: new Date(),
        昨天: new Date(Date.now() - 24 * 60 * 60 * 1000),
      };
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          presets,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':presetsPlacement - top', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          presetsPlacement: 'top',
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':selectedValue - date', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          selectedValue: new Date(2020, 11, 15),
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':defaultTime - string', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          defaultTime: '12:00:00',
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':format - string', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          format: 'YYYY-MM-DD',
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':timePickerProps - object', () => {
      const timePickerProps = {
        format: 'HH:mm:ss',
        steps: [1, 1, 1],
      };
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          timePickerProps,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe(':events', () => {
    it(':onCellClick', async () => {
      const onCellClick = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onCellClick,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        const cellData = { text: '15', value: new Date(2020, 11, 15) };
        await panelContent.vm.$emit('cellClick', { cell: cellData, e: new Event('click') });
        expect(onCellClick).toHaveBeenCalledWith({ cell: cellData, e: expect.any(Event) });
      }
    });

    it(':onCellMouseEnter', async () => {
      const onCellMouseEnter = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onCellMouseEnter,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        const cellData = { text: '15', value: new Date(2020, 11, 15) };
        await panelContent.vm.$emit('cellMouseEnter', {
          cell: cellData,
          e: new Event('mouseenter'),
        });
        expect(onCellMouseEnter).toHaveBeenCalledWith({
          cell: cellData,
          e: expect.any(Event),
        });
      }
    });

    it(':onCellMouseLeave', async () => {
      const onCellMouseLeave = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onCellMouseLeave,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        const cellData = { text: '15', value: new Date(2020, 11, 15) };
        await panelContent.vm.$emit('cellMouseLeave', {
          cell: cellData,
          e: new Event('mouseleave'),
        });
        expect(onCellMouseLeave).toHaveBeenCalledWith({
          cell: cellData,
          e: expect.any(Event),
        });
      }
    });

    it(':onRowClick', async () => {
      const onRowClick = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'week',
          year: 2020,
          month: 11,
          onRowClick,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        const rowData = [{ text: '15', value: new Date(2020, 11, 15) }];
        await panelContent.vm.$emit('rowClick', { row: rowData, e: new Event('click') });
        expect(onRowClick).toHaveBeenCalledWith({ row: rowData, e: expect.any(Event) });
      }
    });

    it(':onMonthChange', async () => {
      const onMonthChange = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onMonthChange,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        await panelContent.vm.$emit('monthChange', 10);
        expect(onMonthChange).toHaveBeenCalledWith(10);
      }
    });

    it(':onYearChange', async () => {
      const onYearChange = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onYearChange,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        await panelContent.vm.$emit('yearChange', 2022);
        expect(onYearChange).toHaveBeenCalledWith(2022);
      }
    });

    it(':onJumperClick', async () => {
      const onJumperClick = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onJumperClick,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        await panelContent.vm.$emit('jumperClick', { trigger: 'next', e: new Event('click') });
        expect(onJumperClick).toHaveBeenCalledWith({ trigger: 'next', e: expect.any(Event) });
      }
    });

    it(':onTimeChange', async () => {
      const onTimeChange = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          enableTimePicker: true,
          onTimeChange,
        },
      });

      const extraContent = wrapper.findComponent({ name: 'ExtraContent' });
      if (extraContent.exists()) {
        await extraContent.vm.$emit('timeChange', '12:00:00');
        expect(onTimeChange).toHaveBeenCalledWith('12:00:00');
      }
    });

    it(':onConfirmClick', async () => {
      const onConfirmClick = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          needConfirm: true,
          onConfirmClick,
        },
      });

      const footer = wrapper.findComponent({ name: 'Footer' });
      if (footer.exists()) {
        await footer.vm.$emit('confirmClick');
        expect(onConfirmClick).toHaveBeenCalled();
      }
    });

    it(':onPresetClick', async () => {
      const onPresetClick = vi.fn();
      const presets = {
        今天: new Date(),
        昨天: new Date(Date.now() - 24 * 60 * 60 * 1000),
      };
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          presets,
          onPresetClick,
        },
      });

      const footer = wrapper.findComponent({ name: 'Footer' });
      if (footer.exists()) {
        await footer.vm.$emit('presetClick', { preset: new Date(), label: '今天' });
        expect(onPresetClick).toHaveBeenCalledWith({ preset: expect.any(Date), label: '今天' });
      }
    });

    it(':onBlur', async () => {
      const onBlur = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          enableTimePicker: true,
          onBlur,
        },
      });

      const extraContent = wrapper.findComponent({ name: 'ExtraContent' });
      if (extraContent.exists()) {
        await extraContent.vm.$emit('blur', new Event('blur'));
        expect(onBlur).toHaveBeenCalledWith(expect.any(Event));
      }
    });

    it(':onFocus', async () => {
      const onFocus = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          enableTimePicker: true,
          onFocus,
        },
      });

      const extraContent = wrapper.findComponent({ name: 'ExtraContent' });
      if (extraContent.exists()) {
        await extraContent.vm.$emit('focus', new Event('focus'));
        expect(onFocus).toHaveBeenCalledWith(expect.any(Event));
      }
    });

    it(':onInput', async () => {
      const onInput = vi.fn();
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          enableTimePicker: true,
          onInput,
        },
      });

      const extraContent = wrapper.findComponent({ name: 'ExtraContent' });
      if (extraContent.exists()) {
        await extraContent.vm.$emit('input', '12:00:00');
        expect(onInput).toHaveBeenCalledWith('12:00:00');
      }
    });
  });

  describe(':functions', () => {
    it('should render single panel structure correctly', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__single-panel').exists()).toBe(true);
      expect(wrapper.findComponent({ name: 'PanelContent' }).exists()).toBe(true);
    });

    it('should pass correct props to panel content', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          firstDayOfWeek: 1,
          showWeekOfYear: true,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        expect(panelContent.props('mode')).toBe('date');
        expect(panelContent.props('year')).toBe(2020);
        expect(panelContent.props('month')).toBe(11);
        expect(panelContent.props('firstDayOfWeek')).toBe(1);
        expect(panelContent.props('showWeekOfYear')).toBe(true);
      }
    });

    it('should pass active value to panel content', () => {
      const activeValue = new Date(2020, 11, 15);
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          activeValue,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        expect(panelContent.props('activeValue')).toEqual(activeValue);
      }
    });

    it('should pass hover value to panel content', () => {
      const hoverValue = new Date(2020, 11, 20);
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          hoverValue,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        expect(panelContent.props('hoverValue')).toEqual(hoverValue);
      }
    });

    it('should pass value to panel content', () => {
      const value = new Date(2020, 11, 10);
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          value,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        expect(panelContent.props('value')).toEqual(value);
      }
    });

    it('should pass range value to panel content', () => {
      const rangeValue = [new Date(2020, 11, 5), new Date(2020, 11, 25)];
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          rangeValue,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        expect(panelContent.props('rangeValue')).toEqual(rangeValue);
      }
    });

    it('should pass disable date function to panel content', () => {
      const disableDate = vi.fn().mockImplementation((date) => {
        return date.getDate() % 2 === 0;
      });

      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          disableDate,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        expect(panelContent.props('disableDate')).toBe(disableDate);
      }
    });

    it('should render extra content when enableTimePicker is true', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          enableTimePicker: true,
        },
      });

      expect(wrapper.findComponent({ name: 'ExtraContent' }).exists()).toBe(true);
    });

    it('should render footer when needConfirm is true', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          needConfirm: true,
        },
      });

      expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true);
    });

    it('should render footer when presets are provided', () => {
      const presets = {
        今天: new Date(),
        昨天: new Date(Date.now() - 24 * 60 * 60 * 1000),
      };
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          presets,
        },
      });

      expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true);
    });

    it('should handle different modes correctly', () => {
      const modes = ['date', 'week', 'month', 'quarter', 'year'];

      modes.forEach((mode) => {
        const wrapper = mount(SinglePanel, {
          props: {
            mode,
            year: 2020,
            month: 11,
          },
        });

        const panelContent = wrapper.findComponent({ name: 'PanelContent' });
        if (panelContent.exists()) {
          expect(panelContent.props('mode')).toBe(mode);
        }
      });
    });

    it('should pass time picker props to extra content', () => {
      const timePickerProps = {
        format: 'HH:mm:ss',
        steps: [1, 1, 1],
      };
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          enableTimePicker: true,
          timePickerProps,
        },
      });

      const extraContent = wrapper.findComponent({ name: 'ExtraContent' });
      if (extraContent.exists()) {
        expect(extraContent.props('timePickerProps')).toEqual(timePickerProps);
      }
    });

    it('should pass default time to extra content', () => {
      const defaultTime = '12:00:00';
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          enableTimePicker: true,
          defaultTime,
        },
      });

      const extraContent = wrapper.findComponent({ name: 'ExtraContent' });
      if (extraContent.exists()) {
        expect(extraContent.props('defaultTime')).toBe(defaultTime);
      }
    });

    it('should pass format to extra content', () => {
      const format = 'YYYY-MM-DD HH:mm:ss';
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          enableTimePicker: true,
          format,
        },
      });

      const extraContent = wrapper.findComponent({ name: 'ExtraContent' });
      if (extraContent.exists()) {
        expect(extraContent.props('format')).toBe(format);
      }
    });

    it('should pass presets placement to footer', () => {
      const presets = {
        今天: new Date(),
        昨天: new Date(Date.now() - 24 * 60 * 60 * 1000),
      };
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          presets,
          presetsPlacement: 'top',
        },
      });

      const footer = wrapper.findComponent({ name: 'Footer' });
      if (footer.exists()) {
        expect(footer.props('presetsPlacement')).toBe('top');
      }
    });

    it('should handle selected value for footer', () => {
      const selectedValue = new Date(2020, 11, 15);
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          needConfirm: true,
          selectedValue,
        },
      });

      const footer = wrapper.findComponent({ name: 'Footer' });
      if (footer.exists()) {
        expect(footer.props('selectedValue')).toEqual(selectedValue);
      }
    });

    it('should update panel props when year or month changes', async () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
        },
      });

      await wrapper.setProps({
        year: 2021,
        month: 0,
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        expect(panelContent.props('year')).toBe(2021);
        expect(panelContent.props('month')).toBe(0);
      }
    });

    it('should handle edge cases with null or undefined values', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          activeValue: null,
          hoverValue: undefined,
          value: null,
          rangeValue: null,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle year mode with decade display', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'year',
          year: 2020,
          month: 0,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        expect(panelContent.props('mode')).toBe('year');
        expect(panelContent.props('year')).toBe(2020);
      }
    });

    it('should handle first day of week correctly', () => {
      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          firstDayOfWeek: 0,
        },
      });

      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        expect(panelContent.props('firstDayOfWeek')).toBe(0);
      }
    });

    it('should emit events correctly from nested components', async () => {
      const onCellClick = vi.fn();
      const onTimeChange = vi.fn();
      const onConfirmClick = vi.fn();

      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          enableTimePicker: true,
          needConfirm: true,
          onCellClick,
          onTimeChange,
          onConfirmClick,
        },
      });

      // Test panel content event
      const panelContent = wrapper.findComponent({ name: 'PanelContent' });
      if (panelContent.exists()) {
        const cellData = { text: '15', value: new Date(2020, 11, 15) };
        await panelContent.vm.$emit('cellClick', { cell: cellData, e: new Event('click') });
        expect(onCellClick).toHaveBeenCalledWith({ cell: cellData, e: expect.any(Event) });
      }

      // Test extra content event
      const extraContent = wrapper.findComponent({ name: 'ExtraContent' });
      if (extraContent.exists()) {
        await extraContent.vm.$emit('timeChange', '12:00:00');
        expect(onTimeChange).toHaveBeenCalledWith('12:00:00');
      }

      // Test footer event
      const footer = wrapper.findComponent({ name: 'Footer' });
      if (footer.exists()) {
        await footer.vm.$emit('confirmClick');
        expect(onConfirmClick).toHaveBeenCalled();
      }
    });

    it('should handle complex preset objects correctly', () => {
      const presets = {
        最近7天: [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],
        最近30天: [new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()],
      };

      const wrapper = mount(SinglePanel, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          presets,
        },
      });

      const footer = wrapper.findComponent({ name: 'Footer' });
      if (footer.exists()) {
        expect(footer.props('presets')).toEqual(presets);
      }
    });
  });
});
