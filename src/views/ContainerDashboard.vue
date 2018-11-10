<template>
    <v-container fluid fill-height>
        <v-layout justify-center>
            <v-flex sm12 md8 lg8 xl6>
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