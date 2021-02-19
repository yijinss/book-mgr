import { defineComponent, ref, onMounted } from 'vue';
import { book } from '@/service';
import { useRouter } from 'vue-router'
import { message, Modal, Input } from 'ant-design-vue';
import { result, formatTimestamp } from '@/helpers/utils'
import AddOne from './AddOne/index.vue';
import Update from './Update/index.vue';

export default defineComponent ({
  components: {
    AddOne,
    Update,
  },
  setup() {
    const router = useRouter();

    const columns = [
      {
        title: '书名',
        dataIndex: 'name',
      },
      {
        title: '作者',
        dataIndex: 'price',
      },
      {
        title: '价格',
        dataIndex: 'author',
      },
      {
        title: '出版日期',
        slots: {
          customRender: 'publishDate'
        },
      },
      {
        title: '库存',
        slots: {
          customRender: 'count'
        },
      },
      {
        
        title: '分类',
        dataIndex: 'classify',
      },
      {
        title: '操作',
        slots: {
          customRender: 'actions'
        },
      },
    ];

    const show = ref(false);
    const showUpdateModel = ref(false);
    const list = ref([]);
    const total = ref(0);
    const curPage = ref(1);
    const keyword = ref('');
    const idSearch = ref(false);
    const curEditBook = ref({});


    // 获取书籍列表
    const getList = async () => {
      const res = await book.list({
        page: curPage.value,
        size: 10,
        keyword: keyword.value,
      });

      result(res)
        .success(({ data: { list: l, total: t } }) => {
          list.value = l;
          total.value = t;
        });
    };

    onMounted(async () => {
      getList();
    });

    // 设置页码
    // 切页
    const setPage = (page) => {
      curPage.value = page;
      getList();
    };


    // 触发搜索
    const onSearch = () => {
      getList();
      if(keyword.value === ''){
        idSearch.value = false;
      }else{
        idSearch.value = true;

      };

    }

    // 回到全部列表
    const backAll = () => {
      keyword.value = '';
      idSearch.value = false;
      
      getList();
    }

    // 删除一本书
    const remove = async ({ record: text }) => {
      const { _id } = text;

      const res =  await book.remove(_id); 
      
      result(res)
        .success(({ msg }) => {
          message.success(msg);
          getList();
        });
    }

    const updateCount = (type, record) => {
      let word = '增加';

      if (type === "OUT_COUNT") {
        word = '减少';

      }

      Modal.confirm({
        title: `要${word}多少库存`,
        content: (
          <div>
            <Input class='__book_input_count' />
          </div>
        ),
        onOk: async () => {
          const el = document.querySelector('.__book_input_count');
          let num = el.value;

          const res = await book.updateCount({
            id: record._id,
            num,
            type,
          });

          result(res)
            .success((data) => {
              if (type === 'IN_COUNT') {
                // 入库
                num = Math.abs(num);
              } else {
                // 出库
                num = -Math.abs(num);
              }
              console.log(num);
              const one = list.value.find((item) => {
                return item._id === record._id
              });

              if (one) {
                one.count = one.count + num;
                message.success(`成功${word}${Math.abs(num)}本书`)
              }
            })
        }
          
      });
    };

    // 显示更新弹窗
    const update = ({ record }) => {
      showUpdateModel.value = true;
      curEditBook.value = record;
    };

    // 更新列表的某一行数据
    const updateCurBook = (newData) => {
      Object.assign(curEditBook.value, newData);
    };

    // 进入书籍详情页
    const toDetail = ({ record }) => {
      router.push(`/books/${record._id}`);
    }

    return {
      columns,
      show,
      list,
      formatTimestamp,
      curPage,
      total,
      setPage,
      keyword,
      onSearch,
      backAll,
      idSearch,
      remove,
      updateCount,
      showUpdateModel,
      update,
      curEditBook,
      updateCurBook,
      toDetail,
    }
  },
});