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
        <TitleBanner :subtitle="'Mi perfil'" />
        <div class="row q-my-xl" v-if="user">
            <div class="col desktop-only"></div>
            <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                <div class="row">
                    <div class="col-lg-7 col-md-8 col-sm-7 col-xs-12 q-px-md">
                        <q-card class="full-width q-mb-lg">
                            <q-card-section>
                                <div class="text-h5 q-mb-md">Mis datos</div>
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <q-input
                                            filled
                                            label="Nombre"
                                            v-model="user.name"
                                            class="q-mb-md q-px-md"
                                            type="text"
                                            :disable="!editGeneralInfo"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <q-input
                                            filled
                                            label="Apellido"
                                            v-model="user.lastName"
                                            class="q-mb-md q-px-md"
                                            type="text"
                                            :disable="!editGeneralInfo"
                                        />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <q-input
                                            filled
                                            label="Correo"
                                            v-model="user.email"
                                            class="q-mb-md q-px-md"
                                            type="text"
                                            :disable="true"
                                        />
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <q-input
                                            filled
                                            label="Telefono"
                                            v-model="user.contactPhone"
                                            class="q-mb-md q-px-md"
                                            type="text"
                                            :disable="!editGeneralInfo"
                                        />
                                    </div>
                                </div>
                                <q-btn
                                    color="primary"
                                    @click="handleData('GeneralInfo')"
                                >{{ editGeneralInfo ? 'Guardar' : 'Editar' }}</q-btn>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="col-lg-5 col-md-4 col-sm-5 col-xs-12 q-px-md">
                        <q-card class="full-width">
                            <q-card-section>
                                <div class="text-h5 q-mb-md">Seguridad</div>
                                <q-btn
                                    color="primary"
                                    label="Solicitar cambio de contraseña"
                                    @click="resetPassword()"
                                />
                            </q-card-section>
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
        </div>
    </q-page>
</template>
<script>
import TitleBanner from '@/components/TitleBanner'

import * as api from '@/api/api'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
    computed: {
        uid() {
            return this.$store.getters.uid
        },
        user() {
            let userInfo = this.$store.getters.user
            this.userData = userInfo
            return userInfo
        },
    },
    data() {
        return {
            userData: {},
            editGeneralInfo: false,
            displayLoading: false,
            displayAlert: false,
            alertTitle: '',
            alertMessage: '',
            alertType: '',
        }
    },
    methods: {
        resetPassword() {
            firebase
                .auth()
                .sendPasswordResetEmail(this.user.email)
                .then(() => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Hemos enviado a tu correo un email para resetear la contraseña'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.alertTitle = 'Hey AWANTA!'
                    this.alertMessage =
                        'Hubo un error con tu peticion por favor intentalo mas tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
        handleData(section) {
            if (section === 'GeneralInfo') {
                //Si editGeneralInfo es falso ponlo true y ya.
                if (!this.editGeneralInfo) {
                    this.editGeneralInfo = true
                    return
                }
                this.editGeneralInfo = false
                this.updateUserInformation(section)
                return
            }
        },
        updateUserInformation(section) {
            this.displayLoading = true
            let obj = {}
            obj.time = Date.now()
            obj.action = 'edited'
            obj.section = section
            this.userData.logs.push(obj)
            if (this.userData.status === 'rejected') {
                this.userData.status = 'pending'
            }
            api.UpdateUserInformationById({uid: this.uid, user: this.userData})
                .then(response => {
                    this.displayLoading = false
                    this.alertTitle = 'Exito!'
                    this.alertMessage =
                        'Se ha actualizado con exito la informacion'
                    this.alertType = 'success'
                    this.displayAlert = true
                })
                .catch(error => {
                    console.log(error)
                    this.displayLoading = false
                    this.alertTitle = 'Error'
                    this.alertMessage =
                        'Hubo un error con la solicitud por favor inténtelo más tarde'
                    this.alertType = 'error'
                    this.displayAlert = true
                })
        },
    },
    created() {
        api.getUserInformationById({uid: this.uid}).then(response => {
            this.$store.commit('SET_USER', response.data.data)
        })
    },
    components: {
        TitleBanner,
    },
}
</script>