<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { getListInfo } from '../api/demo';

  const res = ref();

  const demoParams = reactive({
    field1: 'field1',
    field2: 'field2',
  });

  async function getInfo() {
    const data = await getListInfo(demoParams);
    res.value = data;
  }

  onMounted(() => {
    getInfo();
  });
</script>

<template>
  <div>{{ res }}</div>
</template>
