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
    goalWeight: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      chartData: {
        datasets: [],
      },
      chart: null,
    };
  },
  methods: {
    renderChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      const datasets = [...this.chartData.datasets];

      if (this.goalWeight !== null) {
        datasets.push({
          label: "Goal Weight",
          data: Array(this.chartData.labels.length).fill(this.goalWeight),
          borderColor: "red",
          borderDash: [5, 5],
          fill: false,
        });
      }

      this.chart = new Chart(this.$refs.canvas.getContext("2d"), {
        type: "line",
        data: {
          labels: this.chartData.labels,
          datasets: datasets,
        },
        options: {
          layout: {
            padding: {
              bottom: 50,
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#FFFFFF",
                usePointStyle: true,
                boxWidth: 3,
                padding: 20,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#FFFFFF",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
            y: {
              ticks: {
                color: "#FFFFFF",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
          },
        },
      });
    },
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.renderChart();
      },
    },
    goalWeight() {
      this.renderChart();
    },
  },
  mounted() {
    this.renderChart();
  },
};
</script>
