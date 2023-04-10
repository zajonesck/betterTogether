<template>
  <div>
    <line-chart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line } from "vue3-chart-v2";

export default {
  components: {
    LineChart: Line,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "day",
                displayFormats: {
                  day: "MMM DD",
                },
              },
            },
          ],
        },
      },
    };
  },
};
</script>
