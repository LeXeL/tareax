<template>
    <q-list bordered separator>
        <q-item
            clickable
            v-ripple
            v-for="(pub, i) of data"
            :key="i"
            :to="`/user-publications/${uid}`"
        >
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
                    <i class="fas fa-briefcase"></i>
                    {{returnServiceName(pub.service)}}
                </q-item-label>
                <q-item-label caption>
                    <i class="fas fa-map-pin"></i>
                    Ubicacion
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
        servicesData: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        uid() {
            return this.$store.getters.uid
        },
    },
    methods: {
        returnServiceName(id) {
            let value = this.servicesData.filter(service => {
                if (service.id === id) return service
            })
            if (value.length > 0) return value[0].name
            return 'NaN'
        },
    },
}
</script>