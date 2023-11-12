<!-- eslint-disable vue/no-mutating-props -->
<template>
    <div class="col-12">
        <label :class="noTopMargin ? '' : 'mt-4'">{{ label }}</label>
        <select :id="choiceId" v-model="localModelValue" class="form-control" :name="choiceId"
            @change="$emit('update:modelValue', localModelValue)">
        </select>
    </div>
</template>

<script>
import Choices from "choices.js";

export default {
    name: "Choice",
    props: {
        // eslint-disable-next-line vue/require-default-prop
        modelValue: null,
        options: {
            type: Array,
            default: () => {
                return [];
            }
        },
        choiceId: {
            type: String,
            default: 'choice'
        },
        label: {
            type: String,
            default: 'Drop Down'
        },
        searchable: {
            type: Boolean,
            default: true
        },
    },
    emits: ['update:modelValue'],
    data() {
        return { choice: null, localModelValue: this.modelValue }
    },
    watch: {
        options: {
            immediate: true, // Populate on component creation
            handler(newOptions) {
                this.parsedOptions = newOptions.map(option => ({
                    label: option.name,
                    value: option.id,
                    selected: option.id == this.modelValue ? true : false
                }));
                if (this.choice) {
                    this.choice.setChoices(this.parsedOptions);
                }
            },
        },
        mounted() {
            if (document.getElementById(this.choiceId)) {
                let element = document.getElementById(this.choiceId);
                this.choice = new Choices(element, {
                    searchEnabled: this.searchable,
                    removeItemButton: true,
                    allowHTML: false
                });
                this.choice.setChoices(this.parsedOptions);
            }
        },
    }
};
</script>
