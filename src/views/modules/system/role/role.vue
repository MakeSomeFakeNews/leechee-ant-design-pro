<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-space>
                <a-button v-if="$auth('sys:role:add')" type="primary" @click="addRole" v-action:add>添加角色</a-button>
              </a-space>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 表格数据 -->
    <a-table
      :columns="columns"
      rowKey="id"
      :data-source="data"
      :pagination="false"
      @change="tableChange"
      :loading="loading"
      :defaultExpandAllRows="false"
    >
      <span slot="status" slot-scope="text, record">
        <a-tag :color="record.status == 0 ? 'green' : 'red'">
          {{ record.status == 0 ? '启用' : '禁用' }}
        </a-tag>
      </span>
      <span slot="createTime" slot-scope="text, record">
        {{ record.createTime, }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="onEdit(record)" v-if="$auth('sys:role:update')" v-action:edit>编辑</a>
        <a-divider type="vertical" />
        <a @click="onDelete(record)" v-if="$auth('sys:role:del')" v-action:delete>删除</a>
      </span>
    </a-table>
    <!-- 抽屉-编辑权限 -->
    <a-drawer :title="title" :width="600" :visible="visible" @close="onClose" :maskClosable="false">
      <a-form ref="formLogin" :form="form" @submit="handleSubmit">
        <a-row>
          <a-col :span="24">
            <a-form-item label="角色名称">
              <a-input v-decorator="rules.roleName" placeholder="请输入角色名称" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="角色编码">
              <a-input v-decorator="rules.roleCode" placeholder="请输入角色编码" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="角色描述">
              <a-input v-decorator="rules.descript" placeholder="请输入角色描述" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="状态">
              <a-radio-group v-decorator="rules.status">
                <a-radio :value="0"> 启用 </a-radio>
                <a-radio :value="1"> 禁用 </a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="角色权限">
              <a-tree
                v-model="checkedKeys"
                checkable
                checkStrictly
                show-icon
                multiple
                :tree-data="treeData"
                @select="onSelect"
                @check="onCheck"
                :replace-fields="{
                  children: 'children',
                  key: 'id',
                  value: 'id',
                  title: 'permissionName',
                }"
              >
                <a-icon slot="icon" slot-scope="item" style="color: rgb(24, 144, 255)" :type="item.icon" />
              </a-tree>
            </a-form-item>
          </a-col>
        </a-row>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button type="primary" htmlType="submit" :loading="loginState" :disabled="loginState"> 提交 </a-button>
        </div>
      </a-form>
    </a-drawer>
  </a-card>
</template>

<script>
import { role, roleSaveOrUpdate, onwKeys, roleDelete } from '@/api/system'
import { treeData } from '@/utils/util.js'
export default {
  name: 'role',
  data() {
    return {
      columns: [
        { title: '角色名称', dataIndex: 'roleName' },
        { title: '角色代码', dataIndex: 'roleCode' },
        { title: '状态', dataIndex: 'status', scopedSlots: { customRender: 'status' } },
        { title: '创建人', dataIndex: 'createBy' },
        {
          title: '创建时间',
          dataIndex: 'createTime',
        },
        {
          title: '更新时间',
          dataIndex: 'updateTime',
        },
        {
          title: '操作',
          width: '160px',
          dataIndex: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ],
      data: [],
      loading: false,
      roleName: '',
      roleCode: '',
      status: undefined,
      title: '',
      visible: false,
      roleID: '',
      form: this.$form.createForm(this),
      rules: {
        roleName: ['roleName', { rules: [{ required: true, message: '请输入角色名称' }] }],
        status: ['status', { initialValue: 1, rules: [{ required: true, message: '请选择状态' }] }],
        roleCode: ['roleCode', { rules: [{ required: true, message: '请输入角色编码' }] }],
        descript: ['descript', { rules: [{ required: true, message: '请输入角色描述' }] }],
      },
      loginState: false,
      treeData: [],
      checkedKeys: [],
      selectedKeys: [],
    }
  },
  methods: {
    tableChange(e) {
      this.getRoleList()
    },
    getRoleList() {
      this.permissionList = []
      this.loading = true
      let params = {
        roleName: this.roleName,
        status: this.status,
      }
      role(params).then((res) => {
        if (res.success) {
          this.data = res.result.roleList
          res.result.permissionList.forEach((v) => {
            v.key = v.id
            if (v.icon) v.scopedSlots = { icon: 'icon' }
          })
          this.treeData = treeData(res.result.permissionList, 'id', 'pid', 'children')
          this.loading = false
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    query() {
      this.getRoleList()
    },
    // 保存
    handleSubmit(e) {
      e.preventDefault()

      const {
        form: { validateFields },
      } = this
      const validateFieldsKey = ['roleName', 'status', 'roleCode', 'descript']
      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const params = { ...values }
          params.id = this.roleID
          params.roleList = this.checkedKeys.checked
          roleSaveOrUpdate(params)
            .then((res) => {
              if (res.success) {
                this.form.resetFields()
                this.roleID = ''
                this.checkedKeys = []
                this.visible = false
                this.$message.success('操作成功！')
                this.getRoleList()
              } else {
                this.$message.error(res.msg)
              }
            })
            .finally(() => {
              setTimeout(() => {
                this.loginState = false
              }, 600)
            })
        }
      })
    },
    addRole() {
      this.visible = true
      this.title = '添加角色规则'
    },
    onClose() {
      this.visible = false
      this.roleID = ''
      this.checkedKeys = []
      this.form.resetFields()
    },
    onEdit(record) {
      this.roleID = record.id
      this.visible = true
      this.title = '编辑角色规则:' + record.roleName
      onwKeys(record).then((res) => {
        if (res.success) {
          this.checkedKeys = res.result

        } else {
          this.$message.error(res.msg)
        }
      })
      this.$nextTick(() => {
        this.form.setFieldsValue({
          roleName: record.roleName,
          status: record.status,
          roleCode: record.roleCode,
          descript: record.descript,
        })
      })
    },
    // 删除
    onDelete(record) {
      let params = {
        id: record.id,
        roleName: record.roleName,
      }
      this.$confirm({
        title: '确认操作',
        content: '您确认提交吗?',
        onOk: async () => {
          await roleDelete(params).then((res) => {
            if (res.success) {
              this.$message.success('删除成功')
              this.getRoleList()
            } else {
              this.$message.error(res.message)
            }
          })
        },
      })
    },
    onSelect(selectedKeys, info) {
      this.selectedKeys = selectedKeys
    },
    onCheck(checkedKeys) {
      this.checkedKeys = checkedKeys
      console.log('checkedKeys', checkedKeys)
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.getRoleList()
    })
  },
}
</script>

<style>
</style>