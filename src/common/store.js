
// import * as matter from 'gray-matter';
import { URL_PARAMS } from '../common/config';

export const store = {
    cdnRoot: '',
    version: '',
    locale: '',

    darkMode: URL_PARAMS.theme === 'dark',
    enableDecal: 'decal' in URL_PARAMS,
    renderer: URL_PARAMS.renderer || 'canvas',

    typeCheck: URL_PARAMS.editor === 'monaco',
    useDirtyRect: 'useDirtyRect' in URL_PARAMS,

    runCode: '',
    sourceCode: '',

    runHash: '',

    isMobile: window.innerWidth < 600,

    editorStatus: {
        type: '',
        message: ''
    }
};

export function loadExampleCode() {
    return new Promise((resolve) => {
        $.ajax(
            `/src/${URL_PARAMS.c}.js`,
            {
                dataType: 'text',
                success: (data) => {
                    resolve(data);
                }
            }
        );
    });
}

export function parseSourceCode(code) {
    return code.replace(/\/\*[\w\W]*?\*\//, '').trim();
}

let hashId = 123;
export function updateRunHash() {
    store.runHash = hashId++;
}