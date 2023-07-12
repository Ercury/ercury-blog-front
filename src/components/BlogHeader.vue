<template>
  <div class="header">
    <div class="blog-title" @click="goHome">Ercury's Blog</div>
    <div class="menu">
      <li class="menu-list-item" v-for="item in state.menuList" @click="goPage(item.key)">{{ item.label }}</li>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { CommonList } from '@/common/constant';
import { cloneDeep } from 'lodash';

const router = useRouter();

const state = reactive({
  // menu列表
  menuList: cloneDeep(CommonList.menuList),
})

const goHome = (): void => {
  router.push({ name: 'Home' });
}

const goPage = (itemKey: string): void => {
  router.push({ name: itemKey });
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(3px);
  background-color: @view-body-bg-color;
}
.blog-title {
  width: 15%;
  height: inherit;
  font-family: 'Yapi SC Hanzipen SC';
  font-size: 30px;
  line-height: 50px;
  color: #fff;
  cursor: pointer;
}
.menu {
  display: flex;
  height: inherit;
  backdrop-filter: blur(.8px);
  justify-content: center;
  align-items: center;
  flex-basis: 20%;
}
.menu-list-item {
  margin-right: 8%;
  color: #fff;
  cursor: pointer;
}

.menu-list-item:hover {
  color: #DDEEFF;
}

.menu-list-item:last-child {
  margin: 0;
}
</style>