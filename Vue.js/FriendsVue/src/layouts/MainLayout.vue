<script setup lang="ts">
import { useStore } from '../stores/store';

const s = useStore();

</script>

<template>
  <div class="q-pa-md">
    <q-layout view="hHh LpR fFf">
      <!-- Header: -->
      <q-header class="text-left bg-blue-5" elevated reveal>
        <!-- Menu bar: -->
        <q-toolbar>
          <q-toolbar-title :shrink="true" style="height: fit-content;">
            <q-avatar>
              <img src="src/assets/Jedlik_small.png" />
            </q-avatar>
            Friends (TV Series 1994-2004)
          </q-toolbar-title>
          <q-btn
            :class="{ active: $route.path === '/' }"
            clickable
            flat
            icon="mdi-table"
            label="Episode cards"
            no-caps
            to="/"
          />
          <q-btn
            :class="{ active: $route.path === '/about' }"
            clickable
            flat
            icon="mdi-information-outline"
            label="About"
            no-caps
            to="/about"
          />
          <q-toolbar-title class="my-title" />
        </q-toolbar>
      </q-header>

      <!-- Status bar: -->
      <q-footer class="bg-blue-5" elevated reveal>
        <q-toolbar>
          <q-toolbar-title v-if="$route.path == '/'" class="text-center my-title"
            >Number of total records: {{ s.app.numerOfRec }}</q-toolbar-title
          >
          <q-toolbar-title v-if="$route.path == '/'" class="text-center my-title"
            >Page: {{ s.app.page }} of {{ s.numberOfPage }}</q-toolbar-title
          >
        </q-toolbar>
      </q-footer>

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
