<template>
    <div class="border-2 rounded-lg border-transparent shadow-2xl min-h-full max-h-full overflow-y-auto bg-white p-10">
        <div class="flex place-content-between mb-7 pl-2 border-b-2 pb-4 w-full">
            <span class="font-bold text-4xl text-left ">Organizational Structure</span>
            <button v-if="!chart"
                class="hover:bg-gray-700 hover:text-white py-2 px-4 min-w-fit border-2 border-gray-700 rounded-xl"
                @click="generateChart">Generate Chart</button>
            <button v-if="chart"
                class="hover:bg-gray-700 hover:text-white py-2 px-4 min-w-fit border-2 border-gray-700 rounded-xl"
                @click="editChart">Edit Chart</button>
        </div>
        <template v-if="chart">
            <BinaryTree :employee="rootEmployee" root></BinaryTree>
        </template>
        <template v-else>
            <div class="text-left text-sm text-gray-600 mb-2 underline">Employees with no supervisor will not appear in the Organizational Chart!</div>
            <div class="p-2 w-full" v-for="employee in employees" :key="employee">
                <div class="bg-gray-100 rounded flex p-4 h-full items-center place-content-between">
                    <div class="flex">
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="3" class="text-gray-700 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                        </svg>
                        <span class="title-font font-medium">{{ employee.name }}</span>
                    </div>
                    <div class="inline-flex" v-if="!employee.senior">
                        <Input mode="select" label="Supervisor" v-model="employee.supervisor_id" no-label
                            :options="employee.supervisors"></Input>
                        <button
                            class="min-w-max ml-4 border-2 rounded-xl py-2 px-4 border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white"
                            @click.prevent="updateSupervisor(employee)">Set
                            Supervisor
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Input from '@/components/Input.vue';
import BinaryTree from '@/components/BinaryTree.vue';

export default {
    data() {
        return {
            chart: false,
            employees: [],
            rootEmployee: {}
        }
    },
    components: {
        BinaryTree,
        Input
    },
    created() {
        this.editChart()
    },
    methods: {
        generateChart() {
            this.$http.get('/api/chart')
                .then((res) => {
                    this.rootEmployee = res.data.data
                    this.chart = true
                    this.$alert.showSwal({
                        type: "success",
                        message: 'Organizational Chart Generated Successfully',
                        width: 350,
                    });
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        editChart() {
            this.$http.get('/api/employees/supervisors')
                .then((res) => {
                    this.employees = res.data
                    this.chart = false
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        updateSupervisor(employee) {
            this.$http.put(`/api/setsupervisor/${employee.id}`, employee)
                .then((res) => {
                    this.$alert.showSwal({
                        type: "success",
                        message: res.data.message,
                        width: 350,
                    });
                })
                .catch((err) => {
                    if (err.data) {
                        this.$alert.showSwal({
                            type: "error",
                            message: err.data?.message,
                            width: 350,
                        });
                    }
                })
        }
    }
}
</script>