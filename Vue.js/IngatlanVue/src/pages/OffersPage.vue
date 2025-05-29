<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { IMany, useStore } from '../stores/store';
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';

const s = useStore();

// const router = useRouter();

const columns: QTableColumn[] = [
  { name: 'kategoriaNev', label: 'Kategória', field: (row: IMany) => row?.kategoriaNev, align: 'left' },
  { name: 'leiras', label: 'Leírás', field: (row: IMany) => row?.leiras, align: 'left' },
  { name: 'hirdetesDatuma', label: 'Hirdetés dátuma', field: (row: IMany) => row?.hirdetesDatuma, align: 'left' },
  { name: 'tehermentes', label: 'Tehermentes', field: (row: IMany) => row?.tehermentes, align: 'left' },
  { name: 'kepUrl', label: 'Fénykép', field: (row: IMany) => row?.kepUrl, align: 'left' },
];

onMounted(() => {
  s.ManyGetAll();
  // router.push('/home');
});
</script>

<template>
  <q-page>
    <div class="text-center">
      <h4 class="q-ma-sm">Ajánlataink</h4>
    </div>
    <q-table :columns="columns" :rows="s.many.documents" wrap-cells>
      <!-- slot1: -->
      <template #body-cell-tehermentes="props">
        <q-td :props="props">
          <p v-if="props.value" class="text-green text-bold">Igen</p>
          <p v-else class="text-red text-bold">Nem</p>
        </q-td>
      </template>
      <!-- slot2: -->
      <template #body-cell-kepUrl="props">
        <q-td :props="props">
          <q-img class="myImg" loading="eager" :src="props.value" width="10vw" />
        </q-td>
      </template>
    </q-table>
    <!-- {{ s.many.documents }} -->
  </q-page>
</template>

<style lang="scss" scoped></style>
