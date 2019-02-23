<template>
  <div id="lm_data-app">
    <div class="title">
      <h2>
        <span id="messageManager">学习小组报表模板 —— <router-link to="/main">学习小组选课详情</router-link><span>{{showTitle}}</span></span>
      </h2>
    </div> 
    <router-view></router-view>   
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      showTitle: ''
    }
  },
  watch: {
    $route(route){
      console.log('watch', route);
      switch (route.name) {
        case 'home':
          return this.showTitle = ''
        case 'increase':       
          return this.showTitle = '——新增/修改'
        case 'check':
          return this.showTitle = '——查看'
        default: 
          break;
      }
    }
  },
  created () {
    
  },
  activated() {

  },
  components: {

  }
}
</script>

<style>

</style>
