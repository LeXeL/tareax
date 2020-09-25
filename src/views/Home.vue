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
                    <div class="text-h4">Paga sólamente lo necesario.</div>
                    <div class="text-subtitle1">
                        Tareas específicas. Precios claros.
                    </div>
                </div>
            </q-carousel-slide>
            <q-carousel-slide
                name="second"
                :img-src="require('@/assets/hero-bg-2.jpg')"
            >
                <div class="absolute-bottom custom-caption">
                    <div class="text-h4">
                        Encuentra la ayuda necesaria con rapidez.
                    </div>
                    <div class="text-subtitle1">
                        Busca servicios especificos en las categorias que
                        necesitas.
                    </div>
                </div>
            </q-carousel-slide>
            <q-carousel-slide
                name="third"
                :img-src="require('@/assets/hero-bg-3.jpg')"
            >
                <div class="absolute-bottom custom-caption">
                    <div class="text-h2">Elige un anunciante.</div>
                    <div class="text-subtitle1">Contáctalo directamente.</div>
                </div>
            </q-carousel-slide>
        </q-carousel>
        <!-- END CAROUSEL -->

        <!-- START SEARCH -->
        <div class="bg-grey-2 q-py-xl">
            <div class="row q-mb-md">
                <div class="col desktop-only"></div>
                <div class="col-lg-9 col-xs-12">
                    <div class="text-h5 q-px-md">Busque un servicio:</div>
                </div>
                <div class="col desktop-only"></div>
            </div>
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <q-select
                        class="q-px-md q-mb-md"
                        filled
                        v-model="selectedCategory"
                        :options="categoriesOptions"
                        label="Categoria"
                    />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <q-select
                        class="q-px-md q-mb-md"
                        filled
                        v-model="selectedSubcategory"
                        :options="subCategoriesOptions"
                        label="Sub-Categoria"
                    />
                </div>
                <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                    <q-select
                        class="q-px-md q-mb-md"
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
            <div class="col-lg-9 col-xs-12">
                <div class="row q-px-md q-mb-md">
                    <div class="text-h5">Servicios populares</div>
                </div>
                <div class="row text-center q-mb-md">
                    <div
                        class="col-lg-3 col-md-3 col-sm-3 col-xs-6 q-px-md q-mb-md"
                        v-for="(cat, i) in returnPopularServices()"
                        :key="i"
                    >
                        <div
                            class="q-py-lg rounded-borders popular-services"
                            @click="$router.push(`/search/${cat.name}`)"
                        >
                            <div class="text-subtitle2">
                                {{ returnServiceName(cat.name) }}
                            </div>
                            <div class="text-h6 text-primary">
                                {{ cat.count }}
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="row text-center">
                    <div class="col q-px-md">
                        <q-btn color="primary" label="Ver todas" />
                    </div>
                </div>-->
            </div>
            <div class="col desktop-only"></div>
        </div>
        <!-- END POPULAR SERVICES -->

        <!-- RECENT PUBLICATIONS -->
        <div class="row q-py-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-9 col-xs-12">
                <div class="row q-mb-md">
                    <div
                        class="col-lg-4 col-md-5 col-sm-6 col-xs-12 q-px-md q-mb-lg"
                    >
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
                    <div
                        class="col-lg-8 col-md-7 col-sm-6 col-xs-12 q-px-md q-mb-md"
                    >
                        <div class="row q-mb-md">
                            <div class="text-h5">Publicaciones recientes</div>
                        </div>
                        <PublicationsList
                            :data="filteredPublicationData"
                            :servicesData="servicesData"
                            :usersData="usersData"
                        />
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
import moment from 'moment'

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
            usersData: [],
            publicationsData: [],
            filteredPublicationData: [],
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
        createFilteredPublications() {
            this.filteredPublicationData = this.publicationsData
                .sort((a, b) => {
                    return moment(b.creationTime).diff(a.creationTime)
                })
                .filter((pub, i) => {
                    if (i < 10) {
                        return pub
                    }
                })
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
        returnServiceName(id) {
            let value = this.servicesData.filter(service => {
                if (service.id === id) return service
            })
            if (value.length > 0) return value[0].name
            return 'NaN'
        },
        returnPopularServices() {
            let services = {}
            let FinalArray = []
            this.publicationsData.forEach(publication => {
                if (Object.keys(services).includes(publication.service)) {
                    services[`${publication.service}`] += 1
                } else {
                    services[`${publication.service}`] = 1
                }
            })
            for (const key in services) {
                FinalArray.push({name: key, count: services[key]})
            }
            return FinalArray.sort((a, b) => {
                return b.count - a.count
            }).filter((a, i) => {
                if (i < 8) {
                    return a
                }
            })
        },
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
                api.ReturnAllPublications().then(response => {
                    this.publicationsData = response.data.data
                    this.createFilteredPublications()
                })
                api.ReturnAllUsers().then(response => {
                    this.usersData = response.data.data
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
.popular-services {
    background-color: rgb(245, 245, 245);
    cursor: pointer;
    transition: background-color 0.5s;
}

.popular-services:hover {
    background-color: #28acb8;
    color: white !important;
    transition: background-color 0.5s;
}

.popular-services:hover .text-h6 {
    color: white !important;
}
</style>
