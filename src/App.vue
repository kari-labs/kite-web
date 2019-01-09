<template>
  <v-app v-konami="test">
    <neit-header></neit-header>
    <v-content id="content" class="scroll-y">
        <router-view></router-view>
    </v-content>
    <super-secret v-model="secretPlaying" @visChange="doVisChange"/>
    <neit-footer></neit-footer>
  </v-app>
</template>

<script>
  export default {
    components: {
      'neit-header': () => import(/* webpackChunkName: "initialLoad" */ '@/components/Header.vue'),
      'neit-footer': () => import(/* webpackChunkName: "initialLoad" */ '@/components/Footer.vue'),
      'super-secret': () => import(/* webpackChunkName: "initialLoad" */ '@/components/KonamiCredits.vue'),
    },
    data: () => ({
      secretPlaying: false
    }),
    methods: {
      test() {
        this.secretPlaying = true
      },
      doVisChange() {}
    },
  }
</script>