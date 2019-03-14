<template>
  <div class="check">
    <Loading v-show="spinShow" />
    <div>
      <a-modal
        :title="name+'筛选'"
        :visible="visible"
        :footer="null"
        @cancel="handleModalCancel"
      >
        <a-input placeholder="请输入" style="width: 310px" v-model="searchName" />
        <a-button @click="handleNameSearch" style="margin-left: 9px">搜索</a-button>
      </a-modal>
        <div class="wordInput_wrap clearfix"><span class="fl">设计名称：</span><p class="fl">{{degisn_title}}</p></div>
        <div class="wordInput_wrap clearfix"><span class="fl">设计描述：</span><p class="fl">{{design_description}}</p></div>
        <div class="wordInput_wrap clearfix"><span class="fl">学习小组：</span>
          <p class="fl">{{study_group}}</p>
          <p class="fl timeshow_word">开始时间：<span>{{start_time}}</span></p>
          <p class="fl timeshow_word">结束时间：<span>{{end_time}}</span></p>
        </div>
        <div class="table-area">
          您所选择的内容: 
          <a-tag closable v-model="tagArray.length > 0" @close="handleTagClose(i)" v-for="(tag,i) in tagArray" :key="tag">{{tag}}</a-tag>
          <table class="limitadm_table1">
            <tbody>
                <tr class="h52 tr1">                  
                  <td 
                    v-for="(t,v) in thead" 
                    :key="t"
                    :class="{'iconfont iconjiansuo' : tsearch.indexOf(t) > -1 }"
                    @click="handleModalShow(t)"
                  >
                  {{t}} 
                  </td>
                </tr>
                <tr v-for="(t,i) in list" :key="i">
                  <td v-for="(w,n) in t" :key="n">{{w}}</td>
                </tr>                                                                                                 
            </tbody>            
          </table>
        </div>
    </div> 
    <div style="min-with: 573px;max-width: 674px;margin: 40px auto">
        <a-pagination
            :pageSizeOptions="pageSizeOptions"
            :total="total"
            showSizeChanger
            showQuickJumper
            :pageSize="pageSize"
            v-model="current"
            @change="pagechange"
            @showSizeChange="onShowSizeChange"
        >
            <template slot='buildOptionText' slot-scope='props'>              
                <span v-if="props.value!=='210'">每页{{props.value}}条</span>
            </template>
        </a-pagination>  
    </div>        
  </div>
</template>

<script>
import Loading from '@/components/loading'

export default {
  name: 'Check',
  components: {
    Loading
  },
  data () {
    return {
      current: 1,
      pageSize: 10,
      total: 0,
      pageSizeOptions: ['10', '30', '50', '80', '110', '140', '170', '200'],
      degisn_title: '',
      design_description: '',
      study_group: '',
      start_time: '',
      end_time: '',
      spinShow: true,
      task_id: '',
      thead: [],
      tsearch: [],
      list: [],
      visible: false, // 弹出框显示隐藏
      searchName: '', // Modal框中的输入文字
      name: '',
      tagShow: false, // a-tag的显示隐藏
      tagArray: [], // a-tag保存的数组
      filters: {},
      token: this.$root.token,
      template_id: this.$root.template_id,      
    }
  },
  async created(){
    this.task_id = this.$route.params.task_id;
    const url = this.httpUrl+'/reportPerView/?token='+this.token+'&task_id='+this.task_id+'&index=1&size='+this.pageSize;
    this.commonFunc(url);
  },
  methods: {
    async commonFunc(url){
      this.spinShow = true
      if ( typeof this.filters !== 'string' ) {
        this.filters = JSON.stringify(this.filters)
      }      
      const res = await this.$http.get(url);
      const resData = res.data.data;
      this.thead = resData.HEAD;
      this.tsearch = resData.SEARCH
      this.list = resData.LIST;
      this.total = resData.TOTAL;
      this.degisn_title = resData.TITLE;
      this.design_description = resData.DESCRIPTION;
      this.study_group = resData.BUSINESS_DESC
      this.start_time = resData.DATA_START_TIME
      this.end_time = resData.DATA_END_TIME
      this.spinShow = false      
    },
    async onShowSizeChange(current, pageSize) {       
        this.pageSize = pageSize
        const url = this.httpUrl+'/reportPerView/?token='+this.token+'&task_id='+this.task_id+'&index=1&size='+this.pageSize+'&filters='+this.filters;
        this.commonFunc(url)
    },    
    async pagechange(currentPage){
      this.spinShow = true;
      this.current = currentPage;
      const url = this.httpUrl+'/reportPerView/?token='+this.token+'&task_id='+this.task_id+'&index='+ this.current +'&size='+this.pageSize+'&filters='+this.filters;
      this.commonFunc(url);
    },
    handleModalShow (name){
      if ( this.tsearch.indexOf(name) > -1 ) {
        this.visible = true;
        this.name = name
      }
      return false
    },
    handleModalCancel(){
      this.visible = false
    },
    async handleNameSearch(){
      this.visible = false;
      this.searchName = this.searchName.replace(/\s+/g, ''); // 去掉所有空格和制表符
      if ( this.searchName !== "" ) {       
        this.spinShow = true; 
        if (typeof this.filters !== 'object' ) {
          this.filters = JSON.parse(this.filters)
          for ( let key of Object.keys(this.filters) ) {
            if ( key === this.name ) { // 判断条件是否存在
              this.$message.error('同类搜索条件已存在');
              this.searchName = '';
              this.spinShow = false;
              return false
            }
          }          
        }         
        this.filters[this.name] = this.searchName
        this.filters = JSON.stringify(this.filters)
        this.current = 1;
        const url = this.httpUrl+'/reportPerView/?token='+this.token+'&task_id='+this.task_id+'&index='+ this.current +'&size='+this.pageSize+'&filters='+this.filters;
        this.commonFunc(url);
        this.tagArray.push(this.searchName);
        this.tagArray = Array.from(this.tagArray);
        this.searchName = '';
        this.tagShow = true 
      }     
    },
    async handleTagClose(i){
      if (typeof this.filters !== 'object' ) {
        this.filters = JSON.parse(this.filters)
      }        
      for ( let key of Object.keys(this.filters) ) {
        if ( this.filters[key] === this.tagArray[i]  ) {
          delete this.filters[key]
        }
      }
      this.tagArray = [...this.tagArray];
      this.tagArray.splice(i, 1);
      this.filters = JSON.stringify(this.filters);
      const url = this.httpUrl+'/reportPerView/?token='+this.token+'&task_id='+this.task_id+'&index=1&size='+this.pageSize+'&filters='+this.filters;
      this.commonFunc(url)
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

