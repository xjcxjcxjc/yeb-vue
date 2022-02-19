<template>
    <div>
<!--        头部搜索框-->
        <div style="display: flex;justify-content: space-around">
            <span>
                <el-input v-model="keywords" style="width:500px;margin-right: 10px"></el-input>
                <el-button @click="initAdmin" type="primary" icon="el-icon-search">搜索</el-button>
            </span>
        </div>

        <div class="admin-container">
            <el-card class="el-col-md-7 admin-item" v-for="item in admins">
                <div slot="header">
                    <span>
                        {{item.name}}
                    </span>
                    <el-button  @click="doDelete(item)" type="text" class="el-icon-delete-solid"
                                style="float: right;color: #f81515;padding: 3px"/>
                </div>
                <div class="img-container">
                    <el-avatar :size="100" :src="'/res'+item.userFace">
                    </el-avatar>
                </div>
                <div>
                    <div>用户名：{{item.name}}</div>
                    <div>手机号码：{{item.phone}}</div>
                    <div>电话号码：{{item.telephone}}</div>
                    <div>地址：{{item.address}}</div>
                    <div>用户状态：
                        <el-switch
                                v-model="item.enabled"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="doUpdate(item)"
                                active-text="启用"
                                inactive-text="禁用">
                        </el-switch>
                    </div>
                    <!--                    用户角色-->
                    <div>
                        用户角色：
                        <el-tag style="margin-right: 4px" type="success" v-for="(role,indexj)
                         in item.roles"
                                :key="indexj">{{role.nameZh}}
                        </el-tag>
                        <el-popover
                                @show="showPop(item)"
                                placement="right"
                                title="角色列表"
                                width="200"
                                trigger="click"
                        >
                            <el-select
                                    v-model="selectedRoles"
                                    multiple placeholder="请选择">
                                <el-option
                                        v-for="(r,index) in allRoles"
                                        :key="index"
                                        :label="r.nameZh"
                                        :value="r.id">

                                </el-option>
                            </el-select>

                            <el-button slot="reference"
                                       type="text" icon="el-icon-more"/>

                        </el-popover>
                    </div>
                    <div>
                        备注：{{item.remark}}
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SysAdmin",
        data(){
            return {
                admins:[],
                selectedRoles:[],
                allRoles:[],
                keywords:'',
            }
        },
        methods:{
            initAdmin(){
                this.getRequest('/system/admin/?keywords='+this.keywords).then(resp=>{
                    if (resp){
                        this.admins=resp;
                    }
                })
            },
            doDelete(admin){
                this.$confirm('此操作将永久删除'+admin.name,'提示',{
                    type:'warning',
                }).then(()=>{
                    this.deleteRequest('/system/admin/?id='+admin.id).then(resp=>{
                        if (resp){
                            this.initAdmin();
                        }
                    })

                })
            },
            doUpdate(admin){
                this.putRequest("/system/admin/",admin).then(resp=>{
                    if (resp){
                        this.initAdmin();
                    }
                })
            },
            showPop(admin){
                this.getAllRoles();
                let roles=admin.roles;
                this.selectedRoles=[];
                roles.forEach(item=>{
                    this.selectedRoles.push(item.id);
                })


            },
            getAllRoles(){
                this.getRequest('/system/admin/role').then(resp=>{
                    if (resp){
                        this.allRoles=resp;
                    }
                })

            }
        },
        mounted() {
            this.initAdmin();
        },

    }
</script>

<style scoped>

    .admin-container{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

    }

    .admin-item{
        margin-top: 10px;


    }


    .img-container{
        display: flex;
        justify-content: space-around;

    }



</style>