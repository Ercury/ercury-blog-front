<template>
  <header class="header">
    <div :class="['blog-title', 'animate__animated', { 'animate__pulse': state.addPulseAnimate }]"
          @mouseover="mouseOver"
          @mouseleave="mouseLeave"
          @click="goHome">Ercury's Blog</div>
    <div class="menu">
      <li class="menu-list-item" v-for="item in state.menuList" @click="goPage(item.key)">{{ item.label }}</li>
    </div>
  </header>
</template>

<script lang='ts' setup>
import { CommonList } from '@/common/constant';
import { cloneDeep } from 'lodash';

const router = useRouter();

const state = reactive({
  // Menu list
  menuList: cloneDeep(CommonList.menuList),
  // title add animate
  addPulseAnimate: false
})

// turn to page home
const goHome = (): void => {
  router.push({ name: 'Home' });
}

// turn to page home
const goPage = (itemKey: string): void => {
  router.push({ name: itemKey });
}

// callback as mouse overs
const mouseOver = (): void => {
  state.addPulseAnimate = true
}

// callback as mouse left
const mouseLeave = (): void => {
  state.addPulseAnimate = false
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
}

.blog-title {
  width: 15%;
  height: inherit;
  font-family: 'Yapi SC Hanzipen SC';
  font-size: 30px;
  line-height: 50px;
  color: @menu-font-color;
  cursor: pointer;
  text-shadow: 1px 1px 3px @menu-font-color;
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
  position: relative;
  margin-right: 8%;
  color: @menu-font-color;
  font-weight: 700;
  cursor: pointer;
}

.menu-list-item::after {
  position: absolute;
  bottom: 0;
  content: '';
  display: block;
  background-color: #fff;
  transition: width .3s;
  width: .001%;
  border-radius: 2px;
  height: 2px;
  left: 0;

}

.menu-list-item:hover::after {
  width: 100%;
}

.menu-list-item:last-child {
  margin: 0;
}</style>