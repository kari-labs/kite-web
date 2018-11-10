<template>
    <v-dialog
        v-model="visible"
        persistent
        width="300">
        <v-card>
            <v-card-title primary-title>
                <h3 class="headline md-0">We Made Kite</h3>
            </v-card-title>
            <v-divider/>
            <v-container fluid>
                <v-layout>
                    <v-flex xs12>
                        Joseph Zurowski<br/>
                        Ian Fabricatore<br/>
                        Kyle Gray<br/>
                        Matthew Conway
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
        <audio src="/assets/ogg/credits.ogg" type="audio/ogg"/>
    </v-dialog>
</template>

<script>
require('@/ogg/credits.ogg')
    export default {
        mounted() {
            this.$nextTick(() => {
                this.audioElement = document.querySelector('audio')
                this.track = this.audioContext.createMediaElementSource(this.audioElement)

                this.audioElement.addEventListener('ended', () => {
                    console.log('Music stopped')
                    this.updateVisibility(false)
                })

                this.track.connect(this.audioContext.destination)
            })
        },
        props: [
            'visible'
        ],
        model: {
            prop: 'visible',
            event: 'visChange'
        },
        data: () => ({
            audioContext: new AudioContext(),
            audioElement: null,
            track: null
        }),
        methods: {
            updateVisibility(val) {
                this.$emit('visChange', val)
            }
        },
        watch: {
            visible: function(val) {
                if(!val) return
                if(this.audioContext.state === 'suspended') {
                    this.audioContext.resume()
                } else {
                    this.audioElement.play();
                }
            }
        }
    }
</script>