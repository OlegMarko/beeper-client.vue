<template>
    <div>
        <div id="beepsWrapper">
            <beep v-for="beep in beeps" :beep="beep" :key="beep.id"></beep>
        </div>
    </div>
</template>

<script>
    import Beep from './Beep.vue'

    export default {
        name: 'BeepList',
        components: {
            beep: Beep
        },
        created: function () {
            this.beeps = []
            this.getBeeps()
        },
        data: function () {
            return {
                beeps: []
            }
        },
        methods: {
            getBeeps: function () {
                this.$http.get('/beeps')
                    .then((response) => {
                        this.beeps = response.body.data
                    })
            }
        }
    }
</script>

<style scoped>
    #beepsWraper { margin: 0 -20px; }
    #beepsLoading { padding: 40px; }
    #beepsLoading i { font-size: 40px; }
</style>
