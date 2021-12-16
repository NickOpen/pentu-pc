<template>
	<div class="pg sub-pg coatings-pg">
		<div class="pg-header">
			<div class="fitler">
				<el-input class="filter_item filter_name" placeholder="请输入涂层材料关键字..." size="medium" v-model="searchKeys.name" ></el-input>
				<el-button size="small" plain type="primary" class="filter-btn" @click="filterClickHandler">搜索</el-button>
			</div>
			
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
        <template slot-scope="scope">
          <div v-if="column.formatter">
            {{column.formatter(scope.row, column.prop)}}
          </div>
          <div v-else-if="scope.row[column.prop]">
            {{scope.row[column.prop]}}
          </div>
					<div v-else>/</div>
        </template>
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
				fixed="right"
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
							@confirm="handleDeleteCoating(scope.row)"
						>
							<el-button
								slot="reference"
								size="mini"
								type="danger"
								>删除</el-button>
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
			title="文献或出处"
			:visible.sync="referenceDrawer"
			direction="rtl"
			:before-close="handleCloseReferenceDrawer">
			<div class="drawer-reference-content">
				{{selectedCoatingReference}}
			</div>
		</el-drawer>

		<el-dialog title="编辑涂层类型" :visible.sync="editCoatingForm.dialogFormVisible" width="48%">
			<el-form :model="editCoatingForm.form" 
				:hide-required-asterisk="true"
				class="edit-coating-form" ref="editCoatingFormRef" :rules="editCoatingFormRules">
				<el-form-item label="涂层材料" label-width="120px" prop="materialName">
					<el-input v-model.trim="editCoatingForm.form.materialName"></el-input>
				</el-form-item>
				<el-form-item label="材料规格" label-width="120px" prop="materialSpec">
					<el-input v-model.trim="editCoatingForm.form.materialSpec"></el-input>
				</el-form-item>
				<el-form-item  label="制备方法" label-width="120px" prop="createMethod">
					<el-select v-model="editCoatingForm.form.createMethod" placeholder="请选择">
						<el-option v-for="createMethod in allCreateMethods" :key="createMethod.key" 
              :label="createMethod.title" :value="createMethod.key"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="粉末与胶配比" label-width="120px" prop="mixRatio">
					<el-input v-model.trim="editCoatingForm.form.mixRatio">
					</el-input>
				</el-form-item>
				<el-form-item label="浆料涂覆速度" label-width="120px" prop="speed">
					<el-col :span="19">
            <el-input v-model="editCoatingForm.form.speed" class="powder-rate-input"></el-input>
          </el-col>
          <el-col :span="5">
            <el-select v-model="editCoatingForm.form.speedUnit" class="powder-rate-unit-select">
              <el-option v-for="speedUnit in allSpeedUnit" :key="speedUnit.key" :label="speedUnit.title" :value="speedUnit.key"></el-option>
            </el-select>
          </el-col>
				</el-form-item>
				<el-form-item label="烧结温度" label-width="120px" prop="temperature">
					<el-input v-model.number="editCoatingForm.form.temperature">
						<template slot="append">K</template>
					</el-input>
				</el-form-item>
				<el-form-item label="烧结升温速度" label-width="120px" prop="tempUpSpeed">
					<el-input v-model.number="editCoatingForm.form.tempUpSpeed">
						<template slot="append">℃/s</template>
					</el-input>
				</el-form-item>
				<el-form-item label="烧结时间" label-width="120px" prop="time">
					<el-input v-model.number="editCoatingForm.form.time">
						<template slot="append">h</template>
					</el-input>
				</el-form-item>
				<el-form-item label="烧结气氛" label-width="120px" prop="atmosphere">
					<el-input v-model.trim="editCoatingForm.form.atmosphere"></el-input>
				</el-form-item>
				<el-form-item  label="烧结压力" label-width="120px" prop="pressure">
					<el-col :span="19">
            <el-input v-model.number="editCoatingForm.form.pressure" class="powder-rate-input"></el-input>
          </el-col>
          <el-col :span="5">
            <el-select v-model="editCoatingForm.form.pressureUnit" class="powder-rate-unit-select">
              <el-option v-for="pressureUnit in pressureUnits" :key="pressureUnit.key" :label="pressureUnit.title" :value="pressureUnit.key"></el-option>
            </el-select>
          </el-col>

				</el-form-item>
				<el-form-item label="设备型号" label-width="120px" prop="type">
          <el-input v-model.trim="editCoatingForm.form.type"></el-input>
				</el-form-item>
				<el-form-item label="性能特点" label-width="120px">
					<el-input type="textarea" :rows="5" v-model.trim="editCoatingForm.form.features"></el-input>
				</el-form-item>
				<el-form-item label="文献或出处" label-width="120px">
					<el-input type="textarea" :rows="5" v-model.trim="editCoatingForm.form.docReferences"></el-input>
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
import {isNumberVailatorForFormInput} from '../../utiles/index';
import {SOFC_COATING_CREATE_TYPES, SOFC_SPEED_UNITS, PRESSURE_UNITS} from '../../config/sysConstants';
import {Notification} from 'element-ui';

