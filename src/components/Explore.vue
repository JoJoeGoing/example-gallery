<template>
  <div id="example-explore">
    <div id="left-container">
      <div id="left-chart-nav">
        <ul>
          <li v-for="category in EXAMPLE_CATEGORIES" :key="category">
            <a
              class="left-chart-nav-link scrollactive-item"
              :id="'left-chart-nav-' + category"
              :href="'#chart-type-' + category"
            >
              <img class="chart-icon" :src="icons[category]" />
              <span class="chart-name">{{ this.$t("chartTypes." + category) }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div id="explore-container">
      <div class="example-list-panel">
        <div v-for="categoryObj in exampleList" :key="categoryObj.category">
          <h3 class="chart-type-head" :id="'chart-type-' + categoryObj.category">
            {{ $t("chartTypes." + categoryObj.category) }}
            <span>{{ categoryObj.category }}</span>
          </h3>

          <div class="row" :id="'chart-row-' + categoryObj.category">
            <div
              class="col-xl-2 col-lg-3 col-md-4 col-sm-6"
              v-for="exampleItem in categoryObj.examples"
              :key="exampleItem.id"
            >
              <ExampleCard :example="exampleItem"></ExampleCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CHART_LIST from "../data/ol-data";
import { EXAMPLE_CATEGORIES } from "../common/config";
import { store } from "../common/store";
import LazyLoad from "vanilla-lazyload/dist/lazyload.esm";
import { useI18n } from "vue3-i18n";

const LAZY_LOADED_CLASS = "ec-shot-loaded";

export default {

  setup() {
    const { getLocale } = useI18n({ useScope: 'global' });
    store.locale = getLocale()
    const exampleListByCategory = {};
    const icons = {};

    EXAMPLE_CATEGORIES.forEach(category => {
      icons[category] = `/icon/${category}.svg`
    })

    function addExamples(list) {
      let categoryOrder = 0;
      do {
        let added = false;
        for (let i = 0; i < list.length; i++) {
          const example = list[i];

          if (typeof example.category === "string") {
            example.category = [example.category];
          }

          const categoryStr = (example.category || [])[categoryOrder];
          if (categoryStr) {
            added = true;
            let categoryObj = exampleListByCategory[categoryStr];
            if (!categoryObj) {
              categoryObj = {
                category: categoryStr,
                examples: [],
              };
              exampleListByCategory[categoryStr] = categoryObj;
            }
            categoryObj.examples.push(example);
          }
        }

        if (!added) {
          break;
        }
      } while (++categoryOrder && categoryOrder < 4); // At most 4 category
    }

    addExamples(CHART_LIST);
    return {
      shared: store,

      icons,
      EXAMPLE_CATEGORIES,

      exampleListByCategory,
    };
  },

  computed: {
    exampleList() {
      const list = [];
      for (let i = 0; i < EXAMPLE_CATEGORIES.length; i++) {
        const category = EXAMPLE_CATEGORIES[i];
        const categoryObj = this.exampleListByCategory[category];
        if (categoryObj && categoryObj.examples.length > 0) {
          list.push({
            category,
            examples: categoryObj.examples,
          });
        }
      }
      return list;
    },
  },

  mounted() {
    this._lazyload = new LazyLoad({
      elements_selector: "img.chart-area",
      load_delay: 400,
      class_loaded: LAZY_LOADED_CLASS,
    });
  }
};
</script>

<style lang="scss">
@import "../assets/style/color.scss";
@import "../assets/style/config.xl.scss";

$chart-nav-width: 200px;
$chart-icon-width: 25px;
$chart-icon-border: 1px;

$toolbar-height: 30px;

$nav-height: 50px;
$nav-active-bg: #5470c6;
$nav-hover-border: $nav-active-bg;

$nav-text-color: #6e7079;
$nav-hover-text-color: #464646;

$pd-basic: 10px;
$pd-sm: 6px;
$pd-lg: 20px;

#example-explore {
  background: $clr-bg;

  // Use this as scrollable viewport insteadof window because echarts-www has a viewport.
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;

  ::-webkit-scrollbar {
    height: 4px;
    width: 4px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
    background: #fff;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    width: 4px;
    min-height: 15px;
    background: rgba(50, 50, 50, 0.2) !important;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.5) !important;
  }
}

#explore-container {
  margin-left: $chart-nav-width + 20px;
  padding: 10px 10px;
  background-color: $clr-bg;
}

.example-list-panel {
  margin: 30px 15px 30px 15px;

  h3 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e1e5f2;
    font-weight: normal;
    color: #464646;
    font-size: 20px;
  }
  .chart-type-head span {
    font-size: 16px;
    padding-left: 5px;
    color: #949cb1;
    font-weight: 200;
  }
}

#left-container {
  position: sticky;
  left: 0;
  top: 0;
  float: left;
  height: calc(100%);
  width: $chart-nav-width;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

#toolbar {
  position: fixed;
  right: 30px;
  top: 20px;
  height: $toolbar-height;
  background-color: #fff;
  border-radius: calc($toolbar-height / 2);
  // color: #fff;
  padding: 4px 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .el-switch__label * {
    font-size: 12px;
    // color: #fff;
    text-transform: uppercase;
  }
  .el-switch__label.is-active {
    color: #181432;
  }
}

#left-chart-nav {
  background-color: #fff;
  overflow-y: hidden;
  color: #111;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);

  &:hover {
    overflow-y: auto;

    a {
      text-decoration: none;
    }
  }

  li {
    // transition: background-color 0.5s;
    cursor: pointer;

    a {
      height: 45px;
      padding: 10px 0 10px 20px;
      display: block;
      // transition: background-color 0.5s;
      text-decoration: none;
      color: $nav-text-color;

      .chart-name {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        margin-left: 10px;
      }

      .chart-icon {
        content: "";
        width: 20px;
        display: inline-block;
        border-radius: 50%;
        vertical-align: middle;

        svg {
          width: 100% !important;
          height: auto !important;
        }
      }

      &.active {
        background-color: $nav-active-bg;
        color: #fff;

        .chart-icon * {
          fill: #fff;
        }
      }

      &.active:hover {
        color: #fff;
      }
    }

    &:hover {
      border-right: 4px solid $nav-hover-border;

      a {
        color: $nav-hover-text-color;
      }
    }
  }
}

@media (max-width: 768px) {
  #left-container {
    display: none;
  }
  #explore-container {
    margin-left: 0;
  }
}
</style>