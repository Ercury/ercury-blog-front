import { defineStore, StoreGeneric } from 'pinia';
import router, { permissionRoutes } from '@/router/index';
import type { PermissionState } from '@/types/permissionState';
import { RouteRecordRaw, _RouteRecordBase } from 'vue-router';
import { useTagsViewStore } from './useTagsViewStore';

// 将访问过的路由固定到visited views bar
function handleFixedVisitedViews(
    tagsViewStore: StoreGeneric,
    routes: _RouteRecordBase[]
  ) {
    routes.forEach((route) => {
      if (route.meta && route.meta.fixed) {
        tagsViewStore.handleAddFixedVisitedView(route)
      }
      if (route.children && route.children.length)
        handleFixedVisitedViews(tagsViewStore, route.children)
    })
  }

export const usePermissionStore = defineStore('permission', {
    state: (): PermissionState => ({
        routes: []
    }),

    actions: {
        // 添加权限路由
        handleRoutes() {
            return new Promise((resolve) => {
                // 获取权限路由树
                this.routes = [...permissionRoutes];
                // 将权限路由添加到路由实例中
                this.routes.forEach((item: _RouteRecordBase) => {
                    router.addRoute(item as RouteRecordRaw)
                });
                
                // 获取tagsView
                const tagsViewStore = useTagsViewStore();
                handleFixedVisitedViews(tagsViewStore, this.routes);
                resolve('handleRoutes success')
            })
        },

        // 重制路由
        restRoutes() {
            this.routes.forEach((route: _RouteRecordBase) => {
                if(route.name) router.removeRoute(route.name)
            })
            this.routes = [];
        }
    },

    // 开启数据持久化
    persist: {
        enabled: true
    }
})
