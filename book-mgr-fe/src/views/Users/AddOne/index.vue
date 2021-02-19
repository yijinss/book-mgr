<template>
  <div>
    <a-modal  title="添加用户" :visible='props.show' @ok='submit' @cancel='close'>
      <a-form :label-col="{ span: 6 }" >
        <a-form-item label="账号" >
          <a-input v-model:value="addFrom.account" />
        </a-form-item>
        <a-form-item label="密码" >
          <a-input v-model:value="addFrom.password" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script src='./index.js'></script>