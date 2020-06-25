<template>
    <li class="task">
        <div class="task-primary">
            <input type="checkbox" :id="task.task_uuid" v-model="checked" @change="clickTask">
            <label :for="task.task_uuid">
                <div class="task-text">
                    {{ task.description }}
                </div>
            </label>
            <p class="task-user">{{ task.user }}</p>
        </div>
        <div class="task-additional">
            <p class="task-category">{{ task.category }}</p>
            <p>{{ task.due_date }}</p>
        </div>
        <button class="task-delete" @click="deleteTask(task.task_uuid)">Delete</button>
    </li>
</template>

<script>
    import { mapActions } from 'vuex'

    export default {
        props: {
            task: {
                type: Object,
                required: true
            },
        },
        data() {
            return {
                checked: this.task.status
            }
        },
        methods: {
            clickTask() {
                this.checkTask({
                    "task_uuid": this.task.task_uuid,
                    "status": this.checked
                }).catch(() => {
                    // api call not successful, revert to previous state
                    this.checked = !this.checked
                })
            },
            ...mapActions(['checkTask', 'deleteTask'])
        }
    };
</script>

<style scoped>
    .task {
        background: var(--blue-light);
        border-radius: 5px;
        box-shadow: 0 10px 6px -10px black;
        padding: 10px;
        margin-bottom: 10px;
    }

    .task-primary {
        display: flex;
        margin-bottom: 10px;
    }

    .task-text {
        font-size: 1.5rem;
    }

    .task-user {
        margin-left: 10px;
    }

    label {
        flex-grow: 1;
    }

    .task-additional {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .task-category {
        background: var(--blue-dark);
        color: var(--white);
        border-radius: 5px;
        padding: 2px 5px;
        box-shadow: 0 10px 6px -10px black;
    }

    .task-delete {
        border-color: var(--blue-dark);
        margin-left: auto;
        display: block;
    }

    .task-delete:focus {
        outline-color: var(--blue-dark);
    }

    input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"]:checked + label .task-text {
        text-decoration: line-through;
    }

</style>