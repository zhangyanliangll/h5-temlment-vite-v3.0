## usenNvigate 封装

> 主要是意在解决在 配置公共跳转方法
> _该方法仅提供一种实现方式，具体可根据自己页面业务复杂程度而定_

### 使用方法

```js
import { defineComponent } from 'vue'
import useRouter from '@/hooks/user-navigate';

<script lang="ts">

export default defineComponent({
    setup() {
     const { navigateTo } = useRouter()
  }
</script>;
```

详见 usenNvigate/index.ts
