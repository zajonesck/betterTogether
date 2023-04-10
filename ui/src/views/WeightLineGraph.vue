<template>
  <div>
    <line-chart :chart-data="chartData" />
  </div>
</template>

<script>
import { Line } from "vue3-chart-v2";

export default {
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  components: {
    LineChart: Line,
  },
};
</script>
