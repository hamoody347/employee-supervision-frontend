<template>
    <div class="w-screen h-screen flex">
        <!-- Side bar -->
        <AsideMenu></AsideMenu>
        <div class="w-full h-full bg-gray-400">
            <Header></Header>
            <div class="h-[calc(100vh-50px)] bg-gray-50 p-[20px] overflow-auto">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
import AsideMenu from './AsideMenu.vue'
import Header from './Header.vue'
export default {
    components: {
        AsideMenu,
        Header
    },
}
</script>