import {getRequest} from "@/utils/api";

export const initMenu=(router, store) => {

    if (store.state.routes.length > 0) {
        //如果store里面有数据，就说明这是正常的跳转（而不是按了F5之类的）
        return;
    }

    getRequest("/system/config/menu").then(value => {
        if (value) {
            let fmtRoutes = formatRoutes(value);
            router.addRoutes(fmtRoutes);
            store.commit('initRoutes', fmtRoutes);
        }
    })
}

export const formatRoutes= (routes) => {
    let fmtRoutes = [];
    routes.forEach(router => {
        //神奇不，这种声明
        let {
            path,
            component,
            name,
            meta,
            iconCls,
            children
        } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children)
        }
        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            //component要动态加载
            component(resolve) {
                let path = '';
                if (component.startsWith('Home')) {
                    path = ''
                } else if (component.startsWith('Emp')) {
                    path = 'emp/'
                } else if (component.startsWith('Per')) {
                    path = 'per/'
                } else if (component.startsWith('Sal')) {
                    path = 'sal/'
                } else if (component.startsWith('Sta')) {
                    path = 'sta/'
                } else if (component.startsWith('Sys')) {
                    path = 'sys/'
                }
                require(['../views/' + path + component + '.vue'], resolve);
            },
        }
        fmtRoutes.push(fmRouter);
    })
    return fmtRoutes;
}