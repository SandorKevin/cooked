<script setup lang="ts">
import { useStore } from '../stores/store';
import { onMounted } from 'vue';

const s = useStore();

onMounted(() => {
  s.ManyGetAll();
});

function filterUpdate() {
  if (s.app.filter == '') {
    s.app.filterURL = '*';
  } else {
    s.app.filterURL = s.app.filter;
  }

  s.ManyGetAll();
}

function firstPage() {
  s.app.page = 1;
  s.ManyGetAll();
}

function prevPage() {
  s.app.page--;
  s.ManyGetAll();
}

function nextPage() {
  s.app.page++;
  s.ManyGetAll();
}

function lastPage() {
  s.app.page = s.numberOfPage;
  s.ManyGetAll();
}
</script>

<template>
  <q-page>
    <q-input
      v-model="s.app.filter"
      class="q-mx-auto"
      dense
      filled
      label="Filter"
      style="width: 40%"
      type="text"
      @update:model-value="filterUpdate()"
    />
    <div class="row text-center">
      <div class="col-12 q-gutter-lg q-mt-xs">
        <q-btn color="blue" :disable="s.app.page == 1" no-caps @click="firstPage()">First</q-btn>
        <q-btn color="blue" :disable="s.app.page == 1" no-caps @click="prevPage()">Prev</q-btn>
        <q-btn color="blue" :disable="s.app.page == s.numberOfPage" no-caps @click="nextPage()">Next</q-btn>
        <q-btn color="blue" :disable="s.app.page == s.numberOfPage" no-caps @click="lastPage()">Last</q-btn>
      </div>
    </div>

    <div class="row">
      <div v-for="e in s.many.documents" :key="e.id" class="col-sm-12 col-md-6 col-lg-4">
        <q-card class="q-ma-md">
          <q-card-section>
            <div class="text-h6 absolute-top text-center bg-blue-2">{{ e.name }} - ({{ e.runtime }})</div>
          </q-card-section>

          <q-img fit="contain" :src="e.image?.medium"> </q-img>
          <q-card-section>
            <div class="text bg-yellow-2 rounded-borders q-pa-sm">
              <div class="text-h6">{{ e.summary }}</div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text bg-blue-2 rounded-borders q-pa-sm">
              <div class="text-h6">Season: {{ e.season?.season }}, years: {{ e.season.years }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- {{ s.many.documents }} -->
  </q-page>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 3vw;
}
</style>
