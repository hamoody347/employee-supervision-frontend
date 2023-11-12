<template>
    <div class="bg-white border border-transparent rounded-lg shadow-2xl  p-10">
        <div class="flex place-content-between mb-7 pl-2 border-b-2 pb-4 w-full">
            <span class="font-bold text-4xl text-left ">Edit Employee</span>
        </div>
        <form>
            <div class="columns-2 gap-10 mb-4">
                <Input type="text" label="Name" placeholder="Ahmed Abdelsalam" v-model="json['name']"></Input>
                <Input type="email" label="Email" placeholder="ahmed@example.com" v-model="json['email']"></Input>
            </div>
            <!-- <div class="columns-2 gap-10 mb-4">
                <Input type="password" label="Password" placeholder="********" v-model="json['password']"></Input>
                <Input type="password" label="Confirm Password" placeholder="********"
                    v-model="json['password_confirmation']"></Input>
            </div> -->
            <div :class="{ 'columns-2 gap-10 mb-4': !json['senior'], 'columns mb-4': json['senior'] }">
                <Input mode="select" label="Employee Role" v-model="json['user']['role']" :options="roles"></Input>
                <Input v-if="!json['senior']" mode="select" label="Supervisor" v-model="json['supervisor_id']"
                    :options="data"></Input>
            </div>

            <div class="mb-4 flex items-center">
                <input type="checkbox" id="senior" name="senior" v-model="json['senior']">
                <label for="senior" class="text-gray-600 ml-2">Senior Supervisor? <span class="text-sm">(Will replace the
                        current
                        one)</span></label>
            </div>

            <div class="block align-middle text-left border-t-2 pt-4 mt-20">
                <button class="hover:bg-gray-700 hover:text-white py-2 px-4 min-w-fit border-2 border-gray-700 rounded-xl"
                    @click.prevent="submit">Submit</button>
                <button class="bg-red-700 hover:bg-red-600 hover:border-red-600 text-white py-2 px-4 min-w-fit border-2
                    border-red-700 rounded-xl ml-2" @click.prevent="$alert.back">Cancel</button>
            </div>
        </form>
    </div>
</template>
<script>
import Input from '@/components/Input.vue';
export default {
    name: "edit employee",
    components: {
        Input
    },
    data() {
        return { json: {}, data: [], roles: [{ id: 'user', name: "User" }, { id: 'admin', name: "Admin" }] }
    },
    methods: {
        submit() {
            console.log(this.json)
            const id = this.$router.currentRoute.value.params.id
            this.$http.put(`api/employees/${id}`, this.json)
                .then((res) => {
                    this.$alert.showSwal({
                        type: "success",
                        message: res.data.message,
                        width: 350,
                    });
                    this.$router.push({ name: 'employees' })
                }).catch((res) => {
                    if (res.data) {
                        this.$alert.showSwal({
                            type: "error",
                            message: res.data?.message,
                            width: 350,
                        });
                    }
                })
        }
    },
    created() {
        const id = this.$router.currentRoute.value.params.id
        this.$http.get('/api/employees')
            .then((res) => {
                this.data = res.data
            })
            .catch((err) => {
                console.log(err)
            });

        this.$http.get(`/api/employees/${id}`)
            .then((res) => {
                this.json = res.data
                this.json['senior'] = this.json['senior'] ? true : false

            })
            .catch((err) => {
                console.log(err)
            })
    }
}
</script>