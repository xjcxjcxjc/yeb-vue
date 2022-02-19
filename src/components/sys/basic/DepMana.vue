<template>
    <div >
        <el-input class="flInput"
                placeholder="输入关键字进行过滤"
                v-model="filterText">
        </el-input>
        <el-tree
                style="margin-top: 10px;width: 600px"
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                node-key="id"
                ref="tree">
            <div slot-scope="{ node, data }"
                 style="width: 100%;"
            >
                <span>{{ node.label }}</span>
                <el-button type="primary" class="depBtn" size="mini"
                           @click.stop="showAddDialog(data)"
                >添加部门</el-button>
                <el-button type="danger" class="depBtn" size="mini"
                           @click="doDeleteDep(data)"
                >删除部门</el-button>
            </div>
        </el-tree>

        <el-dialog
                title="添加部门"
                :visible.sync="dialogVisible"
                width="30%"
        >
            <table>
<!--            父部门-->
                <tr>
                    <td>
                        <el-tag>上级部门</el-tag>
                    </td>
                    <td>
                         {{pname}}
                    </td>
                </tr>

<!-- 输入部门名称-->
                <tr>
                    <td>
                        <el-tag>部门名称</el-tag>
                    </td>
                    <td>
                        <el-input v-model="dep.name" placeholder="请输入部门名称...">

                        </el-input>
                    </td>
                </tr>
            </table>
            <span slot="footer" >
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddDepartment">确 定</el-button>
            </span>

        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "PosMana",
        data(){
            return {
                filterText: '',
                data:[],
                defaultProps:{
                    label: 'name',
                    children: 'children',
                },
                dialogVisible:false,
                pname:'',
                dep:{
                    name:'',
                    parentId: -1
                },

            }
        },
        methods:{
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            initDepData(){
                this.getRequest("/system/basic/department/").then(resp=>{
                    if (resp){
                        this.data=resp;
                    }
                })
            },
            doAddDepartment(){
                this.postRequest('/system/basic/department/',this.dep).then(resp=>{
                    if (resp){
                        this.dialogVisible=false;
                        this.initDepData();
                        this.dep={};
                    }
                })
            },
            showAddDialog(data){
                this.dialogVisible=true;
                this.pname=data.name;
                this.dep.parentId=data.id;
            },
            doDeleteDep(data){
                this.deleteRequest("/system/basic/department/"+data.id).then(resp=>{
                    if (resp){
                        this.initDepData();
                    }
                })
            }
        },
        watch:{
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        mounted() {
            this.initDepData();

        }


    }
</script>

<style scoped>

    .flInput{
        width: 600px;
    }
    .depBtn{
        padding: 2px;
        float: right;
        margin-left: 10px;
    }




</style>