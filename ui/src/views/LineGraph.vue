<template>
  <div ref="lineGraph"></div>
</template>

<script>
import * as d3 from "d3";

export default {
  mounted() {
    // Use D3 to create your line graph
    const data = [
      { date: "2022-01-01", value: 10 },
      { date: "2022-02-01", value: 20 },
      { date: "2022-03-01", value: 30 },
      { date: "2022-04-01", value: 40 },
      { date: "2022-05-01", value: 50 },
    ];

    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3
      .scaleTime()
      .range([0, width])
      .domain(d3.extent(data, (d) => new Date(d.date)));

    const y = d3
      .scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data, (d) => d.value)]);

    const line = d3
      .line()
      .x((d) => x(new Date(d.date)))
      .y((d) => y(d.value));

    const svg = d3
      .select(this.$refs.lineGraph)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg.append("path").datum(data).attr("class", "line").attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append("g").call(d3.axisLeft(y));
  },
};
</script>
