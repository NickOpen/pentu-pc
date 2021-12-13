<template>
	<div class="sub-pg coatings-pg">
		<div class="pg-header">
			<div class="fitler">
				<el-input class="filter_item filter_name" placeholder="请输入涂层材料关键字..." size="medium" v-model="searchKeys.name" ></el-input>
				<el-select class="filter_item filter_plating-types" v-model="searchKeys.platingType" clearable placeholder="请选择" size="medium">
					<el-option v-for="platingType in allPlatingTypes" :key="platingType.key" 
						:label="platingType.title" :value="platingType.key">
					</el-option>
				</el-select>
				<el-button size="small" plain type="primary" class="filter-btn" @click="filterClickHandler">搜索</el-button>
			</div>
			
			<el-button size="small" type="primary" class="coating-add-btn" @click="addCoatingClickHandler">新增</el-button>
		</div>
		
		<el-table
			class="coating-table"
			:data="list">
			<el-table-column
				v-for="column in calcColumns"
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
				<el-form-item label="涂层材料" label-width="120px" prop="name">
					<el-input v-model.trim="editCoatingForm.form.name"></el-input>
				</el-form-item>
				<el-form-item label="材料规格" label-width="120px" prop="materialSpec">
					<el-input v-model.trim="editCoatingForm.form.materialSpec"></el-input>
				</el-form-item>
				<el-form-item  label="喷涂方法" label-width="120px" prop="platingType">
					<el-select v-model="editCoatingForm.form.platingType" placeholder="请选择">
						<el-option v-for="platingType in allPlatingTypes" :key="platingType.key" 
              :label="platingType.title" :value="platingType.key"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-if="isShowOutputPower" label="输出功率" label-width="120px" prop="outputPower">
					<el-input v-model.number="editCoatingForm.form.outputPower" type="number">
						<template slot="append">kW</template>
					</el-input>
				</el-form-item>
				<el-form-item v-if="isShowCurrent" label="电流" label-width="120px" prop="current">
					<el-input v-model.number="editCoatingForm.form.current" type="number">
						<template slot="append">A</template>
					</el-input>
				</el-form-item>

				<el-form-item label="总气流量" label-width="120px" prop="totalFlowAmount">
					<el-input v-model.number="editCoatingForm.form.totalFlowAmount" type="number">
						<template slot="append">SLPM</template>
					</el-input>
				</el-form-item>

				<el-form-item label="工作气体" label-width="120px" prop="workingGas">
          <el-input v-model="editCoatingForm.form.workingGas"></el-input>
				</el-form-item>

				<el-form-item v-if="type.key === coatingTypes.VACUUM.key" label="真空室压力" label-width="120px" prop="vacuumPressure">
					<el-input v-model="editCoatingForm.form.vacuumPressure"><template slot="append">Pa</template></el-input>
				</el-form-item>
				<el-form-item v-else label="混合气体" label-width="120px" prop="mixedGas">
					<el-input v-model="editCoatingForm.form.mixedGas">
					</el-input>
				</el-form-item>
				
				<el-form-item label="喷涂距离" label-width="120px" prop="distance">
					<el-input v-model.trim="editCoatingForm.form.distance">
						<template slot="append">mm</template>
					</el-input>
				</el-form-item>
				<el-form-item label="送粉率" label-width="120px" prop="powderRate">
          <el-col :span="19">
            <el-input v-model.number="editCoatingForm.form.powderRate" class="powder-rate-input" type="number"></el-input>
          </el-col>
          <el-col :span="5">
            <el-select v-model="editCoatingForm.form.powderRateUnit" class="powder-rate-unit-select">
              <el-option v-for="rate in allPowderRateUnits" :key="rate.key" :label="rate.title" :value="rate.key"></el-option>
            </el-select>
          </el-col>
				</el-form-item>
				<el-form-item label="设备型号" label-width="120px" prop="coatingDeviceType">
          <el-input v-model="editCoatingForm.form.coatingDeviceType"></el-input>
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
				<el-button size="mini" type="primary" @click="ConfirmEditEventHandler">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import coatingMixins from '../../mixins/coatings';
import {COATING_TYPES, PLATING_TYPES, POWDER_RATE_UNITS} from '../../config/sysConstants';

export default {
	name: "BaseCoating",
	mixins: [coatingMixins],
  props: {
    type: {
      type: Object,
      default: COATING_TYPES.METAL,
    }
  },
	computed: {
		isShowCurrent: function(){
			const {key} = this.type;
			if( key === COATING_TYPES.VACUUM.key
				|| key === COATING_TYPES.AIR_COLD.key
				|| key === COATING_TYPES.AURORA.key){
					return false;
			}

			return true;
		},
		isShowOutputPower: function(){
			const {key} = this.type;
			if( key === COATING_TYPES.VACUUM.key
				|| key === COATING_TYPES.AIR_COLD.key
				|| key === COATING_TYPES.AURORA.key){
					return false;
			}

			return true;
		}
	},
  data(){
    return {
      allPlatingTypes: PLATING_TYPES,
      allPowderRateUnits: POWDER_RATE_UNITS,
			coatingTypes: COATING_TYPES,

			/**
			 * 搜索关键字
			 */
			searchKeys: {
				name: null,
				platingType: null
			}
    }
  },
	methods: {
		ConfirmEditEventHandler(){
			this.editCoatingFormConfirmHandler(this.type.key);
		},

		getPageData(page){
			this.listCoatings({type: this.type.key, page, name: this.searchKeys.name, platingType: this.searchKeys.platingType});
		},

		filterClickHandler(){
			this.listCoatings({type: this.type.key, page: 1, name: this.searchKeys.name, platingType: this.searchKeys.platingType})
		}
	},
	mounted(){
		this.listCoatings({type: this.type.key, page: 1});
		//this.getAllWorkingGasTypes();
		//this.getAllCoatingDevices();
	}
}
</script>
<style lang="less">

</style>