<template>
  <div>
    <line :chart-data="chartData" :options="options"></line>
  </div>
</template>

<script>
import { Line } from "vue3-chart-v2";

export default {
  components: {
    Line,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      required: true,
    },
  },
};
</script>
