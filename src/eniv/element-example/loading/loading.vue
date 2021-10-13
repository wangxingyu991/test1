<template>
  <div>
      <el-button  type="primary"  @click="api">提交</el-button>
  </div>
</template>

<script>
export default {
  methods:{
    api(){
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 3000);
    }
  }
}
</script>

<style>

</style>