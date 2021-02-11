<template>
    <q-page>
        <TitleBanner :subtitle="'Todos los servicios'" />
        <div class="row">
            <q-space />
            <div class="col-lg-7">
                <div class="row" v-for="(category, i) in 5" :key="i">
                    <div class="col-lg-4 q-pa-md flex flex-center">
                        <div class="text-h5 text-primary text-bold">
                            Tecnicos
                        </div>
                    </div>
                    <div class="col-lg-8 q-pa-md">
                        <div class="row">
                            <div
                                class="text-h6 q-py-md text-orange-9 text-bold"
                            >
                                Limpieza
                            </div>
                        </div>
                        <div class="row">
                            <div
                                class="col-lg-4"
                                v-for="(service, i) in 7"
                                :key="i"
                            >
                                <div class="text-subtitle1">Servicio</div>
                            </div>
                        </div>
                        <div class="row">
                            <div
                                class="text-h6 q-py-md text-orange-9 text-bold"
                            >
                                Seguridad privada
                            </div>
                        </div>
                        <div class="row">
                            <div
                                class="col-lg-4"
                                v-for="(service, i) in 15"
                                :key="i"
                            >
                                <div class="text-subtitle1">Servicio</div>
                            </div>
                        </div>
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

export default {
    components: {
        TitleBanner,
    },
}
</script>