<template>
    <div>
        <Loading v-if="spinShow" />   
        <div>
            <div class="wordInput_wrap">设计名称：
                <a-input style="width: 310px" v-model="inc_title" placeholder="请输入"/>
                <!-- <input type="text"  class="limitadm_ipt1 w310"> -->
            </div>
            <div class="wordInput_wrap">设计描述：
                <a-input style="width: 690px" v-model="inc_description" placeholder="请输入"/>
                <!-- <input type="text" v-model="inc_description" class="limitadm_ipt1 w690" /> -->
            </div>
            <div class="wordInput_wrap clearfix">
                <div class="treeSelectWrap" v-for="(con,i) in condition" :key="i">
                    <span>{{con.LABEL+"："}}</span>                
                
                    <a-tree-select
                        style="width: 170px;"
                        :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                        :treeData="con.DATA"
                        placeholder='请选择'
                        v-model="con.VALUE"
                        @change="handleTreeChange(con,i)"
                    >    
                    </a-tree-select> 
                    <a-checkbox v-if="con.UI_COMPONENT === 'DropList&CheckBox'" style="margin-left:9px" @change="handleCheckClick">包含下级</a-checkbox>  
                </div>             

                <div style="display: inline;margin-left: 8px;">
                    <span>数据查询时间：</span>
                    <a-radio-group 
                        name="timeRange" 
                        :defaultValue="1"
                        v-model="inc_radioNum"
                        @change="handleRadioChange"
                    >
                        <a-radio :value="1">
                            <a-tooltip>
                              <template slot='title'>
                                选择周期性时间段，数据将立即生成并每天更新
                              </template>
                              选择周期性时间
                            </a-tooltip>                          
                        </a-radio>
                        <a-radio :value="2">                           
                            <a-tooltip>
                              <template slot='title'>
                                自行选择时间段，数据将立即生成
                              </template>
                              选择具体时间段
                            </a-tooltip>                             
                        </a-radio>
                    </a-radio-group>

                    <a-select 
                        v-show="inc_radioNum === 1"
                        class="w130" 
                        v-model="inc_selectTimeRange"
                        @change='handleTimeRangeChange'
                    >
                      <a-select-option value="0">请选择</a-select-option>    
                      <a-select-option value="-7">近一周</a-select-option>
                      <a-select-option value="-30">近一月</a-select-option>
                      <a-select-option value="-90">近一季</a-select-option>
                      <a-select-option value="-365">近一年</a-select-option>
                    </a-select>
                    <!-- <span class="lineSpan">/</span> -->
                    <a-range-picker 
                        v-show="inc_radioNum === 2"
                        :value="[moment(startTime, dateFormat), moment(endTime, dateFormat)]"
                        :format="dateFormat"                    
                        @change="handleRangePickerChange"
                    />
                </div>

            </div>
        </div>
        <div class="table_area">
            <table class="limitadm_table1">
                <tbody>
                    <tr class="h52 tr1">
                        <td style="width:5%"></td>
                        <td v-for="t in thead" :key="t">
                        {{t}} 
                        </td>
                    </tr>
                    <tr v-for="(d,i) in fields" :key="i">
                        <td>
                            <a-checkbox :checked="d.checked" :disabled=" d.DELETEABLE === 'No' ? true : false " @change="tableCheckChange(i)" />
                        </td>
                        <td>
                            {{d.NAME}}
                        </td>
                        <td>
                            {{d.FORMAT}}
                        </td>
                        <td>
                            {{d.INFORMATION}}
                        </td>                
                    </tr>
                </tbody>
            </table>
            <div class="btnWrapDiv">
                <a-button @click="incHandleSubmit" :loading="btnShow">提交</a-button>
            </div>
        </div>
    </div>       
</template>

<script>
import moment from 'moment'
import Loading from '@/components/loading.vue'

