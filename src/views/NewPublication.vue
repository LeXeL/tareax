<template>
    <q-page>
        <loading-alert :display="displayLoading"></loading-alert>
        <tareax-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            :redirect="redirect"
            @accept="displayAlert=false"
        ></tareax-alert>

        <TitleBanner :subtitle="'Crear publicacion'" />
        <div class="row q-my-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-9">
                <div class="row">
                    <div class="col-lg-8 q-px-md">
                        <q-card class="full-width">
                            <q-card-section>
                                <div class="text-h5 q-mb-md">Llene el formulario</div>
                                <q-select
                                    filled
                                    :options="categoriesOptions"
                                    v-model="selectedCategory"
                                    label="Categoria"
                                    class="q-mb-md"
                                />
                                <q-select
                                    filled
                                    :options="subCategoriesOptions"
                                    v-model="selectedSubcategory"
                                    label="Sub-categoria"
                                    class="q-mb-md"
                                />
                                <q-select
                                    filled
                                    v-model="selectedService"
                                    :options="serviceOptions"
                                    label="Servicio"
                                    class="q-mb-md"
                                />
                                <q-input
                                    filled
                                    label="Precio por hora"
                                    class="q-mb-md"
                                    v-model="price"
                                    type="number"
                                />
                                <q-btn color="primary" @click="createPublication()" label="Enviar" />
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-4 q-px-md">
                        <!-- <q-card class="full-width">
              <q-card-section>
                <div
                  class="text-body2"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit interdum lectus, sodales congue sem vestibulum lacinia. Proin feugiat tortor ac lorem condimentum, in gravida eros euismod. Nunc non magna quis augue aliquam vulputate. Vivamus molestie, nisi vitae lacinia scelerisque, leo mi auctor nisl, ac condimentum arcu nisl at nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              </q-card-section>
                        </q-card>-->
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>
    </q-page>
</template>
<script>
import TitleBanner from '@/components/TitleBanner'

import * as api from '@/api/api'

export default {
    data() {
        return {
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            model: null,
            categoriesData: [],
            subcategoriesData: [],
            servicesData: [],
            categoriesOptions: [],
            subCategoriesOptions: [],
            serviceOptions: [],
            selectedCategory: '',
            selectedSubcategory: '',
            selectedService: '',
            price: '',
            redirect: '',
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        uid() {
            return this.$store.getters.uid
        },
    },
    methods: {
        clear() {
            this.selectedCategory = ''
            this.selectedSubcategory = ''
            this.selectedService = ''
            this.price = ''
        },
        createPublication() {
            this.displayLoading = true
            if (this.selectedCategory === '') {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage = 'Por favor tienes que escojer una categoria'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            if (this.selectedSubcategory === '') {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Por favor tienes que escojer una sub categoria'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            if (this.selectedService === '') {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage = 'Por favor tienes que escojer una servicio'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            if (this.price === '') {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Por favor tienes que llenar el campo de precio por hora'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }

            let selectedCategoryId = this.categoriesData
                .filter(category => {
                    if (category.name === this.selectedCategory) return category
                })
                .map(c => c.id)[0]
            let selectedSubCategoryId = this.subcategoriesData
                .filter(subcategory => {
                    if (subcategory.name === this.selectedSubcategory)
                        return subcategory
                })
                .map(c => c.id)[0]
            let selectedServiceId = this.servicesData
                .filter(service => {
                    if (service.name === this.selectedService) return service
                })
                .map(c => c.id)[0]

            api.CreatePublicationInDatabase({
                publication: {
                    category: selectedCategoryId,
                    subcategory: selectedSubCategoryId,
                    service: selectedServiceId,
                    price: parseInt(this.price),
                    userId: this.uid,
                    by: {
                        name: this.user.name,
                        lastName: this.user.lastName,
                        email: this.user.email,
                        contactPhone: this.user.contactPhone,
                        isVerified: this.user.isVerified,
                    },
                },
            })
                .then(() => {
                    this.clear()
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha creado la Publicacion con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.redirect = '/my-publications'
                })
                .catch(error => {
                    this.clear()
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
    async mounted() {
        this.displayLoading = true
        api.ReturnAllCategories()
            .then(response => {
                this.categoriesData = response.data.data
                api.ReturnAllSubCategories().then(response => {
                    this.subcategoriesData = response.data.data
                })
                api.ReturnAllServices().then(response => {
                    this.servicesData = response.data.data
                })
            })
            .then(() => {
                this.displayLoading = false
            })
    },
    watch: {
        categoriesData(newValue, oldValue) {
            this.categoriesOptions = newValue.map(category => {
                return category.name
            })
        },
        selectedCategory(newValue, oldValue) {
            if (newValue != '') {
                this.subCategoriesOptions = []
                this.selectedSubcategory = ''
                let selectedCategory
                this.categoriesData.filter(category => {
                    if (category.name === newValue) selectedCategory = category
                })
                this.subCategoriesOptions = this.subcategoriesData
                    .filter(subcategory => {
                        if (subcategory.category === selectedCategory.id) {
                            return subcategory
                        }
                    })
                    .map(subcategory => {
                        return subcategory.name
                    })
            }
        },
        selectedSubcategory(newValue, oldValue) {
            if (newValue != '') {
                this.serviceOptions = []
                this.selectedService = ''
                let selectedSubCategory
                this.subcategoriesData.filter(subcategory => {
                    if (subcategory.name === newValue)
                        selectedSubCategory = subcategory
                })
                this.serviceOptions = this.servicesData
                    .filter(service => {
                        if (service.subcategory === selectedSubCategory.id) {
                            return service
                        }
                    })
                    .map(service => {
                        return service.name
                    })
            }
        },
    },
    components: {
        TitleBanner,
    },
}
</script>