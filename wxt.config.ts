import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
    extensionApi: 'chrome',
    modules: ['@wxt-dev/module-react'],
    srcDir: 'src',

    manifest: {
        permissions: ['tabs', 'storage', 'idle'],
        host_permissions: ['https://developer.chrome.com/*'],
    },
});
