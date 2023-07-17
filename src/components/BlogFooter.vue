<template>
  <div class="wrap">
    <div class="inner-wrap">
      <div class="content">
        <p class="footer-content-item gap-2">
          <span>© 2023</span>
          <span>-</span>
          <span class="copyrightYear">{{ new Date().getFullYear() }}</span>
          <span>by Ercury</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>

</script>

<style lang='less' scoped>
.wrap {
  position: relative;
  bottom: 0;
  left: 0;
  min-height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  // background-color: @view-body-bg-color;
}

.inner-wrap {
  display: flex;
  justify-content: space-between;
}

.content {
  display: flex;
  margin-right: 20px;
  text-size-adjust: 100%;
  font-size: 14px;
}

.footer-content-item {
  padding-left: 20px;
}

.gap-2 {
  display: flex;
  align-items: center;
  gap: 5px;
  tab-size: 4;
  color: #94A3B8;
}

.footer-content-item:first-child {
  padding-left: 0;
  vertical-align: baseline;
}
</style>