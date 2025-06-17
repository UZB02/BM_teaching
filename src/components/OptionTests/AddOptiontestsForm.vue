<template>
  <div class="max-w-4xl mx-auto p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Yangi Savol Qo'shish</h1>
      <p class="text-gray-600">Tizimga yangi savol qo'shish uchun quyidagi formani to'ldiring</p>
    </div>

    <!-- Form Card -->
    <Card class="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50/50">
      <template #content>
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Question Text -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <i class="pi pi-question-circle text-blue-600"></i> Savol matni *
            </label>
            <Textarea
              v-model="form.text"
              placeholder="Savolingizni kiriting..."
              rows="3"
              class="w-full resize-none"
              :class="{ 'p-invalid': errors.text }"
            />
            <small v-if="errors.text" class="text-red-500 flex items-center gap-1">
              <i class="pi pi-exclamation-triangle"></i> {{ errors.text }}
            </small>
          </div>

          <!-- Options -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <i class="pi pi-list text-purple-600"></i> Variantlar *
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InputText v-for="(opt, index) in form.options" :key="index" v-model="form.options[index]"
                         :placeholder="'Variant ' + String.fromCharCode(65 + index)" class="w-full" />
            </div>
            <small v-if="errors.options" class="text-red-500 flex items-center gap-1">
              <i class="pi pi-exclamation-triangle"></i> {{ errors.options }}
            </small>
          </div>

          <!-- Correct Answer -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <i class="pi pi-check-circle text-green-600"></i> To'g'ri javob *
            </label>
            <Dropdown
              v-model="form.correctAnswer"
              :options="form.options"
              placeholder="To'g'ri javobni tanlang"
              class="w-full"
              :class="{ 'p-invalid': errors.correctAnswer }"
            />
            <small v-if="errors.correctAnswer" class="text-red-500 flex items-center gap-1">
              <i class="pi pi-exclamation-triangle"></i> {{ errors.correctAnswer }}
            </small>
          </div>

          <!-- Subject and Difficulty -->
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <i class="pi pi-book text-green-600"></i> Fan nomi *
              </label>
              <Dropdown
                v-model="form.subject"
                :options="subjects"
                placeholder="Fan tanlang"
                class="w-full"
                :class="{ 'p-invalid': errors.subject }"
              />
              <small v-if="errors.subject" class="text-red-500 flex items-center gap-1">
                <i class="pi pi-exclamation-triangle"></i> {{ errors.subject }}
              </small>
            </div>

            <div class="space-y-2">
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <i class="pi pi-chart-line text-orange-600"></i> Qiyinchilik darajasi *
              </label>
              <Dropdown
                v-model="form.difficulty"
                :options="difficulties"
                placeholder="Daraja tanlang"
                class="w-full"
                :class="{ 'p-invalid': errors.difficulty }"
              />
              <small v-if="errors.difficulty" class="text-red-500 flex items-center gap-1">
                <i class="pi pi-exclamation-triangle"></i> {{ errors.difficulty }}
              </small>
            </div>
          </div>

          <!-- Points -->
          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <i class="pi pi-star text-yellow-600"></i> Ball *
            </label>
            <InputNumber
              v-model="form.points"
              :min="1"
              :max="100"
              placeholder="Ball kiriting"
              class="w-full"
              :class="{ 'p-invalid': errors.points }"
            />
            <small v-if="errors.points" class="text-red-500 flex items-center gap-1">
              <i class="pi pi-exclamation-triangle"></i> {{ errors.points }}
            </small>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <Button
              type="submit"
              label="Saqlash"
              icon="pi pi-check"
              class="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 border-0 px-8 py-3"
              :loading="isSubmitting"
              :disabled="!isFormValid"
            />
            <Button
              type="button"
              label="Bekor qilish"
              icon="pi pi-times"
              severity="secondary"
              outlined
              class="flex-1 sm:flex-none px-8 py-3"
              @click="resetForm"
            />
          </div>
        </form>
      </template>
    </Card>

    <!-- Preview -->
    <Card v-if="isFormValid" class="mt-8 border border-blue-200 bg-blue-50/30">
      <template #header>
        <div class="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h3 class="text-lg font-semibold flex items-center gap-2">
            <i class="pi pi-eye"></i> Savol Ko‘rinishi
          </h3>
        </div>
      </template>
      <template #content>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <Badge :value="form.subject" severity="info" />
            <Badge :value="form.difficulty" :severity="getDifficultySeverity(form.difficulty)" />
            <Badge :value="`${form.points} ball`" severity="warning" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900">{{ form.text }}</h2>
          <ul class="list-disc list-inside text-gray-700">
            <li v-for="(opt, i) in form.options" :key="i">{{ String.fromCharCode(65 + i) }}. {{ opt }}</li>
          </ul>
          <p class="text-green-700 font-medium">
            <i class="pi pi-check-circle"></i> To‘g‘ri javob: {{ form.correctAnswer }}
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import Card from 'primevue/card'
import Textarea from 'primevue/textarea'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import axios from 'axios'
import router from '@/router'

