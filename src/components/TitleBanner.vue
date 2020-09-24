<template>
    <div class="row bg-grey-2 q-px-md q-py-xl">
        <div class="col desktop-only"></div>
        <div class="col-lg-9 col-md-12 col-sm-12 col-xs-12">
            <div class="row">
                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-12 q-mb-md">
                    <div class="text-subtitle-2">{{ title }}</div>
                    <div class="text-h6">{{ subtitle }}</div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12 q-mb-md">
                    <q-btn color="primary" :label="ctaText" :to="path" v-if="ctaText" />
                </div>
            </div>
        </div>
        <div class="col desktop-only"></div>
    </div>
</template>

<script>
export default {
    props: ['title', 'subtitle', 'ctaText', 'path'],
}
</script>