export default {
    name: 'Increase',
    data () {
        return { 
            startTime: new Date(new Date()-30*24*60*60*1000), // 开始事件默认往前30天
            endTime: new Date(),                   
            spinShow: true, // 遮蔽层显示与隐藏
            btnShow: false, // 按钮的loading
            condition: [],
            // treeData: [], // 学习小组树形数据
            treeValue: undefined, // 学习小组           
            inc_title: '', // 设计名称
            inc_description: '', // 设计描述
            inc_radioNum: 1, // radio 选择值
            inc_selectTimeRange: '请选择', // 周期性时间段
            inc_checkDown: false, // 包含下级
            thead: ['名称', '格式', '备注'],
            dateFormat: 'YYYY-MM-DD',
            fields: [ ],
            resData: {},
            dateArray: [], // 日期选择
            task_id: '', // 跳转路由传递过来的参数
            token: this.$root.token,
            template_id: this.$root.template_id,
        }
    },  
    async created(){
        const task_id = this.$route.params.task_id;
        let res;
        try {
            if ( task_id !== null ) { // 点击编辑模板按钮调用接口
                res = await this.$http.get(this.httpUrl+'/getReportDesign/?token='+ this.token +'&design_id='+ task_id); 
                this.resData = res.data.data;
                if ( this.resData.CONDITION.filter( v => v.FIELD === 'ADD_TIME' )[0].VALUE.END === 'NOW' ) { // 根据周期选择时间来区别显示
                    this.inc_radioNum = 1
                    this.inc_selectTimeRange = this.resData.CONDITION.filter( v => v.FIELD === 'ADD_TIME' )[0].VALUE.START
                } else {
                    this.inc_radioNum = 2
                    this.startTime = moment(this.resData.CONDITION.filter( v => v.FIELD === 'ADD_TIME' )[0].VALUE.START, this.dateFormat)
                    this.endTime = moment(this.resData.CONDITION.filter( v => v.FIELD === 'ADD_TIME' )[0].VALUE.END, this.dateFormat)
                }                
                this.condition = this.resData.CONDITION.filter(V => V.UI_COMPONENT !== 'DateRangePicker');
                this.fields = this.resData.FIELDS; // 表格数据

            } else {// 点击新增按钮调用接口
                res = await this.$http.get(this.httpUrl+'/getReportTemplate/?token='+ this.token +'&template_id='+ this.template_id); 
                this.resData = res.data.data;
                this.resData.CONDITION.filter(V => V.UI_COMPONENT !== 'DateRangePicker').map( v => {
                    v.VALUE = undefined;
                })
                this.condition = this.resData.CONDITION.filter(V => V.UI_COMPONENT !== 'DateRangePicker');
                console.log(this.condition);
                this.fields = this.resData.FIELDS; // 表格数据
                        
                this.fields.map( v => v.checked = true);                
            }
            this.task_id = task_id;
            this.inc_title = this.resData.TITLE
            this.inc_description = this.resData.DESCRIPTION
            this.spinShow = false;
        } catch (error) {
            console.log(error);
        }        
    },
    components: {
        Loading
    },
    methods: {
        moment,
        async incHandleSubmit(){ // 提交按钮点击
            this.spinShow = true
            this.btnShow = true
            this.fields.map( v => {
                if ( v.checked === true ) {
                    v.ISUSED = true
                }else {
                    v.ISUSED = false
                }
            })

            this.resData.FIELDS = this.fields; 
            this.resData.TITLE = this.inc_title
            this.resData.DESCRIPTION = this.inc_description;
            this.resData.CONDITION = [];
            console.log(this.condition);
            this.condition.map ( v => {
                if ( v.VALUE === undefined ) {
                    this.$message.error('选择小组尚未选择');
                    this.spinShow = false;
                    return false
                }
            } )
            this.resData.CONDITION.push(...this.condition);
            this.resData.CONDITION.filter( v => v.UI_COMPONENT === "DropList&CheckBox").map( v => v.IS_CONTAIN = this.inc_checkDown ) // 是否包含下级
            let conditionThree = {};
            conditionThree.FIELD = 'ADD_TIME';
            conditionThree.UI_COMPONENT = 'DateRangePicker';
            conditionThree.VALUE = {}
            if ( this.inc_radioNum === 1 ) { // 周期性选择的两种不同情况
                if ( this.inc_selectTimeRange === '请选择' || this.inc_selectTimeRange === '0' ) {
                    this.$message.error('请选择一个周期性时间');  
                    this.spinShow = false;
                    this.btnShow = false;
                    return false;      
                }
                conditionThree.VALUE.START =  this.inc_selectTimeRange;                
                conditionThree.VALUE.END =  'NOW';
            } else { // 选择时间段的情况
                this.startTime = moment(this.startTime).format(this.dateFormat)
                this.endTime = moment(this.endTime).format(this.dateFormat)                
                conditionThree.VALUE.START = this.startTime
                conditionThree.VALUE.END = this.endTime
                JSON.stringify(conditionThree.VALUE)
            }
            this.resData.CONDITION.push(conditionThree);

            this.resData.CONDITION.map( v => {
                if ( v.DATA ) {
                    delete v.DATA
                }

                if ( v.FIELD === 'GROUP_NO' && v.FIELD === this.resData.BUSINESS_FIELD ) {
                    if ( v.VALUE === -1 ) {
                        v.IS_ALL = true
                    }else{
                        v.IS_ALL = false
                    }                 
                }
                
            })             
            this.resData.REPORT_TEMPLATE_ID = this.template_id;
            this.resData.token = this.token;
            if ( this.task_id !== null ) { // 编辑操作时，传递一个design_id
                this.resData.design_id = this.resData.ID;
            }           
            // 判断是否所有值都获取到
            const res = await this.$http.post(this.httpUrl+'/createReportTask/', this.resData)
            if ( res.data.resultState === 'success' ) {
                this.$message.success(res.data.data.info);
                this.$router.push('/main');
            }else {
                this.$message.success(res.data.errorInfo);
            }                           
        },
        // 是否包含下级
        handleCheckClick(e){
            this.resData.CONDITION.filter(V => V.UI_COMPONENT !== 'DateRangePicker').map( v => {
                if ( v.UI_COMPONENT === 'DropList&CheckBox' ) {
                    this.inc_checkDown = e.target.checked;
                    v.IS_CONTAIN = this.inc_checkDown;
                }               
            })
        },
        // 周期性时间选择
        handleTimeRangeChange(val){
            // this.inc_selectTimeRange = val
        },
        // 具体时间选择
        handleRangePickerChange(date, dateString){
            this.dateArray = [...dateString];
            this.startTime = this.dateArray[0];
            this.endTime = this.dateArray[1];
        },
        tableCheckChange(i){
            this.fields[i].checked = !this.fields[i].checked
            this.fields.splice(i, 1, this.fields[i]);
        },
        handleTreeChange(con, i){
            this.condition.splice(i, 1, con);
        },
        // radio change 事件
        handleRadioChange(e){
            this.inc_radioNum = e.target.value;
        }      
    }
}
</script>

<style scoped>
.ant-tree li {
    width: 50%;
    float: left;
}
.btnWrapDiv{
    width:55px;
    margin: 40px auto
}
.treeSelectWrap{
    display: inline
}
</style>
