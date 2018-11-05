<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md6>
                <v-card class="elevation-12">
                    <v-toolbar color="primary">
                        <v-toolbar-title class="secondary-text product-sans">Instructor Login</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <login-form></login-form>
                    </v-card-text>      
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        components: {
            'login-form': () => import(/* webpackChunkName: "login", webpackPreload: true */ '../components/LoginForm.vue')
        }
    }
</script>