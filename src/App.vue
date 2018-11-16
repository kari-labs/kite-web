<template>
  <v-app v-konami="triggerSecret">
    <neit-header/>
    <v-content id="content" class="scroll-y">
        <router-view/>
    </v-content>
    <super-secret v-model="secretPlaying" @visChange="doVisChange"/>
    <persistent-dialog/>
    <neit-footer/>
  </v-app>
</template>

<script>
  export default {
    components: {
      'neit-header': () => import(/* webpackChunkName: "initialLoad" */ '@/components/Header.vue'),
      'neit-footer': () => import(/* webpackChunkName: "initialLoad" */ '@/components/Footer.vue'),
      'persistent-dialog': () => import(/* webpackChunkName: "dialogHelpers", webpackPrefetch: true */ '@/components/PersistentDialog.vue'),
      'super-secret': () => import(/* webpackChunkName: "initialLoad", webpackPrefetch: true */ '@/components/KonamiCredits.vue')
    },
    data: () => ({
      secretPlaying: false
    }),
    methods: {
      triggerSecret() {
        this.secretPlaying = true
      },
      doVisChange() {}
    }
  }
</script>