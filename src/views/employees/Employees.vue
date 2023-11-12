<template>
    <div class="border-2 rounded-lg border-transparent shadow-2xl min-h-full max-h-full overflow-y-auto bg-white p-10">
        <div class="flex place-content-between mb-7 pl-2 border-b-2 pb-4 w-full">
            <span class="font-bold text-4xl text-left ">Employees</span>
            <button class="hover:bg-gray-700 hover:text-white py-2 px-4 min-w-fit border-2 border-gray-700 rounded-xl"
                @click="$router.push({ name: 'add employee' })" v-if="user.role === 'admin'">Add
                Employee</button>
        </div>
        <div class="rounded-lg overflow-hidden">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="py-3 px-6">
                            #
                        </th>
                        <th scope="col" class="py-3 px-6 text-center">
                            Employee Name
                        </th>
                        <th scope="col" class="py-3 px-6 text-center">
                            Supervisor
                        </th>
                        <th scope="col" class="py-3 px-6 text-center">
                            Role
                        </th>
                        <th scope="col" class="py-3 px-6 text-right" v-if="user.role === 'admin'">
                            <span class="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 hover:dark:bg-gray-700"
                        v-for="(employee, index) in employees" :key="employee">
                        <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ index + 1 }}
                        </td>
                        <td class="py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ employee.name }}
                        </td>
                        <td class="py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ employee.supervisor?.name || (employee.senior ? 'Senior Supervisor' : 'Supervisor Deleted')
                            }}
                        </td>
                        <td class="py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ employee.user?.role }}
                        </td>
                        <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white text-right w-1/6"
                            v-if="user.role === 'admin'">
                            <button @click.prevent="editEmployee(employee.id)"
                                class="hover:bg-white hover:text-gray-700 p-1 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    class="w-4 h-4">
                                    <path
                                        d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                    <path
                                        d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                </svg>
                            </button>
                            <button @click.prevent="deleteEmployee(employee.id)"
                                class="hover:bg-red-700 hover:text-gray-50 p-1 rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    class="w-4 h-4">
                                    <path fill-rule="evenodd"
                                        d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'employees',
    data() {
        return {
            employees: [],
            user: JSON.parse(localStorage.getItem('user'))
        }
    },
    created() {
        this.$http.get('api/employees')
            .then((res) => {
                this.employees = res.data
            })
            .catch((err) => {
                console.log(err)
            })
    },
    methods: {
        deleteEmployee(id) {
            this.$alert.tableDelete({
                path: `/api/employees/${id}`
            }).then((res) => {
                if (res.isConfirmed) {
                    this.$http.get('api/employees').then((res) => {
                        this.employees = res.data
                    })
                }
            })
        },
        editEmployee(id) {
            this.$router.push({ name: 'edit employee', params: { id: id } })
        }
    }
}
</script>