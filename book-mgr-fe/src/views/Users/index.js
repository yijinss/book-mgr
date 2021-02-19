import { defineComponent, ref, onMounted } from 'vue';
import { user } from '@/service';
import { message } from 'ant-design-vue';
import { result, formatTimestamp } from '@/helpers/utils';
import AddOne from './AddOne/index.vue';

const columns = [
  {
    title: '账号',
    dataIndex: 'account',
  },
  {
    title: '创建日期',
    slots: {
      customRender: 'createdAt'
    },
  },
  {
    title: '操作',
    slots: {
      customRender: 'actions'
    },
  }
  
];

export default defineComponent({
  components: {
    AddOne,
  },
  setup() {
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const showAddModal = ref(false);
    const keyword = ref('');
    const idSearch = ref(false);

    const getUser = async () => {
      const res = await user.list(curPage.value, 2, keyword.value);
      result(res)
        .success(({data: {list: refList, total: refTotal}}) => {
          list.value = refList;
          total.value = refTotal;
        });
    };

    onMounted(() => {
      getUser();
    });

    const remove = async ({ record: text }) => {
      const { _id } = text;

      const res = await user.remove(_id);
      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getUser();
        })
    }

    const setPage = (page) => {
      curPage.value = page;
      getUser();
    };

    const resetPassword = async ({ record: text }) => {
      const _id = text._id;
      
      const res = await  user.resetPassword(_id);

      result(res)
        .success(({ msg }) => {
          message.success(msg);
        }) 
    };

    const onSearch = () => {
      getUser();
      idSearch.value = !!keyword.value;
    };

    const backAll = () => {
      getUser();
      idSearch.value = false;
      keyword.value = '';

    };

    return {
      list,
      total,
      curPage,
      columns,
      formatTimestamp,
      remove,
      showAddModal,
      getUser,
      setPage,
      resetPassword,
      keyword,
      idSearch,
      onSearch,
      backAll,
    }
  }
});

