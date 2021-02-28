<template>
  <a-modal
    title="新增菜单"
    :width="1000"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :destroyOnClose="true"
  >
    <a-spin :spinning="loading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item label="菜单名称" :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
              <a-input
                placeholder="请输入菜单名称"
                v-decorator="['permissionName', { rules: [{ required: true, min: 1, message: '请输入菜单名称！' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item style="width: 100%" :labelCol="labelCol" :wrapperCol="wrapperCol" label="菜单编号" hasFeedback>
              <a-input
                placeholder="请输入菜单编号"
                v-decorator="[
                  'componentName',
                  { rules: [{ required: componentNameRequired, min: 1, message: '请输入菜单编号！' }] },
                ]"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="菜单类型">
              <a-radio-group
                v-decorator="['permissionType', { rules: [{ required: true, message: '请选择菜单类型！' }] }]"
              >
                <a-radio value="1" @click="meneOpenTypeFunc(1)">菜单</a-radio>
                <a-radio value="2" @click="meneOpenTypeFunc(2)">按钮</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <div>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="父级菜单" has-feedback>
                <a-tree-select
                  v-decorator="['pid', { rules: [{ required: true, message: '请选择父级菜单！' }] }]"
                  style="width: 100%"
                  :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
                  :treeData="menuTreeData"
                  :replace-fields="{
                    children: 'children',
                    key: 'id',
                    value: 'id',
                    title: 'permissionName',
                  }"
                  placeholder="请选择父级菜单"
                  treeDefaultExpandAll
                >
                  <span slot="title" slot-scope="{ id }">{{ id }} </span>
                </a-tree-select>
              </a-form-item>
            </div>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <div>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <span slot="label">
                  <a-tooltip title="如需打开首页加载此目录下菜单，请填写加载菜单路由，设为首页后其他设置的主页将被替代">
                    <a-icon type="question-circle-o" /> </a-tooltip
                  >&nbsp; 重定向
                </span>
                <a-input prop="redirect" placeholder="请输入重定向地址" v-decorator="['redirect']" />
              </a-form-item>
            </div>
          </a-col>
        </a-row>

        <a-divider />

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <div>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                <span slot="label">
                  <a-tooltip
                    title="前端vue组件 views文件夹下路径，例：system/menu/index。注：目录级填写：RouteView(不带面包屑)，PageView(带面包屑)，菜单级内链打开http链接填写：Iframe"
                  >
                    <a-icon type="question-circle-o" /> </a-tooltip
                  >&nbsp; 前端组件
                </span>
                <a-input
                  placeholder="请输入前端组件"
                  :disabled="componentDisabled"
                  prop="component"
                  v-decorator="['component', { rules: [{ required: componentRequired, message: '请输入前端组件' }] }]"
                />
              </a-form-item>
            </div>
          </a-col>
          <a-col :md="12" :sm="24">
            <div>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" hasFeedback>
                <span slot="label">
                  <a-tooltip title="浏览器显示的URL，例：/menu，对应打开页面为菜单页面">
                    <a-icon type="question-circle-o" /> </a-tooltip
                  >&nbsp; 路由地址
                </span>
                <a-input
                  placeholder="请输入路由"
                  v-decorator="['path', { rules: [{ required: routerRequired, message: '请输入路由！' }] }]"
                />
              </a-form-item>
            </div>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <div>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="图标">
                <a-input placeholder="请选择图标" disabled="disabled" v-decorator="['icon']">
                  <a-icon slot="addonAfter" @click="openIconSele()" type="setting" />
                </a-input>
              </a-form-item>
            </div>
          </a-col>
          <a-col :md="12" :sm="24">
            <div>
              <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="权限标识" hasFeedback>
                <a-input
                  placeholder="请输入权限标识"
                  v-decorator="[
                    'permission',
                    { rules: [{ required: permissionRequired, message: '请输入权限标识！' }] },
                  ]"
                />
              </a-form-item>
            </div>
          </a-col>
        </a-row>

        <a-row :gutter="24">
          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="排序">
              <a-input-number style="width: 100%" v-decorator="['sort', { initialValue: 100 }]" :min="1" :max="1000" />
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="24">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="备注" hasFeedback>
              <a-input placeholder="请输入备注" v-decorator="['descript']"></a-input>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <a-modal
      :width="850"
      :visible="visibleIcon"
      @cancel="handleCancelIcon"
      footer=""
      :mask="false"
      :closable="false"
      :destroyOnClose="true"
    >
      <icon-selector v-model="currentSelectedIcon" @change="handleIconChange" />
    </a-modal>
  </a-modal>
</template>

<script>
import IconSelector from '@/components/IconSelector'
import { menu, sysMenuAdd } from '@/api/system'
export default {
  components: { IconSelector },
  data() {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      visibleIcon: false,
      visible: false,
      confirmLoading: false,
      menuTreeData: [],
      componentDisabled: false,
      componentRequired: true,
      routerRequired: true,
      permissionRequired: true,
      componentNameRequired: true,
      currentSelectedIcon: 'pause-circle',
      loading: false,
      type: '',
      form: this.$form.createForm(this),
    }
  },
  methods: {
    add(type) {
      this.visible = true
      this.currentSelectedIcon = type
      this.form.getFieldDecorator('permissionType', { valuePropName: 'checked', initialValue: '1' })
      this.meneOpenTypeFunc(1)
      this.gettTreeDate()
    },
    handleSubmit() {
      const {
        form: { validateFields },
      } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          sysMenuAdd(values)
            .then((res) => {
              this.confirmLoading = false
              if (res.success) {
                this.$message.success('新增成功')
                this.$emit('ok', values)
                this.handleCancel()
              } else {
                this.$message.error('新增失败：' + res.message)
              }
            })
            .finally((res) => {
              this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel() {
      this.form.resetFields()
      this.confirmLoading = false
      this.visible = false
    },
    handleCancelIcon() {
      this.visibleIcon = false
    },
    handleIconChange(icon) {
      this.form.getFieldDecorator('icon', { initialValue: icon })
      this.visibleIcon = false
    },
    openIconSele() {
      this.visibleIcon = true
    },
    meneOpenTypeFunc(e) {
      if (e == 2) {
        this.routerRequired = false
        this.componentRequired = false
        this.permissionRequired = true
        this.componentNameRequired = false
      } else {
        this.routerRequired = true
        this.componentRequired = true
        this.permissionRequired = false
        this.componentNameRequired = true
      }
    },
    gettTreeDate() {
      menu().then((res) => {
        if (!res.success) {
          this.$message.error('菜单获取失败')
          return
        }
        this.menuTreeData = [
          {
            id: '0',
            parentId: '0',
            permissionName: '顶级',
            pid: '0',
            children: res.result,
          },
        ]
      })
    },
  },
}
</script>

<style>
</style>

