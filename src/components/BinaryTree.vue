<template>
    <template v-if="root">
        <div class="tree">
            <div v-for="(children, name) in employee" :key="name" class="node node--root">
                <div class="node__element">{{ name }}</div>
                <template v-if="children.length > 0">
                    <div class="node__bottom-line"></div>
                    <div :class="`node__children ${children.length === 1 ? 'single' : ''}`">
                        <template v-for="child in children" :key="child">
                            <BinaryTree :employee="child"></BinaryTree>
                        </template>
                    </div>
                </template>
            </div>
        </div>
    </template>

    <template v-else>
        <div v-for="(children, name) in employee" :key="name" class="node">
            <div class="node__element">{{ name }}</div>
            <template v-if="children.length > 0">
                <div class="node__bottom-line"></div>
                <div :class="`node__children ${children.length === 1 ? 'single' : ''}`">
                    <template v-for="child in children" :key="child">
                        <BinaryTree :employee="child"></BinaryTree>
                    </template>
                </div>
            </template>
        </div>
    </template>
</template>

<script>
export default {
    name: 'BinaryTree',
    props: {
        employee: {
            type: [Array, Object],
            default: () => {
                return []
            }
        },
        root: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.tree {
    --dark: #333;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.tree .node {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    position: relative;
}

.tree .node:not(.node--root)>.node__element::before {
    content: '';
    height: 20px;
    width: 1px;
    background-color: #dcdcdc;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: -20px;
    margin: auto;
}

.tree .node__element {
    border: 1px solid #ccc;
    border-radius: 16px;
    padding: 10px 12px;
    min-width: 60px;
    max-width: max-content;
    text-align: center;
    text-decoration-line: none;
    cursor: pointer;
    transition: .5s;
}

.tree .node__bottom-line {
    height: 20px;
    width: 1px;
    background-color: #dcdcdc;
}

.tree .node__element,
.tree .node__element::before,
.tree .node__children,
.tree .node__bottom-line {
    transition: all ease 0.2s;
}

.tree .node__children {
    display: flex;
    padding: 20px 0;
}

.tree .node__children:not(.single) {
    border-top: 1px solid #dcdcdc;
}

.tree .node__element:hover {
    border-color: var(--dark);
}

.tree .node__element:hover~.node__children .node__element::before {
    width: 2px;
    background-color: var(--dark);
}

.tree .node__element:hover~.node__bottom-line,
.tree .node__element:hover~.node__children .node__bottom-line {
    width: 2px;
    background-color: var(--dark);
}

.tree .node__element:hover~.node__children:not(.single),
.tree .node__element:hover~.node__children .node__children:not(.single) {
    border-top-width: 2px;
    border-color: var(--dark);
}
</style>