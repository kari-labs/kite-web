<template>
    <v-footer app absolute inset color="primary" height="auto">
        <v-card flat tile color="primary" class="text-xs-center">
            <v-card-text>
                <v-btn v-for="icon in icons" :key="icon" :aria-label="icon" class="mx-3 secondary-text" icon>
                    <v-icon size="24px" color="secondary">{{icon}}</v-icon>
                </v-btn>
            </v-card-text>
            <v-card-text class="pt-0 secondary-text product-sans">
                Use of this system is limited to authorized persons of New England Institute of Technology.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="secondary-text product-sans">
                &copy;2018 — <strong>Joseph Zurowski</strong> <br />
                Product Sans &copy;2015 — 2018 <strong>google_logo</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        data: () => ({
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-instagram'
            ]
        })
    }
</script>