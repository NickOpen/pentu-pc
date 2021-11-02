<template>
	<div class="sub-pg coatings-pg">
		<div class="pg-header">
			<el-button size="small" type="primary" class="coating-add-btn" @click="addCoatingClickHandler">新增</el-button>
		</div>
		
		<el-table
			class="coating-table"
			:data="list">
			<el-table-column
				v-for="column in columns"
				:prop="column.prop"
				:label="column.label"
				v-bind:key="column.prop">
			</el-table-column>
			<el-table-column
				label="性能特点">
				<template slot-scope="scope">
					<el-link type="primary" @click="viewCoatingFeatures(scope.row)">查看</el-link>
				</template>
			</el-table-column>
			<el-table-column
				label="文献出处">
				<template slot-scope="scope">
					<el-link type="primary" @click="viewCoatingReferences(scope.row)">查看</el-link>
				</template>
			</el-table-column>

			<el-table-column
				width="146"
				label="操作">
				<template slot-scope="scope">
					<div>
						<el-button
						size="mini"
						type="primary"
						class="coating-edit-btn"
						@click="handleEditCoating(scope.row)">编辑</el-button>
						<el-popconfirm
							title="确认删除 ？"
						>
							<el-button
								slot="reference"
								size="mini"
								type="danger"
								@click="handleDeleteCoating(scope.row)">删除</el-button>
						</el-popconfirm>
					</div>
				</template>
			</el-table-column>
		</el-table>

		<div class="footer-pagination" v-if="size">
			<el-pagination
				@current-change="getPageData"
				:current-page.sync="page"
				:page-size="10"
				layout="total, prev, pager, next"
				:total="size">
			</el-pagination>
		</div>

		<el-drawer
			title="性能特点"
			:visible.sync="featuresDrawer"
			direction="rtl"
			:before-close="handleCloseFeaturesDrawer">
			<div class="drawer-features-content">
				{{selectedCoatingFeatures}}
			</div>
		</el-drawer>

		<el-drawer
			title="文献出处"
			:visible.sync="referenceDrawer"
			direction="rtl"
			:before-close="handleCloseReferenceDrawer">
			<div class="drawer-reference-content">
				{{selectedCoatingReference}}
			</div>
		</el-drawer>


		<el-dialog title="编辑涂层类型" :visible.sync="editCoatingForm.dialogFormVisible" width="38%">
			<el-form :model="editCoatingForm.form" 
				:hide-required-asterisk="true"
				class="edit-coating-form" ref="editCoatingFormRef" :rules="editCoatingFormRules">
				<el-form-item label="名称" label-width="120px" prop="name">
					<el-input v-model.trim="editCoatingForm.form.name"></el-input>
				</el-form-item>
				<el-form-item label="电流" label-width="120px" prop="current">
					<el-input v-model.number="editCoatingForm.form.current">
						<template slot="append">A</template>
					</el-input>
				</el-form-item>
				<el-form-item label="总气流量" label-width="120px" prop="totalFlowAmount">
					<el-input v-model.number="editCoatingForm.form.totalFlowAmount">
						<template slot="append">SLPM</template>
					</el-input>
				</el-form-item>

				<el-form-item label="工作气体" label-width="120px" prop="workingGasId">
					<el-select v-model="editCoatingForm.form.workingGasId" placeholder="请选择">
						<el-option v-for="gasType in allWorkingGasType" :key="gasType.id" :label="gasType.name" :value="gasType.id"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="设备" label-width="120px" prop="coatingDeviceId">
					<el-select v-model="editCoatingForm.form.coatingDeviceId" placeholder="请选择">
						<el-option v-for="device in allCoatingDevices" :key="device.id" :label="device.name" :value="device.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="喷涂距离" label-width="120px" prop="distance">
					<el-input v-model.number="editCoatingForm.form.distance">
						<template slot="append">mm</template>
					</el-input>
				</el-form-item>

				<el-form-item label="送粉率" label-width="120px" prop="powderRate">
					<el-input v-model.number="editCoatingForm.form.powderRate">
						<template slot="append">r/min</template>
					</el-input>
				</el-form-item>
				<el-form-item label="特性" label-width="120px">
					<el-input type="textarea" :rows="2" v-model.trim="editCoatingForm.form.features"></el-input>
				</el-form-item>
				<el-form-item label="文献" label-width="120px">
					<el-input type="textarea" :rows="2" v-model.trim="editCoatingForm.form.docReferences"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click="editCoatingFormCancelHandler">取 消</el-button>
				<el-button size="mini" type="primary" @click="ConfirmEditEventHandler">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import coatingMixins from '../../mixins/coatings';
import {COATING_TYPES} from '../../config/sysConstants';

export default {
	name: "CeramicCoatingPage",
	mixins: [coatingMixins],
	methods: {
		ConfirmEditEventHandler(){
			this.editCoatingFormConfirmHandler(COATING_TYPES.CERAMIC.key);
		},

		getPageData(page){
			this.listCoatings({type: COATING_TYPES.CERAMIC.key, page});
		},
	},
	mounted(){
		this.listCoatings({type: COATING_TYPES.CERAMIC.key, page: 1});
		this.getAllWorkingGasTypes();
		this.getAllCoatingDevices();
	}
}
</script>