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
        <div
            v-if="
                Object.keys(servicesData).length !== 0 &&
                Object.keys(publicationData).length !== 0
            "
        >
            <TitleBanner
                :title="`Hemos encontrado ${publicationData.length} resultado`"
                :subtitle="
                    servicesData.filter(service => {
                        if (service.id === $route.params.id) return service
                    })[0].name
                "
                :ctaText="'¡Publica, es Gratis!'"
                :path="isAuthenticated ? '/new-publication' : '/login'"
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
                                :data="filteredPublicacionData"
                                :servicesData="servicesData"
                                :usersData="usersData"
                            />
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
            areas: [
                {
                    provinceName: 'Cocle',
                    districts: [
                        'Aguadulce',
                        'Anton',
                        'La Pintada',
                        'Nata',
                        'Ola',
                        'Penonome',
                    ],
                },
                {
                    provinceName: 'Darien',
                    districts: ['Chepigana', 'Pinogana', 'Sana Fe'],
                },
                {
                    provinceName: 'Herrera',
                    districts: [
                        'Chitre',
                        'Las Minas',
                        'Los Pozos',
                        'Ocu',
                        'Parita',
                        'Pese',
                        'Santa Maria',
                    ],
                },
                {
                    provinceName: 'Panama',
                    districts: [
                        'Balboa',
                        'Chepo',
                        'Chiman',
                        'Panama',
                        'San Miguelito',
                        'Taboga',
                    ],
                },
                {
                    provinceName: 'Panama Oeste',
                    districts: [
                        'Arraijan',
                        'Capira',
                        'Chame',
                        'La Chorrera',
                        'San Carlos',
                    ],
                },
                {
                    provinceName: 'Bocas del Toro',
                    districts: [
                        'Almirante',
                        'Bocas del Toro',
                        'Changuinola',
                        'Chiriqui Grande',
                    ],
                },
                {
                    provinceName: 'Chiriqui',
                    districts: [
                        'Alanje',
                        'Baru',
                        'Boqueron',
                        'Boquete',
                        'Bugaba',
                        'David',
                        'Dolega',
                        'Gualaca',
                        'Remedios',
                        'Renacimiento',
                        'San Felix',
                        'San Lorenzo',
                        'Tierras Altas',
                        'Tole',
                    ],
                },
                {
                    provinceName: 'Colon',
                    districts: [
                        'Colon',
                        'Chagres',
                        'Donoso',
                        'Portobelo',
                        'Santa Isabel',
                        'Omar Torrijos Herrera',
                    ],
                },
                {
                    provinceName: 'Los Santos',
                    districts: [
                        'Guarare',
                        'Las Tablas',
                        'Los Santos',
                        'Macaracas',
                        'Pedasi',
                        'Pocri',
                        'Tonosi',
                    ],
                },
                {
                    provinceName: 'Veraguas',
                    districts: [
                        'Atalaya',
                        'Calobre',
                        'Cañazas',
                        'La Mesa',
                        'Las Palmas',
                        'Mariato',
                        'Montijo',
                        'Rio de Jesus',
                        'San Francisco',
                        'Santa Fe',
                        'Santiago',
                        'Sona',
                    ],
                },
            ],

            provinceOptions: [],
            districtSelect: null,
            districtOptions: [],
            publicationData: [],
            usersData: [],
            filteredPublicacionData: [],
            servicesData: [],
            priceFilter: [],

            rangeSnap: {
                min: 1,
                max: 60,
            },
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
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
                api.ReturnAllUsers().then(response => {
                    this.usersData = response.data.data
                })
            })
            .then(() => {
                this.displayLoading = false
            })
        this.areas.forEach(area => {
            this.provinceOptions.push(area.provinceName)
        })
    },
    watch: {
        provinceSelect(newValue, oldValue) {
            if (newValue != '') {
                this.districtOptions = []
                this.districtSelect = ''
                let selectedProvince
                this.areas.filter(area => {
                    if (area.provinceName === newValue)
                        selectedProvince = area.districts
                })
                this.districtOptions = selectedProvince
                this.filteredPublicacionData = this.publicationData.filter(
                    publication => {
                        if (
                            publication.selectedProvinces.includes(newValue) ||
                            publication.allCountry === true
                        ) {
                            return publication
                        }
                    }
                )
            }
        },
        districtSelect(newValue, oldValue) {
            if (newValue != '') {
                this.filteredPublicacionData = this.publicationData.filter(
                    publication => {
                        if (
                            publication.selectedAreas.includes(newValue) ||
                            publication.allCountry === true
                        ) {
                            return publication
                        }
                    }
                )
            }
        },
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