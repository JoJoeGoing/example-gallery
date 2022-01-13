<template>
    <div id="main-container">
        <div
            id="editor-left-container"
            :style="{ width: leftContainerSize + '%' }"
            v-if="!shared.isMobile"
        >
            <el-tabs v-model="currentTab" type="border-card">
                <el-tab-pane :label="$t('editor.tabEditor')" name="code-editor">
                    <el-container>
                        <el-header id="editor-control-panel">
                            <div class="languages">
                                <a :class="{ js: true, active: !shared.typeCheck }">JS</a>
                                <a
                                    :class="{
                                        ts: true,
                                        active: shared.typeCheck,
                                        disabled: !hasTs,
                                    }"
                                >TS</a>
                            </div>
                            <div class="editor-controls">
                                <a class="btn btn-default btn-sm run" @click="disposeAndRun">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>{{ $t("editor.run") }}</span>
                                </a>
                            </div>
                        </el-header>
                        <el-main>
                            <CodeAce id="code-panel" :initialCode="initialCode"></CodeAce>
                        </el-main>
                    </el-container>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div
            class="handler"
            id="h-handler"
            @mousedown="onSplitterDragStart"
            :style="{ left: leftContainerSize + '%' }"
        ></div>
        <Preview
            :inEditor="true"
            class="right-container"
            ref="preview"
            :style="{
                width: 100 - leftContainerSize + '%',
                left: leftContainerSize + '%'
            }"
        ></Preview>
    </div>
</template>

<script>
import { store, loadExampleCode, parseSourceCode } from "../common/store";
import { URL_PARAMS } from "../common/config";

export default {
    data() {
        return {
            mousedown: false,
            leftContainerSize: 40,
            shared: store,
            initialCode: "",

            currentTab: "code-editor",
        };
    },

    computed: {
        hasTs() {
            return false;
        },
    },

    mounted() {
        loadExampleCode().then((code) => {
            store.sourceCode = this.initialCode = parseSourceCode(code);
        });

        window.addEventListener("mousemove", (e) => {
            if (this.mousedown) {
                let percentage = e.clientX / window.innerWidth;
                percentage = Math.min(0.9, Math.max(0.1, percentage));
                this.leftContainerSize = percentage * 100;
            }
        });

        window.addEventListener("mouseup", (e) => {
            this.mousedown = false;
        });
    },

    methods: {
        onSplitterDragStart() {
            this.mousedown = true;
        },
        disposeAndRun() {
            // this.$refs.preview.refreshAll();
        },
    },
};
</script>

<style lang="scss">
@import "../assets/style/color.scss";

$control-panel-height: 30px;
$pd-basic: 10px;
$handler-width: 5px;

#main-container {
    .handler {
        position: absolute;
        left: 50%;

        top: 0;
        bottom: 0;
        width: $handler-width;

        cursor: col-resize;
        z-index: 100;
        background-color: transparent;
        border-left: 1px solid #ececec;
    }
}

#editor-left-container {
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;

    width: 50%;

    .el-tab-pane {
        height: 100%;

        .el-container {
            width: 100%;
            height: 100%;
        }

        .el-header {
            height: $control-panel-height !important;
            position: relative;
            z-index: 10;
            padding: 0;
        }
        .el-main {
            padding: 0;
            position: relative;

            ::-webkit-scrollbar {
                height: 8px;
                width: 8px;
                transition: all 0.3s ease-in-out;
                border-radius: 2px;
            }

            ::-webkit-scrollbar-button {
                display: none;
            }

            ::-webkit-scrollbar-thumb {
                width: 8px;
                min-height: 15px;
                background: rgba(50, 50, 50, 0.6) !important;
                transition: all 0.3s ease-in-out;
                border-radius: 2px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: rgba(0, 0, 0, 0.5) !important;
            }
        }
    }

    .el-tabs {
        box-shadow: none;
    }

    .el-tabs--border-card > .el-tabs__header {
        border-bottom: none;
    }

    .el-tabs__content {
        position: absolute;
        top: 34px;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0;
    }

    .el-tabs__item {
        height: 34px;
        line-height: 34px;
    }
}

#editor-control-panel,
#full-code-generate-config {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

#option-outline {
    // height: 100%;
    // Fix safari
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    font-size: 13px;

    font-family: "Source Code Pro", "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
        monospace;

    .el-icon-document {
        margin-left: 5px;
        font-size: 1rem;

        &:hover {
            text-decoration: underline;
        }
    }
}

#full-code-generate-config {
    .full-code-generate-config-label {
        height: $control-panel-height;
        line-height: $control-panel-height;
        vertical-align: middle;
        margin: 0 0 0 20px;
    }

    .el-switch {
        margin-right: 10px;
    }

    .el-switch__label {
        margin-left: 8px;
        margin-top: -2px;
    }
    .el-switch__label * {
        font-size: 12px;
    }
}

#editor-control-panel {
    .setting-panel {
        display: inline-block;

        .btn-group + .btn-group {
            margin-left: $pd-basic;
        }
    }

    .languages {
        display: inline-block;
        padding: 2px 10px;
        font-weight: bold;

        a {
            display: inline-block;
            padding: 3px 10px;
            margin-left: 5px;
            vertical-align: middle;
            cursor: pointer;

            &.ts {
                color: #3178c6;
            }

            &.ts.disabled {
                color: #ddd;
                cursor: default;

                &:hover {
                    text-decoration: none;
                }
            }

            &.js {
                color: #000;
                cursor: default;

                &:hover {
                    text-decoration: none;
                }
            }

            &.active {
                font-size: 12px;
                border-radius: 3px;

                &.js {
                    background: #f7df1e;
                    color: #000;
                }

                &.ts {
                    background: #3178c6;
                    color: #fff;
                }
            }
        }
    }

    .editor-controls {
        float: right;

        .el-switch__label {
            margin-top: -3px;
        }
        .el-switch__label * {
            font-size: 12px;
        }

        .btn {
            border-radius: 0;
            margin-left: $pd-basic;
            border: none;
            height: 30px;

            background: none;
            color: $clr-text;

            & > * {
                display: inline-block;
                vertical-align: middle;
            }

            svg {
                width: 15px;
                height: 15px;
            }

            &.run {
                color: #fff;
                background-color: #409eff;
            }
            &.run:hover {
                background-color: lighten($color: #409eff, $amount: 5);
            }
        }
    }
}

.right-container {
    position: absolute;
    right: 0;

    width: 50%;
    height: 100%;
    padding: 0;
    padding-left: $handler-width;
    border: none;
    z-index: 30;

    background: $clr-bg;
}
</style>
