<script setup lang='ts'>
import { Notify } from 'quasar';
import { useStore } from '../stores/store';
import { onMounted } from 'vue';
// import { useRouter } from 'vue-router';

const s = useStore();

// const router = useRouter();

onMounted(() => {
  s.OneGetShort();
  s.many.document.acceptedConditions = false;
//   router.push('/home');
});

function Submit() {
    if (s.many.document.acceptedConditions) {
        s.ManyCreate();
    } else {
        Notify.create({
            color: 'red',
            textColor: 'white',
            message: 'A feltétek elfogadása kötelező!',
            position: 'bottom',
            timeout: 1000,
        });
    }
}

</script>

<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 q-gutter-md">
        <q-form class="q-gutter-md" @submit="Submit()">
          <h4 class="text-center q-mt-lg q-mb-none">Regisztráció</h4>
          <q-select
            v-model="s.many.document.journeyId"
            clearable
            emit-value
            filled
            label="Utazás:"
            map-options
            option-label="destination"
            option-value="id"
            :options="s.one.documents"
            :rules="[(val) => val || 'Kérjük válasszon utazást!']"
          />
          <q-input
            v-model="s.many.document.name"
            filled
            label="Az ön neve:"
            :rules="[(val: string) => val?.length > 0 || 'Kérjük adja meg a nevét!']"
            type="text"
          />
          <q-input
            v-model="s.many.document.email"
            filled
            label="Az Ön e-mail címe:"
            :rules="[(val: string) => val?.length > 0 || 'Kérjük adja meg az e-mail címét!']"
            type="email"
          />
          <q-input
            v-model="s.many.document.numberOfParticipants"
            filled
            label="Résztvevők száma:"
            :rules="[(val: number) => val > 0 || 'Legalább egy résztvevőt meg kell adni!']"
            type="number"
          />
          <q-input
            v-model="s.many.document.lastCovidVaccineDate"
            clearable
            filled
            label="Utolsó COVID oltásának dátuma:"
            :rules="[(val) => val != undefined || 'Kérjük adja meg az utolsó COVID oltásának dátumát!']"
            type="date"
          />
          <div class="row q-mb-md">
            <q-checkbox v-model="s.many.document.acceptedConditions" filled label="Felhasználási feltételeket elfogadom" />
          </div>
          <div class="row justify-center">
            <q-btn class="q-mr-md" color="green" label="Küldés" no-caps type="submit" />
          </div>
          {{ s.many.document }}
          <!-- {{ s.one.documents }} -->
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<style lang='scss' scoped></style>
