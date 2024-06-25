<script setup lang="ts">
import { defineProps } from 'vue';
import { University } from '../models/axios.models';

interface Props {
    university: University
}

defineProps<Props>();

</script>

<template>
    <h4 class="text-x1 font-bold text-gray-700 text-center">
        {{ university.facultad }}
    </h4>
    <p class="text-sm text-gray-600 font-bold text-center">
        Periodo: 
        <span v-for="periodo in university.periodo" class="font-semibold">{{
          periodo
        }}
        </span>
    </p>
    <p class="text-sm text-gray-600 font-bold text-center">
        Programa: 
        <span v-for="programa in university.programa" class="font-semibold">{{
          programa
        }}
        </span>
    </p>
    <p class="text-sm text-gray-600 font-bold text-center">
        Sexo Femenino: 
        <span class="font-semibold">{{ university.sexo_feme}}</span>
    </p>
    <p class="text-sm text-gray-600 font-bold text-center">
        Sexo Masculino: 
        <span class="font-semibold">{{ university.sexo_masc}}</span>
    </p>
    <p class="text-sm text-gray-600 font-bold text-center">
        Total Matricula: 
        <span class="font-semibold">{{ university.total_matricula}}</span>
    </p>
</template>