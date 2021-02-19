import { defineComponent, reactive } from 'vue';
import { user } from '@/service';
import { message} from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';

const defaultFromDate = {
 account: '',
 password: '',
}

export default defineComponent({
  props: {
    show: Boolean,
  },
  setup(props, context){
    const addFrom = reactive(clone(defaultFromDate));

    const close = () => {
      context.emit('update:show', false);
    };

    const submit = async () => {
      const form = clone(addFrom);
      const res = await user.add(form.account, form.password); 

      result(res).success((d, { data }) => {
        Object.assign(addFrom, defaultFromDate);
        message.success(data.msg);
        close();
        context.emit('getList');
    })
    };

   

    return {
      addFrom,
      submit,
      props,
      close,
    }
  },
});