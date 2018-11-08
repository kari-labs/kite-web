<template>
    <v-container fluid fill-height>
        <v-layout justify-center>
            <v-flex sm12 md8 lg8 xl6>
                <v-card>
                    <v-card-title primary-title>
                        <h3 class="headline mb-0">Viewing Data for {{ container.Name }}</h3>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        computed: {
            container() {
                return this.$store.getters.getContainerByOwner(this.$route.params.id)
            }
        }
    }
</script>