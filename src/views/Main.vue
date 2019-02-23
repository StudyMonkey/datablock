<template>
  <div class="main">
    <div class="content">
      <h2>学习小组选课详情</h2>
      <div class="clearfix input_button_wrap">
        <div class="fl">
          <input type="text" class="limitadm_ipt1 w310" v-model="searchWord">
          <button class="limitadm_btn1" @click="handleSearch">搜索</button>
        </div> 
        <button class="fr limitadm_btn1" @click="handleIncrease" title="新增自定义数据模板">新增</button>
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
                <span @click="handleCheck">查看</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      thead: ['名称', '更新时间', '创建时间', '创建者', '操作'],
      searchWord: "",
      list: []
    }
  },
  async created() {
    try {
      const data = await this.$http.get('https://www.easy-mock.com/mock/5c6df6e4502e5826afad9421/datablock/main');
      this.list = data.data.list
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
    handleIncrease(){
      console.log(111);
      this.$router.push('/increase');
    },
    handleCheck(){
      this.$router.push('/check')
    }
  },
}
</script>

<style scoped>

</style>