const admin = ref({})
const storedAdmin = sessionStorage.getItem('admin')
if (storedAdmin) {
  admin.value = JSON.parse(storedAdmin)
}

const form = reactive({
  text: '',
  subject: '',
  difficulty: '',
  points: null,
  options: ['', '', '', ''],
  correctAnswer: '',
  admin: admin.value._id,
})

const errors = reactive({
  text: '',
  subject: '',
  difficulty: '',
  points: '',
  options: '',
  correctAnswer: '',
})

const isSubmitting = ref(false)

const subjects = ref([
  'Matematika', 'Fizika', 'Kimyo', 'Biologiya', 'Geografiya',
  'Tarix', 'Adabiyot', 'Ingliz tili', 'Informatika', 'Iqtisod'
])
const difficulties = ref(['Oson', "O'rta", 'Qiyin', 'Juda qiyin'])

const isFormValid = computed(() =>
  form.text.trim().length >= 10 &&
  form.subject &&
  form.difficulty &&
  form.points > 0 &&
  form.correctAnswer &&
  form.options.some(opt => opt.trim())
)

const validateForm = () => {
  Object.keys(errors).forEach(k => errors[k] = '')
  let isValid = true

  if (!form.text.trim()) {
    errors.text = 'Savol matni kiritilishi shart'
    isValid = false
  } else if (form.text.length < 10) {
    errors.text = 'Savol matni kamida 10 ta belgidan iborat bo‘lishi kerak'
    isValid = false
  }

  if (!form.subject) {
    errors.subject = 'Fan tanlanishi shart'
    isValid = false
  }

  if (!form.difficulty) {
    errors.difficulty = 'Qiyinchilik darajasi tanlanishi shart'
    isValid = false
  }

  if (!form.points || form.points <= 0) {
    errors.points = 'Ball 1 dan katta bo‘lishi kerak'
    isValid = false
  } else if (form.points > 100) {
    errors.points = 'Ball 100 dan kichik bo‘lishi kerak'
    isValid = false
  }

  if (!form.options.some(opt => opt.trim())) {
    errors.options = 'Hech bo‘lmaganda bitta variant kiritilishi kerak'
    isValid = false
  }

  if (!form.correctAnswer) {
    errors.correctAnswer = 'To‘g‘ri javob tanlanishi kerak'
    isValid = false
  } else if (!form.options.includes(form.correctAnswer)) {
    errors.correctAnswer = 'To‘g‘ri javob variantlar ichida bo‘lishi kerak'
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  if (!validateForm()) return
  isSubmitting.value = true
  console.log(form);
  try {
   const res= await axios.post('/optionquizs', form)
    // resetForm()
    console.log(res);
  } catch (err) {
    console.error('Saqlashda xatolik:', err)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(form, {
    text: '',
    subject: '',
    difficulty: '',
    points: null,
    options: ['', '', '', ''],
    correctAnswer: '',
    admin: admin.value._id,
  })
  Object.keys(errors).forEach(k => errors[k] = '')
  router.push('/questions')
}

const getDifficultySeverity = (level) => {
  return {
    'Oson': 'success',
    "O'rta": 'info',
    'Qiyin': 'warning',
    'Juda qiyin': 'danger',
  }[level] || 'info'
}
</script>

<style scoped></style>
