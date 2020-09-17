<template>
  <div class="row bg-grey-2 q-px-md q-py-xl">
    <div class="col desktop-only"></div>
    <div class="col-lg-9">
      <div class="row">
        <div class="col-lg-9">
          <div class="text-subtitle-2">{{ title }}</div>
          <div class="text-h6">{{ subtitle }}</div>
        </div>
        <div class="col-lg-3">
          <q-btn color="primary" :label="ctaText" :to="path" v-if="ctaText" />
        </div>
      </div>
    </div>
    <div class="col desktop-only"></div>
  </div>
</template>

<script>
export default {
  props: ["title", "subtitle", "ctaText", "path"],
};
</script>