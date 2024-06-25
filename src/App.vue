<script setup lang="ts">
import PageHeader from './components/PageHeader.vue';
import Navbar from './components/Navbar.vue';
import axiosClient from './utils/axios';
import { onMounted, ref } from 'vue';
import { University } from './models/axios.models';
import UniversityList from './components/UniversityList.vue';
import Chart from 'chart.js/auto';

const universidades = ref<University[]>([]);
const filteredFacultades = ref<University[]>([]);
const search = ref("");
const searchperiodo = ref("");
const programaFiltrado = ref(""); 

const chartData = ref<any>(null); 
let myChart: any; 

const fetchuniversidades = async() => {
  try {
    const { data } = await axiosClient.get("/r86y-229a.json");
    universidades.value = data;
  } catch (error) {
    console.log(error);
  }
};

const FilterFacultadesYProgramas = () => {
  filteredFacultades.value = universidades.value.filter((university) => 
    (university.facultad.toLowerCase().includes(search.value.toLowerCase()) && 
     university.periodo.toLowerCase().includes(searchperiodo.value.toLowerCase())) ||
    (university.programa.toLowerCase().includes(search.value.toLowerCase()) && 
     university.periodo.toLowerCase().includes(searchperiodo.value.toLowerCase()))
  );

  if (filteredFacultades.value.length > 0) {
    programaFiltrado.value = filteredFacultades.value[0].programa;
  } else {
    programaFiltrado.value = "";
  }

  updateChartData(); 
};

const updateChartData = () => {
  const labels = filteredFacultades.value.map((university) => `${university.programa} - ${university.periodo}`);
  const dataFeme = filteredFacultades.value.map((university) => university.sexo_feme);
  const dataMasc = filteredFacultades.value.map((university) => university.sexo_masc);
  const dataTotal = filteredFacultades.value.map((university) => university.total_matricula);

  chartData.value = {
    labels: labels,
    datasets: [
      {
        label: 'Sexo Femenino',
        data: dataFeme,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      },
      {
        label: 'Sexo Masculino',
        data: dataMasc,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: 'Total Matrícula',
        data: dataTotal,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  if (myChart) {
    myChart.data = chartData.value;
    myChart.update();
  } else {
    myChart = new Chart('myChart', {
      type: 'bar',
      data: chartData.value,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: `Estadísticas por ${programaFiltrado.value}` 
            
          }
        }
      }
    });
  }
};

onMounted(() => {
  fetchuniversidades();  
});

</script>

<template>
  <PageHeader />
  <Navbar />
  <div class="container max-w-screen-lg mx-auto px-3 border border-gray-400 rounded mt-2 bg-slate-50 p-2">
    <div class="mb-1"> 
      <h4 class="font-bold">Buscador: 
        <input type="text" 
               class="border border-gray-300 rounded w-100 p-1 mt-2 px-6 text-center" 
               placeholder="Search Data"
               v-model="search"
               @input="FilterFacultadesYProgramas">
      </h4>
    </div>

    <div>
      <label for="periodo" class="font-bold">Período: </label>
      <select id="periodo" 
              v-model="searchperiodo"  
              class="border border-gray-300 rounded"
              @click="FilterFacultadesYProgramas">
        <option value="">Seleccione un período</option>
        <option value="2015-1">2015-1</option>
        <option value="2015-2">2015-2</option>
        <option value="2016-1">2016-1</option>
        <option value="2016-2">2016-2</option>
        <option value="2017-1">2017-1</option>
        <option value="2017-2">2017-2</option>
        <option value="2018-1">2018-1</option>
        <option value="2018-2">2018-2</option>
        <option value="2019-1">2019-1</option>
        <option value="2019-2">2019-2</option>
        <option value="2020-1">2020-1</option>
        <option value="2020-2">2020-2</option>
        <option value="2021-1">2021-1</option>
      </select>
    </div>

    <div>
      <UniversityList 
    :universidades="filteredFacultades.length > 0 ? filteredFacultades : universidades"/>
    </div>

    <div class="flex justify-center items-center h-screen">
      <div style="width: 700px; height: 600px;" class="container mx-auto px-4 py-4 rounded-lg shadow-md bg-white border border-black">
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>

  </div>

</template>