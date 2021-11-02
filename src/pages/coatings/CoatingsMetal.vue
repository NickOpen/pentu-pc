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
						<el-button
						size="mini"
						type="danger"
						@click="handleDeleteCoating(scope.row)">删除</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>

		<div class="footer-pagination">
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
			<el-form :model="editCoatingForm.form" class="edit-coating-form" ref="editCoatingFormRef">
				<el-form-item label="名称" label-width="120px">
					<el-input v-model.trim="editCoatingForm.form.name"></el-input>
				</el-form-item>
				<el-form-item label="电流" label-width="120px">
					<el-input v-model.number="editCoatingForm.form.current">
						<template slot="append">A</template>
					</el-input>
				</el-form-item>
				<el-form-item label="总气流量" label-width="120px">
					<el-input v-model.number="editCoatingForm.form.totalFlowAmount">
						<template slot="append">SLPM</template>
					</el-input>
				</el-form-item>

				<el-form-item label="工作气体" label-width="120px">
					<el-select v-model="editCoatingForm.form.workingGasId" placeholder="请选择">
						<el-option v-for="gasType in allWorkingGasType" :key="gasType.id" :label="gasType.name" :value="gasType.id"></el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="设备" label-width="120px">
					<el-select v-model="editCoatingForm.form.coatingDeviceId" placeholder="请选择">
						<el-option v-for="device in allCoatingDevices" :key="device.id" :label="device.name" :value="device.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="喷涂距离" label-width="120px">
					<el-input v-model.number="editCoatingForm.form.distance">
						<template slot="append">mm</template>
					</el-input>
				</el-form-item>

				<el-form-item label="送粉率" label-width="120px">
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
				<el-button size="mini" type="primary" @click="editCoatingFormConfirmHandler">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {mapActions, mapState} from 'vuex';
let emptyCoating = {
	name: "",
	current: null,
	totalFlowAmount: null,
	workingGasId: null,
	coatingDeviceId: null,
	distance: null,
	powderRate: null,
	features: "",
	docReferences: ""
};
export default {
	name: "MetalCoatingPage",
	data(){
		return {
			columns: [
				{
					prop: "id",
					label: "ID"
				},{
					prop: "name",
					label: "名称"
				},{
					prop: "current",
					label: "电流(A)"
				},{
					prop: "totalFlowAmount",
					label: "总气流量(SLPM)"
				},{
					prop: "workingGasName",
					label: "工作气体"
				},{
					prop: "coatingDeviceName",
					label: "设备"
				},{
					prop: "distance",
					label: "喷涂距离"
				},{
					prop: "powderRate",
					label: "送粉率"
				} /*,{
					prop: "features",
					label: "性能特点"
				},{
					prop: "docReferences",
					label: "文献出处"
				}*/
			],

			editCoatingForm: {
				dialogFormVisible: false,
				form: emptyCoating
			},

			editCoatingFormRules: {

			},

			featuresDrawer: false,
			referenceDrawer: false,
			selectedCoatingFeatures: "",
			selectedCoatingReference: ""
		}
	},
	computed: {
		...mapState({
			size: state => state.coatings.size,
			
			list: state => state.coatings.list,

			allCoatingDevices: state => state.coatingDevices.all,
			allWorkingGasType: state => state.workingGasTypes.all
		}),
		page: {
			get: function(){
				return this.$store.state.coatings.page;
			},
			set: function(){
				//TODO.
			}
		}
	},

	methods: {
		...mapActions([
			'listCoatings',
			'getAllWorkingGasTypes',
			'getAllCoatingDevices',
			'addCoating',
			'updateCoating',
			'deleteCoating',
			'getCoating'
		]),

		handleCloseFeaturesDrawer(){
			this.featuresDrawer = false;
		},

		handleCloseReferenceDrawer(){
			this.referenceDrawer = false;
		},

		async handleEditCoating(coating){
			let editCoating = await this.getCoating(coating.id);
			if(editCoating){
				this.editCoatingForm.form = {
					id: editCoating.id,
					name: editCoating.name,
					current: editCoating.current,
					totalFlowAmount: editCoating.totalFlowAmount,
					workingGasId: editCoating.workingGasId,
					coatingDeviceId: editCoating.coatingDeviceId,
					distance: editCoating.distance,
					powderRate: editCoating.powderRate,
					features: editCoating.features,
					docReferences: editCoating.docReferences
				}
				this.editCoatingForm.dialogFormVisible = true;
			}
		},

		handleDeleteCoating(coating){
			this.deleteCoating(coating.id);
		},

		viewCoatingFeatures(coating){
			this.selectedCoatingFeatures = coating.features;
			this.featuresDrawer = true;
		},

		viewCoatingReferences(coating){
			this.selectedCoatingReference = coating.docReferences;
			this.referenceDrawer = true;
		},

		getPageData(page){
			this.listCoatings({page: page});
		},

		addCoatingClickHandler(){
			this.editCoatingForm.dialogFormVisible = true;
			this.editCoatingForm.form = emptyCoating;
		},

		editCoatingFormCancelHandler(){
			this.$refs.editCoatingFormRef.resetFields();
			this.editCoatingForm.dialogFormVisible = false;
			this.editCoatingForm.form = emptyCoating
		},

		editCoatingFormConfirmHandler(){
			this.$refs.editCoatingFormRef.validate((valid) => {
          if (!valid) {
            return;
					}
					
					if(this.editCoatingForm.form.id){
						this.updateCoating(this.editCoatingForm.form).then(resp => {
							if(resp && resp.id){
								this.resetEditCoatingForm();
							}
						})
					}else{
						this.addCoating(this.editCoatingForm.form).then(resp => {
								if(resp && resp.id){
								this.resetEditCoatingForm();
							}
						})
					}
        });
		},

		resetEditCoatingForm(){
			this.$refs.editCoatingFormRef.resetFields();
			this.editCoatingForm.dialogFormVisible = false;
			this.editCoatingForm.form = emptyCoating
		}
	},
	mounted(){
		this.listCoatings({page: 1});
		this.getAllWorkingGasTypes();
		this.getAllCoatingDevices();
	}
}
</script>

<style lang="less">
.coatings-pg{
	.pg-header{
		width: 100%;
		text-align: right;
	}
	.coating-add-btn{
		width: 100px;
		background-color: #2D60D0;
		border: 1px solid #2D60D0;
		margin-bottom: 8px;
	}

	.drawer-features-content,
	.drawer-reference-content{
		padding: 0px 20px;
	}

	.coating-table{
		min-height: 80%;
	}

	.footer-pagination{
		text-align: right;
		margin-top: 10px;
	}

	.coating-edit-btn{
		background-color: #E5A312;
		border: 1px solid #E5A312;
	}

	.edit-coating-form{
		margin-left: 40px;
		margin-right: 40px;
	}
	.el-form-item__label{
		text-align: left;
	}

	.el-select{
		width: 100%;
	}

	.el-dialog__body{
		padding: 20px 20px 0px 20px;
	}
}
</style>