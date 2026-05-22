# wujie-demo

wujie微前端

## wujie-main 主项目

```js
import WujieVue from "wujie-vue3";
import hostMap from "./hostMap";
import lifecycles from "./lifecycle";

const { setupApp, preloadApp, bus } = WujieVue;
createApp(App).use(WujieVue).use(router).mount("#app");

setupApp({
  name: "vue",
  url: hostMap("//localhost:7500/"),
  exec: true,
  // props,
  ...lifecycles,
});

setupApp({
  name: "react",
  url: hostMap("//localhost:7501/"),
  exec: true,
  // props,
  alive: true,
  ...lifecycles,
});
```

## 子项目

如果是wujie的子项目，调用wujie的方法加载组件，否则正常用vue加载组件

```js
if (window.__POWERED_BY_WUJIE__) {
  let instance: any;
  window.__WUJIE_MOUNT = () => {
    const router = createRouter({ history: createWebHashHistory(), routes });
    instance = createApp(App).use(router);
    instance.mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    instance.unmount();
  };
  // module脚本异步加载，应用主动调用生命周期
  window.__WUJIE.mount();
} else {
  createApp(App)
    .use(createRouter({ history: createWebHashHistory(), routes }))
    .mount("#app");
}
```