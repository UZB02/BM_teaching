<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="flex justify-center mb-6">
          <div class="relative">
            <img 
              src="@/imgs/logo.jpg" 
              alt="Question Creator Logo" 
              class="w-20 h-20 rounded-full shadow-lg border-4 border-white"
            />
          </div>
        </div>
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Savol tuzish</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Turli xil savollar yarating va bilimingizni sinab ko'ring. Quyidagi variantlardan birini tanlang.
        </p>
      </div>

      <!-- Main Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <!-- Multiple Choice Card -->
        <Card class="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
          <template #header>
            <div class="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white rounded-t-lg">
              <i class="pi pi-list text-3xl mb-3 block"></i>
              <h3 class="text-xl font-semibold">Savollar</h3>
            </div>
          </template>
          <template #content>
            <div class="p-6">
              <p class="text-gray-600 mb-4">
                Bir nechta savollar tuzing.
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <i class="pi pi-clock mr-2"></i>
                <span>10 ta savol</span>
              </div>
              <Button 
                label="Boshlash" 
                class="w-full bg-purple-500 hover:bg-purple-600 border-purple-500 hover:border-purple-600"
                icon="pi pi-arrow-right"
                iconPos="right"
                @click="router.push('/questions')"
              />
            </div>
          </template>
        </Card>

        <!-- True/False Card -->
        <!-- <Card class="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
          <template #header>
            <div class="bg-gradient-to-r from-green-500 to-green-600 p-6 text-white rounded-t-lg">
              <i class="pi pi-check-circle text-3xl mb-3 block"></i>
              <h3 class="text-xl font-semibold">To'g'ri/Noto'g'ri</h3>
            </div>
          </template>
          <template #content>
            <div class="p-6">
              <p class="text-gray-600 mb-4">
                Oddiy to'g'ri yoki noto'g'ri javobli savollar yarating.
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <i class="pi pi-clock mr-2"></i>
                <span>2-5 daqiqa</span>
              </div>
              <Button 
                label="Boshlash" 
                class="w-full bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </div>
          </template>
        </Card> -->

        <!-- Open Ended Card -->
        <!-- <Card class="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
          <template #header>
            <div class="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white rounded-t-lg">
              <i class="pi pi-pencil text-3xl mb-3 block"></i>
              <h3 class="text-xl font-semibold">Ochiq savol</h3>
            </div>
          </template>
          <template #content>
            <div class="p-6">
              <p class="text-gray-600 mb-4">
                Batafsil javob talab qiladigan savollar yarating.
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <i class="pi pi-clock mr-2"></i>
                <span>10-15 daqiqa</span>
              </div>
              <Button 
                label="Boshlash" 
                class="w-full bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </div>
          </template>
        </Card> -->

        <!-- Fill in the Blank Card -->
        <!-- <Card class="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
          <template #header>
            <div class="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white rounded-t-lg">
              <i class="pi pi-minus text-3xl mb-3 block"></i>
              <h3 class="text-xl font-semibold">Bo'sh joyni to'ldiring</h3>
            </div>
          </template>
          <template #content>
            <div class="p-6">
              <p class="text-gray-600 mb-4">
                Matnda bo'sh joylar bilan savol yarating.
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <i class="pi pi-clock mr-2"></i>
                <span>5-8 daqiqa</span>
              </div>
              <Button 
                label="Boshlash" 
                class="w-full bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </div>
          </template>
        </Card> -->

        <!-- Matching Card -->
        <!-- <Card class="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
          <template #header>
            <div class="bg-gradient-to-r from-pink-500 to-pink-600 p-6 text-white rounded-t-lg">
              <i class="pi pi-link text-3xl mb-3 block"></i>
              <h3 class="text-xl font-semibold">Moslashtirish</h3>
            </div>
          </template>
          <template #content>
            <div class="p-6">
              <p class="text-gray-600 mb-4">
                Elementlarni bir-biriga moslashtirish savollari yarating.
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <i class="pi pi-clock mr-2"></i>
                <span>8-12 daqiqa</span>
              </div>
              <Button 
                label="Boshlash" 
                class="w-full bg-pink-500 hover:bg-pink-600 border-pink-500 hover:border-pink-600"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </div>
          </template>
        </Card> -->

        <!-- Import Questions Card -->
        <!-- <Card class="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
          <template #header>
            <div class="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white rounded-t-lg">
              <i class="pi pi-upload text-3xl mb-3 block"></i>
              <h3 class="text-xl font-semibold">Import qilish</h3>
            </div>
          </template>
          <template #content>
            <div class="p-6">
              <p class="text-gray-600 mb-4">
                Mavjud savollarni fayl orqali import qiling.
              </p>
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <i class="pi pi-clock mr-2"></i>
                <span>2-3 daqiqa</span>
              </div>
              <Button 
                label="Boshlash" 
                class="w-full bg-teal-500 hover:bg-teal-600 border-teal-500 hover:border-teal-600"
                icon="pi pi-arrow-right"
                iconPos="right"
              />
            </div>
          </template>
        </Card> -->
      </div>

      <!-- Quick Stats Section -->
      <!-- <div class="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Statistika</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600 mb-2">127</div>
            <div class="text-gray-600">Yaratilgan savollar</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">89</div>
            <div class="text-gray-600">Faol testlar</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600 mb-2">1,234</div>
            <div class="text-gray-600">Ishtirokchilar</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600 mb-2">4.8</div>
            <div class="text-gray-600">O'rtacha baho</div>
          </div>
        </div>
      </div> -->

      <!-- Recent Activity -->
      <!-- <Card class="shadow-lg border-0">
        <template #header>
          <div class="p-6 border-b">
            <h2 class="text-xl font-semibold text-gray-800">So'nggi faoliyat</h2>
          </div>
        </template>
        <template #content>
          <div class="p-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <i class="pi pi-list text-purple-600"></i>
                  </div>
                  <div>
                    <div class="font-medium text-gray-800">Matematika testi</div>
                    <div class="text-sm text-gray-600">Ko'p tanlovli savol yaratildi</div>
                  </div>
                </div>
                <div class="text-sm text-gray-500">2 soat oldin</div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <i class="pi pi-check-circle text-green-600"></i>
                  </div>
                  <div>
                    <div class="font-medium text-gray-800">Tarix viktorinasi</div>
                    <div class="text-sm text-gray-600">To'g'ri/Noto'g'ri savol yaratildi</div>
                  </div>
                </div>
                <div class="text-sm text-gray-500">5 soat oldin</div>
              </div>
              
              <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <i class="pi pi-pencil text-orange-600"></i>
                  </div>
                  <div>
                    <div class="font-medium text-gray-800">Adabiyot insho</div>
                    <div class="text-sm text-gray-600">Ochiq savol yaratildi</div>
                  </div>
                </div>
                <div class="text-sm text-gray-500">1 kun oldin</div>
              </div>
            </div>
          </div>
        </template>
      </Card> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import router from "@/router";
import 'primeicons/primeicons.css'


// Component logic can be added here
const stats = ref({
  totalQuestions: 127,
  activeTests: 89,
  participants: 1234,
  averageRating: 4.8
})
</script>

<style scoped>
/* Custom animations and transitions */
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

/* Custom gradient backgrounds */
.gradient-purple {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.gradient-green {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.gradient-orange {
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>