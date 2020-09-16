<template>
  <q-page>
    <TitleBanner
      :title="'Hemos encontrado 1 resultado'"
      :subtitle="'Tutorias de quimica'"
      :ctaText="'¡Publica, es Gratis!'"
      :path="'/'"
    />
    <div class="row q-py-xl">
      <div class="col desktop-only"></div>
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-8 q-px-md">
            <div class="text-h6 q-mb-sm">Resultados</div>
            <PublicationsList />
          </div>
          <div class="col-lg-4 q-px-md">
            <div class="text-h6 q-mb-sm">Filtrar por provincia</div>
            <q-select
              class="q-mb-md"
              filled
              v-model="provinceSelect"
              :options="provinceOptions"
              label="Seleccione"
            />
            <div class="text-h6 q-mb-sm">Filtrar por distrito</div>
            <q-select
              class="q-mb-md"
              filled
              v-model="districtSelect"
              :options="districtOptions"
              label="Seleccione"
            />
            <div class="text-h6 q-mb-sm">Precio por hora</div>
            <q-option-group
              :options="priceOptions"
              label="Notifications"
              type="checkbox"
              v-model="priceFilter"
            />
          </div>
        </div>
      </div>
      <div class="col desktop-only"></div>
    </div>
  </q-page>
</template>

<script>
import TitleBanner from "@/components/TitleBanner";
import PublicationsList from "@/components/PublicationsList";

export default {
  data() {
    return {
      provinceSelect: null,
      provinceOptions: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      districtSelect: null,
      districtOptions: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      priceFilter: [],
      priceOptions: [
        { label: "$0 - $25", value: "$0 - $25" },
        { label: "$25 - $50", value: "$25 - $50" },
        { label: "$50 - $100", value: "$50 - $100" },
        { label: "$100 - $200", value: "$100 - $200" },
        { label: "$200 +", value: "$200 +" },
      ],
    };
  },
  components: {
    TitleBanner,
    PublicationsList,
  },
};
</script>