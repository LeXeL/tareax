<template>
    <q-page>
        <loading-alert :display="displayLoading"></loading-alert>
        <tareax-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            :redirect="redirect"
            @accept="displayAlert = false"
        ></tareax-alert>

        <TitleBanner :subtitle="'Editar publicacion'" />
        <div class="row q-my-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-9">
                <div class="row">
                    <div class="col-lg-8 q-px-md">
                        <q-card class="full-width">
                            <q-card-section>
                                <div class="text-h6">Detalles de servicio</div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <q-input
                                    type="text"
                                    filled
                                    class="q-mb-md"
                                    label="Titulo"
                                    v-model="title"
                                />
                                <q-select
                                    filled
                                    :options="categoriesOptions"
                                    v-model="selectedCategory"
                                    label="Categoria"
                                    class="q-mb-md"
                                    :disable="true"
                                />
                                <q-select
                                    filled
                                    :options="subCategoriesOptions"
                                    v-model="selectedSubcategory"
                                    label="Sub-categoria"
                                    class="q-mb-md"
                                    option-label="desc"
                                    option-disable="inactive"
                                    emit-value
                                    :disable="true"
                                    map-options
                                />
                                <q-select
                                    filled
                                    v-model="selectedService"
                                    :options="serviceOptions"
                                    label="Servicio"
                                    class="q-mb-sm"
                                    option-label="desc"
                                    option-disable="inactive"
                                    emit-value
                                    :disable="true"
                                    map-options
                                />
                                <div class="text-body q-mb-md">
                                    ¿No encuentras el servicio que deseas
                                    prestar? Haz click
                                    <span
                                        style="cursor: pointer"
                                        class="text-primary"
                                        @click="suggestionDialog = true"
                                        ><u>aqui</u></span
                                    >.
                                </div>
                                <q-input
                                    type="textarea"
                                    rows="5"
                                    filled
                                    class="q-mb-md"
                                    label="Descripcion del servicio"
                                    v-model="description"
                                />
                                <q-input
                                    filled
                                    label="Precio por hora"
                                    class="q-mb-md"
                                    v-model.number="price"
                                    type="number"
                                />
                            </q-card-section>
                            <q-card-section>
                                <div class="text-h6">Areas de servicio</div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <q-checkbox
                                    v-model="allCountry"
                                    color="primary"
                                    class="q-mb-md"
                                    :val="true"
                                    label="Todo Panama"
                                />
                                <q-list bordered class="rounded-borders">
                                    <div v-for="(area, i) in areas" :key="i">
                                        <q-expansion-item
                                            expand-separator
                                            :label="area.provinceName"
                                        >
                                            <q-card>
                                                <q-card-section>
                                                    <q-checkbox
                                                        v-model="selectedAreas"
                                                        color="primary"
                                                        v-for="district in area.districts"
                                                        :val="district"
                                                        :key="district"
                                                        :label="district"
                                                    />
                                                </q-card-section>
                                            </q-card>
                                        </q-expansion-item>
                                        <q-separator
                                            v-if="i + 1 < areas.length"
                                        />
                                    </div>
                                </q-list>
                            </q-card-section>
                            <q-separator />
                            <q-card-actions>
                                <q-space />
                                <q-btn
                                    color="primary"
                                    @click="createPublication()"
                                    label="Enviar"
                                    flat
                            /></q-card-actions>
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
            <q-dialog v-model="suggestionDialog" persistent>
                <q-card style="width: 700px; max-width: 80vw">
                    <q-card-section>
                        <div class="text-h6">Envianos tu sugerencia</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-input
                            filled
                            dense
                            autofocus
                            type="textarea"
                            placeholder="Cuentanos que servicios o categorias deberiamos agregar para que puedas publicar."
                            rows="4"
                            v-model="message"
                        />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn
                            flat
                            label="Cancelar"
                            v-close-popup
                            color="red-7"
                        />
                        <q-btn
                            flat
                            label="Enviar"
                            @click="sendServiceSuggestion()"
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

import * as api from '@/api/api'

