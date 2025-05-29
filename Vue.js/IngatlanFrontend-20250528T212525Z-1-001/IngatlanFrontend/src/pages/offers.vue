<!-- eslint-disable vue/multi-word-component-names -->

<script setup lang="ts">
import { useStore } from "../stores/store";
import { onMounted } from "vue";
import { QTableColumn } from "quasar";
// import { date } from "quasar";
// import router from "../router";

const store = useStore();

onMounted(() => {
  store.many_GetAll();
});
const cols: QTableColumn[] = [
  { name: "kategoriaNev", label: "Kategória", field: "kategoriaNev", align: "center" },
  { name: "leiras", label: "Leírás", field: "leiras", align: "center" },
  { name: "hirdetesDatuma", label: "Hirdetés dátuma", field: "hirdetesDatuma", align: "center" },
  { name: "tehermentes", label: "Tehermentes", field: "tehermentes", align: "center" },
  { name: "kepUrl", label: "Fénykép", field: "kepUrl", align: "center" },
];
</script>

<template>
  <q-page class="q-pa-xl">
    <q-table :columns="cols" :rows="store.many.documents" wrap-cells>
      <template #body-cell-tehermentes="props">
        <q-td :props="props">
          <q-badge v-if="props.value" color="green" label="igen" />
          <q-badge v-else color="red" label="nem" />
        </q-td>
      </template>
      <template #body-cell-kepUrl="props">
        <q-td :props="props">
          <img alt="Fotó" :src="props.value" style="max-height: 100px" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<style lang="scss" scoped></style>
