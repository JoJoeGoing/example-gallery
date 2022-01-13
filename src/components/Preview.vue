<template>
  <div>
    <div class="right-panel" id="chart-panel" :style="{ background: backgroundColor }">
      <iframe class="chart-container" :srcdoc="state.src"></iframe>
    </div>
  </div>
</template>

<script>
import {reactive } from '@vue/runtime-core';

import { store } from "../common/store";
import { URL_PARAMS } from "../common/config"

export default {
  props: ['inEditor'],

  setup() {
    const state = reactive({
      src: ''
    })

    fetch('/templete.html').then(res => res.text()).then(html => {
      let src = html.replace(/\$\$name/g, URL_PARAMS.c)
      state.src = src.replace(/\$\$content/g, store.sourceCode)
    })

    return {
      shared: store,
      debouncedTime: undefined,
      backgroundColor: '',
      autoRun: true,
      loading: false,
      allEchartsVersions: [],
      state
    };
  },


  computed: {

  },

  watch: {

  },

  methods: {
  }
};
</script>


<style lang="scss">
@import "../assets/style/color.scss";
#chart-panel {
  position: absolute;
  // top: $control-panel-height;
  top: 42px;
  right: 15px;
  bottom: 50px;
  left: 15px;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
  border-radius: 5px;
  background: #fff;
  overflow: hidden;

  // padding: 10px;

  .ec-debug-dirty-rect-container {
    left: 10px !important;
    top: 10px !important;
    right: 10px !important;
    bottom: 10px !important;

    .ec-debug-dirty-rect {
      background-color: rgba(255, 0, 0, 0.2) !important;
      border: 1px solid red !important;
    }
  }

  .chart-container {
    position: relative;
    height: 100%;
    width: 100%;
    border-width: 0px;
  }
}

.render-config-container {
  .el-radio-group {
    label {
      margin-bottom: 0;
    }
  }
}

#tool-panel {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding-top: 5px;
  padding-left: 15px;

  * {
    font-size: 12px;
  }

  .render-config-trigger {
    cursor: pointer;
    font-weight: 500;
    margin-left: 10px;
  }
  .version-select {
    width: 80px;
    margin-left: 10px;
  }
  .random {
    margin-left: 10px;
  }

  label {
    margin-bottom: 0;
  }

  .left-panel {
    float: left;
  }

  .left-panel > * {
    vertical-align: middle;
    display: inline-block;
  }

  .tool-label {
    font-weight: bold;
    text-transform: uppercase;
    margin-left: 20px;
  }

  .edit {
    float: right;
    margin-right: 15px;
    cursor: pointer;
  }
}

.full {
  #chart-panel {
    top: 40px;
    right: 5px;
    bottom: 5px;
    left: 5px;
    box-shadow: rgba(10, 9, 9, 0.1) 0px 0px 5px;
  }
  #tool-panel {
    padding-left: 5px;
    .download,
    .edit {
      margin-right: 5px;
    }
  }
}

#preview-status {
  overflow: hidden;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  height: 30px;

  padding: 0 20px;

  // border-top: 1px solid $clr-border;
  font-size: 0.9rem;

  .screenshot,
  .download,
  .edit {
    margin-right: 15px;
    cursor: pointer;
  }
  .screenshot {
    margin-right: 5px;
    width: 25px;
    height: 25px;
    margin-top: 2px;
  }

  .left {
    float: left;
    & > * {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .right {
    float: right;
  }
  #run-log {
    line-height: 25px;
    .run-log-time {
      color: $clr-text;
      display: inline-block;
      margin-right: 10px;
      font-size: 12px;
    }

    .run-log-type-info {
      color: $clr-text;
      font-size: 12px;
    }

    .run-log-type-warn {
      color: $clr-warn;
    }

    .run-log-type-error {
      color: $clr-error;
    }
  }
}

.dg.main * {
  box-sizing: content-box;
}
.dg.main input {
  line-height: normal;
}

.dg.main.a {
  overflow-x: visible;
}

.dg.main .c {
  select {
    color: #000;
  }
}
</style>
