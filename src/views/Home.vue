<template>
    <el-container>
    <el-header class="homeHeader">
        <div class="title">
            云E办
        </div>
        <div>
            <el-dropdown class="userInfo" @command="handleCommand">
               <span class="el-dropdown-link">
                       {{user.name}}
<!--                    <img src="../static/19.png" >-->
                    <img :src="'/res/'+user.userFace" >
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="person">个人中心</el-dropdown-item>
                    <el-dropdown-item command="setting">设置</el-dropdown-item>
                    <el-dropdown-item command="logout">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </el-header>
    <el-container>
        <el-aside width="200px">
            <el-menu
                    router unique-opened>
                <el-submenu :index="index+''"
                    v-for="(item,index) in routes" :key="index"
                            v-show="!item.hidden"
                >
                    <template slot="title">
                        <i :class="item.iconCls" style="color: #1accff;margin-right: 5px"></i>
                        <span>{{item.name}}</span>
                    </template>

                    <el-menu-item :index="children.path"
                                  v-for="(children,indexj) in item.children" :key="indexj">
                        {{children.name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right" v-show="this.$router.currentRoute.path!=='/home'">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item >
                    {{this.$router.currentRoute.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="homeTitle" v-show="this.$router.currentRoute.path=='/home'">
                欢迎来到云E办
            </div>

            <router-view style="padding-top: 20px"></router-view>
        </el-main>
    </el-container>
</el-container>

</template>

<script>
    export default {
        data(){
          return{
              user:JSON.parse(window.sessionStorage.getItem('user')),
          }
        },
        name: "Home",
        computed:{
            routes(){
                return this.$store.state.routes;
            }
        },
        methods:{
            handleCommand(command){
                if (command=='logout'){
                    this.$confirm('确认关闭？','提示',{
                        type:'warning'
                    }).then(() => {
                       // 删除tokenStr和user，删除store中的menu
                        window.sessionStorage.removeItem("tokenStr");
                        window.sessionStorage.removeItem("user");
                        this.$store.commit('initRouter',[]);
                        this.$router.replace('/');

                        this.$message({
                           type:"success",
                           message:"success"
                       })
                    }).catch(()=>{
                        this.$message({
                            type: 'info',
                            message: 'cancel'
                        })
                    });
                }
            }
        },
    }
</script>

<style scoped>
    .homeHeader{
        background: #409eff;
        align-items: center;
        display: flex;
        justify-content: space-between;
        box-sizing:border-box ;

    }
    .homeHeader .title{
        color: white;
        font-size: 30px;
        font-family: 华文楷体;

    }
    .userInfo{
        cursor: pointer;

    }
    .userInfo img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 5px;
    }
    .homeTitle{
        color: #409eff;
        font-size: 30px;
        text-align: center;
        font-family: 华文楷体;
        padding-top: 30px;

    }

</style>