<template>
  <a-card :borderd="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="24">
            <a-form-item label="用户名">
              <a-input placeholder="请输入用户名" v-model="queryForm.username" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item label="ip">
              <a-input placeholder="请输入ip" v-model="queryForm.ip" allowClear />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button v-if="$auth('sys:log:view')" type="primary" @click="query" v-action:query>查询</a-button>
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
      <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
        <a-descriptions title="日志信息" :column="{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
          <a-descriptions-item label="用户名">
            {{ record.username }}
          </a-descriptions-item>
          <a-descriptions-item label="用户操作">
            {{ record.operation }}
          </a-descriptions-item>
          <a-descriptions-item label="执行耗时"> {{ record.execTime }}ms </a-descriptions-item>
          <a-descriptions-item label="用户IP">
            {{ record.ip }}
          </a-descriptions-item>
          <a-descriptions-item label="执行时间">
            {{ record.createTime }}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="地址信息" :column="{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
          <a-descriptions-item label="请求地址">
            {{ record.link }}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions title="参数信息" :column="{ xxl: 3, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }">
          <a-descriptions-item label="请求参数">
            {{ record.params }}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    </a-table>
  </a-card>
</template>
<script>
import { log } from '@/api/system'
export default {
  name: 'User',
  data() {
    return {
      queryForm: {},
      columns: [
        { title: '用户名', dataIndex: 'username', width: 280 },
        { title: '用户操作', dataIndex: 'operation', width: 280 },
        { title: '执行耗时', dataIndex: 'execTime', width: 160 },
        {
          title: '请求参数',
          dataIndex: 'params',
          ellipsis: true,
          align: 'center',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: '用户IP',
          dataIndex: 'ip',
          ellipsis: true,
          width: 320,
          scopedSlots: { customRender: 'status' },
        },
        { title: '执行时间', dataIndex: 'createTime', width: 320, ellipsis: true },
      ],
      data: [],
      pagination: {
        total: 0,
        defaultCurrent: 1,
        defaultPageSize: 10,
        showTotal: (total, range) => `第${range[0]}-${range[1]}条/总共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ['15', '30', '60', '100'],
      },
      loading: false,
    }
  },
  methods: {
    query() {
      this.pagination.defaultCurrent = 1
      this.getLogList()
    },
    tableChange(e) {
      this.pagination.defaultCurrent = e.current
      this.pagination.defaultPageSize = e.pageSize
      this.getLogList()
    },
    getLogList() {
      this.loading = true
      const params = {
        current: this.pagination.defaultCurrent,
        pageSize: this.pagination.defaultPageSize,
      }

      const obj = {
        username: this.queryForm.username,
        ip: this.queryForm.ip,
      }
      log(params, obj).then((res) => {
        this.data = res.result.records
        this.pagination.total = res.result.total
        this.loading = false
      })
    },
  },
  created: function () {
    this.getLogList()
  },
}
</script>
