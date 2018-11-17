<template>
    <v-container fluid fill-height>
        <v-layout justify-center>
            <v-flex sm12 md10 xl8>
                <v-card v-if="container" class="secondary-text">
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
                                        <code>This is placeholder text</code>
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
import { mapActions, mapGetters } from 'vuex'
    export default {
        mounted() {
            this.$nextTick(() => {
                if(!this.container) {
                    this.getSingleContainerAsync(this.$route.params.id).then(() => {
                        this.container = this.getContainerByOwner(this.$route.params.id)
                    }).catch(() => {
                        this.showOfflineError()
                    })
                } else {
                    this.container = this.getContainerByOwner(this.$route.params.id)
                }
            })
        },
        methods: {
            ...mapActions(['getSingleContainerAsync']),
            showOfflineError() {
                this.showPersistentDialog({
                    dialogType: 'error',
                    title: 'Kite Unavailable',
                    message: 'The KITE service is currently experiencing technical difficulties. Please try again in a few minutes.'
                })
            }
        },
        data: () => ({
            _container: null
        }),
        computed: {
            ...mapGetters([
                'getContainerByOwner'
            ]),
            container: {
                get() {
                    return this._container || this.getContainerByOwner(this.$route.params.id)
                },
                set(value) {
                    this._container = value
                }
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

<style lang="scss" scoped>
.secondary-accent {
    border-color: rgba(252, 183, 65, 0.34) !important;
}
.primary-accent {
    border-color: rgba(24, 45, 114, 0.34) !important;
}
.embolden {
    font-weight: 600;
}
</style>
