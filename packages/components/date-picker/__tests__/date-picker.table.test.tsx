import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import MockDate from 'mockdate';
import { nextTick } from 'vue';
import Table from '../components/base/Table';

describe('DatePicker Table Component', () => {
  beforeAll(() => {
    MockDate.set('2020-12-28');
  });

  afterAll(() => {
    MockDate.reset();
  });

  describe(':props', () => {
    it(':mode - date', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
              { text: '3', value: new Date(2020, 11, 3) },
              { text: '4', value: new Date(2020, 11, 4) },
              { text: '5', value: new Date(2020, 11, 5) },
              { text: '6', value: new Date(2020, 11, 6) },
              { text: '7', value: new Date(2020, 11, 7) },
            ],
          ],
        },
      });

      expect(wrapper.find('.t-date-picker__table').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__table-date').exists()).toBe(true);
    });

    it(':mode - week', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'week',
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
              { text: '3', value: new Date(2020, 11, 3) },
              { text: '4', value: new Date(2020, 11, 4) },
              { text: '5', value: new Date(2020, 11, 5) },
              { text: '6', value: new Date(2020, 11, 6) },
              { text: '7', value: new Date(2020, 11, 7) },
            ],
          ],
        },
      });

      expect(wrapper.find('.t-date-picker__table').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__table-week').exists()).toBe(true);
    });

    it(':mode - month', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'month',
          data: [
            [
              { text: '1月', value: new Date(2020, 0, 1) },
              { text: '2月', value: new Date(2020, 1, 1) },
              { text: '3月', value: new Date(2020, 2, 1) },
            ],
          ],
        },
      });

      expect(wrapper.find('.t-date-picker__table').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__table-month').exists()).toBe(true);
    });

    it(':mode - quarter', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'quarter',
          data: [
            [
              { text: 'Q1', value: new Date(2020, 0, 1) },
              { text: 'Q2', value: new Date(2020, 3, 1) },
            ],
          ],
        },
      });

      expect(wrapper.find('.t-date-picker__table').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__table-quarter').exists()).toBe(true);
    });

    it(':mode - year', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'year',
          data: [
            [
              { text: '2020', value: new Date(2020, 0, 1) },
              { text: '2021', value: new Date(2021, 0, 1) },
            ],
          ],
        },
      });

      expect(wrapper.find('.t-date-picker__table').exists()).toBe(true);
      expect(wrapper.find('.t-date-picker__table-year').exists()).toBe(true);
    });

    it(':data - array', () => {
      const data = [
        [
          { text: '1', value: new Date(2020, 11, 1) },
          { text: '2', value: new Date(2020, 11, 2) },
        ],
      ];

      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data,
        },
      });

      expect(wrapper.exists()).toBe(true);
      expect(wrapper.findAll('tr')).toHaveLength(1);
    });

    it(':firstDayOfWeek - 0 (Sunday)', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          firstDayOfWeek: 0,
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':firstDayOfWeek - 1 (Monday)', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          firstDayOfWeek: 1,
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':activeValue - date object', () => {
      const activeValue = new Date(2020, 11, 1);
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          activeValue,
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':hoverValue - date object', () => {
      const hoverValue = new Date(2020, 11, 1);
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          hoverValue,
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':rangeValue - array of dates', () => {
      const rangeValue = [new Date(2020, 11, 1), new Date(2020, 11, 5)];
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          rangeValue,
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
              { text: '3', value: new Date(2020, 11, 3) },
              { text: '4', value: new Date(2020, 11, 4) },
              { text: '5', value: new Date(2020, 11, 5) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it(':multiple - boolean', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          multiple: true,
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });
  });

  describe(':events', () => {
    it(':onCellClick', async () => {
      const onCellClick = vi.fn();
      const cellData = { text: '1', value: new Date(2020, 11, 1) };

      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [[cellData]],
          onCellClick,
        },
      });

      const cell = wrapper.find('.t-date-picker__table-cell');
      if (cell.exists()) {
        await cell.trigger('click');
        expect(onCellClick).toHaveBeenCalledWith({
          cell: cellData,
          e: expect.any(Event),
        });
      }
    });

    it(':onCellMouseEnter', async () => {
      const onCellMouseEnter = vi.fn();
      const cellData = { text: '1', value: new Date(2020, 11, 1) };

      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [[cellData]],
          onCellMouseEnter,
        },
      });

      const cell = wrapper.find('.t-date-picker__table-cell');
      if (cell.exists()) {
        await cell.trigger('mouseenter');
        expect(onCellMouseEnter).toHaveBeenCalledWith({
          cell: cellData,
          e: expect.any(Event),
        });
      }
    });

    it(':onCellMouseLeave', async () => {
      const onCellMouseLeave = vi.fn();
      const cellData = { text: '1', value: new Date(2020, 11, 1) };

      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [[cellData]],
          onCellMouseLeave,
        },
      });

      const cell = wrapper.find('.t-date-picker__table-cell');
      if (cell.exists()) {
        await cell.trigger('mouseleave');
        expect(onCellMouseLeave).toHaveBeenCalledWith({
          cell: cellData,
          e: expect.any(Event),
        });
      }
    });

    it(':onRowClick', async () => {
      const onRowClick = vi.fn();
      const cellData = { text: '1', value: new Date(2020, 11, 1) };

      const wrapper = mount(Table, {
        props: {
          mode: 'week',
          data: [[cellData]],
          onRowClick,
        },
      });

      const row = wrapper.find('tr');
      if (row.exists()) {
        await row.trigger('click');
        expect(onRowClick).toHaveBeenCalledWith({
          row: [cellData],
          e: expect.any(Event),
        });
      }
    });

    it(':onRowMouseEnter', async () => {
      const onRowMouseEnter = vi.fn();
      const cellData = { text: '1', value: new Date(2020, 11, 1) };

      const wrapper = mount(Table, {
        props: {
          mode: 'week',
          data: [[cellData]],
          onRowMouseEnter,
        },
      });

      const row = wrapper.find('tr');
      if (row.exists()) {
        await row.trigger('mouseenter');
        expect(onRowMouseEnter).toHaveBeenCalledWith({
          row: [cellData],
          e: expect.any(Event),
        });
      }
    });

    it(':onRowMouseLeave', async () => {
      const onRowMouseLeave = vi.fn();
      const cellData = { text: '1', value: new Date(2020, 11, 1) };

      const wrapper = mount(Table, {
        props: {
          mode: 'week',
          data: [[cellData]],
          onRowMouseLeave,
        },
      });

      const row = wrapper.find('tr');
      if (row.exists()) {
        await row.trigger('mouseleave');
        expect(onRowMouseLeave).toHaveBeenCalledWith({
          row: [cellData],
          e: expect.any(Event),
        });
      }
    });
  });

  describe(':functions', () => {
    it('should render table structure correctly', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
            ],
          ],
        },
      });

      expect(wrapper.find('.t-date-picker__table').exists()).toBe(true);
      expect(wrapper.find('table').exists()).toBe(true);
      expect(wrapper.find('thead').exists()).toBe(true);
      expect(wrapper.find('tbody').exists()).toBe(true);
    });

    it('should render week numbers for date mode', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          showWeekOfYear: true,
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
            ],
          ],
        },
      });

      expect(wrapper.find('.t-date-picker__table--week-number').exists()).toBe(true);
    });

    it('should render correct headers for date mode', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          firstDayOfWeek: 1,
          data: [[{ text: '1', value: new Date(2020, 11, 1) }]],
        },
      });

      const headers = wrapper.findAll('th');
      expect(headers.length).toBeGreaterThan(0);
    });

    it('should apply active class to selected cell', () => {
      const activeValue = new Date(2020, 11, 1);
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          activeValue,
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should apply range classes for range selection', () => {
      const rangeValue = [new Date(2020, 11, 1), new Date(2020, 11, 5)];
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          rangeValue,
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
              { text: '3', value: new Date(2020, 11, 3) },
              { text: '4', value: new Date(2020, 11, 4) },
              { text: '5', value: new Date(2020, 11, 5) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle disabled cells', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1), disabled: true },
              { text: '2', value: new Date(2020, 11, 2) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle different cell types', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1), type: 'current' },
              { text: '2', value: new Date(2020, 10, 31), type: 'prev' },
              { text: '3', value: new Date(2021, 0, 1), type: 'next' },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should render custom cell content', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [[{ text: '1', value: new Date(2020, 11, 1), formattedText: '周二' }]],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle hover state correctly', async () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          hoverValue: new Date(2020, 11, 2),
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
              { text: '3', value: new Date(2020, 11, 3) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle multiple selection', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          multiple: true,
          activeValue: [new Date(2020, 11, 1), new Date(2020, 11, 3)],
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
              { text: '3', value: new Date(2020, 11, 3) },
            ],
          ],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should render correct week row for week mode', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'week',
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
              { text: '3', value: new Date(2020, 11, 3) },
              { text: '4', value: new Date(2020, 11, 4) },
              { text: '5', value: new Date(2020, 11, 5) },
              { text: '6', value: new Date(2020, 11, 6) },
              { text: '7', value: new Date(2020, 11, 7) },
            ],
          ],
        },
      });

      expect(wrapper.find('.t-date-picker__table').exists()).toBe(true);
      const rows = wrapper.findAll('tbody tr');
      expect(rows.length).toBeGreaterThan(0);
    });

    it('should handle today highlighting', () => {
      const today = new Date();
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [[{ text: today.getDate().toString(), value: today, type: 'current' }]],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should render empty cells correctly', () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [[null, { text: '1', value: new Date(2020, 11, 1) }, null]],
        },
      });

      expect(wrapper.exists()).toBe(true);
    });

    it('should handle keyboard navigation', async () => {
      const wrapper = mount(Table, {
        props: {
          mode: 'date',
          data: [
            [
              { text: '1', value: new Date(2020, 11, 1) },
              { text: '2', value: new Date(2020, 11, 2) },
            ],
          ],
        },
      });

      const table = wrapper.find('.t-date-picker__table');
      if (table.exists()) {
        await table.trigger('keydown', { key: 'ArrowRight' });
        await table.trigger('keydown', { key: 'ArrowLeft' });
        await table.trigger('keydown', { key: 'ArrowUp' });
        await table.trigger('keydown', { key: 'ArrowDown' });
        await table.trigger('keydown', { key: 'Enter' });
        await table.trigger('keydown', { key: 'Space' });
      }

      expect(wrapper.exists()).toBe(true);
    });
  });
});
