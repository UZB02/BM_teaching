<template>
  <div v-if="isLoading" class="w-full h-[50vh] flex items-center justify-center">
    <Loading />
  </div>
  <div v-else class="mx-auto flex flex-col gap-4">
    <!-- Filter -->
    <div class="header flex flex-col gap-1">
      <label class="flex items-center gap-2 text-sm font-semibold text-gray-600">
        Daraja bo'yicha filtrlash
      </label>
      <Select
        v-model="selectedDegree"
        :options="degree"
        optionLabel="name"
        placeholder="Darajani tanlang"
        class="w-full md:w-56"
      />
    </div>

    <!-- Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="(item, itemKey) in filteredQuestions"
        :key="item._id"
        class="group relative overflow-hidden border-0 bg-white shadow-md hover:shadow-2xl transition-all duration-500 transform cursor-pointer rounded-xl"
      >
        <template #content>
          <div class="relative z-10 p-5">
            <div class="flex justify-between items-start mb-2">
              <Badge
                :value="item.difficulty"
                class="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full text-sm"
              />
              <div class="hidden sm:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button icon="pi pi-eye" text @click="infoToogle(item)" rounded size="small" class="w-8 h-8 hover:bg-blue-50 hover:text-blue-600" v-tooltip.top="'Javobni ko‘rish'" />
                <Button icon="pi pi-pencil" text @click="router.push(`/optionquestions/edit/${item._id}`)" rounded size="small" class="w-8 h-8 hover:bg-orange-50 hover:text-orange-600" v-tooltip.top="'Tahrirlash'" />
                <Button icon="pi pi-trash" text rounded @click="openDeletModal(item)" size="small" class="w-8 h-8 hover:bg-red-50 hover:text-red-600" v-tooltip.top="'O‘chirish'" />
              </div>
              <div class="sm:hidden">
                <Button type="button" icon="pi pi-ellipsis-v" @click="toggle($event, item)" :aria-controls="'overlay_menu_' + item._id" size="small" />
                <Menu :ref="(el) => (menuRefs[item._id] = el)" :id="'overlay_menu_' + item._id" :model="menuItems" :popup="true" />
              </div>
            </div>

            <!-- Savol -->
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <div class="p-1 text-white bg-gradient-to-b from-blue-500 to-purple-500 rounded-full">
                  {{ itemKey + 1 }}
                </div>
                <h3 class="text-sm font-medium text-gray-600 uppercase tracking-wide">Savol</h3>
              </div>
              <h2 class="text-lg font-semibold text-gray-900 leading-relaxed group-hover:text-blue-700 transition-colors duration-300">
                {{ item.text.slice(0, 60) + '...' }}
              </h2>

              <!-- Variantlar -->
              <ul class="mt-2 space-y-1 text-sm text-gray-700">
                <li v-for="(opt, i) in item.options" :key="i" class="flex items-center gap-2">
                  <span :class="opt=='' ? 'hidden' : 'font-semibold'">{{ String.fromCharCode(65 + i) }}.</span> {{ opt }}
                </li>
              </ul>
            </div>

            <!-- Sana va admin -->
            <div class="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
              <div class="flex items-center gap-1">
                <i class="pi pi-clock text-xs"></i>
                <span>{{ new Date(item.createdAt).toLocaleDateString('uz-UZ') }}</span>
              </div>
              <div class="flex items-center gap-1">
                <i class="pi pi-user text-xs"></i>
                <span>{{ item.admin.name }}</span>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        </template>
      </Card>
    </div>
  </div>

  <!-- Info Dialog -->
  <Dialog v-model:visible="visible" modal :header="false" :style="{ width: '50vw', maxWidth: '650px' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="p-4 sm:p-6">
      <h2 class="text-xl font-bold text-gray-800 mb-6">Savol tafsilotlari</h2>
      <div class="space-y-6">
        <!-- Savol -->
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="text-sm font-semibold text-blue-600 uppercase mb-2 flex items-center">
            <i class="pi pi-question-circle mr-2"></i> Savol
          </h3>
          <p class="text-lg text-gray-900 leading-relaxed">{{ question.text }}</p>
        </div>

        <!-- Variantlar -->
        <div class="bg-yellow-50 p-4 rounded-lg">
          <h3 class="text-sm font-semibold text-yellow-600 uppercase mb-2 flex items-center">
            <i class="pi pi-list mr-2"></i> Variantlar
          </h3>
          <ul class="space-y-1 text-gray-800">
            <li v-for="(opt, i) in question.options" :key="i" :class="opt=='' ? 'hidden' : { 'font-bold text-green-700': opt === question.correctAnswer }">
              {{ String.fromCharCode(65 + i) }}. {{ opt }}
            </li>
          </ul>
        </div>

        <!-- To‘g‘ri javob -->
        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="text-sm font-semibold text-green-600 uppercase mb-2 flex items-center">
            <i class="pi pi-check-circle mr-2"></i> To‘g‘ri javob
          </h3>
          <p class="text-base text-gray-800 leading-relaxed">{{ question.correctAnswer }}</p>
        </div>
      </div>
    </div>
  </Dialog>

  <!-- Delete Confirmation -->
  <Dialog v-model:visible="deletModal" modal header="Tasdiqlash" :closable="false" class="w-96">
    <div class="text-center">
      <i class="pi pi-exclamation-triangle text-yellow-500 text-4xl mb-4"></i>
      <p>Haqiqatan ham bu ma'lumotni o‘chirmoqchimisiz?</p>
    </div>
    <template #footer>
      <Button label="Bekor qilish" icon="pi pi-times" class="p-button-text" @click="deletModal = false" />
      <Button label="Ha, o'chirilsin" icon="pi pi-check" class="p-button-danger" @click="deletQuestion()" />
    </template>
  </Dialog>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Badge from 'primevue/badge'
