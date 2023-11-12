<template>
    <div class="bg-gray-100 flex justify-center items-center h-screen">
        <!-- Left: Image -->
        <div class="w-1/2 h-screen hidden lg:flex lg:flex-col bg-gray-800 justify-center align-middle">
            <h1 class="text-white font-bold text-5xl">Placeholder Text</h1>
        </div>
        <!-- Right: Login Form -->
        <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
            <h1 class="text-2xl font-semibold mb-4">Login</h1>
            <form>
                <!-- Username Input -->
                <div class="mb-4">
                    <label for="email" class="block text-gray-600 text-left">Username</label>
                    <input type="text" id="email" name="email" placeholder="email"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" v-model="json['email']">
                </div>
                <!-- Password Input -->
                <div class="mb-4">
                    <label for="password" class="block text-gray-600 text-left">Password</label>
                    <input type="password" id="password" name="password" placeholder="password"
                        class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        autocomplete="off" v-model="json['password']">
                </div>
                <!-- Remember Me Checkbox -->
                <div class="mb-4 flex items-center">
                    <input type="checkbox" id="remember" name="remember" class="text-blue-500">
                    <label for="remember" class="text-gray-600 ml-2">Remember Me</label>
                </div>
                <!-- Forgot Password Link -->
                <div class="mb-6 text-gray-500 text-left">
                    <a href="#" class="hover:underline">Forgot Password?</a>
                </div>
                <!-- Login Button -->
                <button class="bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                    @click.prevent="login">Login</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'sign-in',
    data() {
        return { json: {}, user: {}, token: '' }
    },
    methods: {
        async login() {
            await this.$http.post("api/login", this.json)
                .then(async (res) => {
                    this.token = res.data.token
                    this.$store.commit('setToken', { token: this.token })
                    await this.getUser().then(() => {
                        const user = this.$store.state.user
                        this.$alert.showSwal({
                            type: "success",
                            message: `Welcome back! ${user.name}`,
                            width: 350,
                        });
                        this.$router.push({ name: 'dashboard' })
                    })
                }).catch((res) => {
                    if (res.response?.data) {
                        this.$alert.showSwal({
                            type: "error",
                            message: res.response.data.message,
                            width: 350,
                            timer: 5000
                        });
                    }
                });
        },

        async getUser() {
            const config = {
                headers: { Authorization: `Bearer ${this.token}` }
            };

            this.$http.defaults.headers.common = config['headers']

            await this.$http.get("api/user", config)
                .then((res) => {
                    this.user = res.data
                    this.$store.commit('setUser', { user: this.user })
                });
        }
    }
}
</script>