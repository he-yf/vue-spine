import { defineAsyncComponent } from 'vue'

//  获取目录下的vue组件
const components = import.meta.glob('@/components/*.vue')

export default function install(app: any) {
  Object.keys(components).forEach((key) => {
    // 正则提取文件名
    const name = key.replace(/(.*\/)*([^.]+).*/ig,"$2")
    const component = defineAsyncComponent(() => components[key]() as any)
    // 注册
    app.component(name, component)
  })
}