import Menu from 'primevue/menu'
import Dialog from 'primevue/dialog'
import Select from 'primevue/select'
import axios from 'axios'
import router from '@/router'
import formatDate from '../../utils/formatDate'
import Loading from '../Loading/Main.vue'

// States
const isLoading = ref(true)
const visible = ref(false)
const deletModal = ref(false)
const question = ref({})
const selectedDegree = ref(null)
const questions = ref([])
const filteredQuestions = ref([])

// Admin from session
const admin = ref({})
const storedAdmin = sessionStorage.getItem('admin')
if (storedAdmin) admin.value = JSON.parse(storedAdmin)

// Degree options
const degree = ref([
  { name: 'Hammasi', code: null },
  { name: 'Oson', code: 'Oson' },
  { name: "O'rta", code: "O'rta" },
  { name: 'Qiyin', code: 'Qiyin' },
  { name: 'Juda qiyin', code: 'Juda qiyin' },
])

watch(selectedDegree, (val) => {
  if (!val || !val.code) {
    filteredQuestions.value = questions.value
  } else {
    filteredQuestions.value = questions.value.filter((q) => q.difficulty === val.code)
  }
})

// Menu
const menuRefs = reactive({})
const menuItems = ref([
  {
    label: 'Amallar',
    items: [
      { label: 'Ko‘rish', icon: 'pi pi-eye', command: () => (visible.value = true) },
      { label: 'Tahrirlash', icon: 'pi pi-pencil', command: () => router.push(`/questions/edit/${question.value._id}`) },
      { label: 'O‘chirish', icon: 'pi pi-trash', command: () => openDeletModal(question.value) },
    ],
  },
])
const toggle = (event, item) => {
  question.value = item
  if (menuRefs[item._id]) menuRefs[item._id].toggle(event)
}
const infoToogle = (item) => {
  visible.value = true
  question.value = item
}
const openDeletModal = (item) => {
  deletModal.value = true
  question.value = item
}

// Fetch questions
const fetchQuestions = async () => {
  try {
    const res = await axios.get(`/optionquizs?adminId=${admin.value._id}`)
    if (res.status === 200) {
      isLoading.value = false
      questions.value = res.data
      filteredQuestions.value = res.data
    }
  } catch (err) {
    console.error(err)
  }
}
fetchQuestions()

// Delete
const deletQuestion = async () => {
  try {
    const res = await axios.delete(`/optionquizs/${question.value._id}`)
    if (res.status === 200) {
      fetchQuestions()
      deletModal.value = false
    }
  } catch (err) {
    console.error(err)
  }
}
</script>
