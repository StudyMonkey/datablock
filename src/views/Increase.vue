<template>
    <div>
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
                学习小组：
<!--                 <select 
                    type="text" 
                    v-model="inc_studyGroup" 
                    @click="handleStudyChange" 
                    class="limitadm_ipt1 w170 fl">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                </select> -->
                <a-tree-select
                    style="width: 170px;"
                    :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                    :treeData="treeData"
                    placeholder='请选择'
                    v-model="treeValue"
                >    
                </a-tree-select> 
                <a-checkbox style="margin-left:9px" @change="handleCheckClick">包含下级</a-checkbox>               
<!--                 <label class="fl wrapDownLabel">
                    <input 
                        v-model="inc_checkDown" 
                        class="checkboxInput" 
                        @click="handleCheckClick" 
                        type="checkbox">包含下级</label> -->
                <div style="display: inline">
                    <span>数据查询时间：</span>
                    <a-radio-group name="timeRange" :defaultValue="1">
                        <a-radio :value="1">选择周期性时间</a-radio>
                        <a-radio :value="2">选择具体时间段</a-radio>
                    </a-radio-group>
<!--                     <label class="firstTimeRangeLabel"><input type="radio" name="timeRange"></label>
                    <label class="secondTimeRangeLabel"><input type="radio" name="timeRange">选择具体时间段</label> -->
<!--                     <select 
                        v-model="inc_selectTimeRange" 
                        @change="handleTimeRangeChange"
                        class="limitadm_ipt1 w130"
                    >
                        <option value="1">前一周</option>
                        <option value="2">前两周</option>
                        <option value="3">前一个月</option>
                    </select> -->
                    <a-select class="w130" defaultValue="1" @change='handleTimeRangeChange'>
                      <a-select-option value="1">前一周</a-select-option>
                      <a-select-option value="2">前两周</a-select-option>
                      <a-select-option value="3">前一个月</a-select-option>
                    </a-select>
                    <span class="lineSpan">/</span>
                    <a-range-picker 
                        :defaultValue="[moment('2019/01/01', dateFormat), moment('2019/02/01', dateFormat)]"
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
                    <tr v-for="d in data" :key="d.FORMAT">
                        <td>
                            <a-checkbox
                                @change="tableCheckChange" />
                        </td>
                        <td>{{d.NAME}}</td>
                        <td>{{d.FORMAT}}</td>
                        <td>{{d.INFORMATION}}</td>                
                    </tr>
                </tbody>
            </table>
            <div class="btnWrapDiv">
                <a-button @click="incHandleSubmit">提交</a-button>
            </div>
        </div>
        <div style="min-with: 573px;max-width: 674px;margin: 0 auto">
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
                    <!-- <span v-if="props.value==='50'">全部</span> -->
                </template>
            </a-pagination>  
        </div>
      
        <!-- <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>  -->
    </div>       
</template>

<script>
import pagination from '@/components/pagination'
import moment from 'moment'

const treeData = [{
  title: 'Node1',
  value: '0-0',
  key: '0-0',
  children: [{
    title: 'Child Node1',
    value: '0-0-1',
    key: '0-0-1'  
  }, {
    title: 'Child Node2',
    value: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: 'Node2',
  value: '0-1',
  key: '0-1',
}]

export default {
    name: 'Increase',
    data () {
        return {
            pageSizeOptions: ['20', '30', '50', '80', '110', '140', '170', '200'],
            current: 1,
            pageSize: 20,
            // total: 50,            
            treeData,
            treeValue: undefined, // 学习小组
            total: 1500,     // 记录总条数
            display: 10,   // 每页显示条数
            current: 1,   // 当前的页数            
            inc_title: '', // 设计名称
            inc_description: '', // 设计描述
            inc_selectTimeRange: 1, // 周期性时间段
            inc_checkDown: false, // 包含下级
            thead: ['名称', '格式', '备注'],
            dateFormat: 'YYYY-MM-DD',
            data: [
                {
                    'NAME': '学习小组编号',
                    'FORMAT': '文本1',
                    'INFORMATION': '学习者所在的学习小组编号'
                },
                {
                    'NAME': '学习小组编号',
                    'FORMAT': '文本2',
                    'INFORMATION': '学习者所在的学习小组编号'
                }, 
                {
                    'NAME': '学习小组编号',
                    'FORMAT': '文本3',
                    'INFORMATION': '学习者所在的学习小组编号'
                },
                {
                    'NAME': '学习小组编号',
                    'FORMAT': '文本4',
                    'INFORMATION': '学习者所在的学习小组编号'
                },
                {
                    'NAME': '学习小组编号',
                    'FORMAT': '文本5',
                    'INFORMATION': '学习者所在的学习小组编号'
                }                                                               
            ]
        }
    },
    watch: {
        treeValue (value) {
            this.treeValue = value
            console.log('treeValue', this.treeValue)
        }
    },    
    components: {
        'v-pagination': pagination
    },
    methods: {
        moment,
        incHandleSubmit(){
            const TITLE = this.inc_title;
            const DESCRIPTION = this.inc_description;
            const GROUPNO = this.inc_studyGroup;
        },
        handleCheckClick(e){
            this.inc_checkDown = e.target.checked;
            console.log(this.inc_checkDown);
        },
        handleTimeRangeChange(val){
            console.log(val);
            this.inc_selectTimeRange = val
        },
        handleRangePickerChange(date, dateString){
            console.log('date', date);
            console.log('dateString', dateString);
        },
        tableCheckChange(checkedValues){
            console.log('checkedValues', checkedValues);
        },
        onShowSizeChange(current, pageSize) {
            this.pageSize = pageSize
        },        
        pagechange(currentPage){
            console.log(currentPage);
            // ajax请求, 向后台发送 currentPage, 来获取对应的数据
        }        
    }
}
</script>

<style scoped>
.btnWrapDiv{
    width:55px;
    margin: 40px auto
}
.wrapDownLabel{
    margin: 0 92px 0 8px
}
select.limitadm_ipt1{
    margin-top: -4px;
    box-sizing: content-box;
    height: 30px;
    line-height: 30px;
}
.firstTimeRangeLabel{
    margin: 0 18px 0 10px
}
.secondTimeRangeLabel{
    margin-right: 16px
}
.lineSpan{
    margin-left: 6px;
    margin-right: 4px
}
</style>
