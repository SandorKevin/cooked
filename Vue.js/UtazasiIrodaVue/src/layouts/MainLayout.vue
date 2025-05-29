<!-- Material Design Icons: https://materialdesignicons.com/ -->

<script setup lang="ts">
import { ref } from 'vue';
// import { useStore } from '../stores/store';

// import { onMounted } from 'vue';

// const s = useStore();

let showMenuBar = ref(true);

// onMounted(() => {
// ...
// });
</script>

<template>
  <div class="q-pa-md">
    <q-layout view="hHh LpR fFf">
      <!-- Header: -->
      <q-header v-model="showMenuBar" class="text-left bg-blue-5" elevated reveal>
        <!-- Menu bar: -->
        <q-toolbar>
          <q-toolbar-title
            class="text-bold"
            :shrink="true"
            style="cursor: pointer"
            @click="$router.push({ path: '/' })"
          >
            ÁLK Utazási iroda
          </q-toolbar-title>
          <q-btn
            :class="{ active: $route.path === '/journeys' }"
            clickable
            flat
            label="Kínálatunk"
            no-caps
            to="/journeys"
          />
          <q-btn
            :class="{ active: $route.path === '/registration' }"
            flat
            label="Regisztráció"
            no-caps
            to="/registration"
          />
        </q-toolbar>
      </q-header>

      <!-- Main container (DON'T DELETE!) -->
      <q-page-container id="container">
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
.active {
  background-color: #44a5f1;
  color: yellow;
}
</style>
