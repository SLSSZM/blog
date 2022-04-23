<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { Account, createAccountApi, updateAccountApi } from '@/network/api/account';
  import { ElMessage } from 'element-plus';
  let form = reactive<Account>({
    _id: '',
    username: '',
    password: '',
  });
  const rules = reactive<any>({
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
    ],
  });
  interface Props {
    formData: Account;
  }
  const props = withDefaults(defineProps<Props>(), {
    formData: () => ({ _id: '', username: '', password: '' }),
  });
  onMounted((): void => {
    form._id = props.formData._id;
    form.username = props.formData.username;
  });
  const emits = defineEmits<{
    (e: 'cancel'): void;
    (e: 'success'): void;
  }>();
  let formRef = ref<any>(null);
  const handlerSubmit = async (): Promise<void> => {
    await formRef.value.validate(async (valid: boolean) => {
      if (valid) {
        if (form._id) {
          await updateAccountApi(form._id, form);
          ElMessage.success('修改成功');
        } else {
          await createAccountApi(form);
          ElMessage.success('创建成功');
        }
        emits('success');
      }
    });
  };
</script>

<template>
  <el-form :model="form" :rules="rules" ref="formRef" size="large">
    <el-form-item prop="username">
      <el-input v-model="form.username" placeholder="用户名" clearable></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="form.password" placeholder="密码" show-password></el-input>
    </el-form-item>
    <el-form-item>
      <div class="center">
        <el-button @click="emits('cancel')">取消</el-button>
        <el-button type="primary" @click="handlerSubmit">确定</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
  .center {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
