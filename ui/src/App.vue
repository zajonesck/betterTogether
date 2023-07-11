<script setup></script>

<template>
  <div>
    <header>
      <h1>Better Together</h1>
    </header>
    <div id="nav">
      <router-link class="nav-link" to="/client-roster"
        >Client List</router-link
      >

      <router-link class="nav-link" to="/workout-rx">Workouts</router-link>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
header h1 {
  text-align: center;
  padding: 10px 0;
  color: #04aa6d;
  font-weight: 500;
  font-size: 3rem;
}
.nav-link {
  margin-right: 10px;
}
</style>
