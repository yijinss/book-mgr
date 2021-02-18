<template>
  <div>
    <a-modal  title="添加书籍" :visible='props.show' @ok='submit' @cancel='close'>
      <a-form :label-col="{ span: 6 }" >
        <a-form-item label="书名" >
          <a-input v-model:value="editFrom.name" />
        </a-form-item>
        <a-form-item label="价格">
          <a-input-number :min='0' :max='99999999999' v-model:value="editFrom.price" />
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model:value="editFrom.author" />
        </a-form-item>
        <a-form-item label="出版日期">
           <a-date-picker v-model:value="editFrom.publishDate" />
        </a-form-item>
        <a-form-item label="分类">
          <a-input v-model:value="editFrom.classify" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src='./index.js'></script>