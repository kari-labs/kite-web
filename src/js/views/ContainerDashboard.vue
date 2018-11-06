<template>
    <v-container fluid fill-height>
        <v-layout>
            <v-flex xs12>
                <container-table/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        components: {
            'container-table': () => import(/* webpackChunkName: "containerDashboard" */ '../components/ContainerTable.vue')
        }
    }
</script>

<style>

</style>
