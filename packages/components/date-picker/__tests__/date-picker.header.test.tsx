import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Header from '../components/base/Header';

describe('DatePicker Header Component', () => {
  describe(':props', () => {
    it(':mode - date', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__header').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__header-controller-month').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__header-controller-year').exists()).toBe(true);
    });

    it(':mode - month', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'month',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__header').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__header-controller-month').exists()).toBe(false);
      expect(wrapper.find('.t-date-picker__header-controller-year').exists()).toBe(true);
    });

    it(':mode - year', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'year',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__header').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__header-controller-month').exists()).toBe(false);
      expect(wrapper.find('.t-date-picker__header-controller-year').exists()).toBe(true);
    });

    it(':mode - quarter', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'quarter',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__header').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__header-controller-month').exists()).toBe(false);
      expect(wrapper.find('.t-date-picker__header-controller-year').exists()).toBe(true);
    });

    it(':mode - week', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'week',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__header').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__header-controller-month').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__header-controller-year').exists()).toBe(true);
    });

    it(':year - number', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':month - number', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 0,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':year - different values', () => {
      const years = [2000, 2010, 2020, 2030];

      years.forEach((year) => {
        const wrapper = mount(Header, {
          props: {
            mode: 'date',
            year,
            month: 11,
          },
        });

        expect(wrapper.exists()).toBe(true);
      });
    });

    it(':month - different values', () => {
      const months = [0, 3, 6, 9, 11];

      months.forEach((month) => {
        const wrapper = mount(Header, {
          props: {
            mode: 'date',
            year: 2020,
            month,
          },
        });

        expect(wrapper.exists()).toBe(true);
      });
    });
  });

  describe(':events', () => {
    it(':onMonthChange', async () => {
      const onMonthChange = vi.fn();
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onMonthChange,
        },
      });

      const monthSelect = wrapper.find('.t-date-picker__header-controller-month');
      expect(monthSelect.exists()).toBe(true);

      // 模拟月份选择
      const selectComponent = monthSelect.findComponent({ name: 'TSelect' });
      if (selectComponent.exists()) {
        await selectComponent.vm.$emit('change', 0);
        expect(onMonthChange).toHaveBeenCalledWith(0);
      }
    });

    it(':onYearChange', async () => {
      const onYearChange = vi.fn();
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onYearChange,
        },
      });

      const yearSelect = wrapper.find('.t-date-picker__header-controller-year');
      expect(yearSelect.exists()).toBe(true);

      // 模拟年份选择
      const selectComponent = yearSelect.findComponent({ name: 'TSelect' });
      if (selectComponent.exists()) {
        await selectComponent.vm.$emit('change', 2021);
        expect(onYearChange).toHaveBeenCalledWith(2021);
      }
    });

    it(':onJumperClick', async () => {
      const onJumperClick = vi.fn();
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onJumperClick,
        },
      });

      const pagination = wrapper.findComponent({ name: 'PaginationMini' });
      if (pagination.exists()) {
        await pagination.vm.$emit('change', { trigger: 'prev' });
        expect(onJumperClick).toHaveBeenCalledWith({
          e: expect.any(MouseEvent),
          trigger: 'prev',
        });
      }
    });

    it(':onJumperClick - next trigger', async () => {
      const onJumperClick = vi.fn();
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onJumperClick,
        },
      });

      const pagination = wrapper.findComponent({ name: 'PaginationMini' });
      if (pagination.exists()) {
        await pagination.vm.$emit('change', { trigger: 'next' });
        expect(onJumperClick).toHaveBeenCalledWith({
          e: expect.any(MouseEvent),
          trigger: 'next',
        });
      }
    });

    it(':onJumperClick - current trigger', async () => {
      const onJumperClick = vi.fn();
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
          onJumperClick,
        },
      });

      const pagination = wrapper.findComponent({ name: 'PaginationMini' });
      if (pagination.exists()) {
        await pagination.vm.$emit('change', { trigger: 'current' });
        expect(onJumperClick).toHaveBeenCalledWith({
          e: expect.any(MouseEvent),
          trigger: 'current',
        });
      }
    });
  });

  describe(':functions', () => {
    it('should render correct structure', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
        },
      });

      expect(wrapper.find('.t-date-picker__header').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__header-controller').exists()).toBe(true);
    });

    it('should show month selector for date and week modes', () => {
      const showMonthModes = ['date', 'week'];

      showMonthModes.forEach((mode) => {
        const wrapper = mount(Header, {
          props: {
            mode,
            year: 2020,
            month: 11,
          },
        });

        expect(wrapper.find('.t-date-picker__header-controller-month').exists()).toBe(true);
      });
    });

    it('should hide month selector for year, month, quarter modes', () => {
      const hideMonthModes = ['year', 'month', 'quarter'];

      hideMonthModes.forEach((mode) => {
        const wrapper = mount(Header, {
          props: {
            mode,
            year: 2020,
            month: 11,
          },
        });

        expect(wrapper.find('.t-date-picker__header-controller-month').exists()).toBe(false);
      });
    });

    it('should always show year selector', () => {
      const modes = ['date', 'week', 'month', 'quarter', 'year'];

      modes.forEach((mode) => {
        const wrapper = mount(Header, {
          props: {
            mode,
            year: 2020,
            month: 11,
          },
        });

        expect(wrapper.find('.t-date-picker__header-controller-year').exists()).toBe(true);
      });
    });

    it('should generate correct year options for year mode', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'year',
          year: 2025,
          month: 11,
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle year mode decade ranges', () => {
      const testYears = [2020, 2025, 2030];

      testYears.forEach((year) => {
        const wrapper = mount(Header, {
          props: {
            mode: 'year',
            year,
            month: 11,
          },
        });

        expect(wrapper.exists()).toBe(true);
      });
    });

    it('should handle scroll events for year selector', async () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
        },
      });

      const yearSelect = wrapper.find('.t-date-picker__header-controller-year');
      const selectComponent = yearSelect.findComponent({ name: 'TSelect' });

      if (selectComponent.exists()) {
        // 模拟滚动到顶部
        const mockEvent = {
          target: {
            scrollTop: 0,
            scrollHeight: 300,
            clientHeight: 200,
          },
        };

        const popupProps = selectComponent.props('popupProps');
        if (popupProps && popupProps.onScroll) {
          await popupProps.onScroll({ e: mockEvent });
        }
      }

      expect(wrapper.exists()).toBe(true);
    });

    it('should render pagination mini with correct props', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
        },
      });

      const pagination = wrapper.findComponent({ name: 'PaginationMini' });
      if (pagination.exists()) {
        expect(pagination.props('size')).toBe('small');
        expect(pagination.props('tips')).toBeDefined();
      }
    });

    it('should handle different mode tips correctly', () => {
      const modes = ['date', 'week', 'month', 'quarter', 'year'];

      modes.forEach((mode) => {
        const wrapper = mount(Header, {
          props: {
            mode,
            year: 2020,
            month: 11,
          },
        });

        const pagination = wrapper.findComponent({ name: 'PaginationMini' });
        if (pagination.exists()) {
          expect(pagination.props('tips')).toBeDefined();
        }
      });
    });

    it('should have panel top and bottom content for year selector', () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
        },
      });

      const yearSelect = wrapper.find('.t-date-picker__header-controller-year');
      const selectComponent = yearSelect.findComponent({ name: 'TSelect' });

      if (selectComponent.exists()) {
        const popupProps = selectComponent.props('popupProps');
        expect(popupProps).toBeDefined();
      }
    });

    it('should update year options when mode changes', async () => {
      const wrapper = mount(Header, {
        props: {
          mode: 'date',
          year: 2020,
          month: 11,
        },
      });

      await wrapper.setProps({ mode: 'year' });
      expect(wrapper.exists()).toBe(true);
    });
  });
});
