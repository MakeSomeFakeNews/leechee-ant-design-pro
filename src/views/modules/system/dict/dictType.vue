<template>
  <a-card :borderd="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="字典类型">
              <a-input placeholder="请输入字典类型" v-model="queryForm.dictName" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="字典编码">
              <a-input placeholder="请输入字典编码" v-model="queryForm.dictCode" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button v-if="$auth('sys:user:view')" type="primary" @click="query" v-action:query>查询</a-button>
              <a-button
                v-if="$auth('sys:user:add')"
                type="primary"
                style="margin-left: 8px"
                @click="$refs.dictTypeAdd.add()"
                v-action:add
                >添加字典</a-button
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
      :pagination="pagination"
      @change="tableChange"
      :loading="loading"
    >
      <a slot="dictName" slot-scope="text, record" @click="$refs.dictData.dictData(record)">{{ record.dictName }}</a>
      <span slot="action" slot-scope="text, record">
        <a-button
          v-if="$auth('sys:user:update')"
          @click="$refs.dictTypeEdit.edit(record)"
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
    <dict-type-add ref="dictTypeAdd" @ok="handleOk" />
    <dict-type-edit ref="dictTypeEdit" @ok="handleOk" />
    <dict ref="dictData" @ok="handleOk" /> -
  </a-card>
</template>
<script>
import { dictType, dictTypeDelete } from '@/api/system'
import dictTypeAdd from './dictTypeAdd'
import dictTypeEdit from './dictTypeEdit'
import dict from './dictdata/dict'
export default {
  components: { dictTypeAdd, dictTypeEdit, dict },
  data() {
    return {
      queryForm: {},
      columns: [
        { title: '类型名称', dataIndex: 'dictName', ellipsis: true, scopedSlots: { customRender: 'dictName' } },
        { title: '类型编码', dataIndex: 'dictCode', ellipsis: true },
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
      data: [],
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
    query() {
      this.pagination.defaultCurrent = 1
      this.getDictType()
    },
    handleOk() {
      this.getDictType()
    },
    tableChange(e) {
      this.pagination.defaultCurrent = e.current
      this.pagination.defaultPageSize = e.pageSize
      this.getLogList()
    },
    onEdit(record) {},
    onDelete(record) {
      let params = {
        id: record.id,
      }
      this.$confirm({
        title: '确认操作',
        content: '您确认提交吗?',
        onOk: () => {
          dictTypeDelete(params).then((res) => {
            if (res.success) {
              this.$message.success('删除成功')
              this.getDictType()
            } else {
              this.$message.error(res.message)
            }
          })
        },
      })
    },
    getDictType() {
      this.loading = true
      const params = {
        current: this.pagination.defaultCurrent,
        pageSize: this.pagination.defaultPageSize,
      }
      const obj = {
        dictName: this.queryForm.dictName,
        dictCode: this.queryForm.dictCode,
      }
      dictType(params, obj).then((res) => {
        this.data = res.result.records
        this.pagination.total = res.result.total
        this.loading = false
      })
    },
  },
  created: function () {
    this.getDictType()
  },
}
</script>
