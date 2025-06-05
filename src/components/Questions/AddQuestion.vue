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
          <div class="grid grid-cols-1 gap-6">
            <div class="space-y-2">
              <label
                for="questionText"
                class="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <i class="pi pi-question-circle text-blue-600"></i>
                Savol matni *
              </label>
              <Textarea
                id="questionText"
                v-model="form.text"
                placeholder="Savolingizni kiriting..."
                rows="4"
                class="w-full resize-none"
                :class="{ 'p-invalid': errors.text }"
              />
              <small v-if="errors.text" class="text-red-500 flex items-center gap-1">
                <i class="pi pi-exclamation-triangle"></i>
                {{ errors.text }}
              </small>
            </div>
            <div class="space-y-2">
              <label
                for="questionText"
                class="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <i class="pi pi-box text-blue-600"></i>
                Javob matni *
              </label>
              <Textarea
                id="questionText"
                v-model="form.answer"
                placeholder="Javobni kiriting..."
                rows="4"
                class="w-full resize-none"
                :class="{ 'p-invalid': errors.answer }"
              />
              <small v-if="errors.answer" class="text-red-500 flex items-center gap-1">
                <i class="pi pi-exclamation-triangle"></i>
                {{ errors.answer }}
              </small>
            </div>
          </div>

          <!-- Subject and Difficulty Row -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Subject -->
            <div class="space-y-2">
              <label
                for="subject"
                class="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <i class="pi pi-book text-green-600"></i>
                Fan nomi *
              </label>
              <Dropdown
                id="subject"
                v-model="form.subject"
                :options="subjects"
                placeholder="Fan tanlang"
                class="w-full"
                :class="{ 'p-invalid': errors.subject }"
              />
              <small v-if="errors.subject" class="text-red-500 flex items-center gap-1">
                <i class="pi pi-exclamation-triangle"></i>
                {{ errors.subject }}
              </small>
            </div>

            <!-- Difficulty -->
            <div class="space-y-2">
              <label
                for="difficulty"
                class="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <i class="pi pi-chart-line text-orange-600"></i>
                Qiyinchilik darajasi *
              </label>
              <Dropdown
                id="difficulty"
                v-model="form.difficulty"
                :options="difficulties"
                placeholder="Daraja tanlang"
                class="w-full"
                :class="{ 'p-invalid': errors.difficulty }"
              />
              <small v-if="errors.difficulty" class="text-red-500 flex items-center gap-1">
                <i class="pi pi-exclamation-triangle"></i>
                {{ errors.difficulty }}
              </small>
            </div>
          </div>

          <!-- Admin Name and Points Row -->
          <div class="grid md:grid-cols-1 gap-6">
            <!-- Points -->
            <div class="space-y-2">
              <label
                for="points"
                class="flex items-center gap-2 text-sm font-semibold text-gray-700"
              >
                <i class="pi pi-star text-yellow-600"></i>
                Ball *
              </label>
              <InputNumber
                id="points"
                v-model="form.points"
                :min="1"
                :max="100"
                placeholder="Ball kiriting"
                class="w-full"
                :class="{ 'p-invalid': errors.points }"
              />
              <small v-if="errors.points" class="text-red-500 flex items-center gap-1">
                <i class="pi pi-exclamation-triangle"></i>
                {{ errors.points }}
              </small>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <Button
              type="submit"
              label="Savolni Saqlash"
              icon="pi pi-check"
              class="flex-1 sm:flex-none bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 border-0 px-8 py-3 font-semibold"
              :loading="isSubmitting"
              :disabled="!isFormValid"
            />
            <Button
              type="button"
              label="Bekor Qilish"
              icon="pi pi-times"
              severity="secondary"
              outlined
              class="flex-1 sm:flex-none px-8 py-3 font-semibold"
              @click="resetForm"
            />
          </div>
        </form>
      </template>
    </Card>

    <!-- Preview Card -->
    <Card v-if="isFormValid" class="mt-8 border border-blue-200 bg-blue-50/30">
      <template #header>
        <div class="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h3 class="text-lg font-semibold flex items-center gap-2">
            <i class="pi pi-eye"></i>
            Savol Ko'rinishi
          </h3>
        </div>
      </template>
      <template #content>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-2">
            <Badge :value="form.subject" severity="info" class="px-3 py-1" />
            <Badge
              :value="form.difficulty"
              :severity="getDifficultySeverity(form.difficulty)"
              class="px-3 py-1"
            />
            <Badge :value="`${form.points} ball`" severity="warning" class="px-3 py-1" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900">{{ form.text }}</h2>
          <div class="flex items-center gap-2 text-sm text-gray-600">
            <i class="pi pi-user"></i>
            <span>{{ admin.name + ' ' + admin.lastname }}</span>
            <span class="text-gray-400">•</span>
            <i class="pi pi-calendar"></i>
            <span>{{ new Date().toLocaleDateString('uz-UZ') }}</span>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import Card from 'primevue/card'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import router from '@/router'
