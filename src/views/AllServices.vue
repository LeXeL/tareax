<template>
    <q-page>
        <TitleBanner :subtitle="'Todos los servicios'" />
        <div class="row">
            <q-space />
            <div class="col-lg-7 col-md-9">
                <div
                    :class="`row ${i % 2 == 0 ? 'white' : 'bg-grey-1'}`"
                    v-for="(category, i) in categoriesData"
                    :key="i"
                >
                    <div class="col-lg-4 col-xs-12 q-pa-md flex flex-center">
                        <div class="text-h5 text-primary text-bold">{{ category.name }}</div>
                    </div>
                    <div class="col-lg-8 q-pa-md">
                        <div
                            class="row"
                            v-for="(subcategory, i) in returnAllSubCatgoriesOfThatCategory(
                                category.id
                            )"
                            :key="i"
                        >
                            <div class="col-lg-12 col-xs-12">
                                <div class="text-h6 q-pt-md text-orange-9 text-bold">
                                    {{ subcategory.name }}
                                </div>
                                <q-separator class="q-mb-md" />
                            </div>
                            <div
                                class="col-lg-4 col-xs-12 col-sm-6 col-md-4"
                                v-for="(service, i) in returnAllServiceOfThatCategoryandSubCategory(
                                    category.id,
                                    subcategory.id
                                )"
                                :key="i"
                            >
                                <div class="text-subtitle1">
                                    <router-link
                                        :to="`/search/${service.id}`"
                                        style="color: black"
                                        >{{ service.name }}</router-link
                                    >
                                </div>
                            </div>
                        </div>

                        <!-- <div
                            class="row"
                            v-for="(subcategory, i) in returnAllSubCatgoriesOfThatCategory(
                                category.id
                            )"
                            :key="i"
                        >
                            <div class="text-h6 q-py-md text-orange-9 text-bold">
                                {{ subcategory.name }}
                            </div>
                            <div class="row">
                                <div
                                    class="col-lg-4"
                                    v-for="(
                                        service, i
                                    ) in returnAllServiceOfThatCategoryandSubCategory(
                                        category.id,
                                        subcategory.id
                                    )"
                                    :key="i"
                                >
                                    <div class="text-subtitle1">{{ service.name }}</div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <q-separator />
                </div>
            </div>
            <q-space />
        </div>
    </q-page>
</template>

<script>
import TitleBanner from '@/components/TitleBanner'
import * as api from '@/api/api'

export default {
    components: {
        TitleBanner,
    },
    data() {
        return {
            categoriesData: [],
            subcategoriesData: [],
            servicesData: [],
        }
    },
    methods: {
        returnAllSubCatgoriesOfThatCategory(category) {
            return this.subcategoriesData.filter(sub => sub.category === category)
        },
        returnAllServiceOfThatCategoryandSubCategory(category, subcategory) {
            return this.servicesData.filter(
                serv => serv.category === category && serv.subcategory === subcategory
            )
        },
    },
    mounted() {
        api.ReturnAllCategories().then(response => {
            this.categoriesData = response.data.data
            api.ReturnAllSubCategories().then(response => {
                this.subcategoriesData = response.data.data
            })
            api.ReturnAllServices().then(response => {
                this.servicesData = response.data.data
            })
        })
    },
}
</script>
