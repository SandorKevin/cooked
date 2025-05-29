<script setup lang="ts">
import { IOther, useStore } from '../stores/store';
import { onMounted, ref } from 'vue';

const s = useStore();

const accept = ref(false);

onMounted(() => {
  s.ViewpointsGetAll();
  s.other.document = {} as IOther;
  s.other.document.rating = 5;
});

function Submit() {
  s.Create();
}
</script>

<template>
  <q-page>
    <div class="row justify-center">
      <q-card class="q-pa-md" style="width: 60vw; min-width: 300px">
        <q-form @submit="Submit()">
          <h5 class="text-center q-mt-sm q-mb-none">Kilátók értékelése</h5>
          <q-select
            v-model="s.other.document.viewpointId"
            class="q-ma-md"
            emit-value
            filled
            label="Kilátó"
            map-options
            option-label="viewpointName"
            option-value="id"
            :options="s.many.documents"
          />
          <q-input v-model="s.other.document.email" class="q-ma-md" filled label="Az Ön e-mail címe:" type="text" />
          <div class="q-mx-md">
            Értékelés:
            <q-slider v-model="s.other.document.rating" label-always marker-labels markers :max="10" :min="1" />
          </div>
          <q-input v-model="s.other.document.comment" class="q-ma-md" filled label="Megjegyzés:" type="textarea" />
          <q-checkbox v-model="accept" checked-icon="task_alt" label="Felhasználási feltételeket elfogadom" />
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Küldés" no-caps type="submit" />
          </div>
        </q-form>
      </q-card>
    </div>
    <!-- {{ s.other.document }} -->
  </q-page>
</template>

<style lang="scss" scoped></style>
