<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Ro'yxatdan o'tish</h2>
      <form @submit.prevent="handleRegister" class="space-y-5">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Ism</label>
          <InputText v-model="name" class="w-full" placeholder="Ismingiz" required />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Email</label>
          <InputText v-model="email" type="email" class="w-full" placeholder="Email manzilingiz" required />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Parol</label>
          <Password
            v-model="password"
            class="w-full"
            inputClass="w-full"
            :feedback="false"
            toggleMask
            placeholder="Parol yarating"
            required
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Parolni tasdiqlang</label>
          <Password
            v-model="confirmPassword"
            class="w-full"
            inputClass="w-full"
            :feedback="false"
            toggleMask
            placeholder="Parolni qayta kiriting"
            required
          />
        </div>
        <Button label="Ro'yxatdan o'tish" type="submit" class="w-full" />
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert("Parollar mos emas!")
    return
  }

  // TODO: Backendga so'rov yuborish
  console.log('Ro\'yxatdan o\'tdi:', { name: name.value, email: email.value, password: password.value })
  alert("Ro'yxatdan o'tish muvaffaqiyatli!")
}
</script>
