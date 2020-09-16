<template>
  <q-page>
    <TitleBanner :subtitle="'Registrate aqui'" />
    <div class="row q-my-xl">
      <div class="col desktop-only"></div>
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-8 q-px-md">
            <q-card class="full-width">
              <q-card-section>
                <div class="text-h5 q-mb-md">Formulario de registro</div>
                <q-input filled label="Nombre" class="q-mb-md" />
                <q-input filled label="Apellido" class="q-mb-md" />
                <q-input filled label="Correo electronico" class="q-mb-md" />
                <q-input filled label="Telefono de contacto" class="q-mb-md" />
                <q-input filled label="Contraseña" class="q-mb-md" />
                <q-input filled label="Repetir contraseña" class="q-mb-md" />
                <q-btn color="primary" label="Registrar" />
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-4 q-px-md">
            <q-card class="full-width">
              <q-card-section>
                <div
                  class="text-body2"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit interdum lectus, sodales congue sem vestibulum lacinia. Proin feugiat tortor ac lorem condimentum, in gravida eros euismod. Nunc non magna quis augue aliquam vulputate. Vivamus molestie, nisi vitae lacinia scelerisque, leo mi auctor nisl, ac condimentum arcu nisl at nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              </q-card-section>
            </q-card>
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
  components: {
    TitleBanner,
  },
};
</script>