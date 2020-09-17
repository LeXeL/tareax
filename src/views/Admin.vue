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
              <q-table :data="categoriesData" :columns="categoriesColumns" row-key="name">
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
                    <q-th>Eliminar</q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
                    <q-td auto-width>
                      <q-btn size="sm" color="red-7" round dense icon="fas fa-times" />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="subcategories">
              <q-table :data="subcategoriesData" :columns="subcategoriesColumns" row-key="name">
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
                    <q-th>Eliminar</q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
                    <q-td auto-width>
                      <q-btn size="sm" color="red-7" round dense icon="fas fa-times" />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="services">
              <q-table :data="servicesData" :columns="servicesColumns" row-key="name">
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
                    <q-th>Eliminar</q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
                    <q-td auto-width>
                      <q-btn size="sm" color="red-7" round dense icon="fas fa-times" />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-tab-panel>
            <q-tab-panel name="users">
              <q-table :data="usersData" :columns="usersColumns" row-key="name">
                <template v-slot:header="props">
                  <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props">{{ col.label }}</q-th>
                    <q-th>Activar / Desactivar</q-th>
                  </q-tr>
                </template>

                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
                    <q-td auto-width>
                      <q-btn size="sm" color="secondary" round dense icon="fas fa-check" />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <div class="col desktop-only"></div>
    </div>
  </q-page>
</template>

<script>
import TitleBanner from "@/components/TitleBanner";

export default {
  data() {
    return {
      tab: "categories",
      categoriesColumns: [
        {
          name: "name",
          align: "left",
          label: "Nombre",
          field: "name",
          sortable: true,
        },
      ],
      categoriesData: [
        {
          name: "Category name",
        },
      ],
      subcategoriesColumns: [
        {
          name: "name",
          align: "left",
          label: "Nombre",
          field: "name",
          sortable: true,
        },
        {
          name: "category",
          align: "left",
          label: "Categoria",
          field: "category",
          sortable: true,
        },
      ],
      subcategoriesData: [
        {
          name: "Subcategory name",
          category: "Category name",
        },
      ],
      servicesColumns: [
        {
          name: "name",
          align: "left",
          label: "Nombre",
          field: "name",
          sortable: true,
        },
        {
          name: "category",
          align: "left",
          label: "Categoria",
          field: "category",
          sortable: true,
        },
        {
          name: "subcategory",
          align: "left",
          label: "Sub categoria",
          field: "subcategory",
          sortable: true,
        },
      ],
      servicesData: [
        {
          name: "Subcategory name",
          category: "Category name",
          subcategory: "Sub category name",
        },
      ],
      usersColumns: [
        {
          name: "name",
          align: "left",
          label: "Nombre",
          field: "name",
          sortable: true,
        },
        {
          name: "email",
          align: "left",
          label: "Correo",
          field: "email",
          sortable: true,
        },
      ],
      usersData: [
        {
          name: "User Name",
          email: "test@test.com",
        },
      ],
    };
  },
  components: {
    TitleBanner,
  },
};
</script>