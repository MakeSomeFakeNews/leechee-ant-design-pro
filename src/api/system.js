import request from '@/utils/request'
const sysApi = {
    user: '/system/sys-user/getUserList',
    menu: '/system/sys-permission/list',
    menuDelete: '/system/sys-permission/delete',
    sysMenuAdd: '/system/sys-permission/add',
    sysMenuUpdate: '/system/sys-permission/update',
    role: '/system/sys-role/list',
    roleDelete: '/system/sys-role/delete',
    roleSaveOrUpdate: '/system/sys-role/saveOrUpdate',
    onwKeys: '/system/sys-role/onwKeys',
    dictType: '/system/sys-dict-type/list',
    dictTypeAdd: '/system/sys-dict-type/add',
    dictTypeDelete: '/system/sys-dict-type/delete',
    dictTypeUpdate: '/system/sys-dict-type/update',
    dict: '/system/sys-dict/list',
    dictAdd: '/system/sys-dict/add',
    dictUpdate: '/system/sys-dict/update',
    dictDelete: '/system/sys-dict/delete',

    sysInfo: '/system/sys-info/sysInfo',
    log: '/system/sys-log/list',
}
// 获取用户列表
export function user(parameter, obj) {
    return request({
        url: sysApi.user,
        method: 'post',
        params: parameter,
        data: obj
    })
}
//获取菜单节点
export function menu() {
    return request({
        url: sysApi.menu,
        method: 'get',
    })
}
//删除菜单
export function menuDelete(parameter) {
    return request({
        url: sysApi.menuDelete,
        method: 'post',
        data: parameter
    })
}
//添加菜单
export function sysMenuAdd(parameter) {
    return request({
        url: sysApi.sysMenuAdd,
        method: 'post',
        data: parameter
    })
}
//更新菜单
export function sysMenuUpdate(parameter) {
    return request({
        url: sysApi.sysMenuUpdate,
        method: 'post',
        data: parameter
    })
}

export function role(parameter) {
    return request({
        url: sysApi.role,
        method: 'post',
        data: parameter
    })
}

export function roleDelete(parameter) {
    return request({
        url: sysApi.roleDelete,
        method: 'post',
        data: parameter
    })
}

export function roleSaveOrUpdate(parameter) {
    return request({
        url: sysApi.roleSaveOrUpdate,
        method: 'post',
        data: parameter
    })
}

export function onwKeys(parameter) {
    return request({
        url: sysApi.onwKeys,
        method: 'post',
        data: parameter
    })
}

export function dictType(parameter, obj) {
    return request({
        url: sysApi.dictType,
        method: 'post',
        params: parameter,
        data: obj
    })
}

export function dictTypeDelete(parameter) {
    return request({
        url: sysApi.dictTypeDelete,
        method: 'post',
        data: parameter
    })
}

export function dictTypeAdd(parameter) {
    return request({
        url: sysApi.dictTypeAdd,
        method: 'post',
        data: parameter
    })
}

export function dictTypeUpdate(parameter) {
    return request({
        url: sysApi.dictTypeUpdate,
        method: 'post',
        data: parameter
    })
}

export function dict(parameter, obj) {
    return request({
        url: sysApi.dict,
        method: 'post',
        params: parameter,
        data: obj
    })
}

export function dictAdd(parameter) {
    return request({
        url: sysApi.dictAdd,
        method: 'post',
        data: parameter
    })
}

export function dictUpdate(parameter) {
    return request({
        url: sysApi.dictUpdate,
        method: 'post',
        data: parameter
    })
}

export function dictDelete(parameter) {
    return request({
        url: sysApi.dictDelete,
        method: 'post',
        data: parameter
    })
}

export function sysInfo() {
    return request({
        url: sysApi.sysInfo,
        method: 'get',
    })
}

export function log(parameter, obj) {
    return request({
        url: sysApi.log,
        method: 'post',
        params: parameter,
        data: obj
    })
}