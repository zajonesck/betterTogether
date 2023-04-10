<template>
  <div>
    <line-chart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Line, mixins } from "vue-chartjs";

export default {
  components: {
    LineChart: Line.extend({
      mixins: [mixins.reactiveProp],
      props: ["options"],
      mounted() {
        this.renderChart(this.chartData, this.options);
      },
    }),
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
