<script setup lang="ts">
import { defineProps } from 'vue';
import { University } from '../models/axios.models';
import UniversityItem from './UniversityItem.vue';

interface Props{
    universidades: University[];
}

defineProps<Props>();
</script>

<template>
  <div class="container max-w-screen-lg mx-auto px-6 ">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        <div v-for="university in universidades" 
        class="border border-gray-300 rounded p-3 mt-2 bg-lime-600 bg-opacity-10 hover:bg-gray-200 ">
            <UniversityItem :university="university" />
        </div>
      </div> 
  </div>
</template>