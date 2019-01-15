<template>
    <div>
        <v-toolbar class="elevation-2" flat color="white">
            <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp">Containers</v-toolbar-title>
            <v-divider class="mx-2" inset vertical/>
            <v-spacer/>
            <add-dialog @triggerRefresh="listContainers"/>
        </v-toolbar>
        <v-data-table 
            :headers="headers"
            :items="availableContainers"
            :loading="tableLoading"
            prev-icon="keyboard_arrow_left"
            next-icon="keyboard_arrow_right"
            sort-icon="arrow_downward"
            must-sort
            class="elevation-1">
            <v-progress-linear slot="progress" color="primary" indeterminate/>
            <template slot="items" slot-scope="props">
                <td>
                    <v-btn 
                        block
                        flat
                        slot="activator"
                        :to="{ name: 'manageContainer', params: { id: props.item.Name }}"
                        color="primary">
                        {{ props.item.Name }}
                    </v-btn>
                </td>
                <td class="text-xs-left">
                    <span>{{props.item.Status}}</span>
                </td>
                <td class="text-xs-left">{{ props.item.Created }}</td>
                <td class="layout px-0 ml-2">
                    <v-tooltip bottom nudge-right>
                        <v-btn
                            icon
                            small
                            :href="`https://localhost${props.item.Name.replace('php', '')}`"
                            target="_blank"
                            slot="activator"
                        >
                            <v-icon small >open_in_new</v-icon>
                        </v-btn>
                        <span>
                            Open in new tab
                        </span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn icon small disabled slot="activator">
                            <v-icon small >
                                folder_open
                            </v-icon>
                        </v-btn>
                        <span>File Explorer</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <v-btn icon small disabled slot="activator">
                            <v-icon small>
                                delete
                            </v-icon>
                        </v-btn>
                        <span>Delete Container</span>
                    </v-tooltip>
                </td>
            </template>
            <template slot="no-data">
                <error-alert :alert="true" text="There are no active containers."/>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
    export default {
        components: {
            'add-dialog': () => import(/* webpackChunkName: "createContainer", webpackPrefetch: true */ './AddContainerDialog.vue'),
            'error-alert': () => import(/* webpackChunkName: "alertHelpers" */ './ErrorAlert.vue')
        },
        mounted() {
            // Only runs when the template is fully rendered
            this.$nextTick(() => {
                // Auto refreshes the page every 60 seconds
                this.updateContainersAsync().then(() => {
                    this.tableLoading = false
                    this.timer = setInterval(() => {
                        this.listContainers()
                    }, 60000)
                }).catch((error) => {
                    console.error(`ListContainers Promise Rejection: ${error}`)
                })
            })
        },
        beforeDestroy() {
            clearInterval(this.timer)
        },
        data: () => ({
            tableLoading: true,
            timer: null,
            headers: [
                {
                    text: 'Name',
                    align: 'left',
                    sortable: true,
                    value: 'Name'
                },
                {
                    text: 'Status',
                    sortable: true,
                    value: 'status'
                },
                {
                    text: 'Time Started',
                    sortable: false,
                    value: 'timeStart'
                },
                {
                    text: 'Action',
                    sortable: false
                }
            ]
        }),
        computed: {
            availableContainers() {
                return this.$store.getters.getAllContainers
            }
        },
        methods: {
            async listContainers() {
                this.tableLoading = true
                
                this.$containers.getContainers()
                .then(res => {
                    console.log(res)
                    const containers = res.data.containers.map(c=>({
                        Name: c.Name,
                        Status: c.State.Status,
                        Created: new Date(c.Created).toLocaleString()
                    }))
                    // Commit to the Vuex Action
                    this.$store.dispatch('updateContainersAsync', containers)

                    // Request has loaded successfully, disable loader bar
                    this.tableLoading = false
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.v-divider.v-divider--inset {
    margin-left: 16px !important;
}
.v-alert.error {
    margin-bottom: 0px !important;
}
</style>
