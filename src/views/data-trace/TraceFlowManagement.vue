<template>
  <page>
    <div class="full-container">
      <el-table v-loading="traceFlowDataTable.loading"
                :data="getTraceFlows.slice(((traceFlowDataTable.page - 1) * traceFlowDataTable.size), (traceFlowDataTable.page * traceFlowDataTable.size))"
                border stripe size="small">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="id" :label="$t('DataTraceLocale.traceFlowManagement.columns.id')" width="200"></el-table-column>
        <el-table-column prop="name" :label="$t('DataTraceLocale.traceFlowManagement.columns.name')" min-width="200"></el-table-column>
        <el-table-column prop="description" :label="$t('DataTraceLocale.traceFlowManagement.columns.description')" min-width="200"></el-table-column>
        <el-table-column prop="bizKeys" :label="$t('DataTraceLocale.traceFlowManagement.columns.bizKeys')" min-width="200">
          <template slot-scope="scope">
            <el-tag :key="bizKey" v-for="bizKey in (scope.row.bizKeys || [])" :disable-transitions="false" class="mr-4 mb-2" size="mini">
              {{ bizKey }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('DataTraceLocale.traceFlowManagement.columns.createdDate')" width="160">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.createdDate).defaultFormat() }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('DataTraceLocale.traceFlowManagement.columns.lastModifiedDate')" width="160">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.lastModifiedDate).defaultFormat() }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="120">
          <template slot="header">
            <el-button icon="el-icon-plus" size="mini" type="primary" round @click="openCreateDialog">{{ $t('DataTraceLocale.traceFlowManagement.actions.create') }}</el-button>
          </template>
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-edit" circle @click="openEditDialog(scope.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="deleteTraceFlow(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="my-4"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="traceFlowDataTable.page"
        :page-sizes="[14, 30, 60, 120]"
        :page-size="traceFlowDataTable.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="getTraceFlows.length">
      </el-pagination>

      <el-dialog :title="dialogTitle" :visible="createDialog.visible || editDialog.visible" width="35%">
        <el-form size="mini">
          <el-form-item :label="$t('DataTraceLocale.traceFlowManagement.columns.name')">
            <el-input v-model="traceFlowForm.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('DataTraceLocale.traceFlowManagement.columns.description')">
            <el-input type="textarea" :rows="4" v-model="traceFlowForm.description"></el-input>
          </el-form-item>
          <el-form-item :label="$t('DataTraceLocale.traceFlowManagement.columns.bizKeys')">
            <el-tag :key="bizKey" v-for="bizKey in traceFlowForm.bizKeys" closable :disable-transitions="false"
                    class="mr-4 mb-4" size="small"
                    @close="traceFlowForm.bizKeys.splice(traceFlowForm.bizKeys.indexOf(bizKey), 1)">
              {{ bizKey }}
            </el-tag>
            <el-input v-if="bizKeyInputVisible"
                      v-model="bizKeyInputValue" ref="bizKeyInput" size="small"
                      style="width: 90px;"
                      @keyup.enter.native="handleInputBizKeyConfirm"
                      @blur="handleInputBizKeyConfirm">
            </el-input>
            <el-button v-else @click="showBizKeyInput">
              <i class="el-icon-plus mr-2"></i>
              {{ $t('DataTraceLocale.traceFlowManagement.actions.addBizKey') }}
            </el-button>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="() => { createDialog.visible = false; editDialog.visible = false }">{{ $t('DefaultLocale.actions.cancel') }}</el-button>
        <el-button size="small" type="primary" @click="saveTraceFlow">{{ dialogConfirmButton }}</el-button>
      </span>
      </el-dialog>
    </div>
  </page>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
import { mapGetters, mapActions } from 'vuex'
import Page from '../Page'
const traceFlowForm = {
  name: '',
  description: '',
  bizKeys: []
}

export default {
  name: 'TraceFlowManagement',
  components: { Page },
  data () {
    return {
      createDialog: {
        visible: false
      },
      editDialog: {
        visible: false
      },
      bizKeyInputVisible: false,
      bizKeyInputValue: '',
      traceFlowDataTable: {
        loading: true,
        page: 1,
        size: 14
      },
      traceFlowForm: cloneDeep(traceFlowForm)
    }
  },
  async beforeMount () {
    await this.retrieveData()
  },
  computed: {
    ...mapGetters('traceFlow', [
      'getTraceFlows'
    ]),
    dialogTitle () {
      if (this.createDialog.visible) {
        return this.$t('DataTraceLocale.traceFlowManagement.dialogs.create.title')
      }
      if (this.editDialog.visible) {
        return this.$t('DataTraceLocale.traceFlowManagement.dialogs.edit.title')
      }
      return ''
    },
    dialogConfirmButton () {
      if (this.createDialog.visible) {
        return this.$t('DefaultLocale.actions.create')
      }
      if (this.editDialog.visible) {
        return this.$t('DefaultLocale.actions.update')
      }
      return ''
    }
  },
  methods: {
    ...mapActions('traceFlow', [
      'retrieveTraceFlows'
    ]),
    async retrieveData () {
      this.traceFlowDataTable.loading = true
      await this.retrieveTraceFlows()
      this.traceFlowDataTable.loading = false
    },
    async handleSizeChange (size) {
      this.traceFlowDataTable.size = size
    },
    async handleCurrentChange (page) {
      this.traceFlowDataTable.page = page
    },
    openCreateDialog () {
      this.createDialog.visible = true
      this.bizKeyInputVisible = false
      this.traceFlowForm = cloneDeep(traceFlowForm)
    },
    async saveTraceFlow () {
      this.traceFlowDataTable.loading = true
      this.createDialog.visible = false
      this.editDialog.visible = false
      await this.$api.traceFlow.savePOST(this.traceFlowForm)
      await this.retrieveData()
    },
    async deleteTraceFlow (traceFlow) {
      try {
        await this.$confirm(this.$t('DataTraceLocale.traceFlowManagement.dialogs.delete.message', { traceFlowName: traceFlow.name }), this.$t('DefaultLocale.prompt'), {
          confirmButtonText: this.$t('DefaultLocale.actions.confirm'),
          cancelButtonText: this.$t('DefaultLocale.actions.cancel'),
          type: 'warning'
        })
        this.traceFlowDataTable.loading = true
        await this.$api.traceFlow.deleteDELETE(traceFlow.id)
        await this.retrieveData()
      } catch (e) {}
    },
    openEditDialog (traceFlow) {
      this.editDialog.visible = true
      this.bizKeyInputVisible = false
      this.traceFlowForm = cloneDeep(traceFlow)
      this.traceFlowForm.bizKeys = this.traceFlowForm.bizKeys || []
    },
    async showBizKeyInput () {
      this.bizKeyInputVisible = true
      await this.$nextTick()
      this.$refs.bizKeyInput.$refs.input.focus()
    },
    handleInputBizKeyConfirm () {
      let inputValue = this.bizKeyInputValue
      if (inputValue && !this.traceFlowForm.bizKeys.includes(inputValue)) {
        this.traceFlowForm.bizKeys.push(inputValue)
      }
      this.bizKeyInputVisible = false
      this.bizKeyInputValue = ''
    }
  }
}
</script>

<style scoped lang="scss">

</style>
