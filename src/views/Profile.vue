<template>
  <q-page>
    <TitleBanner :subtitle="'Mi perfil'" />
    <div class="row q-my-xl">
      <div class="col desktop-only"></div>
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-7 q-px-md">
            <q-card class="full-width q-mb-lg">
              <q-card-section>
                <div class="text-h5 q-mb-md">Mis datos</div>
                <div class="row">
                  <div class="col-lg-6">
                    <q-input filled label="Nombre" class="q-mb-md q-pr-md" type="text" />
                  </div>
                  <div class="col-lg-6">
                    <q-input filled label="Apellido" class="q-mb-md q-pl-md" type="text" />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <q-input filled label="Correo electronico" class="q-mb-md q-pr-md" type="text" />
                  </div>
                  <div class="col-lg-6">
                    <q-input filled label="Telefono" class="q-mb-md q-pl-md" type="text" />
                  </div>
                </div>
                <q-btn color="primary" label="Editar" />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-5 q-px-md">
            <q-card class="full-width">
              <q-card-section>
                <div class="text-h5 q-mb-md">Seguridad</div>
                <q-btn color="primary" label="Solicitar cambio de contraseña" />
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