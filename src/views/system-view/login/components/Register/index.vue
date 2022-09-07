<template>
  <n-form ref="formRef" :model="model" size="large" :show-label="false">
    <n-form-item path="phone">
      <n-input v-model:value="model.phone" placeholder="手机号码" />
    </n-form-item>
    <n-form-item path="code">
      <div class="flex-y-center w-full">
        <n-input v-model:value="model.code" placeholder="验证码" />
        <div class="w-18px"></div>
        <!-- <n-button size="large" :disabled="isCounting" :loading="smsLoading" @click="handleSmsCode">
          {{ label }}
        </n-button> -->
      </div>
    </n-form-item>
    <n-form-item path="pwd">
      <n-input v-model:value="model.pwd" placeholder="密码" />
    </n-form-item>
    <n-form-item path="confirmPwd">
      <n-input v-model:value="model.confirmPwd" placeholder="确认密码" />
    </n-form-item>
    <n-space :vertical="true" :size="18">
      <!-- <login-agreement v-model:value="agreement" /> -->
      <n-button type="primary" size="large" :block="true" :round="true" @click="handleSubmit">确定</n-button>
      <n-button size="large" :block="true" :round="true" @click="toLoginModule('pwd-login')">返回</n-button>
    </n-space>
  </n-form>
</template>

<script setup>
import { useRouterPush } from '@/utils'

const { toLoginModule } = useRouterPush()

const formRef = ref(null)
const model = reactive({
  phone: '',
  code: '',
  pwd: '',
  confirmPwd: '',
})

const agreement = ref(false)

// function handleSmsCode() {
//   start()
// }

function handleSubmit(e) {
  if (!formRef.value) return
  e.preventDefault()

  formRef.value.validate(errors => {
    if (!errors) {
      if (!agreement.value) return
      window.$message?.success('验证成功')
    } else {
      window.$message?.error('验证失败')
    }
  })
}
</script>
<style scoped></style>
