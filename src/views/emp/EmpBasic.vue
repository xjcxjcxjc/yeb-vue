<template>
    <div>
<!--        头部 -->
        <div style="display: flex;justify-content: space-between">
            <div>
                <el-input style="width: 300px;margin-right: 10px"
                        placeholder="输入员工名字进行搜索"
                          prefix-icon="el-icon-search"
                />
                <el-button
                        icon="el-icon-search"
                        type="primary" >
                    搜索
                </el-button>
                <el-button type="primary" >
                    <i class="fa fa-angle-double-down"/>
                    高级搜索
                </el-button>
            </div>
<!--            右侧工具栏-->
            <div>
                <el-button type="success" icon="el-icon-upload2"  >
                    导入数据
                </el-button>
                <el-button  type="success" icon="el-icon-download">
                    导出数据
                </el-button>
                <el-button type="primary" icon="el-icon-plus">添加员工</el-button>
            </div>

        </div>

<!--        表格 -->
        <div style="margin-top: 10px">
            <el-table
                    border stripe
                    :data="emps"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        fixed
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="workID"
                        label="工号"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        label="出生日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        label="身份证号码"
                        align="left"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        label="婚姻状况"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        label="民族"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        label="籍贯"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="politicsStatus.name"
                        label="政治面貌"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="电子邮件"
                        align="left"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话号码"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="联系地址"
                        align="left"
                        width="270">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        label="所属部门"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="joblevel.name"
                        label="职称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="position.name"
                        label="职位"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        label="聘用形式"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        label="最高学历"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="school"
                        label="毕业院校"
                        align="left"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="specialty"
                        label="专业"
                        align="left"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="workState"
                        label="在职状态"
                        align="left"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        label="入职日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="conversionTime"
                        label="转正日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="beginContract"
                        label="合同起始日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="endContract"
                        label="合同截止日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        label="合同期限"
                        align="left"
                        width="100">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}</el-tag>
                        年
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        fixed="right"
                        width="200">
                    <template slot-scope="scope">
                        <el-button @click="showEditEmpView(scope.row)" style="padding: 3px" size="mini">编辑</el-button>
                        <el-button style="padding: 3px" size="mini" type="primary">查看高级资料</el-button>
                        <el-button @click="deleteEmp(scope.row)" style="padding: 3px" size="mini" type="danger">删除
                        </el-button>
                    </template>
                </el-table-column>


            </el-table>

        </div>
    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        data(){
            return{
                emps:[],
                loading:false
            }
        },
        methods:{
            initEmp(){
                this.getRequest("/employee/basic/").then(resp=>{
                    this.emps=resp.body;
                })
            }
        },
        mounted() {
            this.loading=true;
            this.initEmp();
            this.loading=false;

        }
    }

</script>

<style scoped>

</style>