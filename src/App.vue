<template>
  <div id="app">
    <neit-header></neit-header>
    <v-content id="content" class="scroll-y">
        <router-view></router-view>
    </v-content>
    <neit-footer></neit-footer>
  </div>
</template>

<script>
  export default {
    components: {
      'neit-header': () => import(/* webpackChunkName: "initialLoad" */ '@/components/Header.vue'),
      'neit-footer': () => import(/* webpackChunkName: "initialLoad" */ '@/components/Footer.vue')
    }
  }
</script>