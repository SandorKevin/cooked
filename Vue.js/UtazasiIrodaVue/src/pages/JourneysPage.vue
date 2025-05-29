<script setup lang="ts">
import { QTableColumn } from 'quasar';
import { IOne, useStore } from '../stores/store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const s = useStore();

const router = useRouter();

const columns: QTableColumn[] = [
  { name: 'country', label: 'Ország', field: (row: IOne) => row?.country, align: 'left' },
  { name: 'country', label: 'Utazási mód', field: (row: IOne) => row?.vehicle?.type, align: 'left' },
  { name: 'departure', label: 'Indulás', field: (row: IOne) => row?.departure, align: 'left' },
  { name: 'departure', label: 'Max létszám', field: (row: IOne) => row?.capacity, align: 'left' },
  { name: 'description', label: 'Leírás', field: (row: IOne) => row?.description, align: 'left' },
  { name: 'pictureUrl', label: 'Fénykép', field: (row: IOne) => row?.pictureUrl, align: 'left' },
];

onMounted(() => {
  s.OneGetAll();
  // router.push('/home');
});

function Érdekel(row: IOne) {
  s.many.document.journeyId = row.id;
  router.push('/registration');
}
</script>

<template>
  <q-page>
    <q-table :columns="columns" :rows="s.one.documents" wrap-cells>
      <!-- slot1: -->
      <template #body-cell-description="props">
          <q-td :props="props">
            {{ props.value }}
            <q-btn glossy label='Érdekel' no-caps @click="Érdekel(props.row)" />
          </q-td>
        </template>
        <!-- slot2: -->
        <template #body-cell-pictureUrl="props">
          <q-td :props="props">
            <q-img loading="eager" :src="props.value" width="200px" />
          </q-td>
        </template>
    </q-table>
    {{ s.one.documents }}
  </q-page>
</template>

<style lang="scss" scoped></style>
