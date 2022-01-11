<template>
<div class="example-list-item">
    <a target="_blank" class="example-link" :href="exampleLink">
        <img class="chart-area" src="../assets/placeholder.jpg"  />
        <h4 class="example-title">{{currentTitle}}</h4>
        <h5 class="example-subtitle" v-if="showSubtitle">{{subtitle}}</h5>
    </a>
</div>
</template>


<script>
import { computed, toRefs } from "vue"
import { URL_PARAMS } from "../common/config"
import { store } from "../common/store"

export default {
    props: {
        example: {
            type: Object,
            required: true,
            default: {
                titleCN: '',
                title: '',
                id: ''
            }
        }
    },
    setup(props) {
        const { title, titleCN, id } = props.example

        const currentTitle = computed(() => { return store.locale === 'zh' ? titleCN : title })

        const showSubtitle = computed(() => { return store.locale === 'zh' })

        const subtitle = computed(() => { return title })

        const exampleLink = computed(() => {
            const hash = ['c=' + id];

            if ('local' in URL_PARAMS) {
                hash.push('local')
            }
            if ('useDirtyRect' in URL_PARAMS) {
                hash.push(useDirtyRect)
            }
            return '/editor/index.html'
        })
        return {
            currentTitle,
            subtitle,
            showSubtitle,
            exampleLink
        }

    },
}
</script>
<style lang="scss">
@import "../assets/style/color.scss";

.example-list-item {
    width: 100%;
    max-width: 350px;
    margin-bottom: 30px;

    border-radius: 2px;

    .example-link {
        position: relative;
        display: block;

        .chart-area {
            width: 100%;
            height: 100%;
            border-radius: 5px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
            margin-top: 10px;
        }

        .example-title {
            color: $clr-primary;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;

            padding: 10px 10px 2px 10px;
            margin: 0;
            font-weight: normal;
            font-size: 14px;
            text-align: center;
        }

        .example-subtitle {
            font-size: 12px;
            text-align: center;
            color: #aaa;
            font-weight: normal;
            // font-weight: 200;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin: 3px 0 0 0;
        }
    }

    .example-info {
        padding: 5px 0;

        font-weight: bold;

        .chart-icon {
            float: right;

            .chart-delete {
                display: none;

                transition: 1s;
            }
        }
    }

    &:hover .example-info .chart-icon .chart-delete {
        display: block;

        text-decoration: none;
    }
}
</style>