import { createApp, h } from 'vue'
import { createI18n } from 'vue3-i18n'
import messages from './common/i18n';
import EditorPage from './components/Editor.vue';
import ExplorePage from './components/Explore.vue';
import { store } from './common/store';
import VueScrollactive from 'vue-scrollactive';



export function init(el, option) {
    const i18n = createI18n({
        locale: option.locale,
        fallbackLocale: 'en',
        messages
    });
    store.cdnRoot = option.cdnRoot;
    store.version = option.version;
    store.locale = option.locale || 'en';


    if (typeof el === 'string') {
        el = document.querySelector(el);
    }
    if (!el) {
        throw new Error('Can\'t find el.');
    }

    const container = document.createElement('div');
    el.appendChild(container);

    const app = createApp({
        render: x => {
            return h(({
                editor: EditorPage,
                explore: ExplorePage,
            })[option.page] || ExplorePage)
        }
    })
    app.use(VueScrollactive);
    app.use(i18n);

    app.mount(el)
}