<template>
    <div>
<!--        头部-->
        <div class="permissManaTool">
            <el-input placeholder="请输入角色英文名" v-model="role.name"
            style="width: 300px">
                <template slot="prepend">Role_</template>
            </el-input>
            <el-input placeholder="请输入角色中文名" v-model="role.nameZh"
            style="width: 300px;margin-left: 10px">
            </el-input>
            <el-button type="primary" icon="el-icon-plus" style="margin-left: 10px"
            @click="addRole">
                添加角色
            </el-button>
        </div>
<!--数据部分 Collapse折叠面板 el-collapse-item中的name会传递给handleChange作参数  -->
        <div class="permissManaMain">
            <el-collapse v-model="activeName"  @change="handleChange" accordion >
                    <el-collapse-item v-for="(item,index) in roles" :key="index"
                                      :title="item.nameZh" :name="item.id">
                        <el-card class="box-card"  >
                            <div slot="header" class="clearfix">
                                <span>可访问资源</span>
                                <el-button icon="el-icon-delete" type="text" @click="doDeleteRole(item)"
                                           style="float: right;padding-right: 10px;color: #ff0000"
                                ></el-button>
                            </div>
<!--                            树型控件
 data为节点数据源，props为展示的结构，label表示一行显示的字，children表示子类
分别通过default-expanded-keys和default-checked-keys设置默认展开和默认选中的节点。
需要注意的是，此时必须设置node-key，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。           -->
                            <div>
                                <el-tree show-checkbox
                                        :data="allMenus"
                                        :props="defaultProps"
                                        :key="index"
                                        ref="tree"
                                        :default-checked-keys="selectMenus"
                                        node-key="id">
                                </el-tree>
                            </div>
                            <div class="editMenu">
                                <el-button size="mini">取消修改</el-button>
                                <el-button type="primary" size="mini" @click="updateMenu(index,item.id)">确认修改</el-button>
                            </div>
                        </el-card>
                    </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissMana",
        data(){
            return {
                role:{
                    name:'',
                    nameZh:'',
                },
                roles:[],
                allMenus: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                selectMenus:[],
                activeName:-1
            }
        },
        methods:{
            initRoles(){
                this.getRequest("/system/basic/permiss/role").then(resp=>{
                    if (resp){
                        this.roles=resp;
                    }
                })
            },
            initRoleMenus(){
                this.getRequest("/system/basic/permiss/menus").then(resp=>{
                    if (resp){
                        this.allMenus=resp;
                    }
                })
            },
            handleChange(rid){
                if (rid){
                    this.initDefaultMenu(rid);
                    this.initRoleMenus();
                }
            },
            initDefaultMenu(rid){
                if (rid){
                    this.getRequest("/system/basic/permiss/menus/"+rid).then(resp=>{
                        if (resp){
                            this.selectMenus=resp;
                            this.selectMenus=JSON.parse(JSON.stringify(this.selectMenus));
                        }
                    })
                }
            },
            updateMenu(index,rid){
                let treeNode=this.$refs.tree[index];
                let selectKeys=treeNode.getCheckedKeys(true);
                let url='/system/basic/permiss/';
                url+='?rid='+rid;
                selectKeys.forEach(mid=>{
                    url+='&mids='+mid;
                })
                this.putRequest(url).then(resp=>{
                    if (resp){
                        this.initRoleMenus();
                        this.activeName=-1;
                    }
                });
            },
            addRole(){
                this.postRequest('/system/basic/permiss/role',this.role).then(resp=>{
                    if (resp){
                        this.initRoles();
                    }
                })
            },
            doDeleteRole(role){
                this.$confirm('此操作将永久删除[' + role.nameZh + ']角色, 是否继续?','提示',{
                    type:'warning',
                }).then(()=>{
                    this.deleteRequest('/system/basic/permiss/role/'+role.id).then(resp=>{
                        if (resp){
                            this.initRoles();
                        }
                    })
                })

            }

        },
        mounted() {
            this.initRoles();
            this.initRoleMenus();
        },

    }
</script>

<style scoped>
    .permissManaTool {
        display: flex;
        justify-content: flex-start;
    }
    .permissManaMain{
        margin-top: 10px;
        width: 800px;
    }
    .editMenu{
        float: right;
        padding-bottom: 10px;
        margin-top: 8px;

    }


</style>