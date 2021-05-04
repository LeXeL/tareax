<template>
    <q-layout view="lHh Lpr lFf" id="app">
        <q-header elevated>
            <q-toolbar>
                <!-- <q-toolbar-title @click="$router.push('/')">Tareax</q-toolbar-title> -->
                <q-toolbar-title>
                    <img
                        src="@/assets/TareaxFin2.png"
                        style="padding-top: 5px; cursor: pointer"
                        class="tareax-logo"
                        @click="$router.push('/')"
                    />
                </q-toolbar-title>
                <a
                    href="https://www.instagram.com/wwwtareaxcom/"
                    target="_blank"
                    style="color: #fff; text-decoration: none"
                >
                    <q-btn flat icon="fab fa-instagram" round />
                </a>
                <a
                    href="https://www.facebook.com/tareax.panama"
                    target="_blank"
                    style="color: #fff; text-decoration: none"
                >
                    <q-btn round flat icon="fab fa-facebook" />
                </a>
                <a href="mailto:admin@tareax.com" style="color: #fff; text-decoration: none">
                    <q-btn rounded flat icon="far fa-envelope">
                        <span class="desktop-only q-pl-sm">admin@tareax.com</span>
                    </q-btn>
                </a>
                <q-btn
                    color="orange-9"
                    class="on-right on-left text-bold"
                    push
                    rounded
                    :to="'/login'"
                    v-if="!user"
                    >Ofrece tus servicios</q-btn
                >
                <q-btn
                    class="on-left on-right text-bold"
                    push
                    to="/new-publication"
                    v-if="user"
                    label="Anuncia aqui"
                    color="orange-9"
                >
                </q-btn>
                <q-btn flat round dense v-if="user">
                    <i class="fas fa-user"></i>
                    <q-menu>
                        <q-list style="width: 200px">
                            <q-item clickable v-close-popup>
                                <q-item-section @click="$router.push('/profile')">
                                    <span> <i class="fas fa-user on-left"></i>Perfil </span>
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup>
                                <q-item-section @click="$router.push('/my-publications')">
                                    <span>
                                        <i class="fas fa-list on-left"></i>Mis publicaciones
                                    </span>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup v-if="role === 'admin'">
                                <q-item-section @click="$router.push('/admin')">
                                    <span> <i class="fas fa-user-shield on-left"></i>Admin </span>
                                </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-close-popup>
                                <q-item-section @click="logout()">
                                    <span>
                                        <i class="fas fa-sign-out-alt on-left"></i>Cerrar sesion
                                    </span>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container style="padding-top: 29px">
            <router-view />
        </q-page-container>
        <div class="row bg-primary">
            <q-space />
            <div class="col-lg-9">
                <div class="row q-pt-md">
                    <div class="col-lg-4 col-md-4 col-sm-6 q-pa-lg">
                        <img src="@/assets/TareaxFin2.png" style="width: 35%" class="q-mb-md" />
                        <div class="text-body2 text-white q-mb-md">
                            Busca los servicios que necesites y contacta directamente con el
                            proveedor o registrate y ofrece tus servicios, sin comiciones y sin
                            intermediarios.
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-3 q-pa-lg">
                        <div class="text-h6 text-white text-bold">Busqueda</div>
                        <div class="text-subtitle2 text-white">
                            <router-link to="/" style="text-decoration: none; color: white">
                                Por especialidad
                            </router-link>
                        </div>
                        <div class="text-subtitle2 text-white">
                            <router-link
                                to="/all-services"
                                style="text-decoration: none; color: white"
                            >
                                Por categorias
                            </router-link>
                        </div>
                        <div class="text-subtitle2 text-white">
                            <router-link
                                to="/new-publication"
                                style="text-decoration: none; color: white"
                            >
                                Anunciate
                            </router-link>
                        </div>
                        <div class="text-h6 text-white text-bold q-mt-md">Legal</div>
                        <div class="text-subtitle2 text-white">
                            <router-link
                                to="/terms-and-conditions"
                                style="text-decoration: none; color: white"
                            >
                                Terminos y Condiciones
                            </router-link>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-3 q-pa-lg">
                        <div class="text-h6 text-white text-bold">Encuentranos</div>
                        <div class="text-subtitle2 text-white">
                            <a
                                href="https://www.instagram.com/wwwtareaxcom/"
                                target="_blank"
                                style="text-decoration: none; color: white"
                            >
                                <q-icon name="fab fa-instagram" class="on-left" />@wwwtareaxcom
                            </a>
                        </div>
                        <div class="text-subtitle2 text-white">
                            <a
                                href="https://www.facebook.com/tareax.panama"
                                target="_blank"
                                style="text-decoration: none; color: white"
                            >
                                <q-icon name="fab fa-facebook" class="on-left" />/tareax.panama
                            </a>
                        </div>
                        <div class="text-subtitle2 text-white">
                            <a
                                href="mailto:admin@tareax.com"
                                style="text-decoration: none; color: white"
                            >
                                <q-icon name="fas fa-envelope" class="on-left" />admin@tareax.com
                            </a>
                        </div>
                    </div>
                </div>
                <div class="text-subtitle2 text-bold text-center text-white q-py-md">
                    2021 TAREAX.COM PANAMA, REPUBLICA DE PANAMA
                </div>
            </div>
            <q-space />
        </div>
    </q-layout>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import * as api from '@/api/api'

export default {
    computed: {
        user() {
            return this.$store.getters.user
        },
        isAuthenticated() {
            return this.$store.getters.isAuthenticated
        },
        uid() {
            return this.$store.getters.uid
        },
        role() {
            return this.$store.getters.role
        },
    },
    methods: {
        async logout() {
            firebase
                .auth()
                .signOut()
                .then(async () => {
                    await this.$store.dispatch('UserLogout')
                    this.$router.push('/login')
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
    mounted() {
        if (this.$store.getters.uid !== '' && this.$store.getters.user === undefined) {
            api.getUserInformationById({uid: this.uid}).then(response => {
                this.$store.commit('SET_USER', response.data.data)
            })
        }
    },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

#app {
    font-family: 'Open Sans', sans-serif;
}

@media only screen and (max-width: 480px) {
    .tareax-logo {
        width: 40%;
    }
}
@media only screen and (max-width: 1024px) {
    .tareax-logo {
        width: 30%;
    }
}
@media only screen and (min-width: 1024px) {
    .tareax-logo {
        /* width: 9%; */
        width: 132.75px;
    }
}
</style>
