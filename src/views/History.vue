<template>
  <div class="content">
    <Loading v-if="spinShow" />
    <h2>学习小组选课详情</h2>
    <div class="table_area">
      <table class="limitadm_table1">
        <tbody>
          <tr class="h52 tr1">
            <td v-for="t in thead" :key="t">
              {{t}} 
            </td>
          </tr>
          <tr v-for="i in list" :key="i.id">
            <td>{{i.TITLE}}</td>
            <td>{{i.DATA_START_TIME}}至{{i.DATA_END_TIME}}</td>
            <td>{{i.COUNT}}</td>
            <td>              
              <span @click="handleDonwload(i.ID)" title="下载" class="iconfont iconxiazai"></span>
              <span @click="handleRouter('check', i.ID)" title="查看" class="iconfont iconchakan"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>    
  </div>
</template>

<script>
import Loading from '@/components/loading'

export default {
  name: 'history',
  data() {
    return {
      spinShow: true,
      thead: ['名称', '时间段', '下载次数', '操作'],
      list: [],
      design_id: '',
      token: this.$root.token,
      template_id: this.$root.template_id,
    }
  },
  components: {
    Loading
  },
  methods: {
    async handleDonwload(task_id){
      this.spinShow = true
      const res = await this.$http.get(this.httpUrl+'/reportDownLoad/?token='+ this.token +'&task_id='+ task_id);
      const resData = res.data.data;
      window.open(this.httpUrl + resData.FILE_URL);
      if ( res.data.resultState === 'success' ) {
        const donRes = await this.$http.get(this.httpUrl+'/reportTaskList/?token='+ this.token +'&design_id='+ this.design_id + '&index=1&size=10' );
        this.list = donRes.data.data.list;      
        this.spinShow = false
      }
    },
    handleRouter(route, ID){
      this.$router.push({
        path: '/'+route,
        name: route,
        params: {
          task_id: ID
        }
        
      })
    }
  },
  async created(){
    this.design_id = this.$route.params.task_id;
    const res = await this.$http.get(this.httpUrl+'/reportTaskList/?token='+ this.token +'&design_id='+ this.design_id + '&index=1&size=10' );
    this.list = res.data.data.list;
    this.spinShow = false
  }
}
</script>
