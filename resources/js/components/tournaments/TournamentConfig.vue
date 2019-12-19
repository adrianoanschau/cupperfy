<style scoped>

</style>

<template>
    <div>
        <div class="card" v-if="tournament !== null">
            <div class="card-header card-header-primary">
                <div class="d-flex">
                    <div class="my-auto mr-3">
                        <i class="fas fa-trophy fa-3x" />
                    </div>
                    <div>
                        <h4 class="card-title">{{ tournament.name }}</h4>
                        <p class="card-category" v-if="tournament.status === 'CONFIG'">{{ __('In preparation') }}</p>
                        <p class="card-category" v-if="tournament.status === 'SUBSCRIPTIONS'">{{ __('Open for subscriptions') }}</p>
                        <p class="card-category" v-if="tournament.status === 'STARTED'">{{ __('In progress') }}</p>
                        <p class="card-category" v-if="tournament.status === 'FINISHED'">{{ __('Finalized') }}</p>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <ul class="nav nav-pills nav-justified">
                    <li class="nav-item" v-for="tab in tabs">
                        <a class="nav-link" href="#"
                           v-bind:class="{ active: tab.name === tabSelected }"
                           @click="selectTab(tab.name)">{{ tab.label }}</a>
                    </li>
                </ul>

                <hr>

                <div class="text-right">
                    <a :href="'/tournaments'" class="btn btn-sm btn-primary">{{ __('Back to list') }}</a>
                </div>

            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div v-if="tabSelected === tabs.dashboard.name">
                    <button class="btn w-100"
                            v-if="tournament.status !== 'FINISHED'"
                            v-bind:class="{
                                'btn-success': tournament.status !== 'STARTED',
                                'btn-danger': tournament.status === 'STARTED',
                            }"
                            @click="updateStatus">
                        <span v-if="tournament.status === 'CONFIG'">{{ __('Publish') }}</span>
                        <span v-if="tournament.status === 'SUBSCRIPTIONS'">{{ __('Start') }}</span>
                        <span v-if="tournament.status === 'STARTED'">{{ __('Finish') }}</span>
                    </button>
                </div>

                <div v-if="tabSelected === tabs.stages.name">
                    Stages
                </div>

                <div v-if="tabSelected === tabs.competitors.name">
                    Competitors
                </div>

                <div v-if="tabSelected === tabs.calendar.name">
                    Calendar
                </div>

                <div v-if="tabSelected === tabs.statistics.name">
                    Statistics
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['id'],
        data() {
            return {
                tabs: {
                    dashboard: {
                        name: 'dashboard',
                        label: this.__('Dashboard')
                    },
                    stages: {
                        name: 'stages',
                        label: this.__('Stages')
                    },
                    competitors: {
                        name: 'competitors',
                        label: this.__('Competitors')
                    },
                    calendar: {
                        name: 'calendar',
                        label: this.__('Calendar')
                    },
                    statistics: {
                        name: 'statistics',
                        label: this.__('Statistics')
                    }
                },
                tabSelected: null,
                tournament: null,
            };
        },
        mounted() {
            this.prepareComponent();
        },
        methods: {
            prepareComponent() {
                this.tabSelected = this.tabs.dashboard.name;

                axios.get(`/api/tournaments/${this.id}`)
                    .then(response => this.prepareData(response));
            },
            prepareData(response) {
                this.tournament = response.data;
            },
            selectTab(tab) {
                this.tabSelected = tab;
            },
            updateStatus() {
                let status = 'SUBSCRIPTIONS';
                switch (this.tournament.status) {
                    case 'SUBSCRIPTIONS':
                        status = 'STARTED';
                        break;
                    case 'STARTED':
                        status = 'FINISHED';
                        break;
                }
                axios.put(`/api/tournaments/${this.id}`, { status })
                    .then(response => this.prepareData(response));
            }
        }
    }
</script>