import emailjs from 'emailjs-com'

export default {
    data() {
        return {
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            model: null,
            message: '',
            categoriesData: [],
            subcategoriesData: [],
            servicesData: [],
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
            selectedObject: {},
            selectedCategory: '',
            selectedSubcategory: '',
            selectedService: '',
            price: '',
            redirect: '',
            suggestionDialog: false,
            suggestionText: '',
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
            selectedAreas: [],
            selectedProvinces: [],
            allCountry: false,
            title: '',
            description: '',
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
        sendServiceSuggestion() {
            this.displayLoading = true
            emailjs
                .send(
                    'gmail',
                    'template_6yqtqie',
                    {
                        from_name: `${this.user.name} ${this.user.lastName}`,
                        from_email: this.user.email,
                        message: this.message,
                        reply_to: this.user.email,
                    },
                    'user_rBmmJedXnbLb4nmSvbDHo'
                )
                .then(
                    result => {
                        this.displayLoading = false
                        this.alertTitle = 'Exito!'
                        this.alertMessage =
                            'Tu sugerencia ha sido enviado con exito'
                        this.alertType = 'success'
                        this.displayAlert = true
                        this.message = ''
                    },
                    error => {
                        this.displayLoading = false
                        this.alertTitle = 'Error'
                        this.alertMessage =
                            'Hubo un error por favor intentarlo nuevamente.'
                        this.alertType = 'error'
                        this.displayAlert = true
                    }
                )
        },
        buildObject() {
            this.selectedAreas.forEach(selectedArea => {
                this.areas.forEach(areas => {
                    areas.districts.forEach(district => {
                        if (selectedArea === district) {
                            this.selectedProvinces.push(areas.provinceName)
                        }
                    })
                })
            })
            this.selectedProvinces = [...new Set(this.selectedProvinces)]
        },
        clear() {
            this.selectedCategory = ''
            this.selectedSubcategory = ''
            this.selectedService = ''
            this.price = ''
        },
        async createPublication() {
            this.displayLoading = true
            if (this.selectedCategory === '') {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage = 'Por favor tienes que escojer una categoria'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            if (this.title === '') {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Por favor tienes que poner un titulo a tu publicacion'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            if (this.description === '') {
                this.displayLoading = false
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Por favor tienes que poner una descripcion a tu publicacion'
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
                this.alertMessage = 'Por favor tienes que escojer un servicio'
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
            await this.buildObject()
            api.UpdatePublicationInfo({
                id: this.$route.params.id,
                publication: {
                    title: this.title,
                    description: this.description,
                    price: parseFloat(this.price),
                    allCountry: this.allCountry,
                    selectedAreas: this.selectedAreas,
                    selectedProvinces: this.selectedProvinces,
                },
            })
                .then(() => {
                    this.clear()
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage = 'Se ha editado la Publicacion con exito'
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
        let id = this.$route.params.id
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
                api.ReturnPublicationById({id: id}).then(response => {
                    let data = response.data.data
                    this.title = data.title
                    this.description = data.description
                    this.selectedCategory = this.categoriesData
                        .filter(category => {
                            if (category.id === data.category) return category
                        })
                        .map(c => c.name)[0]
                    this.selectedSubcategory = this.subcategoriesData
                        .filter(subcategory => {
                            if (subcategory.id === data.subcategory)
                                return subcategory
                        })
                        .map(c => c.name)[0]
                    this.selectedService = this.servicesData
                        .filter(service => {
                            if (service.name === data.service) return service
                        })
                        .map(c => c.name)[0]
                    this.price = data.price
                    this.allCountry = data.allCountry
                    this.selectedAreas = data.selectedAreas
                })
            })
            .then(() => {
                this.displayLoading = false
            })
    },
    watch: {
        allCountry(newValue, oldValue) {
            if (newValue === true) {
                this.selectedAreas = []
            }
        },
        selectedAreas(newValue, oldValue) {
            if (newValue.length > 0) {
                this.allCountry = false
            }
        },
    },
    components: {
        TitleBanner,
    },
}
</script>
