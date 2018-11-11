<template>
    <v-container>
        <!-- <v-container
            fluid
            grid-list-md>
            <v-layout row wrap>
                <v-flex
                    v-for="file in files"
                    xs3
                    :key="file.name">

                    <v-card>
                        <v-card-title primary-title>
                            <div class="headline"><v-icon>{{file.isDir ? 'folder' : 'insert_drive_file'}}</v-icon></div>
                            <div class="text-xs-center">{{file.name}}</div>
                        </v-card-title>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container> -->
        <v-list two-line subheader>
            <v-subheader inset>008000118 / {{path}}</v-subheader>

            <v-list-tile
                v-for="file in files"
                :key="file.name"
                avatar
                @click="openFile(path, file)">
                <v-list-tile-avatar>
                    <v-icon class="white--text" :class="file.directory ? 'primary': 'secondary'">{{ file.directory ? 'folder' : 'insert_drive_file' }}</v-icon>
                </v-list-tile-avatar>

                <v-list-tile-content>
                    <v-list-tile-title>{{ file.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>Last modified {{ new Date(file.modified).toLocaleString() }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                    <v-btn icon ripple>
                        <v-icon color="grey lighten-1">info</v-icon>
                    </v-btn>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
    </v-container>
</template>

<script>
import path from 'path'

export default {
    data: () => ({
        files: []
    }),
    async mounted() {
        this.files = (await this.$fileManager.getFiles(this.$route.params.id, this.path)).contents;
    },
    methods: {
        async openFile(currentpath, file) {
            if(file.directory) {
                this.$router.push({params: {path: path.join(currentpath, file.name)}})
            } else {
                const dlfile = await this.$fileManager.getFiles(this.$route.params.id, file.name)
                this.$fileManager.downloadFile(dlfile, file.name);
            }
        }
    },
    watch: {
        '$route.params.path': async function(newVal) {
            this.files = (await this.$fileManager.getFiles(this.$route.params.id, newVal)).contents;
        }
    },
    computed: {
        path() {
            return this.$route.params.path || '';
        },
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
