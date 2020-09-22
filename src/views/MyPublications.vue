<template>
    <q-page>
        <loading-alert :display="displayLoading"></loading-alert>
        <tareax-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            @accept="displayAlert=false"
        ></tareax-alert>
        <confirm-dialog
            :display="displayConfirm"
            :title="alertTitle"
            :message="alertMessage"
            @accept="deleteItem()"
            @cancel="displayConfirm = false"
        ></confirm-dialog>
        <TitleBanner :subtitle="'Mis publicaciones'" />
        <div class="row q-my-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-9 q-px-md">
                <q-table :data="data" :columns="columns" row-key="name">
                    <template v-slot:header="props">
                        <q-tr :props="props">
                            <q-th
                                v-for="col in props.cols"
                                :key="col.name"
                                :props="props"
                            >{{ col.label }}</q-th>
                            <q-th>Eliminar</q-th>
                        </q-tr>
                    </template>

                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <q-td
                                key="service"
                                :props="props"
                            >{{ returnServiceName(props.row.service) }}</q-td>
                            <q-td
                                key="subCategory"
                                :props="props"
                            >{{ returnSubCategoryName(props.row.subcategory) }}</q-td>
                            <q-td
                                key="category"
                                :props="props"
                            >{{ returnCategoryName(props.row.category) }}</q-td>
                            <q-td key="price" :props="props">{{ props.row.price }}</q-td>
                            <q-td auto-width>
                                <q-btn
                                    size="sm"
                                    color="red-7"
                                    round
                                    dense
                                    icon="fas fa-times"
                                    @click="askForDeleteService(props.row.id)"
                                />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
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
            columns: [
                {
                    name: 'service',
                    align: 'left',
                    label: 'Servicio',
                    field: 'service',
                    sortable: true,
                },
                {
                    name: 'subCategory',
                    align: 'left',
                    label: 'Subcategoria',
                    field: 'subCategory',
                    sortable: true,
                },
                {
                    name: 'category',
                    align: 'left',
                    label: 'Categoria',
                    field: 'category',
                    sortable: true,
                },
                {
                    name: 'price',
                    align: 'left',
                    label: 'Precio por hora',
                    field: 'price',
                    sortable: true,
                },
            ],
            data: [],
            categoriesData: [],
            subcategoriesData: [],
            servicesData: [],
            displayLoading: false,
            displayAlert: false,
            displayConfirm: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            workingDeletedId: '',
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
        askForDeleteService(id) {
            this.displayConfirm = true
            this.alertTitle = 'Esta seguro?'
            this.alertMessage = 'Se va a proceder a eliminar tu publicacion'
            this.workingDeletedId = id
        },
        deleteItem() {
            this.displayConfirm = false
            this.displayLoading = true
            api.DeletePublicationInDatabase({
                id: this.workingDeletedId,
            })
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha eliminado la publicacion con exito'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage = error
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
    mounted() {
        api.ReturnAllPublicationsByUserId({id: this.uid}).then(response => {
            this.data = response.data.data
        })
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
    components: {
        TitleBanner,
    },
}
</script>