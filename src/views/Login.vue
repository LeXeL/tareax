<template>
  <q-page>
    <div class="absolute-center">
      <q-card style="width: 100%; width: 400px;" class="rounded-borders">
        <q-card-section>
          <q-img :src="require('@/assets/TareaxFin2.png')" class="q-mb-md" />
          <!-- <q-input filled label="Correo electronico" class="full-width q-mb-md" type="text" />
          <q-input filled label="Contraseña" class="full-width q-mb-md" type="password" />-->
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="email"
                type="email"
                label="Correo electrónico"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="Contraseña"
                @keyup.enter="login"
              />
            </q-form>
          </q-card-section>
          <!-- <q-btn color="primary" label="Iniciar sesion" class="q-mb-md full-width" /> -->
          <q-card-actions class="q-px-md">
            <q-btn
              color="primary"
              size="lg"
              class="q-mb-md full-width"
              label="Iniciar sesión"
              @click="login"
            />
          </q-card-actions>
          <!-- <div class="text-body2">
            Aun no tienes cuenta? Registrate
            <router-link to="/register">aqui</router-link>.
          </div>-->
        </q-card-section>
        <q-card-section v-if="dismissCountDown > 0">
          <q-banner inline-actions rounded class="bg-red text-white">
            {{ errorMessage }}
            <template v-slot:action>
              <q-btn flat @click="dismissCountDown = 0">
                <i class="fas fa-times"></i>
              </q-btn>
            </template>
          </q-banner>
        </q-card-section>
        <q-card-section class="text-center q-pa-none">
          <p class="text-grey-6">
            Necesitas una cuenta?
            <router-link class="text-grey-9" to="register">Creala Aquí</router-link>
          </p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  data() {
    return {
      email: "",
      password: "",
      dismissSecs: 15,
      dismissCountDown: 0,
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async () => {
          let user = await firebase.auth().currentUser;
          await this.$store.dispatch("setCurrentUser", user);
          this.$router.push("/admin");
        })
        .catch((error) => {
          this.dismissCountDown = this.dismissSecs;
          switch (error.code) {
            case "auth/user-disabled":
              this.errorMessage =
                "La cuenta esta deshabilitada por favor comunicarse con un administrador.";
              break;
            case "auth/user-not-found":
              this.errorMessage =
                "No se ha encontrado ese correo en nuestra base de datos por favor crea una cuenta.";
              break;
            case "auth/wrong-password":
              this.errorMessage =
                "El usuario o la contraseña está equivocado por favor revisar.";
              break;
            case "auth/invalid-email":
              this.errorMessage =
                "El usuario o la contraseña está equivocado por favor revisar.";
              break;
            default:
              this.errorMessage = error.message;
              break;
          }
        });
    },
  },
  mounted() {
    if (this.user) this.$router.push("/admin");
  },
};
</script>
