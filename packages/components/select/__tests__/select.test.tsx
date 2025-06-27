// @ts-nocheck
import { ref, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { Select, OptionGroup, Option } from '@tdesign/components/select';
import { CloseCircleFilledIcon } from 'tdesign-icons-vue-next';

const options = [
  { label: '全选', checkAll: true }, // 添加 checkAll 选项
  { label: '架构云', value: '1' },
  { label: '大数据', value: '2' },
  { label: '区块链', value: '3' },
  { label: '物联网', value: '4', disabled: true },
  { label: '人工智能', value: '5' },
  {
    label: '计算场景（高性能计算）',
    value: '6',
    content: () => <p>计算场景（高性能计算）</p>,
  },
];

describe('Select', () => {
  let wrapper;

  beforeEach(() => {
    // 清理 DOM
    document.body.innerHTML = '';
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    // 清理可能残留的 DOM 元素
    const panels = document.querySelectorAll('.t-select__list');
    panels.forEach((panel) => {
      if (panel.parentNode) {
        panel.parentNode.removeChild(panel);
      }
    });
  });

  describe(':base', () => {
    it(':render single', async () => {
      const wrapper = mount({
        render() {
          return <Select options={options}></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      const panelNode = document.querySelector('.t-select__list');
      expect(document.querySelectorAll('.t-select-option').length).toBe(7);
      expect(document.querySelectorAll('.t-is-disabled').length).toBe(1);
      expect(document.querySelectorAll('p').length).toBe(1);
      panelNode.parentNode.removeChild(panelNode);
    });

    it(':render multiple', async () => {
      const wrapper = mount({
        render() {
          return <Select options={options} multiple></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });

      const panelNode = document.querySelector('.t-select__list');
      expect(document.querySelectorAll('.t-checkbox').length).toBe(7);
      panelNode.parentNode.removeChild(panelNode);
    });
  });

  // old

  // test props api
  describe(':props', () => {
    it(':disabled', () => {
      const wrapper = mount({
        render() {
          return <Select disabled={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':size', () => {
      const wrapper = mount({
        render() {
          return <Select size="large"></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':clearable', () => {
      const wrapper = mount({
        render() {
          return <Select clearable={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':multiple', () => {
      const wrapper = mount({
        render() {
          return <Select multiple={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':placeholder', () => {
      const wrapper = mount({
        render() {
          return <Select placeholder="please select"></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':creatable', () => {
      const wrapper = mount({
        render() {
          return <Select creatable={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':remote', () => {
      const wrapper = mount({
        render() {
          return <Select remote={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':loading', () => {
      const wrapper = mount({
        render() {
          return <Select loading={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':labelInValue', () => {
      const wrapper = mount({
        render() {
          return <Select labelInValue={false}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':reserveKeyword', () => {
      const wrapper = mount({
        render() {
          return <Select reserveKeyword={false}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':borderless', () => {
      const wrapper = mount({
        render() {
          return <Select borderless={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    // 补充新的 props 测试
    it(':autoWidth - Boolean', () => {
      const wrapper = mount({
        render() {
          return <Select autoWidth={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':autofocus - Boolean', () => {
      const wrapper = mount({
        render() {
          return <Select autofocus={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':filterable - Boolean', () => {
      const wrapper = mount({
        render() {
          return <Select filterable={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':filter - Function', async () => {
      const customFilter = vi.fn((filterWords, option) => {
        return option.label.toLowerCase().includes(filterWords.toLowerCase());
      });

      const wrapper = mount({
        render() {
          return <Select options={options} filter={customFilter} inputValue="架构"></Select>;
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });
      expect(customFilter).toHaveBeenCalled();
    });

    it(':empty - String', async () => {
      const wrapper = mount({
        render() {
          return <Select options={[]} empty="没有数据"></Select>;
        },
      });
      await wrapper.setProps({ popupProps: { visible: true } });
      const popupContent = document.querySelector('.t-popup__content');
      expect(popupContent.textContent).toContain('没有数据');
    });

    it(':empty - Function', async () => {
      const emptyContent = () => <div class="custom-empty">自定义空状态</div>;

      const wrapper = mount({
        render() {
          return <Select options={[]} empty={emptyContent}></Select>;
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });
      expect(document.querySelector('.custom-empty')).toBeTruthy();
    });

    it(':loadingText - String', async () => {
      const wrapper = mount({
        render() {
          return <Select loading={true} loadingText="加载中..."></Select>;
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });
      const popupContent = document.querySelector('.t-popup__content');
      expect(popupContent.textContent).toContain('加载中...');
    });

    it(':loadingText - Function', async () => {
      const loadingContent = () => <div class="custom-loading">自定义加载</div>;

      const wrapper = mount({
        render() {
          return <Select loading={true} loadingText={loadingContent}></Select>;
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });
      expect(document.querySelector('.custom-loading')).toBeTruthy();
    });

    it(':max - Number', async () => {
      const value = ref([]);
      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return <Select v-model={value.value} options={options} multiple max={2}></Select>;
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });
      // 选择第一个选项
      const selectOptions = document.querySelectorAll('.t-select-option');
      const firstCheckbox = selectOptions[1].querySelector('.t-checkbox__former');
      await firstCheckbox.click();
      expect(value.value).toEqual(['1']);

      // 选择第二个选项
      const secondCheckbox = selectOptions[2].querySelector('.t-checkbox__former');
      await secondCheckbox.click();
      expect(value.value).toEqual(['1', '2']);

      // 尝试选择第三个选项（选择"区块链"），应该被限制
      const thirdCheckbox = selectOptions[3].querySelector('.t-checkbox__former');
      await thirdCheckbox.click();
      expect(value.value).toEqual(['1', '2']); // 应该保持不变，因为达到最大选择数量
    });

    it(':minCollapsedNum - Number', async () => {
      const value = ref(['1', '2', '3']);
      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return <Select v-model={value.value} options={options} multiple minCollapsedNum={2}></Select>;
        },
      });
      expect(wrapper.findAll('.t-tag').length).toEqual(3);
    });

    it(':keys - Object', async () => {
      const customOptions = [
        { name: '选项1', id: 'opt1' },
        { name: '选项2', id: 'opt2' },
      ];

      const wrapper = mount({
        render() {
          return <Select options={customOptions} keys={{ label: 'name', value: 'id' }}></Select>;
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });
      expect(document.querySelector('.t-select-option')).toBeTruthy();
    });

    it(':readonly - Boolean', () => {
      const wrapper = mount({
        render() {
          return <Select readonly={true}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':showArrow - Boolean', () => {
      const wrapper = mount({
        render() {
          return <Select showArrow={false}></Select>;
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':status - String', () => {
      ['default', 'success', 'warning', 'error'].forEach((status) => {
        const wrapper = mount({
          render() {
            return <Select status={status}></Select>;
          },
        });
        expect(wrapper.element).toMatchSnapshot();
        wrapper.unmount();
      });
    });

    it(':valueType - value', async () => {
      const value = ref('');
      const onChange = vi.fn();

      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return <Select v-model={value.value} options={options} valueType="value" onChange={onChange}></Select>;
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });

      const selectOptions = document.querySelectorAll('.t-select-option');
      const firstCheckbox = selectOptions[1];
      await firstCheckbox.click();

      expect(value.value).toBe('1');
      expect(onChange).toHaveBeenCalledWith('1', expect.any(Object));
    });

    it(':valueType - object', async () => {
      const value = ref();
      const onChange = vi.fn();

      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return <Select v-model={value.value} options={options} valueType="object" onChange={onChange}></Select>;
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });

      const selectOptions = document.querySelectorAll('.t-select-option');
      const firstCheckbox = selectOptions[2];
      await firstCheckbox.click();

      expect(value.value).toMatchObject({ label: '大数据', value: '2' });
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ label: '大数据', value: '2' }),
        expect.any(Object),
      );
    });
  });

  describe('@event', () => {
    describe('onClear', () => {
      const triggerClear = async (wrapper) => {
        const input = wrapper.find('.t-input');
        await input.trigger('mouseenter');
        const closeIcon = wrapper.findComponent(CloseCircleFilledIcon);
        await closeIcon.trigger('click');
      };
      it('[multiple=false][valueType="value"]', async () => {
        const fn = vi.fn();
        const value = ref('1');
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} clearable onClear={fn}></Select>;
          },
        });
        await triggerClear(wrapper);
        expect(fn).toBeCalled();
        expect(value.value).toBe(undefined);
      });
      it('[multiple=false][valueType="object"]', async () => {
        const fn = vi.fn();
        const value = ref({ label: '架构云', value: '1' });
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} clearable valueType="object" onClear={fn}></Select>;
          },
        });
        await triggerClear(wrapper);
        expect(fn).toBeCalled();
        expect(value.value).toBe(undefined);
      });
      // TODO: remove skip when multiple select clear icon class bug fixed
      it.skip('[multiple=true][valueType="value"]', async () => {
        const fn = vi.fn();
        const value = ref(['1']);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} clearable valueType="object" onClear={fn}></Select>;
          },
        });
        await triggerClear(wrapper);
        expect(fn).toBeCalled();
        expect(value.value).toBe([]);
      });
      // TODO: remove skip when multiple select clear icon class bug fixed
      it.skip('[multiple=true][valueType="object"]', async () => {
        const fn = vi.fn();
        const value = ref([{ label: '架构云', value: '1' }]);
        const wrapper = mount({
          render() {
            return <Select v-model={value.value} clearable valueType="object" onClear={fn}></Select>;
          },
        });
        await triggerClear(wrapper);
        expect(fn).toBeCalled();
        expect(value.value).toBe([]);
      });
    });

    describe('onChange', () => {
      it('should trigger onChange when option selected - single', async () => {
        const onChange = vi.fn();
        const value = ref(null);

        const wrapper = mount({
          setup() {
            return { value };
          },
          render() {
            return <Select v-model={value.value} options={options} onChange={onChange}></Select>;
          },
        });

        await wrapper.setProps({ popupProps: { visible: true } });

        const option = document.querySelectorAll('.t-select-option');
        await option[1].click();

        expect(onChange).toHaveBeenCalledWith(
          '1',
          expect.objectContaining({
            selectedOptions: expect.any(Array),
            trigger: expect.any(String),
          }),
        );
        expect(value.value).toBe('1');
      });

      it('should trigger onChange when option selected - multiple', async () => {
        const onChange = vi.fn();
        const value = ref([]);

        const wrapper = mount({
          setup() {
            return { value };
          },
          render() {
            return <Select v-model={value.value} options={options} multiple onChange={onChange}></Select>;
          },
        });

        await wrapper.setProps({ popupProps: { visible: true } });

        const option = document.querySelectorAll('.t-select-option');
        await option[1].click();

        expect(onChange).toHaveBeenCalledWith(
          ['1'],
          expect.objectContaining({
            selectedOptions: expect.any(Array),
            trigger: expect.any(String),
          }),
        );
        expect(value.value).toEqual(['1']);
      });
    });

    describe('onFocus', () => {
      it('should trigger onFocus when input focused', async () => {
        const onFocus = vi.fn();

        const wrapper = mount({
          render() {
            return <Select onFocus={onFocus}></Select>;
          },
        });
        const input = wrapper.find('input');
        await input.trigger('focus');

        expect(onFocus).toHaveBeenCalledWith(
          expect.objectContaining({
            value: undefined,
            e: expect.any(FocusEvent),
          }),
        );
      });
    });

    describe('onBlur', () => {
      it('should trigger onBlur when input blurred', async () => {
        const onBlur = vi.fn();

        const wrapper = mount({
          render() {
            return <Select onBlur={onBlur}></Select>;
          },
        });

        const input = wrapper.find('input');
        await input.trigger('focus');
        await input.trigger('blur');

        expect(onBlur).toHaveBeenCalledWith(
          expect.objectContaining({
            value: undefined,
            e: expect.any(FocusEvent),
          }),
        );
      });
    });

    describe('onInputChange', () => {
      it('should trigger onInputChange when input value changes', async () => {
        const onInputChange = vi.fn();

        const wrapper = mount({
          render() {
            return <Select filterable onInputChange={onInputChange}></Select>;
          },
        });

        const input = wrapper.find('input');
        await input.setValue('test');

        expect(onInputChange).toHaveBeenCalledWith('test');
      });
    });

    describe('onPopupVisibleChange', () => {
      it('should trigger onPopupVisibleChange when popup visibility changes', async () => {
        const onPopupVisibleChange = vi.fn();

        const wrapper = mount({
          render() {
            return <Select options={options} onPopupVisibleChange={onPopupVisibleChange}></Select>;
          },
        });

        const input = wrapper.find('input');
        await input.trigger('focus');
        await input.trigger('click');
        await new Promise((resolve) => setTimeout(resolve, 350));

        expect(onPopupVisibleChange).toHaveBeenCalledWith(true, {
          trigger: 'trigger-element-click',
        });

        await input.trigger('click');
        await new Promise((resolve) => setTimeout(resolve, 350));

        expect(onPopupVisibleChange).toHaveBeenCalledWith(false, {
          trigger: 'trigger-element-hover',
        });
      });
    });

    describe('onRemove', () => {
      it('should trigger onRemove when tag removed in multiple mode', async () => {
        const onRemove = vi.fn();
        const value = ref(['1', '2']);

        const wrapper = mount({
          setup() {
            return { value };
          },
          render() {
            return <Select v-model={value.value} options={options} multiple onRemove={onRemove}></Select>;
          },
        });

        // 查找标签的关闭按钮
        const closeBtn = wrapper.find('.t-tag .t-tag__close');
        if (closeBtn.exists()) {
          await closeBtn.trigger('click');

          expect(onRemove).toHaveBeenCalledWith(
            expect.objectContaining({
              value: expect.any(String),
              data: expect.any(Object),
              e: expect.any(Event),
            }),
          );
        }
      });
    });

    describe('onCreate', () => {
      it('should trigger onCreate when create new option', async () => {
        const onCreate = vi.fn();

        const wrapper = mount({
          render() {
            return <Select creatable filterable onCreate={onCreate}></Select>;
          },
        });

        const input = wrapper.find('input');
        await input.setValue('新选项');
        await input.trigger('keydown', { key: 'Enter' });
        await new Promise((resolve) => setTimeout(resolve, 350));

        expect(onCreate).toHaveBeenCalledWith('新选项');
      });
    });

    describe('onSearch', () => {
      it('should trigger onSearch when searching', async () => {
        const onSearch = vi.fn();

        const wrapper = mount({
          render() {
            return <Select filterable onSearch={onSearch}></Select>;
          },
        });

        const input = wrapper.find('input');
        await input.setValue('search term');
        await new Promise((resolve) => setTimeout(resolve, 350));

        expect(onSearch).toHaveBeenCalledWith(
          'search term',
          expect.objectContaining({
            e: expect.any(Event),
          }),
        );
      });
    });

    describe('onEnter', () => {
      it('should trigger onEnter when Enter key pressed', async () => {
        const onEnter = vi.fn();

        const wrapper = mount({
          render() {
            return <Select onEnter={onEnter}></Select>;
          },
        });

        const input = wrapper.find('input');
        await input.trigger('keydown', { key: 'Enter' });
        await new Promise((resolve) => setTimeout(resolve, 350));

        expect(onEnter).toHaveBeenCalledWith({
          e: expect.any(Event),
          inputValue: 'undefined',
          value: undefined,
        });
      });
    });
  });
});

describe('Select Option', () => {
  // test props api
  describe(':props', () => {
    it(':value', () => {
      const value = '1';
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <Option value={'1'} label={'1'}></Option>
            </Select>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':label', () => {
      const value = '1';
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <Option value={'1'} label={'1'}></Option>
            </Select>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const value = '1';
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <Option value={'1'} label={'1'} disabled={true}></Option>
            </Select>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':checkAll - Boolean', async () => {
      const value = ref([]);
      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return (
            <Select v-model={value.value} multiple>
              <Option checkAll label="全选"></Option>
              <Option value="1" label="选项1"></Option>
              <Option value="2" label="选项2"></Option>
            </Select>
          );
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });

      const checkAllOption = document.querySelector('.t-select-option[title="全选"]');
      expect(checkAllOption).toBeTruthy();
    });

    it(':title - String', async () => {
      const wrapper = mount({
        render() {
          return (
            <Select>
              <Option value="1" label="选项1" title="这是选项1的标题"></Option>
            </Select>
          );
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });

      const option = document.querySelector('.t-select-option[title="这是选项1的标题"]');
      expect(option).toBeTruthy();
    });

    it(':content - Function', async () => {
      const customContent = () => <div class="custom-option-content">自定义内容</div>;

      const wrapper = mount({
        render() {
          return (
            <Select>
              <Option value="1" content={customContent}></Option>
            </Select>
          );
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });

      expect(document.querySelector('.custom-option-content')).toBeTruthy();
    });
  });
});

describe('Select OptionGroup', () => {
  // test props api
  describe(':props', () => {
    it(':value', () => {
      const value = '1';
      const wrapper = mount({
        render() {
          return (
            <Select v-model={value}>
              <OptionGroup label={'num'}>
                <Option value={'1'} label={'1'}></Option>
              </OptionGroup>
              <OptionGroup label={'abc'}>
                <Option value={'a'} label={'a'}></Option>
              </OptionGroup>
            </Select>
          );
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe(':base', () => {
    it('v-for and option works fine', async () => {
      const Comp = {
        components: {
          TSelect: Select,
          TOptionGroup: OptionGroup,
          TOption: Option,
        },
        template: `
          <t-select>
            <t-option-group label='test'>
              <t-option v-for='i in ["1", "2"]' :key='i' :label='i' :value='i'></t-option>
              <t-option key='3' label='3'></t-option>
            </t-option-group>
            <t-option-group label='test'>
              <t-option v-for='i in ["4", "5", "6"]' :key='i' :label='i' :value='i'></t-option>
            </t-option-group>
            <t-option-group label='test'>
              <t-option key='7' label='7'></t-option>
              <t-option key='8' label='8'></t-option>
              <t-option key='9' label='9'></t-option>
            </t-option-group>
          </t-select>
        `,
      };

      const wrapper = mount(Comp);
      await wrapper.setProps({ popupProps: { visible: true } });

      const panelNode = document.querySelector('.t-select__list');
      const groupNode = document.querySelectorAll('.t-select-option-group');
      expect(groupNode.length).toBe(3);
      groupNode.forEach((item) => {
        const option = item.querySelectorAll('.t-select-option');
        expect(option.length).toBe(3);
      });
      panelNode.parentNode.removeChild(panelNode);
    });
  });
});

describe('Select CheckAll with Disabled Option', () => {
  const setupTest = async (initialValue) => {
    const value = ref(initialValue);
    const wrapper = mount({
      setup() {
        return { value };
      },
      render() {
        return <Select v-model={value.value} options={options} multiple />;
      },
    });

    await wrapper.setProps({ popupProps: { visible: true } });
    const checkAllCheckbox = document.querySelector('li[title="全选"] .t-checkbox');

    return {
      value,
      wrapper,
      checkAllCheckbox,
      cleanup: () => {
        const panelNode = document.querySelector('.t-select__list');
        panelNode.parentNode.removeChild(panelNode);
      },
    };
  };

  it('should keep disabled option state consistent regardless of checkAll', async () => {
    // 测试 disabled 选项默认选中
    let { value, checkAllCheckbox, cleanup } = await setupTest(['1', '4']);
    await checkAllCheckbox.click();
    expect(value.value).toContain('4');
    await checkAllCheckbox.click();
    expect(value.value).toContain('4');
    cleanup();

    // 测试 disabled 选项默认未选中
    ({ value, checkAllCheckbox, cleanup } = await setupTest([]));
    await checkAllCheckbox.click();
    expect(value.value).not.toContain('4');
    await checkAllCheckbox.click();
    expect(value.value).not.toContain('4');
    cleanup();
  });
});

// 高级功能测试
describe('Select Advanced Features', () => {
  describe('Keyboard Control', () => {
    it('should support arrow key navigation', async () => {
      const wrapper = mount({
        render() {
          return <Select options={options}></Select>;
        },
      });

      const input = wrapper.find('input');
      await input.trigger('focus');
      await input.trigger('keydown', { key: 'ArrowDown' });

      // 验证下拉框是否打开
      await nextTick();
      expect(document.querySelector('.t-select__list')).toBeTruthy();
    });

    it('should support Enter key to select option', async () => {
      const value = ref(null);
      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return <Select v-model={value.value} options={options}></Select>;
        },
      });

      const input = wrapper.find('input');
      // 聚焦并打开下拉框
      await input.trigger('focus');
      await input.trigger('click');
      await new Promise((resolve) => setTimeout(resolve, 350));

      // 使用方向键导航到第一个选项
      await input.trigger('keydown', { key: 'ArrowDown' });
      await input.trigger('keydown', { key: 'ArrowDown' });
      await new Promise((resolve) => setTimeout(resolve, 350));

      // 按 Enter 键选中当前高亮的选项
      await input.trigger('keydown', { key: 'Enter' });
      await new Promise((resolve) => setTimeout(resolve, 350));

      // 验证是否选中了第一个可选项
      expect(value.value).toBe('1');
    });

    it('should support Escape key to close popup', async () => {
      const wrapper = mount({
        render() {
          return <Select options={options}></Select>;
        },
      });

      const input = wrapper.find('input');
      await input.trigger('focus');
      await input.trigger('keydown', { key: 'ArrowDown' });

      await nextTick();
      expect(document.querySelector('.t-select__list')).toBeTruthy();

      await input.trigger('keydown', { key: 'Escape' });

      await nextTick();
      expect(document.querySelector('.t-select__list')).toBeFalsy();
    });
  });

  describe('Filterable', () => {
    it('should filter options when filterable is true', async () => {
      const wrapper = mount({
        render() {
          return <Select options={options} filterable></Select>;
        },
      });

      const input = wrapper.find('input');
      await input.setValue('架构');

      await wrapper.setProps({ popupProps: { visible: true } });

      const visibleOptions = document.querySelectorAll('.t-select-option:not(.t-select-option--hidden)');
      expect(visibleOptions.length).toBeLessThan(options.length);
    });

    it('should support custom filter function', async () => {
      const customFilter = vi.fn((filterWords, option) => {
        return option.value === '1' || option.value === '2';
      });

      const wrapper = mount({
        render() {
          return <Select options={options} filter={customFilter} inputValue="test"></Select>;
        },
      });

      await wrapper.setProps({ popupProps: { visible: true } });

      expect(customFilter).toHaveBeenCalled();
    });
  });

  describe('Creatable', () => {
    it('should show create option when creatable and filterable', async () => {
      const onCreate = vi.fn();

      const wrapper = mount({
        render() {
          return <Select creatable filterable onCreate={onCreate}></Select>;
        },
      });

      const input = wrapper.find('input');
      await input.setValue('新选项');
      await input.trigger('keydown', { key: 'Enter' });

      expect(onCreate).toHaveBeenCalledWith('新选项');
    });
  });

  describe('Remote Search', () => {
    it('should trigger onSearch with debounce', async () => {
      const onSearch = vi.fn();

      const wrapper = mount({
        render() {
          return <Select filterable onSearch={onSearch}></Select>;
        },
      });

      const input = wrapper.find('input');
      await input.setValue('test');

      // 测试防抖功能
      await input.setValue('test2');
      await input.setValue('test3');

      // 等待防抖时间
      await new Promise((resolve) => setTimeout(resolve, 350));

      // 应该只调用一次，值为最后一次输入的内容
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith('test3', expect.any(Object));
    });
  });

  describe('Value Display', () => {
    it('should support custom valueDisplay function', async () => {
      const value = ref(['1', '2']);
      const customValueDisplay = vi.fn(({ value, onClose }) => {
        return <div class="custom-value-display">选中了 {value.length} 个选项</div>;
      });

      const wrapper = mount({
        setup() {
          return { value };
        },
        render() {
          return <Select v-model={value.value} options={options} multiple valueDisplay={customValueDisplay}></Select>;
        },
      });

      expect(customValueDisplay).toHaveBeenCalled();
      expect(wrapper.find('.custom-value-display').exists()).toBe(true);
    });
  });
});
