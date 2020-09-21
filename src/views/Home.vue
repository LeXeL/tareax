<template>
    <q-page>
        <!-- START CAROUSEL -->
        <loading-alert :display="displayLoading"></loading-alert>
        <tareax-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert = false"
        ></tareax-alert>
        <q-carousel
            arrows
            animated
            swipeable
            infinite
            v-model="heroSlide"
            height="500px"
            :autoplay="autoplay"
            @mouseenter="autoplay = false"
            @mouseleave="autoplay = true"
        >
            <q-carousel-slide
                name="first"
                :img-src="require('@/assets/hero-bg-1.jpg')"
            >
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2">First stop</div>
                    <div class="text-subtitle1">Mountains</div>
                </div>
            </q-carousel-slide>
            <q-carousel-slide
                name="second"
                :img-src="require('@/assets/hero-bg-2.jpg')"
            >
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2">Second stop</div>
                    <div class="text-subtitle1">Famous City</div>
                </div>
            </q-carousel-slide>
            <q-carousel-slide
                name="third"
                :img-src="require('@/assets/hero-bg-3.jpg')"
            >
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2">Third stop</div>
                    <div class="text-subtitle1">Famous Bridge</div>
                </div>
            </q-carousel-slide>
        </q-carousel>
        <!-- END CAROUSEL -->

        <!-- START SEARCH -->
        <div class="bg-grey-2 q-py-xl">
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-9 col-xs-12">
                    <div class="text-h5 q-px-md">Busque un servicio:</div>
                </div>
                <div class="col desktop-only"></div>
            </div>
            <div class="row q-py-md">
                <div class="col desktop-only"></div>
                <div class="col-lg-3 col-xs-12">
                    <q-select
                        class="q-px-md"
                        filled
                        v-model="selectedCategory"
                        :options="categoriesOptions"
                        label="Categoria"
                    />
                </div>
                <div class="col-lg-3 col-xs-12">
                    <q-select
                        class="q-px-md"
                        filled
                        v-model="selectedSubcategory"
                        :options="subCategoriesOptions"
                        label="Sub-Categoria"
                    />
                </div>
                <div class="col-lg-3 col-xs-12">
                    <q-select
                        class="q-px-md"
                        filled
                        v-model="selectedService"
                        :options="serviceOptions"
                        label="Servicio"
                    />
                </div>
                <div class="col desktop-only"></div>
            </div>
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-9 q-px-md">
                    <q-btn color="primary" label="Buscar" @click="search()" />
                </div>
                <div class="col desktop-only"></div>
            </div>
        </div>
        <!-- END SEARCH -->

        <!-- START POPULAR SERVICES -->
        <div class="row q-py-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-9">
                <div class="row q-px-md q-mb-md">
                    <div class="text-h5">Servicios populares</div>
                </div>
                <div class="row text-center q-mb-md">
                    <div
                        class="col-lg-3 q-px-md q-mb-md"
                        v-for="(cat, i) in 8"
                        :key="i"
                    >
                        <div class="q-py-lg bg-grey-2 rounded-borders">
                            <div class="text-subtitle2">Category name</div>
                            <div class="text-h6 text-primary">{{ i + 1 }}</div>
                        </div>
                    </div>
                </div>
                <div class="row text-center">
                    <div class="col q-px-md">
                        <q-btn color="primary" label="Ver todas" />
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>
        <!-- END POPULAR SERVICES -->

        <!-- RECENT PUBLICATIONS -->
        <div class="row q-py-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-9">
                <div class="row q-mb-md">
                    <div class="col-lg-8 q-px-md">
                        <div class="row q-mb-md">
                            <div class="text-h5">Publicaciones recientes</div>
                        </div>
                        <PublicationsList />
                    </div>
                    <div class="col-lg-4 q-px-md">
                        <div class="row q-mb-md">
                            <div class="text-h5">Destacados</div>
                        </div>
                        <q-carousel
                            v-model="featuredCarousel"
                            swipeable
                            animated
                            infinite
                            control-color="white"
                            navigation
                            height="350px"
                            class="bg-primary text-white shadow-1 rounded-borders"
                            :autoplay="autoplay"
                            @mouseenter="autoplay = false"
                            @mouseleave="autoplay = true"
                        >
                            <q-carousel-slide name="first">
                                <div class="text-h5">
                                    <strong>Tutorias de quimica</strong>
                                </div>
                                <div class="text-h6">Tareas escolares</div>
                                <div class="text-h6 q-mb-md">Academicos</div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-user"></i> Pedro
                                    Picapiedras
                                </div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-map-pin"></i> Ubicacion
                                </div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-dollar-sign"></i> 5.50
                                </div>
                                <q-btn color="white full-width q-mt-lg" push>
                                    <span class="text-primary">Contactar</span>
                                </q-btn>
                            </q-carousel-slide>
                            <q-carousel-slide name="second">
                                <div class="text-h5">
                                    <strong
                                        >Revision de ortografia y estilo</strong
                                    >
                                </div>
                                <div class="text-h6">Tesis</div>
                                <div class="text-h6 q-mb-md">Academicos</div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-user"></i> Pablo Marmol
                                </div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-map-pin"></i> Ubicacion
                                </div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-dollar-sign"></i> 7.50
                                </div>
                                <q-btn color="white full-width q-mt-lg" push>
                                    <span class="text-primary">Contactar</span>
                                </q-btn>
                            </q-carousel-slide>
                        </q-carousel>
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>
        <!-- END RECENT PUBLICATIONS -->
    </q-page>
</template>

<script>
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
            autoplay: true,
            heroSlide: 'first',
            categoriesData: [],
            subcategoriesData: [],
            servicesData: [],
            categoriesOptions: [],
            subCategoriesOptions: [],
            serviceOptions: [],
            selectedCategory: '',
            selectedSubcategory: '',
            selectedService: '',
            featuredCarousel: 'first',
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
        search() {
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
            let selectedServiceId = this.servicesData
                .filter(service => {
                    if (service.name === this.selectedService) return service
                })
                .map(c => c.id)[0]

            this.$router.push(`/search/${selectedServiceId}`)
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
        PublicationsList,
    },
}
</script>

<style scoped>
.custom-caption {
    text-align: center;
    padding: 12px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
}
</style>
