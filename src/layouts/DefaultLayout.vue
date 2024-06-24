<template>
  <div :class="$style.layout">
    <HeaderComponent :class="$style.header" />
    <main :class="$style.content">
      <slot></slot>
    </main>
    <FooterComponent :class="$style.footer"/>
  </div>
</template>
<script setup lang="ts">
import HeaderComponent from '@/components/HeaderComponent'
import FooterComponent from '@/components/FooterComponent'

</script>
<style module>
.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

.header {
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 10;
}

.content {
  flex: 1;
  margin-top: 60px;
  margin-bottom: 60px;
  width: 100%;
  z-index: 1;
}

.footer {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 10;
}

@media (min-width: 768px) {
  .navigation-drawer {
    width: 240px;
  }
}

</style>
