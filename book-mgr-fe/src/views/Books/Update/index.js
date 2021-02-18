import { defineComponent, reactive, watch } from 'vue';
import { book } from '@/service';
import { message} from 'ant-design-vue';
import { result, clone } from '@/helpers/utils';
import moment from 'moment';


export default defineComponent({
  props: {
    show: Boolean,
    book: Object,
  },
  setup(props, context){
    const editFrom = reactive({
      name: '',
      price: 0,
      author: '',
      publishDate: 0,
      classify: '',
    });

    const close = () => {
      context.emit('update:show', false);
    };

    watch(() => props.book, (current) => {
      Object.assign(editFrom, current);
      editFrom.publishDate = moment(Number(editFrom.publishDate));
    });

    const submit = async () => {
      const res = await book.update({
        id: props.book._id,
        name: editFrom.name,
        price: editFrom.price,
        author: editFrom.author,
        publishDate:  editFrom.publishDate.valueOf(),
        classify: editFrom.classify,
      });

      result(res)
        .success(({ data, msg}) => {
          context.emit('update', data);
          message.success(msg)
          close();
        });
    };

    return {
      editFrom,
      submit,
      props,
      close,
      editFrom,
    }
  },
});