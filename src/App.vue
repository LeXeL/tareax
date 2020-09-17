<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-toolbar-title @click="$router.push('/')"
                    >Tareax</q-toolbar-title
                >
                <q-btn color="white" outline :to="'/login'" v-if="!user"
                    >iniciar sesión</q-btn
                >
                <q-btn
                    class="on-left"
                    flat
                    round
                    dense
                    to="/new-publication"
                    v-if="user"
                >
                    <i class="fas fa-newspaper"></i>
                </q-btn>
                <q-btn flat round dense v-if="user">
                    <i class="fas fa-user"></i>
                    <q-menu>
                        <q-list style="width: 200px;">
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
                            <q-item clickable v-close-popup>
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
        uid() {
            return this.$store.getters.uid
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
        if (this.$store.getters.uid !== '' && this.$store.getters.user === '') {
            api.getuserinformationbyid({uid: this.uid}).then(response => {
                this.$store.commit('SET_USER', response.data.data)
            })
        }
    },
}
</script>

<style></style>
