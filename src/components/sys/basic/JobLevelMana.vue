<template>
    <div>
<!--        头部-->
        <template>
            <el-input style="width: 300px;margin-right: 8px"
                      placeholder="添加职位"
                      v-model="jl.name">
                <i slot="suffix" class="el-input__icon el-icon-plus"></i>
            </el-input>
            <el-select
                    style="margin-right: 8px"
                    v-model="jl.titleLevel" slot="prepend" placeholder="请选择">
                <el-option v-for="item in titleLevels"
                           :key="item"
                           :label="item"
                           :value="item">
                </el-option>
            </el-select>
            <el-button  @click="addJobLevel" size="middle" type="primary">添加</el-button>
        </template>

<!--        表格-->
        <div  >
            <el-table @selection-change="handleSelectionChange"
                    stripe border
                    :data="jls"
                    style="width: 100%;margin-top:8px">
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
                        label="职称名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="titleLevel"
                        label="职称等级">
                </el-table-column>
                <el-table-column
                        width="180"
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        width="150"
                        prop="enabled"
                        label="是否启用"
                >
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
                        <el-tag v-else type="danger">未启用</el-tag>
                    </template>
                </el-table-column>


                <el-table-column
                        prop="enabled"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showEditView(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="deleteHandler(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button size="small" style="margin-top: 10px"
                       :disabled="this.multipleSelection.length==0" type="danger"
                       @click="deleteMany">批量删除</el-button>
        </div>
        <el-dialog
                title="编辑职称"
                :visible.sync="dialogVisible"
                width="30%">
            <table>
                <tr>
                    <td>
                        <el-tag>职称名称</el-tag>
                    </td>
                    <td>
                        <el-input v-model="updateJl.name" size="small"
                                  style="margin-left: 6px;"
                        >
                        </el-input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-tag>职称等级</el-tag>
                    </td>
                    <td>
                        <el-select
                                size="small"
                                style="margin-left: 6px;margin-right: 6px"
                                v-model="updateJl.titleLevel"  placeholder="请选择">
                            <el-option v-for="item in titleLevels"
                                       :key="item"
                                       :label="item"
                                       :value="item">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <el-tag>是否启用</el-tag>
                    </td>
                    <td>
                        <el-switch v-model="updateJl.enabled"
                                   style="margin-left: 6px"
                                   active-color="#13ce66"
                                   inactive-color="#ff4949"
                                   active-text="已启用"
                                   inactive-text="未启用"
                        >
                        </el-switch>
                    </td>
                </tr>
            </table>

            <span slot="footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "JobLevelMana",
        data(){
            return{
                select:'',
                jls: [ ],
                jl: {
                    name: '',
                    titleLevel: ''
                },
                titleLevels: [
                    '正高级',
                    '副高级',
                    '高级',
                    '中级',
                    '初级',
                ],
                dialogVisible:false,
                updateJl: {
                    name: '',
                    titleLevel: '',
                    enabled: false
                },
                multipleSelection:[]
            }
        },
        mounted(){
            this.initJls();
        },
        methods:{
            deleteMany(){
                this.$confirm('此操作将永久删除[' + this.multipleSelection.length + ']条职称, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    });
                    this.deleteRequest('/system/cfg/joblev/' + ids).then(resp => {
                        if (resp) {
                            this.initJls();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            doUpdate() {
                this.putRequest('/system/cfg/joblev/', this.updateJl).then(resp => {
                    if (resp) {
                        this.initJls();
                        this.dialogVisible = false;
                    }
                })
            },
            showEditView(data) {
                Object.assign(this.updateJl, data);
                this.updateJl.createDate = '';
                this.dialogVisible = true;
            },
            deleteHandler(data) {
                this.$confirm('此操作将永久删除[' + data.name + ']职称, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/cfg/joblev/' + data.id).then(resp => {
                        if (resp) {
                            this.initJls();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addJobLevel() {
                if (this.jl.name && this.jl.titleLevel) {
                    this.postRequest('/system/cfg/joblev/', this.jl).then(resp => {
                        if (resp) {
                            this.initJls();
                            this.jl.name = '';
                            this.jl.titleLevel = '';
                        }
                    })
                } else {
                    this.$message.error('字段不能为空！');
                }
            },
            initJls() {
                this.getRequest('/system/cfg/joblev/').then(resp => {
                    if (resp) {
                        this.jls = resp;
                    }
                })
            }
        }

    }
</script>

<style scoped>


</style>