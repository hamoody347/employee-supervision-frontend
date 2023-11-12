<template>
    <div class="w-[400px] h-full bg-gray-200 text-white duration-300" v-show="$store.state.showSideMenu">
        <div class="h-[50px] bg-gray-900 flex justify-start items-center">
            <div class="px-[20px]">
                <h3 class="font-bold text-xl">Employee Supervisor</h3>
            </div>
        </div>
        <div class="h-[calc(100vh-50px)] bg-gray-800 py-[20px]">
            <div class="flex flex-col justify-between h-full px-[20px] space-y-[10px]">
                <div class=" flex flex-col justify-between space-y-[10px]">
                    <router-link to="/"
                        class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
                        <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z">
                            </path>
                        </svg>
                        Dashboard
                    </router-link>
                    <router-link to="/employees"
                        class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-200 hover:text-gray-800  transition duration-400 ease-in-out">
                        <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Employees
                    </router-link>
                    <router-link to="/oc"
                        class="inline-flex relative items-center py-[10px] px-[10px] w-full text-sm font-medium rounded-md border-gray-200 hover:bg-gray-300  hover:text-gray-800 transition duration-400 ease-in-out">
                        <svg aria-hidden="true" class="mr-2 w-[25px] h-[25px] fill-current" fill="currentColor"
                            viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Organizational Chart
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
}
</script>