let emptySofcCoating = {
	materialName: "",
	materialSpec: '',
	createMethod: SOFC_COATING_CREATE_TYPES.LIU_YAN.key,
	mixRatio: null,
	speed: null,
	speedUnit: SOFC_SPEED_UNITS.CM_S.key,
	temperature: null,
	tempUpSpeed: null,
	time: null,
	atmosphere: null,
	pressure: null,
	pressureUnit: PRESSURE_UNITS.KPA.key,
	type: '',
	features: '',
	docReferences: ""
};

export default {
	name: "SofcSinterCoatingPage",
	components: {
		
	},
	data(){
		return {
			columns: [
				{
					prop: "id",
					label: "ID"
				},{
					prop: "materialName",
					label: "涂层材料"
				},{
					prop: "materialSpec",
					label: "材料规格"
				},{
					prop: "createMethod",
					label: "制备方法",
					formatter: function(row, col){
						let value = row[col];
						if(value){
							return SOFC_COATING_CREATE_TYPES[value].title
						}else{
							return '/';
						}
					}
				},{
					prop: "mixRatio",
					label: "粉末与胶配比"
				},{
					prop: "speed",
					label: "浆料涂覆速度",
					formatter: function(row, col){
						let value = row[col];
						if(row && value && row['speedUnit'] && SOFC_SPEED_UNITS[row['speedUnit']]){
							return `${value} ${SOFC_SPEED_UNITS[row['speedUnit']].title}`
						}else{
							return '/';
						}
					}
				},{
					prop: "temperature",
					label: "烧结温度"
				},{
					prop: "tempUpSpeed",
					label: "烧结升温速度(℃/s)"
				},{
					prop: "time",
					label: "烧结时间(h)"
				},{
					prop: "atmosphere",
					label: "烧结气氛"
				},{
					prop: "pressure",
					label: "烧结压力",
					formatter: function(row, col){
						let value = row[col];
						if(row && value && row['pressureUnit'] && PRESSURE_UNITS[row['pressureUnit']]){
							return `${value} ${PRESSURE_UNITS[row['pressureUnit']].title}`; 
						}else{
							return '/';
						}
					}
				},{
					prop: "type",
					label: "设备型号"
				}
			],
			/**
			 * 搜索关键字
			 */
			searchKeys: {
				name: null
			},

			editCoatingForm: {
				dialogFormVisible: false,
				form: {...emptySofcCoating}
			},

			editCoatingFormRules: {
				temperature: [
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				tempUpSpeed: [
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				time: [ 
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				pressure: [
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				]
			},

			featuresDrawer: false,
			referenceDrawer: false,
			selectedCoatingFeatures: "",
			selectedCoatingReference: "",
			
			allCreateMethods: SOFC_COATING_CREATE_TYPES,
			allSpeedUnit: SOFC_SPEED_UNITS,
			pressureUnits: PRESSURE_UNITS
		}
	},

	computed: {
		...mapState({
			size: state => state.sofcCoating.size,
			list: state => state.sofcCoating.list,
		}),
		page: {
			get: function(){
				return this.$store.state.sofcCoating.page;
			},
			set: function(value){
				console.log(value);
			}
		},
	},

	methods: {
		...mapActions([
			'listSofcCoatings',
			'addSofcCoating',
			'updateSofcCoating',
			'deleteSofcCoating',
			'getSofcCoating'
		]),

		filterClickHandler(){
			this.listSofcCoatings({page: 1, name: this.searchKeys.name})
		},

		addCoatingClickHandler(){
			this.editCoatingForm.dialogFormVisible = true;
			this.editCoatingForm.form = {...emptySofcCoating};
			this.$nextTick(() => {
				this.$refs['editCoatingFormRef'].clearValidate();
			})
		},

		viewCoatingFeatures(coating){
			this.selectedCoatingFeatures = coating.features;
			this.featuresDrawer = true;
		},
		handleCloseFeaturesDrawer(){
			this.featuresDrawer = false;
		},

		viewCoatingReferences(coating){
			this.selectedCoatingReference = coating.docReferences;
			this.referenceDrawer = true;
		},

		handleCloseReferenceDrawer(){
			this.referenceDrawer = false;
		},

		async handleEditCoating(coating){
			let editCoating = await this.getSofcCoating(coating.id);
			if(editCoating){
				this.editCoatingForm.form = {...editCoating};
				this.editCoatingForm.dialogFormVisible = true;

				this.$nextTick(() => {
          this.$refs['editCoatingFormRef'].clearValidate();
        })
			}
		},

		handleDeleteCoating(coating){
			this.deleteSofcCoating(coating.id);
		},


		getPageData(page){
			this.listSofcCoatings({page, name: this.searchKeys.name });
		},

		editCoatingFormCancelHandler(){
			this.$refs.editCoatingFormRef.resetFields();
			this.editCoatingForm.dialogFormVisible = false;
			this.editCoatingForm.form = {...emptySofcCoating};
		},

		editCoatingFormConfirmHandler(){
			this.$refs.editCoatingFormRef.validate((valid) => {
				if (!valid) {
					return;
				}

				if(this.editCoatingForm.form.id){
					this.updateSofcCoating(this.editCoatingForm.form).then(() => {
						Notification({
							title: '成功',
							message: '修改成功',
							type: 'success'
						});
						this.resetEditCoatingForm();
					})
				}else{
					this.addSofcCoating(this.editCoatingForm.form).then(resp => {
						if(resp && resp.id){
							Notification({
								title: '成功',
								message: '新增成功',
								type: 'success'
							});
							this.resetEditCoatingForm();
						}
					})
				}
			});
		},

		resetEditCoatingForm(){
			this.$refs.editCoatingFormRef.resetFields();
			this.editCoatingForm.dialogFormVisible = false;
			this.editCoatingForm.form = {...emptySofcCoating}
		}
	},

	mounted(){
		this.listSofcCoatings({page: 1});
	}
}
</script>

<style lang="less">
.coatings-pg{
	.pg-header{
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: space-between;

		.fitler{
			display: flex;

			.filter_item{
				width: 220px;
			}

			.filter_plating-types{
				margin-left: 20px;
			}

			.filter-btn{
				border: 1px solid #2D60D0;
				color: #2D60D0;
				background-color: white;
				margin-left: 20px;
				
				:hover{
					opacity: 0.7;
				}
			}
		}
	}
	.coating-add-btn{
		width: 100px;
		background-color: #2D60D0;
		border: 1px solid #2D60D0;
		margin-bottom: 8px;

		:hover{
			opacity: 0.7;
		}
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
		margin-right: 12px;
	}

	.edit-coating-form{
		margin-left: 40px;
		margin-right: 40px;

		.powder-rate-input > input{
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
		}

		.powder-rate-unit-select{
			color: #909399;
			input{
				border-left: 0px;
				border-top-left-radius: 0px;
				border-bottom-left-radius: 0px;
				background-color: #F5F7FA;
				color: #909399;
			}
		}
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