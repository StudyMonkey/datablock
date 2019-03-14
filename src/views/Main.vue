<template>
  <div class="main">
    <Loading v-if="spinShow" />
    <div class="content">
      <h2>学习小组选课详情</h2>
      <div class="clearfix input_button_wrap">
        <div class="fl">
          <a-input placeholder="请输入" style="width: 310px" v-model="searchWord" />
          <!-- <input type="text" class="limitadm_ipt1 w310" > -->
          <a-button @click="handleSearch" style="margin-left: 9px">搜索</a-button>
          <!-- <button class="limitadm_btn1" @click="handleSearch">搜索</button> -->
        </div> 
        <a-button class="fr" @click="handleRouter('increase', null)" title="新增自定义数据模板" v-if="permissions_edit">新增</a-button>
      </div>
      <div class="table_area">
        <table class="limitadm_table1">
          <tbody>
            <tr class="h52 tr1">
              <td v-for="t in thead" :key="t">
                {{t}} 
              </td>
            </tr>
            <tr v-for="(i,ind) in list" :key="i.id">
              <td>{{i.TITLE}}</td>
              <td>{{i.UPDATE_TIME}}</td>
              <td>{{i.CREATE_TIME}}</td>
              <td>{{i.EDITOR}}</td>
              <td>
                <span 
                  @click="handleRouter('check', i.TASK_ID)" 
                  title="查看最新数据" 
                  class="iconfont iconchakan"
                  v-if="i.TASK_ID !== '-1'"
                ></span>
                <span @click="handleRouter('history', i.ID)" title="历史生成的数据" class="iconfont iconlishi"></span>
                <span 
                  class="iconfont iconxiugai" 
                  @click="handleRouter('increase', i.ID)"  
                  title="编辑模板"
                  v-if="i.permission && i.DESIGN_TYPE !== '公共'"
                ></span>
                <span 
                  class="iconfont iconshanchu" 
                  title="删除" 
                  @click="handleDelete(ind)" 
                  v-if="i.permission && i.DESIGN_TYPE !== '公共'"
                ></span>
              </td>
            </tr>
          </tbody>
        </table>
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
  </div>
</template>

<script>
import Loading from '@/components/loading'

export default {
  name: 'Main',
  data() {
    return { 
      spinShow: true, // loading层显示与否
      modalVisible: false,
      confirmLoading: false,
      pageSizeOptions: ['10', '30', '50', '80', '110', '140', '170', '200'],
      pageSize: 10,      
      total: 1,     // 记录总条数
      current: 1,   // 当前的页数      
      thead: ['名称', '更新时间', '创建时间', '创建者', '操作'],
      searchWord: "",
      list: [],
      token: this.$root.token,
      template_id: this.$root.template_id,
      permissions_edit: true,
      ind: '' // 删除条目的下标
    }
  },
  components: {
    Loading
  },
  async created() {
    try {  
      const res = await this.$http.get(this.httpUrl+'/reportDesignList/?token='+this.token+'&index=1&size=10&template_id='+this.template_id+'&keyword='+ this.searchWord );
      const resData = res.data.data
      this.permissions_edit = resData.permissions_edit;
      resData.list.map( v => v.permission = resData.permissions_edit);
      this.total = resData.total;
      this.list = resData.list;
      this.spinShow = false;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    // 搜索事件
    async handleSearch(){
      if ( this.searchWord !== '' ) {
        this.spinShow = true;
        this.current = 1;
        const url = this.httpUrl+'/reportDesignList/?token='+this.token+'&index='+this.current+'&size='+this.pageSize+'&template_id='+this.template_id+'&keyword='+this.searchWord;
        this.commonFunc(url);     
      }else{
        this.$message.error('输入内容为空');
      }
    },
    // 跳转路由
    handleRouter(route, task_id){
      this.$router.push({
        path: '/'+route,
        name: route,
        params: {
          task_id
        }
      });
    },
    handleDelete(index){
      this.$confirm({
        title: '确认删除此条数据么',
        okText: '确定',
        cancelText: '取消',
        onOk: async () => {
          try {
            const postData = {
              "token": this.token,
              "design_id": this.list[index].ID
            }
            const res = await this.$http.post(this.httpUrl+'/reportDesignDelete/', postData);
            this.$message.success(res.data.data.info)
            const url = this.httpUrl+'/reportDesignList/?token='+this.token+'&index=1&size=10&template_id='+this.template_id+'&keyword='+ this.searchWord;
            this.commonFunc(url);  
          } catch (error) {
            console.log(error);
          }
        },
        onCancel: () => {
           //alert('取消')
        }
      })   
    },
    async commonFunc(url){
      this.spinShow = true;
      const  res =  await this.$http.get(url);
      const resData = res.data.data;
      this.list = resData.list
      this.permissions_edit = resData.permissions_edit;
      this.list.map( v => v.permission = resData.permissions_edit); 
      this.total = resData.total;
      this.spinShow = false;
    },
    // 每页显示多少条切换
    onShowSizeChange(current, pageSize) {
        this.pageSize = pageSize
        const url = this.httpUrl+'/reportDesignList/?token='+this.token+'&index='+this.current+'&size='+this.pageSize+'&template_id='+this.template_id+'&keyword='+ this.searchWord;
        this.commonFunc(url);
    },    
    // 翻页事件调用
    async pagechange(currentPage){
      this.current = currentPage;
      const url = this.httpUrl+'/reportDesignList/?token='+this.token+'&index='+ this.current +'&size='+this.pageSize+'&template_id='+this.template_id+'&keyword='+ this.searchWord;
      this.commonFunc(url)
    }
  },
}
</script>

<style scoped>

</style>
