<template>
  <a-modal title="字典值管理" :width="1080" :height="800" :visible="visible" :footer="null" @cancel="handleCancel">
    <a-card :borderd="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="10" :sm="24">
              <a-form-item label="字典值">
                <a-input placeholder="请输入字典值" v-model="queryForm.value" allowClear />
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button v-if="$auth('sys:user:view')" type="primary" @click="query" v-action:query>查询</a-button>
                <a-button
                  v-if="$auth('sys:user:add')"
                  type="primary"
                  style="margin-left: 8px"
                  @click="$refs.dictAdd.add(id)"
                  v-action:add
                  >添加字典值</a-button
                >
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table
        :columns="columns"
        rowKey="id"
        :data-source="data"
        @change="tableChange"
        :pagination="pagination"
        :loading="loading"
      >
        <span slot="action" slot-scope="text, record">
          <a-button
            v-if="$auth('sys:user:update')"
            @click="$refs.dictEdit.edit(record)"
            type="primary"
            size="small"
            v-action:edit
            >编辑</a-button
          >
          <a-divider type="vertical" />
          <a-button v-if="$auth('sys:user:del')" type="primary" size="small" @click="onDelete(record)" v-action:delete
            >删除</a-button
          >
        </span>
      </a-table>
      <dict-add ref="dictAdd" @ok="handleOk" />
      <dict-edit ref="dictEdit" @ok="handleOk" />
    </a-card>
  </a-modal>
</template>
<script>
import { dict, dictDelete } from '@/api/system'
import dictAdd from './dictAdd'
import dictEdit from './dictEdit'
export default {
  components: { dictAdd, dictEdit },
  data() {
    return {
      queryForm: {},
      columns: [
        { title: '字典值', dataIndex: 'value', ellipsis: true },
        { title: '唯一编码', dataIndex: 'code', ellipsis: true },
        { title: '类型描述', dataIndex: 'descript', ellipsis: true },
        { title: '创建时间', dataIndex: 'createTime', ellipsis: true },
        {
          title: '操作',
          width: '160px',
          dataIndex: 'action',
          align: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ],
      id: 0,
      data: [],
      visible: false,
      pagination: {
        total: 0,
        defaultCurrent: 1,
        defaultPageSize: 20,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条/总共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['20', '40', '60', '100'],
      },
      loading: false,
    }
  },
  methods: {
    dictData(record) {
      this.visible = true
      this.id = record.id
      this.getDictData()
    },
    query() {
      this.pagination.defaultCurrent = 1
      this.getDictData()
    },
    handleOk() {
      this.getDictData()
    },
    handleCancel() {
      this.queryParam = {}
      this.visible = false
    },
    tableChange(e) {
      this.pagination.defaultCurrent = e.current
      this.pagination.defaultPageSize = e.pageSize
      this.getLogList()
    },
    addDict() {},
    onDelete(record) {
      let params = {
        id: record.id,
      }
      dictDelete(params).then((res) => {
        if (res.success) {
          this.$message.success('删除成功')
          this.getDictData()
        } else {
          this.$message.error(res.message)
        }
      })
    },
    getDictData() {
      this.loading = true
      const params = {
        current: this.pagination.defaultCurrent,
        pageSize: this.pagination.defaultPageSize,
      }
      const obj = {
        id: this.id,
        value: this.queryForm.value,
      }
      dict(params, obj).then((res) => {
        this.data = res.result.records
        this.pagination.total = res.result.total
        this.loading = false
      })
    },
  },
}
</script>
