<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
  onLaunch(() => {
    console.log('App Launch');
    const token = uni.getStorageSync('token');
    if (token) {
      uni.switchTab({
        url: '/pages/message/Message',
      });
    }
  });
  onShow(() => {
    console.log('App Show');
  });
  onHide(() => {
    console.log('App Hide');
  });
</script>
<style></style>
