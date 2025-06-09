<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Ro'yxatdan o'tish</h2>
      <form @submit.prevent="register()" class="space-y-5">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Ism</label>
          <InputText v-model="name" class="w-full" placeholder="Ismingiz" required />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Familiya</label>
          <InputText v-model="lastname" class="w-full" placeholder="Familiyangiz" required />
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
        <Button label="Ro'yxatdan o'tish" type="submit" class="w-full" />
      </form>
       <span
        @click="router.push('/login')"
        class="flex items-center justify-end gap-2 mt-2 cursor-pointer text-emerald-500 transition duration-100 hover:scale-[1.01]"
        ><i class="pi pi-sign-in"></i> Kirish</span
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import axios from "axios"


const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const lastname = ref('')

const register =async () => {
  try{
    const res=await axios.post(`/admin/register`,{
      name:name.value,
      lastname:lastname.value,
      email:email.value,
      password:password.value
    })
    if(res.status==201){
      console.log(res);
      router.push('/login')
    }
  }catch(err){

  }
}
</script>
