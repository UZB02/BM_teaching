<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Savolni Tahrirlash</h1>
      <p class="text-gray-600">Quyidagi formani tahrirlang va o‘zgartirishlarni saqlang</p>
    </div>

    <Card class="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50/50">
      <template #content>
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Question Text -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <i class="pi pi-question-circle text-blue-600"></i> Savol matni *
            </label>
            <Textarea v-model="form.text" placeholder="Savol matni..." rows="3"
                      class="w-full resize-none" :class="{ 'p-invalid': errors.text }" />
            <small v-if="errors.text" class="text-red-500">{{ errors.text }}</small>
          </div>

          <!-- Options -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <i class="pi pi-list text-purple-600"></i> Variantlar *
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InputText v-for="(opt, index) in form.options" :key="index"
                         v-model="form.options[index]" :placeholder="'Variant ' + String.fromCharCode(65 + index)"
                         class="w-full" />
            </div>
            <small v-if="errors.options" class="text-red-500">{{ errors.options }}</small>
          </div>

          <!-- Correct Answer -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <i class="pi pi-check-circle text-green-600"></i> To‘g‘ri javob *
            </label>
            <Dropdown v-model="form.correctAnswer" :options="form.options" class="w-full"
                      placeholder="To‘g‘ri javobni tanlang" :class="{ 'p-invalid': errors.correctAnswer }" />
            <small v-if="errors.correctAnswer" class="text-red-500">{{ errors.correctAnswer }}</small>
          </div>

          <!-- Subject & Difficulty -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i class="pi pi-book text-green-600"></i> Fan *
              </label>
              <Dropdown v-model="form.subject" :options="subjects" class="w-full"
                        placeholder="Fan tanlang" :class="{ 'p-invalid': errors.subject }" />
              <small v-if="errors.subject" class="text-red-500">{{ errors.subject }}</small>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i class="pi pi-chart-line text-orange-600"></i> Qiyinchilik darajasi *
              </label>
              <Dropdown v-model="form.difficulty" :options="difficulties" class="w-full"
                        placeholder="Daraja tanlang" :class="{ 'p-invalid': errors.difficulty }" />
              <small v-if="errors.difficulty" class="text-red-500">{{ errors.difficulty }}</small>
            </div>
          </div>

          <!-- Points -->
          <div class="space-y-2">
            <label class="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <i class="pi pi-star text-yellow-600"></i> Ball *
            </label>
            <InputNumber v-model="form.points" :min="1" :max="100" class="w-full"
                         placeholder="Ball" :class="{ 'p-invalid': errors.points }" />
            <small v-if="errors.points" class="text-red-500">{{ errors.points }}</small>
          </div>

          <!-- Submit -->
          <div class="flex gap-4 pt-4 border-t border-gray-200">
            <Button type="submit" label="Yangilash" icon="pi pi-save"
                    class="bg-gradient-to-r from-green-600 to-green-700 border-0 px-6"
                    :loading="isSubmitting" />
            <Button label="Orqaga" icon="pi pi-arrow-left" severity="secondary" outlined @click="router.back()" />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

import Card from 'primevue/card'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const id = route.params.slug
console.log(id);

const form = reactive({
  text: '',
  subject: '',
  difficulty: '',
  points: null,
  options: ['', '', '', ''],
  correctAnswer: '',
})

const errors = reactive({
  text: '',
  subject: '',
  difficulty: '',
  points: '',
  options: '',
  correctAnswer: '',
})

const subjects = ref([
  'Matematika', 'Fizika', 'Kimyo', 'Biologiya', 'Geografiya',
  'Tarix', 'Adabiyot', 'Ingliz tili', 'Informatika', 'Iqtisod'
])
const difficulties = ref(['Oson', "O'rta", 'Qiyin', 'Juda qiyin'])

const isSubmitting = ref(false)

const validateForm = () => {
  Object.keys(errors).forEach(key => errors[key] = '')
  let valid = true

  if (!form.text || form.text.length < 10) {
    errors.text = 'Savol kamida 10 belgidan iborat bo‘lishi kerak'
    valid = false
  }

  if (!form.subject) {
    errors.subject = 'Fan tanlanishi kerak'
    valid = false
  }

  if (!form.difficulty) {
    errors.difficulty = 'Qiyinchilik darajasi tanlanishi kerak'
    valid = false
  }

  if (!form.points || form.points <= 0 || form.points > 100) {
    errors.points = 'Ball 1 dan 100 gacha bo‘lishi kerak'
    valid = false
  }

  if (!form.options.some(opt => opt.trim())) {
    errors.options = 'Hech bo‘lmaganda bitta variant bo‘lishi kerak'
    valid = false
  }

  if (!form.correctAnswer || !form.options.includes(form.correctAnswer)) {
    errors.correctAnswer = 'To‘g‘ri javob variantlar ichida bo‘lishi kerak'
    valid = false
  }

  return valid
}

const loadQuestion = async () => {
  try {
    const res = await axios.get(`/optionquizs/${id}`)
    // Object.assign(form, res.data)
    console.log(res);
  } catch (err) {
    console.error('Savolni olishda xatolik:', err)
  }
}

const submitForm = async () => {
  if (!validateForm()) return
  isSubmitting.value = true
  try {
    await axios.put(`/optionquizs/${id}`, form)
    router.push('/questions')
  } catch (err) {
    console.error('Yangilashda xatolik:', err)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  loadQuestion()
})
</script>
