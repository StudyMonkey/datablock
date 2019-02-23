<template>
  <div class="main">
    <div class="content">
      <h2>学习小组选课详情</h2>
      <div class="clearfix input_button_wrap">
        <div class="fl">
          <input type="text" class="limitadm_ipt1 w310" v-model="searchWord">
          <button class="limitadm_btn1" @click="handleSearch">搜索</button>
        </div> 
        <button class="fr limitadm_btn1" @click="handleRouter('/increase')" title="新增自定义数据模板">新增</button>
      </div>
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
              <td>{{i.START_TIME}}</td>
              <td>{{i.END_TIME}}</td>
              <td>{{i.USER}}</td>
              <td>
                <span @click="handleRouter('/check')" title="查看" class="iconfont iconchakan"></span>
                <span @click="handleRouter('/history')" title="历史" class="iconfont iconlishi"></span>
                <span class="iconfont iconxiugai" @click="handleRouter('/increase')"  title="修改"></span>
                <span class="iconfont iconshanchu" title="删除" @click="handleDelete"></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
    </div>
  </div>
</template>

<script>
import pagination from '@/components/pagination'

export default {
  name: 'Main',
  data() {
    return { 
      total: 150,     // 记录总条数
      display: 10,   // 每页显示条数
      current: 1,   // 当前的页数      
      thead: ['名称', '更新时间', '创建时间', '创建者', '操作'],
      searchWord: "",
      list: [],
    }
  },
  components: {
    'v-pagination': pagination
  },
  async created() {
    try {
      const data = await this.$http.get('https://www.easy-mock.com/mock/5c6df6e4502e5826afad9421/datablock/main');
      this.list = data.data.list
      // this.num = data.data.list.length;
    } catch (error) {
      console.log(error);
    }
  },
  props: {

  },
  methods: {
    handleSearch(){
      console.log(111);
    },
    handleRouter(route){
      this.$router.push(route);
    },
    handleDelete(){
      console.log('删除');
    },
    pagechange(currentPage){
      console.log(currentPage);
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据

    }
  },
}
</script>

<style scoped>

</style>
