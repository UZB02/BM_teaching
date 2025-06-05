<template>
  <section class="p-6 min-h-screen">
    <div class="container">
      <div class="mb-8 flex flex-col md:flex-row items-center justify-between">
        <span>
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Savollar</h1>
          <p class="text-gray-600">Barcha yaratilgan savollarni ko'ring va boshqaring</p>
        </span>
        <Button label="Savol qo'shish" @click="router.push('/questions/add')" />
      </div>
      <QuestionCards></QuestionCards>
    </div>
  </section>
</template>

<script setup>
import QuestionCards from '../components/Questions/QuestionsCard.vue';
import Button from 'primevue/button';
import router from '@/router';
</script>
