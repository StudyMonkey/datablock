<template>
  <div id="lm_data-app">
    <div class="title">
      <h2>
        <span id="messageManager">学习小组报表 —— <router-link to="/main">学习小组选课详情</router-link><span>{{showTitle}}</span></span>
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
  async created () {
    const token = this.getCookie('loginToken');
    console.log(token);
    if ( token === '' || token === null ){
      this.$message.error('发生错误，请返回重新登录')
      return false
    }
    const inputVal = document.getElementById('model_key').value;
    const res = await this.$http.get(this.httpUrl+'/GetTemplateId/?template_tag='+ inputVal +'&token='+token);
    this.$root.token = token;
    this.$root.template_id = res.data.data.template_id;
    console.log(111);    
    this.$router.push('/main')
  }, 
  methods: {
    getCookie(name){ //获取指定名称的cookie值
      // (^| )name=([^;]*)(;|$),match[0]为与整个正则表达式匹配的字符串，match[i]为正则表达式捕获数组相匹配的数组；
      var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
      if(arr != null) {
        console.log(arr);
        return unescape(arr[2]);
      }
      return null;
    }          
  },  
  watch: {
    $route(route){
      switch (route.name) {
        case 'home':
          return this.showTitle = ''
        case 'increase':       
          return this.showTitle = '——新增/修改'
        case 'check':
          return this.showTitle = '——查看'
        case 'history':
          return this.showTitle = '——学习小组季度选课详情'
        default: 
          break;
      }
    }
  }
}
</script>
