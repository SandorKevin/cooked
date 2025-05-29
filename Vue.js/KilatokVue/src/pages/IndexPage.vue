<script setup lang="ts">
import { useStore } from '../stores/store';
import { onMounted } from 'vue';

const s = useStore();

onMounted(() => {
  s.LocationsGetAll();
  s.ViewpointsGetByLocation();
});
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <q-select
        v-model="s.app.locationName"
        emit-value
        filled
        label="Hegység:"
        map-options
        option-label="locationName"
        option-value="locationName"
        :options="s.one.documents"
        style="width: 350px"
        @update:model-value="s.ViewpointsGetByLocation()"
      />
      <!-- {{ s.app.locationName }} -->
    </div>
    <div class="row justify-center q-ma-xl">
      <div v-for="e in s.many.documents" :key="e.locationId" class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
        <q-card class="q-ma-md">
          <q-card-section class="text-center text-h5" style="background-color: #c8be9c"> {{ e.viewpointName }} </q-card-section>
          <q-card-section class="text-h7" style="background-color: #ffe4c4">
            <ul>
              <li>
                <span>Hegy: </span>
                <b>{{ e.mountain }}</b>
              </li>
              <li>
                <span>Magasság: </span>
                <b>{{ e.height }} m</b>
              </li>
              <li>
                <span>Épült: </span>
                <b>{{ e.built }}</b>
              </li>
            </ul>
          </q-card-section>
          <q-card-section style="background-color: #c8be9c">
            <div class="text-h7 text-justify">
              {{ e.description }}
            </div>
          </q-card-section>
          <q-card-section style="background-color: #ffe4c4">
            <q-img
              fit="scale-down"
              :src="e.imageUrl"
              style="max-height: 200px"
            />
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
