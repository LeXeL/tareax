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
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-8 q-px-md">
            <q-card class="full-width">
              <q-card-section>
                <div class="text-h5 q-mb-md">Formulario de registro</div>
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
                <q-checkbox v-model="terms">Acepto los terminos y condiciones.</q-checkbox>
                <a class="on-right" href="/terminos-y-condiciones" target="_blank">Leer aqui.</a>
              </q-card-section>
              <q-btn color="primary" label="Registrar" @click="createuser" />
            </q-card>
          </div>
          <div class="col-lg-4 q-px-md">
            <q-card class="full-width">
              <q-card-section>
                <div
                  class="text-body2"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit interdum lectus, sodales congue sem vestibulum lacinia. Proin feugiat tortor ac lorem condimentum, in gravida eros euismod. Nunc non magna quis augue aliquam vulputate. Vivamus molestie, nisi vitae lacinia scelerisque, leo mi auctor nisl, ac condimentum arcu nisl at nulla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
      <q-dialog v-model="confirmationDialog">
        <q-card dark class="text-white" style="width: 700px; max-width: 80vw;">
          <q-card-section>
            <div class="text-h6">¡Hemos recibido tu información!</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Hemos recivido tu información satisfactoriamente. Uno de
            nuestros administradores aprobará tu cuenta para que
            empieces a realizar pedidos.
            <br />
            <br />
          </q-card-section>

          <q-card-actions align="right">
            <router-link to="/">
              <q-btn flat label="Aceptar" color="primary" v-close-popup />
            </router-link>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="col desktop-only"></div>
  </q-page>
</template>
<script>
import TitleBanner from "@/components/TitleBanner";

export default {
  components: {
    TitleBanner,
  },
};
</script>