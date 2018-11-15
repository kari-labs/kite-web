<template>
    <div>
        <v-toolbar class="elevation-2" flat color="white">
            <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp">Available Containers</v-toolbar-title>
            <v-toolbar-title v-else>Containers</v-toolbar-title>
            <v-divider class="mx-2" inset vertical/>
            <v-spacer/>
            <add-dialog @triggerRefresh="listContainers"/>
        </v-toolbar>
        <v-data-table 
            :headers="headers"
            :items="getAllContainers"
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
                    <span v-if="props.item.State.Running" class="green--text">Running</span>
                    <span v-else-if="props.item.State.Dead" class="red--text">Dead</span>
                    <span v-else-if="props.item.State.Restarting" class="orange--text">Restarting</span>
                </td>
                <td class="text-xs-left">{{ props.item.State.StartedAt }}</td>
                <td class="justify-center layout px-0">
                    <v-btn
                        icon
                        small
                        :href="`https://${props.item.Name}.kite.neit.icu/`"
                        target="_blank">
                        <v-icon small class="mr-2">
                            open_in_new
                        </v-icon>
                    </v-btn>
                    <v-btn icon small disabled>
                        <v-icon small class="mr-2">
                            folder_open
                        </v-icon>
                    </v-btn>
                    <v-btn icon small disabled>
                        <v-icon small class="mr-2">
                            delete
                        </v-icon>
                    </v-btn>
                </td>
            </template>
            <template slot="no-data">
                <error-alert :alert="true" text="There are no active containers."/>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
    export default {
        components: {
            'add-dialog': () => import(/* webpackChunkName: "createContainer", webpackPrefetch: true */ '@/components/AddContainerDialog.vue'),
            'error-alert': () => import(/* webpackChunkName: "alertHelpers" */ '@/components/ErrorAlert.vue')
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
                    text: 'Owner',
                    align: 'left',
                    sortable: true,
                    value: 'owner'
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
            ...mapGetters(['getAllContainers'])
        },
        methods: {
            ...mapActions(['updateContainersAsync']),
            listContainers() {
                this.tableLoading = true
                this.updateContainersAsync().then(() => {
                    this.tableLoading = false
                }).catch((error) => {
                    console.error(`ListContainers Promise Rejection: ${error}`)
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
