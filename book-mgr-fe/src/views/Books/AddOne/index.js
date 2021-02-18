import { defineComponent, reactive } from 'vue';
import { book } from '@/service';
import { message} from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';

const defaultFromDate = {
  name: '',
  price: 0,
  author: '',
  publishDate: 0,
  classify: '',
  count: 0,
}

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context){
    const addFrom = reactive(clone(defaultFromDate));
    const submit = async () => {
      const form = clone(addFrom);
      form.publishDate = addFrom.publishDate.valueOf();
      const res = await book.add(form); 

      result(res).success((d, { data }) => {
        Object.assign(addFrom, defaultFromDate);
        message.success(data.msg);
      })
    };

    const close = () => {
      context.emit('update:show', false);
    };

    return {
      addFrom,
      submit,
      props,
      close,
    }
  },
});