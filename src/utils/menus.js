import {getRequest} from "./api"

export const initMenu = (router,store)=>{

    if (store.state.routes.length>0){
        return;
    }

    getRequest('/system/cfg/menu').then(data=>{
        if (data){
            let fmtRoutes=formatRoutes(data);

            //格式化route
            router.addRoutes(fmtRoutes);
            //添加到router
            store.commit('initRouter',fmtRoutes);
        }
    })

}
export const formatRoutes=(routes)=>{

    let fmtroutes=[];
    routes.forEach(route=>{
        let{
            path,
            name,
            iconCls,
            component,
            children
        }=route
        if (children!=null&&children.length>0){
            children=formatRoutes(children);
        }
        let fmRouter = {
            path:path,
            name:name,
            iconCls:iconCls,
            children:children,
            component(resolve){

                if (component.startsWith('Home')) {
                    require(['../views/' + component + '.vue'], resolve);
                } else if (component.startsWith('Emp')) {
                    require(['../views/emp/' + component + '.vue'], resolve);
                } else if (component.startsWith('Per')) {
                    require(['../views/per/' + component + '.vue'], resolve);
                } else if (component.startsWith('Sal')) {
                    require(['../views/sal/' + component + '.vue'], resolve);
                } else if (component.startsWith('Sta')) {
                    require(['../views/sta/' + component + '.vue'], resolve);
                } else if (component.startsWith('Sys')) {
                    require(['../views/sys/' + component + '.vue'], resolve);
                }
            }

        }
        fmtroutes.push(fmRouter)
    })

    return fmtroutes;
}