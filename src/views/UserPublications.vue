<template>
  <q-page>
    <TitleBanner :subtitle="'Tutorias de quimica'" />
    <div class="row q-py-xl">
      <div class="col desktop-only"></div>
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-8 q-px-md">
            <div class="text-h4 q-mb-sm">Pedro Picapiedra</div>
            <q-separator class="q-my-xs" />
            <div class="text-h6 q-mb-lg">Otros servicios</div>
            <PublicationsList />
          </div>
          <div class="col-lg-4 q-px-md">
            <div class="bg-primary text-white q-pa-lg rounded-borders">
              <div class="text-h5">
                <strong>Tutorias de quimica</strong>
              </div>
              <div class="text-h6">Tareas escolares</div>
              <div class="text-h6 q-mb-md">Academicos</div>
              <div class="text-subtitle2">
                <i class="fas fa-user"></i> Pedro Picapiedras
              </div>
              <div class="text-subtitle2">
                <i class="fas fa-map-pin"></i> Ubicacion
              </div>
              <div class="text-subtitle2">
                <i class="fas fa-dollar-sign"></i> 5.50
              </div>
              <q-btn color="white full-width q-mt-lg" push @click="contactDialog = true">
                <span class="text-primary">Contactar</span>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="col desktop-only"></div>
    </div>
    <q-dialog v-model="contactDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Informacion de contacto</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle2">
            <strong>Nombre:</strong> Pedro Picapiedra
          </div>
          <div class="text-subtitle2">
            <strong>Celular:</strong>
            <a href="https://wa.me/50765656565">6565-6565</a>
          </div>
          <div class="text-subtitle2">
            <strong>Correo:</strong>
            <a href="mailto:pedro.picapiedra@gmail.com">pedro.picapiedra@gmail.com</a>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="ACEPTAR" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import TitleBanner from "@/components/TitleBanner";
import PublicationsList from "@/components/PublicationsList";

export default {
  data() {
    return {
      contactDialog: false,
    };
  },
  components: {
    TitleBanner,
    PublicationsList,
  },
};
</script>