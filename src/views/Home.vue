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
        <!-- START CAROUSEL -->
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
                :img-src="require('@/assets/hero-bg-1.webp')"
            >
                <div class="absolute-bottom custom-caption">
                    <div class="text-h4">Sin Papeleo</div>
                    <div class="text-subtitle1">
                        Encuentra lo que buscas fácilmente
                    </div>
                </div>
            </q-carousel-slide>
            <q-carousel-slide
                name="second"
                :img-src="require('@/assets/hero-bg-2.webp')"
            >
                <div class="absolute-bottom custom-caption">
                    <div class="text-h4">
                        Rápido
                    </div>
                    <div class="text-h6">
                        Comunícate directamente con el anunciante
                    </div>
                </div>
            </q-carousel-slide>
            <q-carousel-slide
                name="third"
                :img-src="require('@/assets/hero-bg-3.webp')"
            >
                <div class="absolute-bottom custom-caption">
                    <div class="text-h4">Sin comisión</div>
                    <div class="text-h6">
                        Para anunciantes ni para compradores
                    </div>
                </div>
            </q-carousel-slide>
            <q-carousel-slide
                name="fourth"
                :img-src="require('@/assets/hero-bg-4.webp')"
            >
                <div class="absolute-bottom custom-caption">
                    <div class="text-h4">Fácil</div>
                    <div class="text-h6">
                        Encuentra precios claros por tareas específicas
                    </div>
                </div>
            </q-carousel-slide>
        </q-carousel>
        <!-- END CAROUSEL -->

        <!-- START 4 STEPS -->
        <div class="row">
            <div class="col desktop-only"></div>
            <div class="col-lg-8 col-xs-12 text-center">
                <div class="row">
                    <div class="col-lg-3 col-md-3 col-sm-3 col-xs-6 q-pa-md">
                        <q-card class="bg-primary text-white">
                            <q-card-section>
                                <q-avatar
                                    class="step-number q-mb-sm text-bold"
                                    text-color="white"
                                    >1</q-avatar
                                >
                                <div class="text-subtitle text-bold">
                                    Registrate<br />Es GRATIS
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3  col-xs-6 q-pa-md">
                        <q-card class="bg-primary text-white">
                            <q-card-section>
                                <q-avatar
                                    class="step-number q-mb-sm text-bold"
                                    text-color="white"
                                    >2</q-avatar
                                >
                                <div class="text-subtitle text-bold">
                                    Preparate<br />Atento a reservas
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3  col-xs-6 q-pa-md">
                        <q-card class="bg-primary text-white">
                            <q-card-section>
                                <q-avatar
                                    class="step-number q-mb-sm text-bold"
                                    text-color="white"
                                    >3</q-avatar
                                >
                                <div class="text-subtitle text-bold">
                                    Trabaja<br />Sin intermediarios
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-3  col-xs-6 q-pa-md">
                        <q-card class="bg-primary text-white">
                            <q-card-section>
                                <q-avatar
                                    class="step-number q-mb-sm text-bold"
                                    text-color="white"
                                    >4</q-avatar
                                >
                                <div class="text-subtitle text-bold">
                                    Cobra y entrega<br />Recibo / factura
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
            </div>
            <div class="col desktop-only"></div>
        </div>
        <!-- END 4 STEPS -->

        <!-- START SEARCH -->
        <div class="bg-grey-2 q-py-xl">
            <div class="row q-mb-md">
                <div class="col desktop-only"></div>
                <div class="col-lg-8 col-xs-12">
                    <div class="text-h5 q-px-md">Busque un servicio:</div>
                </div>
                <div class="col desktop-only"></div>
            </div>
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-8 col-xs-12">
                    <div class="row">
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <q-select
                                class="q-px-md q-mb-md"
                                filled
                                v-model="selectedCategory"
                                :options="categoriesOptions"
                                label="Categoria"
                            />
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <q-select
                                class="q-px-md q-mb-md"
                                filled
                                v-model="selectedSubcategory"
                                :options="subCategoriesOptions"
                                label="Sub-Categoria"
                                option-label="desc"
                                option-disable="inactive"
                                emit-value
                                map-options
                            />
                        </div>
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <q-select
                                class="q-px-md q-mb-md"
                                filled
                                v-model="selectedService"
                                :options="serviceOptions"
                                label="Servicio"
                                option-label="desc"
                                option-disable="inactive"
                                emit-value
                                map-options
                            />
                        </div>
                    </div>
                </div>

                <div class="col desktop-only"></div>
            </div>
            <div class="row">
                <div class="col desktop-only"></div>
                <div class="col-lg-8 q-px-md">
                    <q-btn color="primary" label="Buscar" @click="search()" />
                </div>
                <div class="col desktop-only"></div>
            </div>
        </div>
        <!-- END SEARCH -->

        <!-- START POPULAR SERVICES -->
        <div class="row q-py-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-8 col-xs-12">
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
            <div class="col-lg-8 col-xs-12">
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
                            height="410px"
                            class="bg-primary text-white shadow-1 rounded-borders"
                            :autoplay="autoplay"
                            @mouseenter="autoplay = false"
                            @mouseleave="autoplay = true"
                        >
                            <q-carousel-slide
                                :name="pub.slide"
                                v-for="pub in featuredPublications"
                                :key="pub.slide"
                            >
                                <div class="text-h5 q-mb-md">
                                    {{ pub.title }}
                                </div>
                                <div class="text-h5">
                                    <strong>{{ pub.category }}</strong>
                                </div>
                                <div class="text-h6">{{ pub.subCategory }}</div>
                                <div class="text-h6 q-mb-md">
                                    {{ pub.service }}
                                </div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-user"></i> {{ pub.owner }}
                                </div>
                                <div class="text-subtitle2">
                                    <i
                                        class="fas fa-map-pin"
                                        style="margin-right: 5px;"
                                    ></i>
                                    <span
                                        v-for="(loc, i) in pub.locations"
                                        :key="i"
                                        >{{ loc }},
                                    </span>
                                </div>
                                <div class="text-subtitle2">
                                    <i class="fas fa-dollar-sign"></i>
                                    {{ pub.rate.toFixed(2) }}
                                </div>
                                <div class="text-subtitle2">
                                    <i
                                        class="fas fa-money-bill-alt"
                                        style="margin-right: 5px;"
                                    ></i>
                                    <span
                                        v-for="(payment,
                                        i) in pub.paymentMethods"
                                        :key="i"
                                        >{{ payment }}, &nbsp;</span
                                    >
                                </div>
                                <div
                                    class="text-subtitle2"
                                    v-if="pub.apps.length > 0"
                                >
                                    <i class="fas fa-mobile-alt"></i>
                                    {{ pub.apps }}
                                </div>
                                <q-btn
                                    color="white full-width q-mt-lg"
                                    @click="
                                        $router.push(
                                            `/user-publications/${pub.link}`
                                        )
                                    "
                                    push
                                >
                                    <span class="text-primary">VER MAS</span>
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
            subCategoriesOptions: [
                {
                    desc: 'Elija una categoria',
                    inactive: true,
                },
            ],
            serviceOptions: [
                {
                    desc: 'Elija una subcategoria',
                    inactive: true,
                },
            ],
            selectedCategory: '',
            selectedSubcategory: '',
            selectedService: '',
            featuredCarousel: '1',
            featuredPublications: [
                {
                    slide: '1',
                    title: 'Fabricación y Reparación de Grúas de Plataforma',
                    category: 'Soldadura',
                    subCategory: 'Construccion liviana',
                    service: 'Tecnicos',
                    owner: 'Gustavo Serrano',
                    locations: [
                        'Balboa',
                        'Chepo',
                        'Chiman',
                        'Panama',
                        'San Miguelito',
                    ],
                    rate: 0,
                    paymentMethods: ['Efectivo'],
                    apps: [],
                    link: 'lOG0gmx4WLYEa3tb7yPIme5vVU53/W5lKkmebIwai4BLtDBTp',
                },
                {
                    slide: '2',
                    title: 'Diseño y Construcción',
                    category: 'Arquitecto independiente',
                    subCategory: 'Construccion liviana',
                    service: 'Tecnicos',
                    owner: 'Fredy Cely',
                    locations: ['En todo el país'],
                    rate: 50,
                    paymentMethods: [
                        'Tarjeta de credito / debito',
                        'Yappy',
                        'Efectivo',
                    ],
                    apps: [],
                    link: 'dI61bLWrF6TVG8PGrXgJHPRdYqA3/NSei9RcTdPPXSt4hhY3m',
                },
                {
                    slide: '3',
                    title: 'Abogado con amplia experiencia',
                    category: 'Abogados',
                    subCategory: 'Legales',
                    service: 'Profesionales',
                    owner: 'Humberto Aparicio',
                    locations: ['En todo el país'],
                    rate: 50,
                    paymentMethods: ['Yappy', 'Cash'],
                    apps: [],
                    link: '0AAuECFZriUmRqcqfTiaxotcF6t2/cjqMr1XEXxMaqYLz4B58',
                },
            ],
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
            this.filteredPublicationData.sort((a, b) => {
                return a.userId.isVerified === b.userId.isVerified
                    ? 0
                    : a
                    ? -1
                    : 1
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
                api.ReturnAllUsers().then(response => {
                    this.usersData = response.data.data
                })
                api.ReturnAllPublications().then(response => {
                    this.publicationsData = response.data.data
                    this.createFilteredPublications()
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

.step-number {
    background-color: #ed7a3a;
}
</style>
