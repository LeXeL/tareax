<template>
  <q-list bordered separator>
    <q-item clickable v-ripple v-for="(pub, i) of 10" :key="i" to="/user-publications">
      <q-item-section>
        <q-item-label>
          <div class="text-subtitle2 text-black">
            Pedro Picapiedra
            <i class="fas fa-star text-primary"></i>
          </div>
        </q-item-label>
        <q-item-label caption>
          <i class="fas fa-briefcase"></i> Servicio
        </q-item-label>
        <q-item-label caption>
          <i class="fas fa-map-pin"></i> Ubicacion
        </q-item-label>
      </q-item-section>
      <q-item-section side center>
        <q-item-label caption>
          <div class="text-subtitle2">
            <i class="fas fa-dollar-sign"></i> 5.50
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>