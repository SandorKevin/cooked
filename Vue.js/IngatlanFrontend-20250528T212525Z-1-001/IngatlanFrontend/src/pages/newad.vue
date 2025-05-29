<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useStore } from "../stores/store";
import { onMounted } from "vue";
import { date } from "quasar";
// import router from "../router";

const store = useStore();

onMounted(() => {
  store.many_GetAll();
  store.one_GetAll();
  store.many.document.hirdetesDatuma = date.formatDate(new Date(), "YYYY-MM-DD");
  store.many.document.tehermentes = true;
});

function onSubmit() {
  store.many_Create();
}
</script>

<template>
  <q-page>
    <div class="row justify-center q-pa-md">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <q-form class="q-gutter-md text-center" @submit="onSubmit">
          <h5>Új hirdetés elküldése</h5>
          <q-select
            v-model="store.many.document.kategoriaId"
            clearable
            dense
            emit-value
            label="Ingatlan kategóriája"
            map-options
            option-label="megnevezes"
            option-value="id"
            :options="store.one.documents"
            outlined
            :rules="[(v) => v != null || 'Kérem válasszon!']"
          />
          <q-input
            v-model="store.many.document.hirdetesDatuma"
            clearable
            disable
            label="Hírdetés dátuma"
            outlined
            type="date"
          />
          <q-input
            v-model="store.many.document.leiras"
            dense
            label="Leírás"
            outlined
            :rules="[(v) => (v != null && v != '') || 'Kérem töltse ki a mezőt!']"
            type="textarea"
          />
          <div class="text-left">
            <q-checkbox v-model="store.many.document.tehermentes" label="Tehermentes ingatlan" />
          </div>

          <q-input
            v-model="store.many.document.kepUrl"
            dense
            label="Fénykép az ingatlanról"
            outlined
            :rules="[(v) => (v != null && v != '') || 'Kérem töltse ki a mezőt!']"
            type="url"
          />
          <q-btn class="q-px-md" color="green" label="Küldés" no-caps type="submit" />
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped></style>