import axios from 'axios'

const admin = ref({})
const storedAdmin = sessionStorage.getItem('admin')
if (storedAdmin) {
  admin.value = JSON.parse(storedAdmin)
}
// Form data
const form = reactive({
  text: '',
  answer: '',
  subject: '',
  difficulty: '',
  admin: admin.value._id,
  points: null,
})

// Form validation errors
const errors = reactive({
  text: '',
  subject: '',
  difficulty: '',
  points: '',
  answer: '',
})

// Form state
const isSubmitting = ref(false)
const showSuccess = ref(false)

// Options for dropdowns
const subjects = ref([
  'Matematika',
  'Fizika',
  'Kimyo',
  'Biologiya',
  'Geografiya',
  'Tarix',
  'Adabiyot',
  'Ingliz tili',
  'Informatika',
  'Iqtisod',
])

const difficulties = ref(['Oson', "O'rta", 'Qiyin', 'Juda qiyin'])

// Computed properties
const isFormValid = computed(() => {
  return form.text.trim() && form.subject && form.difficulty && form.points > 0
})

// Methods
const validateForm = () => {
  // Reset errors
  Object.keys(errors).forEach((key) => (errors[key] = ''))

  let isValid = true

  if (!form.text.trim()) {
    errors.text = 'Savol matni kiritilishi shart'
    isValid = false
  } else if (form.text.length < 10) {
    errors.text = "Savol matni kamida 10 ta belgidan iborat bo'lishi kerak"
    isValid = false
  }

  if (!form.subject) {
    errors.subject = 'Fan nomi tanlanishi shart'
    isValid = false
  }

  if (!form.difficulty) {
    errors.difficulty = 'Qiyinchilik darajasi tanlanishi shart'
    isValid = false
  }
  if (!form.points || form.points <= 0) {
    errors.points = "Ball 1 dan katta bo'lishi kerak"
    isValid = false
  } else if (form.points > 100) {
    errors.points = "Ball 100 dan kichik bo'lishi kerak"
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  console.log(form)
  try {
    const res = await axios.post('/questions', {
      text: form.text,
      subject: form.subject,
      difficulty: form.difficulty,
      points: form.points,
      admin: form.admin,
      answer: form.answer,
    })
    console.log(res)

    // Show success message
    showSuccess.value = true
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

    // Reset form
    resetForm()
  } catch (error) {
    console.error('Xatolik:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.keys(form).forEach((key) => {
    if (key === 'points') {
      form[key] = null
    } else {
      form[key] = ''
    }
  })
  Object.keys(errors).forEach((key) => (errors[key] = ''))
  router.push('/questions')
}

const getDifficultySeverity = (difficulty) => {
  const severityMap = {
    Oson: 'success',
    "O'rta": 'info',
    Qiyin: 'warning',
    'Juda qiyin': 'danger',
  }
  return severityMap[difficulty] || 'info'
}
</script>

<style scoped></style>
