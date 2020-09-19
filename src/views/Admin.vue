<template>
    <q-page>
        <TitleBanner :subtitle="'Administrador'" />
        <div class="row q-py-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-9 q-px-md">
                <q-card>
                    <q-tabs
                        v-model="tab"
                        dense
                        class="text-grey"
                        active-color="primary"
                        indicator-color="primary"
                        align="justify"
                        narrow-indicator
                    >
                        <q-tab name="categories" label="Categorias" />
                        <q-tab name="subcategories" label="Subcategorias" />
                        <q-tab name="services" label="Servicios" />
                        <q-tab name="users" label="Usuarios" />
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tab" animated>
                        <q-tab-panel name="categories">
                            <div class="row q-mb-md">
                                <q-space />
                                <q-btn
                                    color="primary"
                                    label="Crear categoria"
                                    @click="categoriesDialog = true"
                                />
                            </div>
                            <q-table
                                :data="categoriesData"
                                :columns="categoriesColumns"
                                row-key="name"
                            >
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
                                            v-for="col in props.cols"
                                            :key="col.name"
                                            :props="props"
                                        >{{ col.value }}</q-td>
                                        <q-td auto-width>
                                            <q-btn
                                                size="sm"
                                                color="red-7"
                                                round
                                                dense
                                                icon="fas fa-times"
                                            />
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </q-tab-panel>

                        <q-tab-panel name="subcategories">
                            <div class="row q-mb-md">
                                <q-space />
                                <q-btn
                                    color="primary"
                                    label="Crear subcategoria"
                                    @click="subcategoriesDialog = true"
                                />
                            </div>
                            <q-table
                                :data="subcategoriesData"
                                :columns="subcategoriesColumns"
                                row-key="name"
                            >
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
                                            v-for="col in props.cols"
                                            :key="col.name"
                                            :props="props"
                                        >{{ col.value }}</q-td>
                                        <q-td auto-width>
                                            <q-btn
                                                size="sm"
                                                color="red-7"
                                                round
                                                dense
                                                icon="fas fa-times"
                                            />
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </q-tab-panel>

                        <q-tab-panel name="services">
                            <div class="row q-mb-md">
                                <q-space />
                                <q-btn
                                    color="primary"
                                    label="Crear servicio"
                                    @click="servicesDialog = true"
                                />
                            </div>
                            <q-table :data="servicesData" :columns="servicesColumns" row-key="name">
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
                                            v-for="col in props.cols"
                                            :key="col.name"
                                            :props="props"
                                        >{{ col.value }}</q-td>
                                        <q-td auto-width>
                                            <q-btn
                                                size="sm"
                                                color="red-7"
                                                round
                                                dense
                                                icon="fas fa-times"
                                            />
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </q-tab-panel>
                        <q-tab-panel name="users">
                            <q-table :data="usersData" :columns="usersColumns" row-key="name">
                                <template v-slot:header="props">
                                    <q-tr :props="props">
                                        <q-th
                                            v-for="col in props.cols"
                                            :key="col.name"
                                            :props="props"
                                        >{{ col.label }}</q-th>
                                        <q-th>Activar / Desactivar</q-th>
                                    </q-tr>
                                </template>

                                <template v-slot:body="props">
                                    <q-tr :props="props">
                                        <q-td
                                            v-for="col in props.cols"
                                            :key="col.name"
                                            :props="props"
                                        >{{ col.value }}</q-td>
                                        <q-td auto-width>
                                            <q-btn
                                                size="sm"
                                                color="secondary"
                                                round
                                                dense
                                                icon="fas fa-check"
                                            />
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </q-tab-panel>
                    </q-tab-panels>
                </q-card>
            </div>
            <div class="col desktop-only"></div>

            <q-dialog v-model="categoriesDialog">
                <q-card style="min-width: 350px">
                    <q-card-section>
                        <div class="text-h6">Nueva categoria</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-input
                            filled
                            v-model="newCategory"
                            label="Nombre de categoria"
                            autofocus
                            @keyup.enter="prompt = false"
                        />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat label="Cancelar" v-close-popup />
                        <q-btn flat label="Crear" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>

            <q-dialog v-model="subcategoriesDialog">
                <q-card style="min-width: 350px">
                    <q-card-section>
                        <div class="text-h6">Nueva subcategoria</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-input
                            filled
                            v-model="newSubcategory"
                            label="Nombre de subcategoria"
                            autofocus
                            class="q-mb-md"
                            @keyup.enter="prompt = false"
                        />
                        <q-select
                            filled
                            v-model="selectedCategory"
                            :options="options"
                            label="Categoria"
                        />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat label="Cancelar" v-close-popup />
                        <q-btn flat label="Crear" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>

            <q-dialog v-model="servicesDialog">
                <q-card style="min-width: 350px">
                    <q-card-section>
                        <div class="text-h6">Nuevo servicio</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-input
                            filled
                            v-model="newService"
                            label="Nombre del servicio"
                            autofocus
                            class="q-mb-md"
                            @keyup.enter="prompt = false"
                        />
                        <q-select
                            filled
                            v-model="selectedCategory"
                            :options="options"
                            label="Categoria"
                            class="q-mb-md"
                        />
                        <q-select
                            filled
                            v-model="selectedSubcategory"
                            :options="options"
                            label="Subcategoria"
                        />
                    </q-card-section>

                    <q-card-actions align="right" class="text-primary">
                        <q-btn flat label="Cancelar" v-close-popup />
                        <q-btn flat label="Crear" v-close-popup />
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </q-page>
</template>

<script>
import TitleBanner from '@/components/TitleBanner'

export default {
    data() {
        return {
            categoriesDialog: false,
            newCategory: '',
            subcategoriesDialog: false,
            newSubcategory: '',
            servicesDialog: false,
            newService: '',
            options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
            selectedCategory: null,
            selectedSubcategory: null,
            tab: 'categories',
            categoriesColumns: [
                {
                    name: 'name',
                    align: 'left',
                    label: 'Nombre',
                    field: 'name',
                    sortable: true,
                },
            ],
            categoriesData: [
                {
                    name: 'Category name',
                },
            ],
            subcategoriesColumns: [
                {
                    name: 'name',
                    align: 'left',
                    label: 'Nombre',
                    field: 'name',
                    sortable: true,
                },
                {
                    name: 'category',
                    align: 'left',
                    label: 'Categoria',
                    field: 'category',
                    sortable: true,
                },
            ],
            subcategoriesData: [
                {
                    name: 'Subcategory name',
                    category: 'Category name',
                },
            ],
            servicesColumns: [
                {
                    name: 'name',
                    align: 'left',
                    label: 'Nombre',
                    field: 'name',
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
                    name: 'subcategory',
                    align: 'left',
                    label: 'Sub categoria',
                    field: 'subcategory',
                    sortable: true,
                },
            ],
            servicesData: [
                {
                    name: 'Subcategory name',
                    category: 'Category name',
                    subcategory: 'Sub category name',
                },
            ],
            usersColumns: [
                {
                    name: 'name',
                    align: 'left',
                    label: 'Nombre',
                    field: 'name',
                    sortable: true,
                },
                {
                    name: 'email',
                    align: 'left',
                    label: 'Correo',
                    field: 'email',
                    sortable: true,
                },
            ],
            usersData: [
                {
                    name: 'User Name',
                    email: 'test@test.com',
                },
            ],
        }
    },
    components: {
        TitleBanner,
    },
}
</script>