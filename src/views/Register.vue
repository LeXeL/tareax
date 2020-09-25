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
        <TitleBanner :subtitle="'Registrate aqui'" />
        <div class="row q-my-xl">
            <div class="col desktop-only"></div>
            <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                <div class="row">
                    <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12 q-px-md">
                        <q-card class="full-width">
                            <q-card-section>
                                <div class="text-h5">
                                    Formulario de registro
                                </div>
                            </q-card-section>
                            <q-separator />
                            <q-card-section>
                                <q-input
                                    filled
                                    label="Nombre"
                                    class="q-mb-md"
                                    v-model="form.name"
                                    :rules="[
                                        val =>
                                            val.length > 0 ||
                                            'El campo es obligatorio',
                                    ]"
                                />
                                <q-input
                                    filled
                                    label="Apellido"
                                    class="q-mb-md"
                                    v-model="form.lastName"
                                    :rules="[
                                        val =>
                                            val.length > 0 ||
                                            'El campo es obligatorio',
                                    ]"
                                />
                                <q-input
                                    filled
                                    label="Correo electronico"
                                    class="q-mb-md"
                                    v-model="form.email"
                                    :rules="[
                                        val =>
                                            val.length > 0 ||
                                            'El campo es obligatorio',
                                        val =>
                                            validEmail.test(val) ||
                                            'Formato de correo incorrecto',
                                    ]"
                                />
                                <q-input
                                    filled
                                    label="Telefono de contacto"
                                    class="q-mb-md"
                                    v-model="form.contactPhone"
                                    :rules="[
                                        val =>
                                            val.length > 0 ||
                                            'El campo es obligatorio',
                                    ]"
                                />
                                <q-input
                                    filled
                                    label="Contraseña"
                                    class="q-mb-md"
                                    type="password"
                                    v-model="form.password"
                                    :rules="[
                                        val =>
                                            val.length > 0 ||
                                            'El campo es obligatorio',
                                        val =>
                                            strongPass.test(val) ||
                                            'Debe tener 8 caracteres e incluir mayuscula, miniscula, numero, y caracter especial.',
                                    ]"
                                />
                                <q-input
                                    filled
                                    label="Repetir contraseña"
                                    class="q-mb-md"
                                    type="password"
                                    v-model="form.repassword"
                                    :rules="[
                                        val =>
                                            val.length > 0 ||
                                            'El campo es obligatorio',
                                        val =>
                                            val == form.password ||
                                            'Las contraseñas no coinciden',
                                    ]"
                                />
                                <q-checkbox v-model="terms">
                                    Acepto los terminos y condiciones.
                                </q-checkbox>
                                <a
                                    class="on-right"
                                    href="/terms-and-conditions"
                                    target="_blank"
                                    >Leer aqui.</a
                                >
                            </q-card-section>
                            <q-separator />
                            <q-card-actions>
                                <q-space />
                                <q-btn
                                    color="primary"
                                    label="Registrar"
                                    @click="createuser"
                                />
                            </q-card-actions>
                        </q-card>
                    </div>
                    <!-- <div class="col-lg-4 q-px-md">
                        <q-card class="full-width">
                            <q-card-section>
                                <div class="text-body2">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Nam hendrerit interdum
                                    lectus, sodales congue sem vestibulum
                                    lacinia. Proin feugiat tortor ac lorem
                                    condimentum, in gravida eros euismod. Nunc
                                    non magna quis augue aliquam vulputate.
                                    Vivamus molestie, nisi vitae lacinia
                                    scelerisque, leo mi auctor nisl, ac
                                    condimentum arcu nisl at nulla. Lorem ipsum
                                    dolor sit amet, consectetur adipiscing elit.
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>-->
                </div>
            </div>
            <div class="col desktop-only"></div>
            <q-dialog v-model="confirmationDialog">
                <q-card style="">
                    <q-card-section>
                        <div class="text-h6">
                            ¡Hemos recibido tu información!
                        </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        ¡Te has registrado satisfactoriamente, ya puedes empezar
                        a publicar tus servicios!
                        <br />
                        <br />
                    </q-card-section>

                    <q-card-actions align="right">
                        <router-link to="/" style="text-decoration: none">
                            <q-btn
                                flat
                                label="Aceptar"
                                color="primary"
                                v-close-popup
                            />
                        </router-link>
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </q-page>
</template>

<script>
import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/auth'

import TitleBanner from '@/components/TitleBanner'

export default {
    components: {
        TitleBanner,
    },
    data() {
        return {
            terms: false,

            displayLoading: false,
            confirmationDialog: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
            form: {
                name: '',
                lastName: '',
                email: '',
                contactPhone: '',
                password: '',
                repassword: '',
            },
            dismissSecs: 15,
            dismissCountDown: 0,
            strongPass: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
            validEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }
    },
    methods: {
        setMarkerPosition(event) {
            this.form.location = event
        },
        createuser() {
            if (!this.terms) {
                this.alertTitle = 'Error'
                this.alertMessage =
                    'Debes llenar todos los campos y aceptar los terminos y condiciones.'
                this.alertType = 'error'
                this.displayAlert = true
                return
            }
            this.dismissCountDown = 0
            this.displayLoading = true
            if (this.form.password === this.form.repassword) {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        this.form.email,
                        this.form.password
                    )
                    .then(async user => {
                        await this.$store.dispatch('setCurrentUser', user.user)
                        await api
                            .createuserondatabase({
                                user: user.user,
                            })
                            .then(() => {
                                this.displayLoading = false
                                this.confirmationDialog = true
                                api.updateUserWithInfo({
                                    uid: user.user.uid,
                                    obj: this.form,
                                })
                            })
                            .then(async () => {
                                await api
                                    .getUserInformationById({
                                        uid: user.user.uid,
                                    })
                                    .then(response => {
                                        this.$store.commit(
                                            'SET_USER',
                                            response.data.data
                                        )
                                    })
                            })
                    })
                    .catch(error => {
                        // Handle Errors here.
                        this.displayLoading = false
                        this.dismissCountDown = this.dismissSecs
                        this.errorCode = error.code
                        if (error.code === 'auth/email-already-in-use') {
                            this.errorMessage =
                                'Este correo ya esta en uso registrado'
                            return
                        }
                        this.errorMessage = error.message
                        // ...
                    })
            } else {
                this.dismissCountDown = this.dismissSecs
                this.errorMessage = 'Las Contraseñas no son iguales'
            }
        },
    },
}
</script>
