<template>
    <div>
        <template>
            <el-input class="addPosInput"
                    placeholder="添加职位"
                    v-model="pos.name">
                <i slot="suffix" class="el-input__icon el-icon-plus"></i>
            </el-input>
            <el-button @click="addPos"   size="middle" type="primary">添加</el-button>
        </template>
        <template>
            <el-table
                    @selection-change="handleSelectionChange"
                    stripe border
                    :data="tableData"
                    style="width: 100%;margin-top: 20px">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="250">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditDialog(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="deletePos(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

        <el-button size="small" style="margin-top: 8px" type="danger"
        :disabled="this.multipleSelection.length===0"
                   @click="handledeleteMultiple">批量删除</el-button>

        <template>
            <el-dialog
                    title="编辑职位"
                    :visible.sync="dialogVisible"
                    width="30%"
            >
                <div>
                    <el-tag>职位名称</el-tag>
                    <el-input v-model="updatePos.name" size="small" class="updatePosInput"></el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="doUpdatePos()">确 定</el-button>
                </span>
            </el-dialog>

        </template>
    </div>
</template>

<script>
    export default {
        name: "DepMana",
        data() {
            return {
                pos:{
                    name:''
                },
                tableData: [
                ],
                dialogVisible: false,
                updatePos:{
                    name:''
                },
                //保存需要删除的id
                multipleSelection:[]
            }
        },
        methods:{
            handledeleteMultiple(){
                this.$confirm('是否删除'+this.multipleSelection.length+'条数据','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(resp=>{
                    if (resp){
                        let ids='?';
                        this.multipleSelection.forEach(item=>{
                            ids+='ids='+item.id+'&'
                        })
                        //发起删除请求
                        this.deleteRequest('/system/cfg/pos/'+ids).then(resp=>{
                            if (resp){
                                this.initProps();
                            }
                        })
                    }
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    })
                });
            },
            handleSelectionChange(val){
                this.multipleSelection=val;
            },
            initProps(){
                this.getRequest('/system/cfg/pos/').then(data=>{
                    if (data){
                        this.tableData=data;
                    }
                })
            },
            addPos(){
                if (this.pos.name!==''){
                    this.postRequest('/system/cfg/pos/',this.pos).then(resp=>{
                        if (resp){
                            this.pos.name='';
                            this.initProps();
                        }
                    })
                }else{
                    this.$message.error('职位名称不能为空！');
                }
            },
            deletePos(index,pos){
                this.$confirm("此操作将永久删除["+pos.name+"]职位,是否继续","提示",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.deleteRequest('/system/cfg/pos/' + pos.id).then(resp => {
                        if (resp) {
                            this.initProps();
                        }
                    })
                }).catch(()=>{
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    });
                });
            },
            showEditDialog(index,data){
                this.dialogVisible=true;
                Object.assign(this.updatePos,data);
                this.updatePos.createDate='';
            },
            doUpdatePos(){
                this.putRequest('/system/cfg/pos/',this.updatePos).then(resp=>{
                    if (resp){
                        this.initProps();
                    }
                })
                this.dialogVisible = false;
            }
        },
        mounted() {
            this.initProps();
        }
    }
</script>

<style scoped>

    .addPosInput{
        width: 250px;
        margin-right: 15px;
    }

    .updatePosInput{
        width: 200px;
        margin-left: 8px
    }

</style>