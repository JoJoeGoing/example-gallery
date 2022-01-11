<template>
<div class="ace-editor-main" v-loading="loading"></div>
</template>

<script>

import {store} from '../common/store';
export default {

    props: ['initialCode'],

    data() {
        return {
            shared: store,
            loading: false
        }
    },

    mounted() {
        this.loading = true;
    },

    methods: {
        setInitialCode(code) {
        }
    },

    watch: {
        initialCode(newVal) {
            this.setInitialCode(newVal);
        }
    }
}
</script>

<style lang="scss">
.ace-editor-main {
    font-family: 'Source Code Pro', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace;
    font-size: 12px;
    line-height: 18px;
    padding: 10px;
    // height: 100%;

    // Fix safari
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color:red
}
</style>