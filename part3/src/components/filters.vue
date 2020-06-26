<template>
    <div class="filters">
        <p @click="toggleShow" class="toggle-show">{{ show ? 'Hide Filters' : 'Show Filters' }}</p>
        <div v-if="show" class="show">
            <div class="field-group fields">
                <p class="field-title">Sort by:</p>
                <p 
                    v-for="field in fields"
                    :key="field.label"
                    @click="click('field', field.type)"
                    class="field"
                    :class="{ 'active' : filters.field === field.type }"
                >
                    {{ field.label }}
                </p>
            </div>
            <div class="field-group direction">
                <p class="field-title">Order:</p>
                <p class="field active" @click="click('ascending', !filters.ascending)">
                    {{ filters.ascending ? 'Ascending' : 'Descending' }}
                </p>
            </div>
            <div class="field-group hide-options">
                <p class="field-title">Filters:</p>
                <p 
                    class="field" 
                    @click="click('hideOld', !filters.hideOld)"
                    :class="{ 'active' : filters.hideOld }"
                >
                    {{ 'Hide Past Tasks' }}
                </p>
                <br />
                <p 
                    class="field" 
                    @click="click('hideCompleted', !filters.hideCompleted)"
                    :class="{ 'active' : filters.hideCompleted }"
                >
                    {{ 'Hide Completed Tasks' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        fields: {
            type: Array,
            required: true
        },
        filters: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        click (filterType, value) {
            this.$emit('clicked', {[filterType]: value});
        },
        toggleShow () {
            this.show = !this.show;
        }
    }
}

    
</script>

<style scoped>
    .filters {
        background: var(--blue-medium);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 6px -10px var(--black);
        margin-bottom: 20px;
        color: var(--white); 
    }

    .toggle-show {
        text-align: right;
        cursor: pointer;
    }

    .fields {
        margin-right: 20px;
        display: flex;
        flex-direction: column
    }

    .direction {
        margin-right: 20px;
    }

    .fields .field:not(:last-child) {
        margin-bottom: 5px;
    }

    .field-title {
        margin-bottom: 5px;
    }

    .field {
        cursor: pointer;
        display: inline-block;
        padding: 2px 5px;
    }

    .show {
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    @media(min-width: 600px) {
        show {
            justify-content: initial;
        }
    }

    .show .field-group:not(:last-child) {
        margin-bottom: 20px;
    }

    .active {
        border-radius: 5px;
        background: var(--white);
        color: var(--black);
        box-shadow: 0 10px 6px -10px var(--black);
    }

    @media(min-width: 600px) {
        .hide-options {
            margin-left: auto;
        }
    }

    .hide-options .field:not(:last-child) {
        margin-bottom: 5px;
    }

</style>