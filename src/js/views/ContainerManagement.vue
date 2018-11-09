<template>
    <v-container fluid fill-height>
        <v-layout justify-center>
            <v-flex sm12 md10 xl8>
                <v-card class="secondary-text">
                    <v-card-title primary-title class="primary secondary-text">
                        <h3 class="headline mb-0">Viewing Data for {{ container.Name }}</h3>
                    </v-card-title>
                    <v-divider/>
                    <v-container fluid grid-list-md>
                        <v-layout v-bind="binding">
                            <v-flex xs12 md6 lg4>
                                <v-card color="white">
                                    <v-card-title>
                                        <h4 class="headline">About the Owner</h4>
                                    </v-card-title>
                                    <v-divider/>
                                    <v-card-text>
                                        This is placeholder text
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md6 lg8>
                                <v-card color="white">
                                    <v-card-title>
                                        <h4 class="headline">Logs</h4>
                                    </v-card-title>
                                    <v-divider/>
                                    <v-card-text>
                                        This is placeholder text
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-divider/>
                    <v-card-actions class="primary secondary-text">
                        <v-btn :to="{ name: 'listContainers' }" flat color="secondary">Back</v-btn>
                    </v-card-actions>
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
            },
            binding() {
                const binding = {}

                if(this.$vuetify.breakpoint.mdAndUp) {
                    binding.column = false
                    binding.row = true
                } else {
                    binding.column = true
                    binding.row = false
                }

                return binding
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .secondary-accent
        border-color rgba(252, 183, 65, 0.34) !important
    .primary-accent
        border-color rgba(24, 45, 114, 0.34) !important
    .embolden
        font-weight 600
</style>
