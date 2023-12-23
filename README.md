# vue-spine

这是一个vue中使用的spine动画组件


## 使用方式

```vue
<script setup lang="ts">
import { computed, ref } from 'vue';

  // 根据动画名加载资源
  const animSource = computed(() => {
    // 建议放置在public中， 本地文件路径动态时若有问题建议，获取其中一个，再replace对应名称
    const atlas_href = new URL(`assets/name.atlas`, import.meta.url).href;
    const json_href = new URL(`assets/name.json`, import.meta.url).href
    return {
      atlas: atlas_href,
      json: json_href,
    };
  });
  // 效果动画ref
  const effectAniRef = ref(null);
  // 效果动画状态监听
  const animStatusChange = (status: "start" | "interrupt" | "end" | "dispose" | "complete" | "event", _entry: any, _event: any) => {
    console.log("animStatusChange", status);
  };
</script>

<template>
  <div style="width: 100px;height: 100px;">
    <spine-item
      ref="effectAniRef"
      class="anim_effect"
      animation="animation"
      :loop="false"
      :atlas-url="animSource.atlas"
      :json-url="animSource.json"
      :animStatusChange="animStatusChange"
    ></spine-item>
  </div>
</template>
```