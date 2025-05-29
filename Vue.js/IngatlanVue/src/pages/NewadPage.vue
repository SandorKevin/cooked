<script setup lang="ts">
import { date } from 'quasar';
import { useStore } from '../stores/store';
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';

const s = useStore();

// const router = useRouter();

onMounted(() => {
  s.OneGetAll();
  // router.push('/home');
  s.many.document.tehermentes = false;
  s.many.document.hirdetesDatuma = date.formatDate(new Date(), 'YYYY-MM-DD');
});

function onSubmit() {
    s.ManyCreate();
    // router.push('/home');
}
</script>

<template>
  <q-page>
    <div class="row justify-center q-pa-md">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4">
        <q-form class="q-gutter-md text-center" @submit="onSubmit()">
          <h5>Új hirdetés elküldése</h5>
          <q-select
            v-model="s.many.document.kategoriaId"
            clearable
            dense
            emit-value
            :label="`Ingatlan kategóriája ${s.many.document.kategoriaId ? '' : ' - Kérem válasszon'}`"
            map-options
            option-label="megnevezes"
            option-value="id"
            :options="s.one.documents"
            outlined
            :rules="[(v) => v != null || 'Kérem válasszon!']"
          />
          <q-input
            v-model="s.many.document.hirdetesDatuma"
            label="Hírdetés dátuma"
            outlined
            readonly
            type="date"
          />
          <q-input
            v-model="s.many.document.leiras"
            dense
            label="Leírás"
            outlined
            :rules="[(v) => (v != null && v != '') || 'Kérem töltse ki a mezőt!']"
            type="textarea"
          />
          <div class="text-left">
            <q-checkbox v-model="s.many.document.tehermentes" label="Tehermentes ingatlan" />
          </div>

          <q-input
            v-model="s.many.document.kepUrl"
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
    <!-- {{ s.many.document }} -->
    <!-- {{ s.one.documents }} -->
  </q-page>
</template>

<style lang="scss" scoped></style>
