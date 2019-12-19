<style scoped>
    table .actions,
    table .status {
        width: 90px;
        text-align: right;
    }
    table .actions .btn {
        margin: 0;
        padding: 5px;
    }
    .card-footer nav {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>

<template>
    <div>
        <div class="card">
            <div class="card-header card-header-primary">
                <h4 class="card-title ">{{ __('Tournaments') }}</h4>
                <p class="card-category">{{ __('Here you can manage tournaments') }}</p>
            </div>

            <div class="card-body">
                <div class="row">
                    <div class="col-12 text-right">
                        <button class="btn btn-sm btn-primary" @click="showCreateForm">{{ __('Add tournament') }}</button>
                    </div>
                </div>
                <div class="table-responsive">

                    <p class="text-center mb-0" v-if="list.length === 0">
                        {{ __('You have not registers') }}
                    </p>

                    <table class="table table-borderless mb-0" v-if="list.length > 0">
                        <thead class="text-primary">
                        <tr>
                            <th class="actions" />
                            <th class="status">{{ __('Status') }}</th>
                            <th class="name">{{ __('Name') }}</th>
                            <th class="actions" />
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in list">
                            <td class="actions">
                                <button rel="tooltip" class="btn btn-success btn-link"
                                        data-original-title="" title="" @click="edit(item)">
                                    <i class="material-icons">edit</i>
                                    <div class="ripple-container"></div>
                                </button>
                                <button rel="tooltip" class="btn btn-danger btn-link"
                                        data-original-title="" title="" @click="edit(item, true)">
                                    <i class="material-icons">delete</i>
                                    <div class="ripple-container"></div>
                                </button>
                            </td>
                            <td class="status text-center">
                                <i class="fas fa-cog" v-if="item.status === 'CONFIG'" />
                                <i class="fas fa-file-signature text-warning" v-if="item.status === 'SUBSCRIPTIONS'" />
                                <i class="fas fa-play-circle text-success" v-if="item.status === 'STARTED'" />
                                <i class="fas fa-stop text-danger" v-if="item.status === 'FINISHED'" />
                            </td>
                            <td class="name">{{ item.name }}</td>
                            <td class="actions">
                                <a class="btn btn-outline-secondary" :href="`/tournaments/${item.id}/config`">
                                    {{ __('Prepare') }}
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card-footer" v-if="meta.last_page > 1">
                <nav>
                    <ul class="pagination">
                        <li class="page-item">
                            {{ __('pagination.total', { total: meta.total }) }}
                        </li>
                    </ul>
                    <ul class="pagination">
                        <li class="page-item" v-bind:class="{ disabled: !links.prev }">
                            <button class="page-link" @click="prevPage">
                                <i class="fas fa-chevron-left" />
                            </button>
                        </li>
                        <li class="page-item" v-bind:class="{ disabled: !links.next }">
                            <button class="page-link" @click="nextPage">
                                <i class="fas fa-chevron-right" />
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <!-- Create Tournament Modal -->
        <div class="modal fade" id="modal-create-tournament" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            {{ __('Create') }} {{ __('Tournament') }}
                        </h4>

                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>

                    <div class="modal-body">
                        <!-- Form Errors -->
                        <div class="alert alert-danger" v-if="createForm.errors.length > 0">
                            <p class="mb-0"><strong>Whoops!</strong> Something went wrong!</p>
                            <br>
                            <ul>
                                <li v-for="error in createForm.errors">
                                    {{ error }}
                                </li>
                            </ul>
                        </div>

                        <!-- Create Tournament Form -->
                        <form role="form">
                            <!-- Name -->
                            <div class="form-group">
                                <label class="col-form-label">{{ __('Name') }}</label>
                                <input id="create-tournament-name"
                                       type="text" class="form-control"
                                       v-model="createForm.name">
                            </div>
                        </form>
                    </div>

                    <!-- Modal Actions -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('Close') }}</button>

                        <button type="button" class="btn btn-primary" @click="store">
                            {{ __('Create') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Edit Tournament Modal -->
        <div class="modal fade" id="modal-edit-tournament" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            {{ __('Edit') }} {{ __('Tournament') }}
                        </h4>

                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>

                    <div class="modal-body">
                        <!-- Form Errors -->
                        <div class="alert alert-danger" v-if="editForm.errors.length > 0">
                            <p class="mb-0"><strong>Whoops!</strong> Something went wrong!</p>
                            <br>
                            <ul>
                                <li v-for="error in editForm.errors">
                                    {{ error }}
                                </li>
                            </ul>
                        </div>

                        <!-- Create Tournament Form -->
                        <form role="form">
                            <!-- Name -->
                            <div class="form-group">
                                <label class="col-form-label">{{ __('Name') }}</label>
                                <input id="edit-tournament-name"
                                       type="text" class="form-control"
                                       v-model="editForm.name">
                            </div>
                        </form>
                    </div>

                    <!-- Modal Actions -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('Close') }}</button>

                        <button type="button" class="btn btn-primary" @click="update">
                            {{ __('Save changes') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Tournament Modal -->
        <div class="modal fade" id="modal-delete-tournament" tabindex="-1" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">
                            {{ __('Delete') }} {{ __('Tournament') }}
                        </h4>

                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>

                    <!-- Modal Actions -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('Close') }}</button>

                        <button type="button" class="btn btn-danger" @click="remove">
                            {{ __('Delete') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [],
                meta: {},
                links: {},

                createForm: {
                    errors: [],
                    name: '',
                },

                editForm: {
                    errors: [],
                    id: '',
                    name: '',
                },
            };
        },
        mounted() {
            this.prepareComponent();
        },
        methods: {
            prepareComponent() {
                this.loadTournaments();

                $('#modal-create-tournament').on('shown.bs.modal', () => {
                    $('#create-tournament-name').focus();
                });

                $('#modal-edit-tournament').on('shown.bs.modal', () => {
                    $('#edit-tournament-name').focus();
                });
            },
            prepareData(response) {
                this.list = response.data;
                this.meta = response.meta;
                this.links = response.links;
            },
            loadTournaments() {
                let path = '/api/tournaments';
                if (this.meta && this.meta.path) {
                    path = this.meta.path;
                }
                axios.get(path)
                    .then(response => this.prepareData(response));
            },
            store() {
                axios.post('/api/tournaments', { name: this.createForm.name })
                    .then(() => {
                        this.loadTournaments();
                        $('#modal-create-tournament').modal('hide');
                    });
            },
            update() {
                axios.put(`/api/tournaments/${this.editForm.id}`, { name: this.editForm.name })
                    .then(() => {
                        this.loadTournaments();
                        $('#modal-edit-tournament').modal('hide');
                    });
            },
            remove() {
                axios.delete(`/api/tournaments/${this.editForm.id}`)
                    .then(() => {
                        this.loadTournaments();
                        $('#modal-delete-tournament').modal('hide');
                    });
            },
            prevPage() {
                if (!this.links.prev) {
                    return;
                }
                axios.get(this.links.prev)
                    .then(response => this.prepareData(response));
            },
            nextPage() {
                if (!this.links.next) {
                    return;
                }
                axios.get(this.links.next)
                    .then(response => this.prepareData(response));
            },
            showCreateForm() {
                $('#modal-create-tournament').modal('show');
            },
            edit(item, remove = false) {
                this.editForm.id = item.id;
                this.editForm.name = item.name;

                if (!remove) {
                    $('#modal-edit-tournament').modal('show');
                } else {
                    $('#modal-delete-tournament').modal('show');
                }
            }
        }
    }
</script>

<style scoped>

</style>
