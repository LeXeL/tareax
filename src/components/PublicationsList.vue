<template>
    <q-list bordered separator v-if="Object.keys(usersData).length !== 0">
        <q-item
            clickable
            v-ripple
            v-for="(pub, i) of data"
            :key="i"
            :to="`/user-publications/${pub.userId.id}/${pub.id}`"
            @click="handleClickEvent(pub)"
        >
            <q-item-section>
                <q-item-label>
                    <div class="text-subtitle2 text-black">
                        {{ `${pub.userId.name} ${pub.userId.lastName}` }}
                        <i
                            class="fas fa-star text-primary"
                            v-if="pub.userId.isVerified"
                        ></i>
                    </div>
                </q-item-label>
                <q-item-label caption>
                    <i class="fas fa-newspaper"></i>
                    {{ pub.title }}
                </q-item-label>
                <q-item-label caption>
                    <i class="fas fa-briefcase"></i>
                    {{ returnServiceName(pub.service) }}
                </q-item-label>
                <q-item-label caption>
                    <span v-if="pub.allCountry"
                        ><i class="fas fa-map-pin"></i> En todo el país</span
                    >
                    <template v-if="pub.selectedProvinces.length > 0">
                        <i class="fas fa-map-pin"></i>
                        <span
                            v-for="(areas, i) in pub.selectedAreas"
                            :key="areas"
                        >
                            {{ areas
                            }}{{
                                i + 1 !== pub.selectedAreas.length ? ',' : ''
                            }}</span
                        >
                    </template>
                </q-item-label>
            </q-item-section>
            <q-item-section side center>
                <q-item-label caption>
                    <div class="text-subtitle2">
                        <i class="fas fa-dollar-sign"></i>
                        {{ pub.price.toFixed(2) }}
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
        usersData: {
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
        handleClickEvent(event) {
            if (this.$route.fullPath.includes('/user-publications'))
                this.$emit('clickFromUserPublication', event)
        },

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
