<template>
    <div>
        <div>
            <div class="wordInput_wrap">设计名称：<input type="text" v-model="inc_title" class="limitadm_ipt1 w310"></div>
            <div class="wordInput_wrap">设计描述：<input type="text" v-model="inc_description" class="limitadm_ipt1 w690" /></div>
            <div class="wordInput_wrap">学习小组：<input type="text" v-model="inc_studyGroup" class="limitadm_ipt1 w170"></div>
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
                            <input type="checkbox">
                        </td>
                        <td>{{d.NAME}}</td>
                        <td>{{d.FORMAT}}</td>
                        <td>{{d.INFORMATION}}</td>                
                    </tr>
                </tbody>
            </table>
            <div style="width:54px;margin: 40px auto">
                <button class="limitadm_btn1" @click="incHandleSubmit">提交</button>
            </div>
        </div> 
    </div>       
</template>

<script>
export default {
    name: 'Increase',
    data () {
        return {
            inc_title: '', // 设计名称
            inc_description: '', // 设计描述
            inc_studyGroup: '', // 学习小组
            thead: ['名称', '格式', '备注'],
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
    methods: {
        incHandleSubmit(){
            const TITLE = this.inc_title;
            const DESCRIPTION = this.inc_description;
            const GROUPNO = this.inc_studyGroup;
        }
    }
}
</script>

<style scoped>

</style>
