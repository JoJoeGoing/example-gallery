export default {
    en: {
        editor: {
            run: 'Run',
            format: 'Format',
            errorInEditor: 'Errors exist in code!',
            chartOK: 'Chart has been generated successfully, ',
      
            darkMode: 'Dark Mode',
            enableDecal: 'Decal Pattern',
            // lightMode: 'Light Mode',
      
            renderCfgTitle: 'Render',
            renderer: 'Renderer',
            useDirtyRect: 'Use Dirty Rect',
      
            randomData: 'Random',
      
            download: 'Download',
            screenshot: 'Screenshot',
      
            edit: 'Edit',
      
            tabEditor: 'Edit Code',
            tabFullCodePreview: 'Full Code',
            tabOptionPreview: 'Option Preview',
            minimalBundle: 'Minimal Bundle',
      
            tooltip: {
              jsMode: 'JavaScript',
              tsMode: 'TypeScript. Provides Better Intelligent',
              noTs: 'No Available TypeScript Code',
      
              gotoDoc: 'Go To Documentation'
            },
      
            codeChangedConfirm:
              "Modified code will be lost. Do you wan't to continue?",
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
          },

        chartTypes: {
            image:'Image Layer',
            vector: 'Vector Layer',
            basic: 'Basic Function',
            effects: 'Feature Effect',
            analyse: ' Map Analyse',
            transaction: 'Geoserver Transaction'
        }
    },
    zh: {
        editor: {
            run: '运行',
            format: '格式化',
            errorInEditor: '编辑器内容有误！',
            chartOK: '图表已生成, ',
      
            darkMode: '深色模式',
            enableDecal: '无障碍花纹',
      
            randomData: '随机数据',
            // lightMode: '浅色模式',
      
            renderCfgTitle: '渲染设置',
            useDirtyRect: '开启脏矩形优化',
            renderer: '渲染模式',
            download: '下载示例',
            screenshot: '截图',
      
            edit: '编辑',
            monacoMode: '开启类型检查',
      
            tabEditor: '代码编辑',
            tabFullCodePreview: '完整代码',
            tabOptionPreview: '配置项',
            minimalBundle: '按需引入',
      
            tooltip: {
              jsMode: 'JavaScript 代码编辑',
              tsMode: 'TypeScript 代码编辑，提供更好的代码补全和类型检查',
              noTs: '该示例暂无 TypeScript 版本',
      
              gotoDoc: '查看文档'
            },
      
            codeChangedConfirm: '已经修改过的代码将会丢失，是否确认继续？',
      
            confirmButtonText: '确认',
            cancelButtonText: '取消'
          },

        chartTypes: {
            image:'栅格瓦片图层',
            vector: '矢量图层',
            basic: '基本功能',
            effects: '二维要素特效',
            analyse: '二维地图分析',
            transaction: '事务处理'
        }
    }
};