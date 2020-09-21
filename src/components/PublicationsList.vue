<template>
    <q-list bordered separator>
        <q-item clickable v-ripple v-for="(pub, i) of data" :key="i" to="/user-publications">
            <q-item-section>
                <q-item-label>
                    <div class="text-subtitle2 text-black">
                        {{`${pub.by.name} ${pub.by.lastName}`}}
                        <i
                            class="fas fa-star text-primary"
                            v-if="pub.by.isVerified"
                        ></i>
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
                        <i class="fas fa-dollar-sign"></i>
                        {{pub.price.toFixed(2)}}
                    </div>
                </q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            default: () => [],
        },
    },
}
</script>