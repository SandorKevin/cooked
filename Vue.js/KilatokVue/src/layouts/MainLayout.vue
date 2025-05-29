<!-- Material Design Icons: https://materialdesignicons.com/ -->

<script setup lang="ts">
import { ref } from 'vue';

let showMenuBar = ref(true);

</script>

<template>
  <div class="q-pa-md">
    <q-layout view="hHh LpR fFf">
      <!-- Header: -->
      <q-header v-model="showMenuBar" class="text-left bg-blue-5" elevated reveal>
        <!-- Menu bar: -->
        <q-toolbar>
          <q-toolbar-title class="my-title" :shrink="true" style="cursor: pointer" @click="$router.push({ path: '/' })">
            Kilátók Magyarországon
          </q-toolbar-title>
          <q-btn :class="{ active: $route.path === '/' }" clickable flat label="Nyitólap" no-caps to="/" />
          <q-btn :class="{ active: $route.path === '/ratiing' }" flat label="Értékelés" no-caps to="/rating" />
          <q-toolbar-title class="my-title" />
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
