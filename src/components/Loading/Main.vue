<template>
    <div class="loader"></div>
</template>
<script setup>
</script>
<style scoped>
.loader {
  width: 120px;
  height: 60px;
  border-radius: 200px 200px 0 0;
  -webkit-mask: repeating-radial-gradient(farthest-side at bottom ,#0000 0,#000 1px 12%,#0000 calc(12% + 1px) 20%);
  background:
   radial-gradient(farthest-side at bottom,#3ace4b 0 95%,#0000 0) bottom/0% 0% no-repeat
   #ddd;
  animation: l10 2s infinite steps(6);
}
@keyframes l10 {
    100% {background-size:120% 120%}
}
</style>