<template>
    <q-page>
        <loading-alert :display="displayLoading"></loading-alert>
        <tareax-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></tareax-alert>
        <div>
            <TitleBanner
                :title="`Hemos encontrado ${
                    publicationData.filter(service => {
                        if (service.id === $route.params.id) return service
                    }).length
                } resultado`"
                :subtitle="
                    servicesData.filter(service => {
                        if (service.id === $route.params.id) return service
                    })[0].name
                "
                :ctaText="'¡Publica, es Gratis!'"
                :path="'/'"
            />
            <div class="row q-py-xl">
                <div class="col desktop-only"></div>
                <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                        <div
                            class="col-lg-4 col-md-4 col-sm-5 col-xs-12 q-px-md q-mb-md"
                        >
                            <div class="text-h6 q-mb-sm">
                                Filtrar por provincia
                            </div>
                            <q-select
                                class="q-mb-md"
                                filled
                                v-model="provinceSelect"
                                :options="provinceOptions"
                                label="Seleccione"
                            />
                            <div class="text-h6 q-mb-sm">
                                Filtrar por distrito
                            </div>
                            <q-select
                                class="q-mb-md"
                                filled
                                v-model="districtSelect"
                                :options="districtOptions"
                                label="Seleccione"
                            />
                            <div class="text-h6 q-mb-sm">Precio por hora</div>
                            <q-range
                                v-model="rangeSnap"
                                :min="0"
                                :max="100"
                                :step="5"
                                drag-range
                                label
                                markers
                                snap
                                color="primary"
                            />
                        </div>
                        <div
                            class="col-lg-8 col-md-8 col-sm-7 col-xs-12 q-px-md"
                        >
                            <div class="text-h6 q-mb-sm">Resultados</div>
                            <PublicationsList
                                v-if="publicationData.length > 0"
                                :data="filteredPublicacionData"
                                :servicesData="servicesData"
                            />
                            <div class="text-body" v-else>
                                Lo sentimos, no encontramos resultados para este
                                servicio.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col desktop-only"></div>
            </div>
        </div>
    </q-page>
</template>

<script>
import TitleBanner from '@/components/TitleBanner'
import PublicationsList from '@/components/PublicationsList'

import * as api from '@/api/api'

export default {
    data() {
        return {
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            provinceSelect: null,
            provinceOptions: [
                'Google',
                'Facebook',
                'Twitter',
                'Apple',
                'Oracle',
            ],
            districtSelect: null,
            districtOptions: [
                'Google',
                'Facebook',
                'Twitter',
                'Apple',
                'Oracle',
            ],
            publicationData: [],
            filteredPublicacionData: [],
            servicesData: [],
            priceFilter: [],

            rangeSnap: {
                min: 1,
                max: 60,
            },
        }
    },
    async mounted() {
        this.displayLoading = true
        api.ReturnAllPublicationsByService({id: this.$route.params.id})
            .then(response => {
                this.publicationData = response.data.data
                this.filteredPublicacionData = this.publicationData
                api.ReturnAllServices().then(response => {
                    this.servicesData = response.data.data
                })
            })
            .then(() => {
                this.displayLoading = false
            })
    },
    watch: {
        rangeSnap(newValue, oldValue) {
            if (newValue === '') {
                this.filteredPublicacionData = this.publicationData
            } else {
                this.filteredPublicacionData = this.publicationData.filter(
                    publication => {
                        if (
                            publication.price >= newValue.min &&
                            publication.price < newValue.max
                        ) {
                            return publication
                        }
                    }
                )
            }
        },
    },
    components: {
        TitleBanner,
        PublicationsList,
    },
}
</script>