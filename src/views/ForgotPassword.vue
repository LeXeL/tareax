<template>
    <q-page class="pattern-bg">
        <loading-alert :display="displayLoading"></loading-alert>
        <tareax-alert
            :display="displayAlert"
            :title="alertTitle"
            :message="alertMessage"
            :type="alertType"
            :redirect="redirect"
            @accept="displayAlert=false"
        ></tareax-alert>
        <div class="absolute-center">
            <!-- <q-img :src="require('@/assets/logo-horizontal.png')" class="q-mb-lg" /> -->
            <q-card class="rounded-borders bg-primary" style="width: 100%; width: 400px;">
                <q-form @submit="resetPassword">
                    <q-card-section>
                        <q-input
                            filled
                            v-model="email"
                            type="email"
                            label="Correo Electronico"
                            class="bg-white rounded-borders"
                            color="orange-10"
                            :rules="[
                                        val => val.length > 0 || 'El campo es obligatorio',
                                    ]"
                        ></q-input>
                    </q-card-section>
                    <q-card-actions class="q-px-md">
                        <q-btn
                            unelevated
                            color="orange-10"
                            size="lg"
                            class="full-width"
                            label="Enviar Correo"
                            type="submit"
                        />
                    </q-card-actions>
                </q-form>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
    data() {
        return {
            email: '',
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            redirect: '',
        }
    },
    methods: {
        resetPassword() {
            this.displayLoading = true
            firebase
                .auth()
                .sendPasswordResetEmail(this.email)
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Hemos enviado a tu correo un email para resetear la contraseña. Porfavor tambien verifica en tu carpeta de SPAM.'
                    this.alertType = 'success'
                    this.displayAlert = true
                    this.redirect = '/'
                })
                .catch(error => {
                    this.displayLoading = false
                    console.log(error)
                    this.alertTitle = 'Hey AWANTA!'
                    this.alertMessage =
                        'Hubo un error con tu peticion por favor intentalo mas tarde.'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
}
</script>

<style lang="scss" scoped>
</style>