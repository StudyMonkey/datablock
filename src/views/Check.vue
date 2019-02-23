<template>
  <div class="check">
    <div>
        <div class="wordInput_wrap clearfix"><span class="fl">设计名称：</span><p class="fl">学习小组季度选课详情</p></div>
        <div class="wordInput_wrap clearfix"><span class="fl">设计描述：</span><p class="fl">学习小组季度选课详情</p></div>
        <div class="wordInput_wrap clearfix"><span class="fl">学习小组：</span>
          <p class="fl">A学习小组及子学习小组</p>
          <p class="fl timeshow_word">开始时间：<span>2018-01-01</span></p>
          <p class="fl timeshow_word">结束时间：<span>2019-01-01</span></p>
        </div>
        <div class="table-area">
          <table class="limitadm_table1">
            <tbody>
                <tr class="h52 tr1">                  
                  <td 
                    v-for="(t,v) in thead" 
                    :key="t"
                    :class="{'iconfont iconjiansuo' : v === 3}"
                  >
                  {{t}} 
                  </td>
                </tr>
                <tr>
                  <td v-for="(t,i) in thead" :key="i">{{i}}</td>
                </tr>  
                <tr>
                  <td v-for="(t,i) in thead" :key="i">{{i}}</td>
                </tr> 
                <tr>
                  <td v-for="(t,i) in thead" :key="i">{{i}}</td>
                </tr> 
                <tr>
                  <td v-for="(t,i) in thead" :key="i">{{i}}</td>
                </tr>                                                                                               
            </tbody>            
          </table>
        </div>
    </div>    
  </div>
</template>

<script>

export default {
  name: 'Check',
  components: {
  },
  data () {
    return {
      thead: ['学习小组编号','学习小组名称','姓名','账号','学习计划的名称','学习计划的状态','学习计划的业务领域','学习计划岗位名称',
      '学习计划创建时间','学习计划开始时间','学习计划结束时间','学习计划内的课程','学习计划内的图书','学习计划内学习进度超过90%的在线课程',
      '学习计划内学习撰写了学习心得的图书','参加了考试的课程数','通过了考试的课程数','考过优秀的课程数','平均学习进度','平均学习成绩','提交的图书心得数']
    }
  }
}
</script>

<style scoped>
.limitadm_table1 .tr1 td{
  font-size: 14px;
}

.timeshow_word{
  margin-left: 90px
}
</style>

