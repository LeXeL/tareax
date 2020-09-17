<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Tareax</q-toolbar-title>
        <q-btn class="on-left" flat round dense to="/new-publication">
          <i class="fas fa-newspaper"></i>
        </q-btn>
        <q-btn flat round dense>
          <i class="fas fa-user"></i>
          <q-menu>
            <q-list style="width: 200px;">
              <q-item clickable v-close-popup>
                <q-item-section @click="$router.push('/profile')">
                  <span>
                    <i class="fas fa-user on-left"></i>Perfil
                  </span>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section @click="$router.push('/my-publications')">
                  <span>
                    <i class="fas fa-list on-left"></i>Mis publicaciones
                  </span>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup>
                <q-item-section @click="$router.push('/admin')">
                  <span>
                    <i class="fas fa-user-shield on-left"></i>Admin
                  </span>
                </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup>
                <q-item-section>
                  <span>
                    <i class="fas fa-sign-out-alt on-left"></i>Cerrar sesion
                  </span>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style>
</style>
