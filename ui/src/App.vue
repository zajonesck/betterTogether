<script setup></script>

<template>
  <div id="nav">
    <router-link to="/client-roster">Clients</router-link> |
    <router-link to="/weight-history">Weights</router-link> |
    <router-link to="/workout-rx">Workouts</router-link>
  </div>
  <router-view />
</template>

<style scoped></style>
