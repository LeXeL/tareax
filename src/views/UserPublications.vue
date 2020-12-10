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
                Object.keys(publicationsData).length !== 0 &&
                Object.keys(userData).length !== 0
            "
        >
            <TitleBanner
                :title="returnServiceName(workingPublication.service)"
                :subtitle="`${userData.name} ${userData.lastName}`"
            />
            <div class="row q-py-xl">
                <div class="col desktop-only"></div>
                <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                    <div class="row">
                        <div
                            class="col-lg-4 col-md-4 col-sm-5 col-xs-12 q-px-md q-mb-lg"
                        >
                            <div
                                class="bg-primary text-white q-pa-lg rounded-borders"
                            >
                                <div class="text-h5 q-mb-md">
                                    {{ workingPublication.title }}
                                </div>
                                <div class="text-h5">
                                    <strong>{{
                                        returnServiceName(
                                            workingPublication.service
                                        )
                                    }}</strong>
                                </div>
                                <div class="text-h6">
                                    {{
                                        returnSubCategoryName(
                                            workingPublication.subcategory
                                        )
                                    }}
                                </div>
                                <div class="text-h6 q-mb-md">
                                    {{
                                        returnCategoryName(
                                            workingPublication.category
                                        )
                                    }}
                                </div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-user"></i>
                                    {{
                                        `${userData.name} ${userData.lastName}`
                                    }}
                                </div>
                                <div class="text-subtitle2">
                                    <span v-if="workingPublication.allCountry">
                                        <i class="fas fa-map-pin"></i> En todo
                                        el país</span
                                    >
                                    <template
                                        v-if="
                                            workingPublication.selectedProvinces
                                                .length > 0
                                        "
                                        ><i class="fas fa-map-pin"></i>
                                        <span
                                            v-for="(
                                                areas, i
                                            ) in workingPublication.selectedAreas"
                                            :key="areas"
                                        >
                                            {{ areas
                                            }}{{
                                                i + 1 !==
                                                workingPublication.selectedAreas
                                                    .length
                                                    ? ','
                                                    : ''
                                            }}</span
                                        >
                                    </template>
                                </div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-dollar-sign"></i>
                                    {{
                                        `${workingPublication.price.toFixed(2)}`
                                    }}
                                </div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-money-bill-alt"></i>
                                    <span
                                        v-for="(
                                            paymentMethod, index
                                        ) in workingPublication.selectedPaymentMethod"
                                        :key="index"
                                    >
                                        {{
                                            `${
                                                paymentMethod
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                paymentMethod.slice(1)
                                            }${
                                                index + 1 ===
                                                workingPublication
                                                    .selectedPaymentMethod
                                                    .length
                                                    ? ''
                                                    : ','
                                            }`
                                        }}
                                    </span>
                                </div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-mobile-alt"></i>
                                    <span
                                        v-for="(
                                            reservation, index
                                        ) in workingPublication.selectedReservation"
                                        :key="index"
                                    >
                                        {{
                                            `${
                                                reservation
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                reservation.slice(1)
                                            }${
                                                index + 1 ===
                                                workingPublication
                                                    .selectedReservation.length
                                                    ? ''
                                                    : ','
                                            }`
                                        }}
                                    </span>
                                </div>
                                <q-btn
                                    color="white full-width q-mt-lg"
                                    push
                                    @click="contactDialog = true"
                                >
                                    <span class="text-primary">Contactar</span>
                                </q-btn>
                            </div>
                        </div>
                        <div
                            class="col-lg-8 col-md-8 col-sm-7 col-xs-12 q-px-md q-mb-md"
                        >
                            <div class="text-h4 q-mb-sm">
                                {{ `${userData.name} ${userData.lastName}` }}
                            </div>
                            <q-separator class="q-my-xs" />
                            <div class="text-h5 q-my-sm">
                                {{ workingPublication.title }}
                            </div>
                            <div class="text-body2 q-mb-lg">
                                {{ workingPublication.description }}
                            </div>
                            <div class="text-h6 q-mb-lg">Otros servicios</div>
                            <PublicationsList
                                :data="publicationsData"
                                :servicesData="servicesData"
                                :usersData="[userData]"
                                @clickFromUserPublication="
                                    changeWorkingPublication
                                "
                            />
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
                            <strong>Nombre:</strong>
                            {{ `${userData.name} ${userData.lastName}` }}
                        </div>
                        <div class="text-subtitle2">
                            <strong>Celular:</strong>
                            <a
                                :href="`https://wa.me/507${userData.contactPhone}`"
                                >{{ `${userData.contactPhone}` }}</a
                            >
                        </div>
                        <div class="text-subtitle2">
                            <strong>Correo:</strong>
                            <a :href="`mailto:${userData.email}`">{{
                                `${userData.email}`
                            }}</a>
                        </div>
                    </q-card-section>
                    <q-card-actions align="right">
                        <q-btn
                            flat
                            label="ACEPTAR"
                            color="primary"
                            v-close-popup
                        />
                    </q-card-actions>
                </q-card>
            </q-dialog>
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
            contactDialog: false,
            userData: [],
            publicationsData: [],
            servicesData: [],
            categoriesData: [],
            subcategoriesData: [],
            workingPublication: {},
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        changeWorkingPublication(event) {
            this.workingPublication = event
        },
        asignWorkingPublication() {
            this.workingPublication = this.publicationsData.filter(pub => {
                if (pub.id === this.$route.params.pub) {
                    return pub
                }
            })[0]
        },
        returnCategoryName(id) {
            let value = this.categoriesData.filter(category => {
                if (category.id === id) return category
            })
            if (value.length > 0) return value[0].name
            return 'NaN'
        },
        returnSubCategoryName(id) {
            let value = this.subcategoriesData.filter(subcategory => {
                if (subcategory.id === id) return subcategory
            })
            if (value.length > 0) return value[0].name
            return 'NaN'
        },
        returnServiceName(id) {
            let value = this.servicesData.filter(service => {
                if (service.id === id) return service
            })
            if (value.length > 0) return value[0].name
            return 'NaN'
        },
    },
    mounted() {
        let id = this.$route.params.id
        this.displayLoading = true
        api.ReturnAllPublicationsByUserId({id: id}).then(response => {
            this.publicationsData = response.data.data
            this.asignWorkingPublication()
        })
        api.getUserInformationById({uid: id}).then(response => {
            this.userData = response.data.data
            this.userData.id = id
        })
        api.ReturnAllCategories().then(response => {
            this.categoriesData = response.data.data
        })
        api.ReturnAllSubCategories().then(response => {
            this.subcategoriesData = response.data.data
        })
        api.ReturnAllServices()
            .then(response => {
                this.servicesData = response.data.data
            })
            .then(() => {
                this.displayLoading = false
            })
    },
    components: {
        TitleBanner,
        PublicationsList,
    },
}
</script>
