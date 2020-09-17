<template>
  <q-page>
    <TitleBanner :subtitle="'Crear publicacion'" />
    <div class="row q-my-xl">
      <div class="col desktop-only"></div>
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-8 q-px-md">
            <q-card class="full-width">
              <q-card-section>
                <div class="text-h5 q-mb-md">Llene el formulario</div>
                <q-select filled :options="options" label="Categoria" class="q-mb-md" />
                <q-select filled :options="options" label="Sub-categoria" class="q-mb-md" />
                <q-select filled :options="options" label="Servicio" class="q-mb-md" />
                <q-input filled label="Precio por hora" class="q-mb-md" type="number" />
                <q-btn color="primary" label="Enviar" />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-4 q-px-md">
            <!-- <q-card class="full-width">
              <q-card-section>
                <div
                  class="text-body2"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit interdum lectus, sodales congue sem vestibulum lacinia. Proin feugiat tortor ac lorem condimentum, in gravida eros euismod. Nunc non magna quis augue aliquam vulputate. Vivamus molestie, nisi vitae lacinia scelerisque, leo mi auctor nisl, ac condimentum arcu nisl at nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              </q-card-section>
            </q-card>-->
          </div>
        </div>
      </div>
      <div class="col desktop-only"></div>
    </div>
  </q-page>
</template>
<script>
import TitleBanner from "@/components/TitleBanner";

export default {
  data() {
    return {
      model: null,
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
    };
  },
  components: {
    TitleBanner,
  },
};
</script>