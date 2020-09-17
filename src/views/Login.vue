<template>
  <q-page>
    <div class="absolute-center">
      <q-card style="width: 100%; width: 400px;" class="rounded-borders">
        <q-card-section>
          <q-img :src="require('@/assets/TareaxFin2.png')" class="q-mb-md" />
          <q-input filled label="Correo electronico" class="full-width q-mb-md" type="text" />
          <q-input filled label="Contraseña" class="full-width q-mb-md" type="password" />
          <q-btn color="primary" label="Iniciar sesion" class="q-mb-md full-width" />
          <div class="text-body2">
            Aun no tienes cuenta? Registrate
            <router-link to="/register">aqui</router-link>.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>