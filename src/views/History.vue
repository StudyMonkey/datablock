<template>
  <div class="content">
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
            <td>{{i.NAME}}</td>
            <td>{{i.TIMERANGE}}</td>
            <td>{{i.DONWLOADTIME}}</td>
            <td>              
              <span @click="handleRouter('/history')" title="下载" class="iconfont iconxiazai"></span>
              <span @click="handleRouter('/check')" title="查看" class="iconfont iconchakan"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>    
  </div>
</template>

<script>
export default {
  name: 'history',
  data() {
    return {
      thead: ['名称', '时间段', '下载次数', '操作'],
      list: [
        {ID: 1, NAME: '学习小组季度选课详情2019-01-03 02:00:00', TIMERANGE: '2018-10-01 至 2018-12-30', DONWLOADTIME: 3},
        {ID: 2, NAME: '学习小组季度选课详情2019-01-03 02:00:00', TIMERANGE: '2018-10-01 至 2018-12-30', DONWLOADTIME: 0},
        {ID: 3, NAME: '学习小组季度选课详情2019-01-03 02:00:00', TIMERANGE: '2018-10-01 至 2018-12-30', DONWLOADTIME: 1},
        {ID: 4, NAME: '学习小组季度选课详情2019-01-03 02:00:00', TIMERANGE: '2018-10-01 至 2018-12-30', DONWLOADTIME: 2}
      ]
    }
  },
  methods: {
    handleRouter(route){
      this.$router.push(route)
    }
  }
}
</script>
