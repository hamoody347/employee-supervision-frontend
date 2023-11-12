<template>
    <div class="h-[50px] bg-gray-100 flex items-center shadow-sm px-[20px] w-full py-[10px] z-10 border-b ">
        <div class="cursor-pointer w-[30px]" @click="$store.commit('toggleSideMenu')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class=" w-[25px] h-[25px]">
                <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
        </div>

        <div class="w-[calc(100%-30px)] flex">
            <div class="w-[calc(100%-200px)] flex justify-center ">
                <div class="flex items-center w-[500px]">
                    <label for="search" class="sr-only">Search</label>
                    <div class="relative w-full">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-auto text-gray-500 dark:text-gray-400" fill="currentColor"
                                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="search"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search...">
                    </div>
                </div>
            </div>
            <!-- User login -->
            <div class="w-[200px] ">
                <div class="flex items-center justify-start space-x-4" @click="toggleDrop">
                    <img class="w-10 h-10 rounded-full border-2 border-gray-50"
                        src="https://th.bing.com/th/id/OIP.BUKBU3OEkRGQRWJrUS4P3QHaHa?pid=ImgDet&rs=1" alt="">
                    <div class="font-semibold dark:text-white text-left">
                        <div class="text-black">{{ $store.state.user?.name }}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">{{ $store.state.user?.role }}</div>
                    </div>
                </div>
                <!-- Drop down -->
                <div v-show="showDropDown"
                    class="absolute right-[10px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1 text-left" role="none">
                        <router-link :to="{ name: 'profile' }" href="#"
                            class="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200" role="menuitem" tabindex="-1"
                            id="menu-item-0">Account settings</router-link>
                        <button href="#" class="text-gray-700 w-full text-left px-4 py-2 text-sm hover:bg-red-200"
                            role="menuitem" tabindex="-1" id="menu-item-2" @click.prevent="signOut">Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import { mapMutations } from 'vuex'
export default {
    data() {
        return { showDropDown: false }
    },
    methods: {
        toggleDrop() {
            this.showDropDown = !this.showDropDown
        },
        signOut() {
            this.$store.commit('logout');
            this.$router.push({ name: 'sign-in' })
        }
    }
}
</script>