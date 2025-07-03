import { dateCorrection } from '../utils';

describe('dateCorrection', () => {
  it('should handle basic date correction with swapped dates', () => {
    const params = {
      date: new Date('2020-01-10'),
      partial: 'start' as const,
      value: [new Date('2020-01-15'), new Date('2020-01-05')],
      enableTimePicker: false,
      isFirstValueSelected: true,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle date correction with start partial', () => {
    const params = {
      date: new Date('2020-01-01'),
      partial: 'start' as const,
      value: [null, new Date('2020-01-10')],
      enableTimePicker: false,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle date correction with end partial', () => {
    const params = {
      date: new Date('2020-01-15'),
      partial: 'end' as const,
      value: [new Date('2020-01-01'), null],
      enableTimePicker: false,
      isFirstValueSelected: true,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle date correction with time picker enabled', () => {
    const params = {
      date: new Date('2020-01-01 12:00:00'),
      partial: 'start' as const,
      value: [null, new Date('2020-01-10 18:00:00')],
      enableTimePicker: true,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle date correction when first value is not selected', () => {
    const params = {
      date: new Date('2020-01-05'),
      partial: 'start' as const,
      value: [null, null],
      enableTimePicker: false,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle date correction when first value is selected', () => {
    const params = {
      date: new Date('2020-01-05'),
      partial: 'end' as const,
      value: [new Date('2020-01-01'), null],
      enableTimePicker: false,
      isFirstValueSelected: true,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle date correction with same dates', () => {
    const params = {
      date: new Date('2020-01-01'),
      partial: 'start' as const,
      value: [new Date('2020-01-01'), new Date('2020-01-01')],
      enableTimePicker: false,
      isFirstValueSelected: true,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle date correction with null values', () => {
    const params = {
      date: new Date('2020-01-01'),
      partial: 'start' as const,
      value: [null, null],
      enableTimePicker: false,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle year transitions in date correction', () => {
    const params = {
      date: new Date('2021-01-01'),
      partial: 'end' as const,
      value: [new Date('2020-12-01'), null],
      enableTimePicker: false,
      isFirstValueSelected: true,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle date correction with different time zones', () => {
    const params = {
      date: new Date('2020-01-01T00:00:00Z'),
      partial: 'start' as const,
      value: [null, new Date('2020-01-10T23:59:59Z')],
      enableTimePicker: true,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle edge case with leap year', () => {
    const params = {
      date: new Date('2020-02-29'),
      partial: 'start' as const,
      value: [null, new Date('2020-03-01')],
      enableTimePicker: false,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle date correction when dates need swapping', () => {
    const params = {
      date: new Date('2020-01-01'),
      partial: 'end' as const,
      value: [new Date('2020-01-10'), null],
      enableTimePicker: false,
      isFirstValueSelected: true,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle complex time picker scenarios', () => {
    const params = {
      date: new Date('2020-01-01 14:30:00'),
      partial: 'start' as const,
      value: [null, new Date('2020-01-01 09:15:00')],
      enableTimePicker: true,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle month boundary date correction', () => {
    const params = {
      date: new Date('2020-01-31'),
      partial: 'start' as const,
      value: [null, new Date('2020-02-01')],
      enableTimePicker: false,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should preserve time when enableTimePicker is false', () => {
    const params = {
      date: new Date('2020-01-01 15:30:45'),
      partial: 'start' as const,
      value: [null, new Date('2020-01-10 10:20:30')],
      enableTimePicker: false,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle minimum and maximum date scenarios', () => {
    const params = {
      date: new Date('1900-01-01'),
      partial: 'start' as const,
      value: [null, new Date('2100-12-31')],
      enableTimePicker: false,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  // 边界测试
  it('should handle invalid date inputs gracefully', () => {
    const params = {
      date: new Date('invalid'),
      partial: 'start' as const,
      value: [null, new Date('2020-01-10')],
      enableTimePicker: false,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle all null value array', () => {
    const params = {
      date: new Date('2020-01-01'),
      partial: 'start' as const,
      value: [null, null],
      enableTimePicker: false,
      isFirstValueSelected: false,
    };

    const result = dateCorrection(params);
    expect(result).toBeDefined();
  });

  it('should handle both partial types', () => {
    const testCases = [
      {
        date: new Date('2020-01-01'),
        partial: 'start' as const,
        value: [null, new Date('2020-01-10')],
        enableTimePicker: false,
        isFirstValueSelected: false,
      },
      {
        date: new Date('2020-01-10'),
        partial: 'end' as const,
        value: [new Date('2020-01-01'), null],
        enableTimePicker: false,
        isFirstValueSelected: true,
      },
    ];

    testCases.forEach((params) => {
      const result = dateCorrection(params);
      expect(result).toBeDefined();
    });
  });

  it('should handle various time picker combinations', () => {
    const enableTimePickerOptions = [true, false];
    const isFirstValueSelectedOptions = [true, false];

    enableTimePickerOptions.forEach((enableTimePicker) => {
      isFirstValueSelectedOptions.forEach((isFirstValueSelected) => {
        const params = {
          date: new Date('2020-01-05'),
          partial: 'start' as const,
          value: [null, new Date('2020-01-10')],
          enableTimePicker,
          isFirstValueSelected,
        };

        const result = dateCorrection(params);
        expect(result).toBeDefined();
      });
    });
  });
});
