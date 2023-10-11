<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "LineChart",
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartId: "my-chart",
      chart: null,
    };
  },
  mounted() {
    this.chart = new Chart(this.$refs.canvas.getContext("2d"), {
      type: "line",
      data: this.chartData,
    });
  },
};
</script>
