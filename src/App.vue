<template>
  <v-app v-konami="triggerSecret">
    <neit-header/>
    <v-content id="content" class="scroll-y">
        <router-view/>
    </v-content>
    <super-secret v-model="secretPlaying" @visChange="doVisChange"/>
    <error-dialog/>
    <neit-footer/>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    components: {
      'neit-header': () => import(/* webpackChunkName: "initialLoad" */ '@/components/Header.vue'),
      'neit-footer': () => import(/* webpackChunkName: "initialLoad" */ '@/components/Footer.vue'),
      'error-dialog': () => import(/* webpackChunkName: "dialogHelpers", webpackPrefetch: true */ '@/components/ErrorDialog.vue'),
      'super-secret': () => import(/* webpackChunkName: "initialLoad", webpackPrefetch: true */ '@/components/KonamiCredits.vue'),
    },
    data: () => ({
      secretPlaying: false
    }),
    methods: {
      triggerSecret() {
        this.secretPlaying = true
      },
      doVisChange() {}
    },
  }
</script>