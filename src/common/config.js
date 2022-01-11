
export const EXAMPLE_CATEGORIES = [
    'image',
    'vector',
    'basic',
    'effects',
    'analyse',
    'transaction'
];



const URL_PARAMS = {};
(location.search || '').substr(1).split('&').forEach(function (item) {
    const kv = item.split('=');
    URL_PARAMS[kv[0]] = kv[1];
});

export {URL_PARAMS};

export const SUPPORT_WEBP = (function () {
    var elem = document.createElement('canvas');
    elem.width = elem.height = 1;
    if (!!(elem.getContext && elem.getContext('2d'))) {
        // was able or not to get WebP representation
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    // very old browser like IE 8, canvas not supported
    return false;
})();

export const SCRIPT_URLS = {
    localEChartsMinJS: 'http://localhost/echarts/dist/echarts.js',
    echartsMinJS: 'https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js',
    echartsDir: 'https://cdn.jsdelivr.net/npm/echarts@5',
    echartsStatMinJS: 'https://cdn.jsdelivr.net/npm/echarts-stat@latest/dist/ecStat.min.js',
    // echartsGLMinJS: 'http://localhost/echarts-gl/dist/echarts-gl.min.js',
    echartsGLMinJS: 'https://cdn.jsdelivr.net/npm/echarts-gl@2/dist/echarts-gl.min.js',
    datGUIMinJS: 'https://cdn.jsdelivr.net/npm/dat.gui@0.6.5/build/dat.gui.min.js',
    monacoDir: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.21.2/min/vs',
    aceDir: 'https://cdn.jsdelivr.net/npm/ace-builds@1.4.12/src-min-noconflict'
};
