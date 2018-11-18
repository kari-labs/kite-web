<template>
    <div>
        <nav-drawer ref="navDrawer"></nav-drawer>
        <v-toolbar app relative dark clipped-left color="primary">
            <v-toolbar-side-icon @click.stop="toggleDrawer" temporary class="secondary-text" aria-label="Toggle side navigation drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="secondary-text" @click="pushDash">NEIT Kite</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat color="secondary" slot="activator" :to="''" aria-label="Container Dashboard">Container Dashboard</v-btn>
                <v-btn flat color="secondary" aria-label="Report a Bug">Report Bug</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        methods: {
            toggleDrawer() {
                //Toggles the navDrawer open/closed only if the navDrawer component
                //has finished downloading.
                this.$refs.navDrawer.drawer = (typeof this.$refs.navDrawer.drawer == 'undefined') ? false : !this.$refs.navDrawer.drawer
            },
            pushDash() {
                this.$router.push({ name: 'listContainers'})
            }
        },
        components: {
            'nav-drawer': () => import(/* webpackChunkName: "navDrawer" */ '@/components/NavDrawer.vue')
        }
    }
</script>

<style lang="stylus" scoped>
//Fixes bug where Vuetify secondary changes color of background but not text
.v-toolbar__side-icon.secondary-text
    color #FCB741 !important

//Disables ability to select toolbar title text
.v-toolbar__title
    user-select none
</style>
