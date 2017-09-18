<template>
    <div>
        <div id="beepsWrapper">
            <beep v-for="beep in beeps" :beep="beep" :key="beep.id" :showUserInfo="showUserInfo"></beep>
        </div>
        <div id="beepsLoading" class="text-center" v-show="beepsLoading">
            <i class="fa fa-spin fa-spinner"></i>
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
            this.beeps = [];
            this.getBeeps(1);

            window.addEventListener('scroll', this.handleScroll);
            this.$root.$on('newBeep', this.handleNewBeep)
        },
        destroyed: function () {
            window.removeEventListener('scroll', this.handleScroll)
        },
        props: {
          endpoint: {
            type: String,
            default: '/beeps'
          },
          showUserInfo: {
            type: Boolean,
            default: true
          }
        },
        data: function () {
            return {
                beeps: [],
                page: {},
                beepsLoading: false
            }
        },
        watch: {
            endpoint: function () {
                this.beeps = []
                this.getBeeps()
            }
        },
        methods: {
            getBeeps: function (page) {

                if (!this.beepsLoading) {

                    this.beepsLoading = true

                    this.$http.get(this.endpoint + '?page=' + page)
                        .then((response) => {
                            this.beepsLoading = false

                            this.beeps = this.beeps.concat(response.body.data)
                            this.page = {
                              current: response.body.current_page,
                              last: response.body.last_page
                            }
                        })
                        .catch(() => {
                            this.beepsLoading = false
                        })
                }
            },
            handleScroll: function () {
                if (document.body.scrollHeight - window.innerHeight - document.body.scrollTop == 0) {
                    if (this.page.current < this.page.last) {
                        this.getBeeps(this.page.current + 1)
                    }
                }
            },
            handleNewBeep: function (beep) {
                if (!this.$route.params.username || this.$route.params.username == beep.author.username)
                    this.beeps.unshift(beep)
            }
        }
    }
</script>

<style scoped>
    #beepsWrapper { margin: 0 -20px; }
    #beepsLoading { padding: 40px; }
    #beepsLoading i { font-size: 40px; }
</style>
