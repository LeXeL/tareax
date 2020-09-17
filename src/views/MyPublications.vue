<template>
  <q-page>
    <TitleBanner :subtitle="'Mis publicaciones'" />
    <div class="row q-my-xl">
      <div class="col desktop-only"></div>
      <div class="col-lg-9 q-px-md">
        <q-table :data="data" :columns="columns" row-key="name">
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
      columns: [
        {
          name: "service",
          align: "left",
          label: "Servicio",
          field: "service",
          sortable: true,
        },
        {
          name: "subCategory",
          align: "left",
          label: "Subcategoria",
          field: "subCategory",
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
          name: "price",
          align: "left",
          label: "Precio por hora",
          field: "price",
          sortable: true,
        },
      ],
      data: [
        {
          service: "Service name",
          subCategory: "Sub Category name",
          category: "Category name",
          price: 24,
        },
      ],
    };
  },
  components: {
    TitleBanner,
  },
};
</script>