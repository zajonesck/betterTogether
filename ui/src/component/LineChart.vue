<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: null,
    },
  },
  mounted() {
    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false,
    });
  },
  watch: {
    chartData(newChartData) {
      if (newChartData) {
        this.$data._chart.destroy();
        this.renderChart(newChartData, {
          responsive: true,
          maintainAspectRatio: false,
        });
      }
    },
  },
};
</script>
