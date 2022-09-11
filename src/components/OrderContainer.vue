<template>
    <b-container fluid class="order p-3">
        <b-row class="mb-3">
            <b-col cols="11" md="6" class="">
                <el-input size="small" placeholder="Please input" v-model="searchKey">
                    <template slot="prepend">Search</template>
                </el-input>
            </b-col>
            <b-col cols="auto" class="p-0">
                <el-button type="primary" class="p-2" icon="el-icon-rank"></el-button>
            </b-col>
        </b-row>

        <b-row class="action-btns">
            <b-col cols="auto" class="p-0">
                <el-button
                    class="p-2 iom-btn"
                    icon="el-icon-plus"
                    type="primary"
                    @click="handleInsertOrder"
                ></el-button>
            </b-col>
            <b-col cols="auto" class="p-0 mx-1">
                <el-button
                    class="p-2 iom-btn"
                    icon="el-icon-edit"
                    :disabled="!hasMultipleRowSelected"
                    type="success"
                    @click="handleUpdateMultipleOrder()"
                ></el-button>
            </b-col>
            <b-col cols="auto" class="p-0">
                <el-button
                    class="p-2 iom-btn"
                    icon="el-icon-delete"
                    :disabled="!hasMultipleRowSelected"
                    type="danger"
                    @click="handleUpdateMultipleOrder"
                ></el-button>
            </b-col>
        </b-row>

        <el-table
            size="mini"
            border
            ref="orderTable"
            :row-class-name="handleRowClassName"
            :data="orderTableData"
            class="order-table"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column
                v-for="field in tableFields"
                align="center"
                header-align="center"
                sortable
                :key="field.key"
                :prop="field.value"
                :label="field.label"
                :min-width="field.minWidth"
            >
            </el-table-column>
            <el-table-column align="center" header-align="center" label="Operations" min-width="150">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        class="px-2 py-1 iom-btn"
                        type="success"
                        :disabled="hasMultipleRowSelected"
                        icon="el-icon-edit"
                        @click="handleEditOneRow(scope.row)"
                    ></el-button>
                    <el-button
                        size="mini"
                        class="px-2 py-1 iom-btn"
                        type="danger"
                        :disabled="hasMultipleRowSelected"
                        icon="el-icon-delete"
                        @click="handleDeleteOneRow(scope.row)"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>

        <create-update-modal
            :title="upsertTitle"
            :fields="tableFields"
            :data="upsertData"
            :type="upsertType"
            :isShowUpsertModal="isShowUpsertModal"
            :selections="upsertSelections"
            @add-row="addUpsertTableRow"
            @delete-row="deleteUpsertTableRow"
            @reset-modal="closeUpsertModal"
        />
    </b-container>
</template>

<script>
import CreateUpdateModal from './CreateUpdateModal.vue'
export default {
    data() {
        const upsertSelections = {
            lanugage: [
                {
                    value: 'English',
                    label: 'English',
                },
                {
                    value: 'Vietnamese',
                    label: 'Vietnamese',
                },
            ],
            country: [
                {
                    value: 'Viet Nam',
                    label: 'Viet Nam',
                },
                {
                    value: 'Taiwan',
                    label: 'Taiwan',
                },
            ],
        }
        const upsertTemplateRow = {
            startDate: new Date(),
            endDate: new Date(),
            note: '',
            country: '',
            language: '',
        }
        const upsertData = [
            {
                startDate: new Date(),
                lanugage: upsertSelections.lanugage[0].value,
                endDate: new Date(),
                country: upsertSelections.country[0].value,
                note: '',
            },
        ]
        const tableFields = [
            {
                key: 1,
                typeInput: 'date',
                label: 'Start date',
                value: 'startDate',
                minWidth: 200,
            },
            {
                key: 2,
                typeInput: 'date',
                label: 'End date',
                value: 'endDate',
                minWidth: 200,
            },

            {
                key: 4,
                typeInput: 'selection',
                label: 'Language',
                value: 'language',
                selectOptionKey: 'lanugage',
                minWidth: 160,
            },
            {
                key: 5,
                typeInput: 'selection',
                label: 'country',
                value: 'country',
                selectOptionKey: 'country',
                minWidth: 160,
            },
            {
                key: 3,
                typeInput: 'text',
                label: 'Note',
                value: 'note',
                minWidth: 160,
            },
        ]
        return {
            searchKey: '',
            upsertTitle: '',
            upsertType: '',
            isShowUpsertModal: false,
            tableFields,
            upsertData,
            upsertSelections,
            upsertTemplateRow,
            orderTableData: [
                {
                    startDate: new Date().toDateString(),
                    endDate: new Date().toDateString(),
                    note: '',
                    country: 'Viet Name',
                    language: 'Vienamese',
                },
                {
                    startDate: new Date().toDateString(),
                    endDate: new Date().toDateString(),
                    note: '',
                    country: 'Taiwan',
                    language: 'Chinese',
                },
                {
                    startDate: new Date().toDateString(),
                    endDate: new Date().toDateString(),
                    note: '',
                    country: 'China',
                    language: 'Chinese',
                },
                {
                    startDate: new Date().toDateString(),
                    endDate: new Date().toDateString(),
                    note: '',
                    country: 'Usa',
                    language: 'English',
                },
            ],
        }
    },
    computed: {
        hasMultipleRowSelected() {
            return this.upsertData.length > 1
        },
    },
    methods: {
        handleInsertOrder() {
            this.clearTableSelection()
            this.resetUpsertModal()
            this.setUpsertModalTitle('Create Order')
            this.setUpsertModalType('create')
            this.openUpsertModal()
        },
        handleUpdateMultipleOrder() {
            this.setUpsertModalTitle('Update Order')
            this.setUpsertModalType('update')
            this.openUpsertModal()
        },
        addUpsertTableRow() {
            this.upsertData.push(this.upsertTemplateRow)
        },
        deleteUpsertTableRow(index) {
            this.upsertData.splice(index, 1)
        },
        closeUpsertModal() {
            this.isShowUpsertModal = false
        },
        resetUpsertModal() {
            this.upsertData = [{ ...this.upsertTemplateRow }]
        },
        openUpsertModal() {
            this.isShowUpsertModal = true
        },
        setUpsertModalTitle(title) {
            this.upsertTitle = title
        },
        setUpsertModalType(type) {
            this.upsertType = type
        },
        handleEditOneRow(row) {
            this.upsertData = [{ ...row }]
            this.setUpsertModalTitle('Update Order')
            this.setUpsertModalType('update')
            this.openUpsertModal()
        },
        handleDeleteOneRow() {
            this.$confirm('Are you sure, you want to delete this?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: 'Delete completed',
                    })
                })
                .catch(() => {})
        },
        handleSelectionChange(rows) {
            console.log('handleSelectionChange ~ rows', rows)
            this.upsertData = [...rows]
        },
        clearTableSelection() {
            this.$refs.orderTable.clearSelection()
        },
        handleRowClassName() {},
    },
    mounted() {},
    components: {
        'create-update-modal': CreateUpdateModal,
    },
}
</script>

<style lang="scss">
.order {
    .action-btns.row {
        margin-left: 0;
        margin-bottom: 1rem;
    }
}
</style>
