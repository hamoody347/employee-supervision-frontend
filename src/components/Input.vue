<!-- eslint-disable vue/no-mutating-props -->
<template>
    <label v-if="!noLabel" class="block text-gray-600 text-left mb-1">{{ label }}</label>
    <template v-if="mode === 'input'">
        <input :type="type" :placeholder="placeholder" v-model="localModelValue"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            @change="$emit('update:modelValue', localModelValue)">
    </template>
    <template v-else>
        <select name="supervisor" @change="$emit('update:modelValue', localModelValue)" v-model="localModelValue"
            class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
            <option hidden disabled :selected="!modelValue">Select an option</option>
            <option v-for="option in options" :key="option" :selected="option.id === modelValue" :value="option.id">{{
                option.name }}</option>
        </select>
    </template>
</template>

<script>
export default {
    name: "Input",
    props: {
        // eslint-disable-next-line vue/require-default-prop
        modelValue: [String, Number],
        type: {
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            default: 'Label!'
        },
        placeholder: {
            type: String,
            default: ''
        },
        noLabel: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            default: 'input'
        },
        options: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    emits: ['update:modelValue'],
    watch: {
        modelValue: {
            immediate: true,
            handler(newInput) {
                this.localModelValue = newInput;
            }
        },
    },
    data() {
        return { localModelValue: this.modelValue }
    }
}
</script>