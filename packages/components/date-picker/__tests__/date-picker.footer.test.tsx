import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Footer from '../components/base/Footer';

describe('DatePicker Footer Component', () => {
  describe(':props', () => {
    it(':enableTimePicker - true', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: '2020-12-28',
        },
      });
      expect(wrapper.find('.t-button').exists()).toBe(true);
    });

    it(':enableTimePicker - false', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: false,
          needConfirm: true,
        },
      });
      expect(wrapper.find('.t-button').exists()).toBe(false);
    });

    it(':needConfirm - true', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: '2020-12-28',
        },
      });
      expect(wrapper.find('.t-button').exists()).toBe(true);
    });

    it(':needConfirm - false', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: false,
        },
      });
      expect(wrapper.find('.t-button').exists()).toBe(false);
    });

    it(':presets - Object', () => {
      const presets = {
        昨天: '2020-12-27',
        今天: '2020-12-28',
        明天: '2020-12-29',
      };
      const wrapper = mount(Footer, {
        props: {
          presets,
        },
      });
      expect(wrapper.findAll('.t-button')).toHaveLength(3);
      expect(wrapper.text()).toContain('昨天');
      expect(wrapper.text()).toContain('今天');
      expect(wrapper.text()).toContain('明天');
    });

    it(':presets - empty object', () => {
      const wrapper = mount(Footer, {
        props: {
          presets: {},
        },
      });
      expect(wrapper.findAll('.t-button')).toHaveLength(0);
    });

    it(':presetsPlacement - left', () => {
      const wrapper = mount(Footer, {
        props: {
          presets: { 今天: '2020-12-28' },
          presetsPlacement: 'left',
        },
      });
      expect(wrapper.classes()).toContain('t-date-picker__footer--left');
    });

    it(':presetsPlacement - top', () => {
      const wrapper = mount(Footer, {
        props: {
          presets: { 今天: '2020-12-28' },
          presetsPlacement: 'top',
        },
      });
      expect(wrapper.classes()).toContain('t-date-picker__footer--top');
    });

    it(':presetsPlacement - right', () => {
      const wrapper = mount(Footer, {
        props: {
          presets: { 今天: '2020-12-28' },
          presetsPlacement: 'right',
        },
      });
      expect(wrapper.classes()).toContain('t-date-picker__footer--right');
    });

    it(':presetsPlacement - bottom', () => {
      const wrapper = mount(Footer, {
        props: {
          presets: { 今天: '2020-12-28' },
          presetsPlacement: 'bottom',
        },
      });
      expect(wrapper.classes()).toContain('t-date-picker__footer--bottom');
    });

    it(':selectedValue - string', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: '2020-12-28',
        },
      });
      expect(wrapper.find('.t-button').attributes('disabled')).toBeUndefined();
    });

    it(':selectedValue - number', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: 1609142400000,
        },
      });
      expect(wrapper.find('.t-button').attributes('disabled')).toBeUndefined();
    });

    it(':selectedValue - Array', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: ['2020-12-28', '2020-12-30'],
        },
      });
      expect(wrapper.find('.t-button').attributes('disabled')).toBeUndefined();
    });

    it(':selectedValue - Date', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: new Date('2020-12-28'),
        },
      });
      expect(wrapper.find('.t-button').attributes('disabled')).toBeUndefined();
    });

    it(':selectedValue - null/undefined should disable confirm button', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: null,
        },
      });
      expect(wrapper.find('.t-button').attributes('disabled')).toBeDefined();
    });
  });

  describe(':events', () => {
    it(':onPresetClick - basic', async () => {
      const onPresetClick = vi.fn();
      const presets = {
        昨天: '2020-12-27',
        今天: '2020-12-28',
      };
      const wrapper = mount(Footer, {
        props: {
          presets,
          onPresetClick,
        },
      });

      const buttons = wrapper.findAll('.t-button');
      await buttons[0].trigger('click');

      expect(onPresetClick).toHaveBeenCalledWith('2020-12-27', {
        e: expect.any(MouseEvent),
        preset: { 昨天: '2020-12-27' },
      });
    });

    it(':onPresetClick - multiple presets', async () => {
      const onPresetClick = vi.fn();
      const presets = {
        昨天: '2020-12-27',
        今天: '2020-12-28',
        明天: '2020-12-29',
      };
      const wrapper = mount(Footer, {
        props: {
          presets,
          onPresetClick,
        },
      });

      const buttons = wrapper.findAll('.t-button');

      // 点击第一个预设
      await buttons[0].trigger('click');
      expect(onPresetClick).toHaveBeenCalledWith(
        '2020-12-27',
        expect.objectContaining({
          preset: { 昨天: '2020-12-27' },
        }),
      );

      // 点击第二个预设
      await buttons[1].trigger('click');
      expect(onPresetClick).toHaveBeenCalledWith(
        '2020-12-28',
        expect.objectContaining({
          preset: { 今天: '2020-12-28' },
        }),
      );
    });

    it(':onConfirmClick - basic', async () => {
      const onConfirmClick = vi.fn();
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: '2020-12-28',
          onConfirmClick,
        },
      });

      const confirmButton = wrapper.find('button');
      await confirmButton.trigger('click');

      expect(onConfirmClick).toHaveBeenCalledWith({
        e: expect.any(MouseEvent),
      });
    });

    it(':onConfirmClick - disabled button should not trigger', async () => {
      const onConfirmClick = vi.fn();
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: null,
          onConfirmClick,
        },
      });

      const confirmButton = wrapper.find('button');
      expect(confirmButton.attributes('disabled')).toBeDefined();

      // 禁用的按钮点击不应该触发事件
      await confirmButton.trigger('click');
      expect(onConfirmClick).not.toHaveBeenCalled();
    });
  });

  describe(':functions', () => {
    it('should render footer with correct class structure', () => {
      const wrapper = mount(Footer, {
        props: {
          presets: { 今天: '2020-12-28' },
        },
      });

      expect(wrapper.find('.t-date-picker__footer').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__presets').exists()).toBe(true);
    });

    it('should show both presets and confirm button', () => {
      const wrapper = mount(Footer, {
        props: {
          presets: { 今天: '2020-12-28' },
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: '2020-12-28',
        },
      });

      expect(wrapper.find('.t-date-picker__presets').exists()).toBe(true);
      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('should show only presets when time picker disabled', () => {
      const wrapper = mount(Footer, {
        props: {
          presets: { 今天: '2020-12-28' },
          enableTimePicker: false,
          needConfirm: true,
        },
      });

      expect(wrapper.findAll('button')).toHaveLength(1);

      const presetButton = wrapper.find('button');
      expect(presetButton.text()).toBe('今天');
      expect(wrapper.find('.t-date-picker__presets').exists()).toBe(true);
    });

    it('should show only confirm button when no presets', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: '2020-12-28',
        },
      });

      expect(wrapper.find('.t-date-picker__presets').exists()).toBe(true);
      expect(wrapper.find('button').exists()).toBe(true);
      expect(wrapper.findAll('.t-button[variant="text"]')).toHaveLength(0);
    });

    it('should handle preset values of different types', async () => {
      const onPresetClick = vi.fn();
      const presets = {
        字符串: '2020-12-28',
        数字: 1609142400000,
        日期对象: new Date('2020-12-28'),
        函数: () => '2020-12-28',
      };
      const wrapper = mount(Footer, {
        props: {
          presets,
          onPresetClick,
        },
      });

      const buttons = wrapper.findAll('button');
      expect(buttons).toHaveLength(4);

      // 测试点击每个预设
      for (let i = 0; i < buttons.length; i++) {
        await buttons[i].trigger('click');
      }

      expect(onPresetClick).toHaveBeenCalledTimes(4);
    });

    it('should handle placement modifier correctly', () => {
      const placements = ['left', 'top', 'right', 'bottom'];

      placements.forEach((placement) => {
        const wrapper = mount(Footer, {
          props: {
            presets: { 今天: '2020-12-28' },
            presetsPlacement: placement,
          },
        });

        expect(wrapper.classes()).toContain(`t-date-picker__footer--${placement}`);
      });
    });

    it('should handle confirm button size and theme', () => {
      const wrapper = mount(Footer, {
        props: {
          enableTimePicker: true,
          needConfirm: true,
          selectedValue: '2020-12-28',
        },
      });

      const confirmButton = wrapper.find('button');
      expect(confirmButton.exists()).toBe(true);
      expect(confirmButton.text()).toBe('确定');
      expect(confirmButton.classes()).toContain('t-size-s');
    });

    it('should handle preset button size and variant', () => {
      const wrapper = mount(Footer, {
        props: {
          presets: { 今天: '2020-12-28' },
        },
      });

      const presetButton = wrapper.find('button');
      expect(presetButton.exists()).toBe(true);
      expect(presetButton.text()).toBe('今天');
      expect(presetButton.classes()).toContain('t-size-s');
    });
  });
});
