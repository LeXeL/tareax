<template>
  <q-page>
    <!-- START CAROUSEL -->
    <q-carousel
      arrows
      animated
      swipeable
      infinite
      v-model="heroSlide"
      height="500px"
      :autoplay="autoplay"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Second stop</div>
          <div class="text-subtitle1">Famous City</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Third stop</div>
          <div class="text-subtitle1">Famous Bridge</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <!-- END CAROUSEL -->

    <!-- START SEARCH -->
    <div class="bg-grey-2 q-py-xl">
      <div class="row">
        <div class="col desktop-only"></div>
        <div class="col-lg-9 col-xs-12">
          <div class="text-h5 q-px-md">Busque un servicio:</div>
        </div>
        <div class="col desktop-only"></div>
      </div>
      <div class="row q-py-md">
        <div class="col desktop-only"></div>
        <div class="col-lg-3 col-xs-12">
          <q-select
            class="q-px-md"
            filled
            v-model="selectCategory"
            :options="options"
            label="Categoria"
          />
        </div>
        <div class="col-lg-3 col-xs-12">
          <q-select
            class="q-px-md"
            filled
            v-model="selectSubcategory"
            :options="options"
            label="Sub-Categoria"
          />
        </div>
        <div class="col-lg-3 col-xs-12">
          <q-select
            class="q-px-md"
            filled
            v-model="selectService"
            :options="options"
            label="Servicio"
          />
        </div>
        <div class="col desktop-only"></div>
      </div>
      <div class="row">
        <div class="col desktop-only"></div>
        <div class="col-lg-9 q-px-md">
          <q-btn color="primary" label="Buscar" to="/search" />
        </div>
        <div class="col desktop-only"></div>
      </div>
    </div>
    <!-- END SEARCH -->

    <!-- START POPULAR SERVICES -->
    <div class="row q-py-xl">
      <div class="col desktop-only"></div>
      <div class="col-lg-9">
        <div class="row q-px-md q-mb-md">
          <div class="text-h5">Servicios populares</div>
        </div>
        <div class="row text-center q-mb-md">
          <div class="col-lg-3 q-px-md q-mb-md" v-for="(cat, i) in 8" :key="i">
            <div class="q-py-lg bg-grey-2 rounded-borders">
              <div class="text-subtitle2">Category name</div>
              <div class="text-h6 text-primary">{{ i + 1 }}</div>
            </div>
          </div>
        </div>
        <div class="row text-center">
          <div class="col q-px-md">
            <q-btn color="primary" label="Ver todas" />
          </div>
        </div>
      </div>
      <div class="col desktop-only"></div>
    </div>
    <!-- END POPULAR SERVICES -->

    <!-- RECENT PUBLICATIONS -->
    <div class="row q-py-xl">
      <div class="col desktop-only"></div>
      <div class="col-lg-9">
        <div class="row q-mb-md">
          <div class="col-lg-8 q-px-md">
            <div class="row q-mb-md">
              <div class="text-h5">Publicaciones recientes</div>
            </div>
            <PublicationsList />
          </div>
          <div class="col-lg-4 q-px-md">
            <div class="row q-mb-md">
              <div class="text-h5">Destacados</div>
            </div>
            <q-carousel
              v-model="featuredCarousel"
              swipeable
              animated
              infinite
              control-color="white"
              navigation
              height="350px"
              class="bg-primary text-white shadow-1 rounded-borders"
              :autoplay="autoplay"
              @mouseenter="autoplay = false"
              @mouseleave="autoplay = true"
            >
              <q-carousel-slide name="first">
                <div class="text-h5">
                  <strong>Tutorias de quimica</strong>
                </div>
                <div class="text-h6">Tareas escolares</div>
                <div class="text-h6 q-mb-md">Academicos</div>
                <div class="text-subtitle2">
                  <i class="fas fa-user"></i> Pedro Picapiedras
                </div>
                <div class="text-subtitle2">
                  <i class="fas fa-map-pin"></i> Ubicacion
                </div>
                <div class="text-subtitle2">
                  <i class="fas fa-dollar-sign"></i> 5.50
                </div>
                <q-btn color="white full-width q-mt-lg" push>
                  <span class="text-primary">Contactar</span>
                </q-btn>
              </q-carousel-slide>
              <q-carousel-slide name="second">
                <div class="text-h5">
                  <strong>Revision de ortografia y estilo</strong>
                </div>
                <div class="text-h6">Tesis</div>
                <div class="text-h6 q-mb-md">Academicos</div>
                <div class="text-subtitle2">
                  <i class="fas fa-user"></i> Pablo Marmol
                </div>
                <div class="text-subtitle2">
                  <i class="fas fa-map-pin"></i> Ubicacion
                </div>
                <div class="text-subtitle2">
                  <i class="fas fa-dollar-sign"></i> 7.50
                </div>
                <q-btn color="white full-width q-mt-lg" push>
                  <span class="text-primary">Contactar</span>
                </q-btn>
              </q-carousel-slide>
            </q-carousel>
          </div>
        </div>
      </div>
      <div class="col desktop-only"></div>
    </div>
    <!-- END RECENT PUBLICATIONS -->
  </q-page>
</template>

<script>
import PublicationsList from "@/components/PublicationsList";
export default {
  data() {
    return {
      autoplay: true,
      heroSlide: "first",
      options: ["Google", "Facebook", "Twitter", "Apple", "Oracle"],
      selectCategory: null,
      selectSubcategory: null,
      selectService: null,
      featuredCarousel: "first",
    };
  },
  components: {
    PublicationsList,
  },
};
</script>

<style  scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
