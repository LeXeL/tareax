<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <!-- <div class="q-pa-sm text-right" style="background-color: #ED7A3A">
                <span class="on-left">
                    <i class="far fa-envelope"></i>&nbsp;
                    <a href="mailto:admin@tareax.com" style="color: #fff"
                        >admin@tareax.com</a
                    >
                </span>
                <span class="on-left">
                    <i class="fab fa-instagram"></i>&nbsp;
                    <a
                        href="https://www.instagram.com/wwwtareaxcom/"
                        style="color: #fff"
                        target="_blank"
                        >wwwtareaxcom</a
                    >
                </span>

                <i class="fab fa-facebook"></i>&nbsp;
                <a
                    href="https://www.facebook.com/tareax.panama"
                    style="color: #fff"
                    target="_blank"
                    >Tareax Panama</a
                >
            </div> -->
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
                    style="color: #fff; text-decoration: none;"
                >
                    <q-btn stretch flat icon="fab fa-instagram" />
                </a>
                <a
                    href="https://www.facebook.com/tareax.panama"
                    target="_blank"
                    style="color: #fff; text-decoration: none;"
                >
                    <q-btn stretch flat icon="fab fa-facebook" />
                </a>
                <a
                    href="mailto:admin@tareax.com"
                    style="color: #fff; text-decoration: none;"
                >
                    <q-btn stretch flat icon="far fa-envelope">
                        <span class="desktop-only q-pl-sm"
                            >admin@tareax.com</span
                        >
                    </q-btn>
                </a>
                <q-btn
                    color="orange-9"
                    class="on-right on-left text-bold"
                    push
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
                                <q-item-section
                                    @click="$router.push('/profile')"
                                >
                                    <span>
                                        <i class="fas fa-user on-left"></i
                                        >Perfil
                                    </span>
                                </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup>
                                <q-item-section
                                    @click="$router.push('/my-publications')"
                                >
                                    <span>
                                        <i class="fas fa-list on-left"></i>Mis
                                        publicaciones
                                    </span>
                                </q-item-section>
                            </q-item>
                            <q-item
                                clickable
                                v-close-popup
                                v-if="role === 'admin'"
                            >
                                <q-item-section @click="$router.push('/admin')">
                                    <span>
                                        <i
                                            class="fas fa-user-shield on-left"
                                        ></i
                                        >Admin
                                    </span>
                                </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item clickable v-close-popup>
                                <q-item-section @click="logout()">
                                    <span>
                                        <i
                                            class="fas fa-sign-out-alt on-left"
                                        ></i
                                        >Cerrar sesion
                                    </span>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>
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
        if (
            this.$store.getters.uid !== '' &&
            this.$store.getters.user === undefined
        ) {
            api.getUserInformationById({uid: this.uid}).then(response => {
                this.$store.commit('SET_USER', response.data.data)
            })
        }
    },
}
</script>

<style>
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
