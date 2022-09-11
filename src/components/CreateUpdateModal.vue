<template>
    <div class="p-5 custom-modal">
        <b-modal :title="title" size="xl" v-model="isShowModal">
            <el-button
                v-show="isCreateModal"
                round
                size="small"
                class="mb-3 px-2 py-1 iom-btn"
                type="primary"
                @click="addRow"
                >Add More</el-button
            >
            <el-table class="create-update-table" max-height="300px" size="mini" border :data="data">
                <!-- <el-table-column type="index"> </el-table-column> -->
                <el-table-column
                    align="center"
                    header-align="center"
                    v-for="col in fields"
                    :key="col.key"
                    :min-width="col.minWidth"
                    :label="col.label"
                    >">
                    <template slot-scope="scope">
                        <el-date-picker
                            v-if="col.typeInput === 'date'"
                            size="small"
                            v-model="scope.row[col.value]"
                            :clearable="false"
                            type="date"
                            class="table-col"
                            placeholder=""
                        >
                        </el-date-picker>
                        <el-input
                            v-if="col.typeInput === 'text'"
                            placeholder="Please input"
                            size="small"
                            class="table-col"
                            v-model="scope.row[col.value]"
                        ></el-input>
                        <el-select
                            class="table-col"
                            v-if="col.typeInput === 'selection'"
                            size="small"
                            v-model="scope.row[col.value]"
                        >
                            <el-option
                                v-for="item in selections[col.selectOptionKey]"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column
                    v-show="hasMoreThanOneRow"
                    align="center"
                    width="150"
                    header-align="center"
                    label="Action"
                >
                    <template slot-scope="scope">
                        <el-button class="modal-action-btn" type="danger" @click="deleteRow(scope.$index)"
                            >Delete</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <template #modal-footer>
                <div>
                    <el-button type="info" class="float-right iom-btn p-2" @click="resetModal"> Cancel </el-button>
                    <el-button type="primary" class="mx-2 float-right iom-btn py-2 px-3" @click="show = false">
                        Save
                    </el-button>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    props: ['title', 'fields', 'data', 'selections', 'isShowUpsertModal', 'type'],
    data() {
        return {}
    },
    computed: {
        isShowModal: {
            get() {
                return this.isShowUpsertModal
            },
            set() {
                this.resetModal()
            },
        },
        isCreateModal() {
            return this.type == 'create'
        },
        hasMoreThanOneRow() {
            return this.data.length > 1
        },
    },
    watch: {
        tableData(newValue) {
            console.log('tableData ~ newValue', newValue)
        },
    },
    methods: {
        addRow() {
            this.$emit('add-row')
        },
        deleteRow(index) {
            this.$emit('delete-row', index)
        },
        resetModal() {
            this.$emit('reset-modal')
        },
    },
    mounted() {},
}
</script>

<style lang="scss">
.create-update-table {
    .table-col {
        width: 100% !important;
    }
    .modal-action-btn {
        padding: 0.5rem;
        font-size: 0.75rem;
    }
}
</style>
