const map = {
  "//localhost:7500/": "//正式环境/demo-vue/",
  "//localhost:7501/": "//正式环境/demo-react/",
};

export default function hostMap(host) {
  if (process.env.NODE_ENV === "production") return map[host];
  return host;
}
