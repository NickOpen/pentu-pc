import {mapActions, mapState} from 'vuex';
import {isNumberVailatorForFormInput} from '../utiles/index';
import {POWDER_RATE_UNITS, PLATING_TYPES} from '../config/sysConstants';
import {Notification} from 'element-ui';

let emptyCoating = {
	name: "",
	current: null,
	outputPower: null,
	totalFlowAmount: null,
	workingGas: null,
	mixedGas: null,
	platingType: null,
	coatingDeviceType: null,
	distance: null,
	powderRate: null,
	powderRateUnit: POWDER_RATE_UNITS.R_MIN.key,
	features: "",
	docReferences: ""
};

export default {
  data: function(){
    return {
      columns: [
				{
					prop: "id",
					label: "ID"
				},{
					prop: "name",
					label: "涂层材料"
				},{
					prop: "current",
					label: "电流(A)"
				},{
					prop: "outputPower",
					label: "输出功率"
				},{
					prop: "totalFlowAmount",
					label: "总气流量(SLPM)"
				},{
					prop: "workingGas",
					label: "工作气体"
				},{
					prop: "mixedGas",
					label: "混合气体"
				},{
					prop: "platingType",
					label: "喷涂方法",
					formatter: function(row, col){
						let value = row[col];
						if(value){
							return PLATING_TYPES[value].title
						}
					}
				},{
					prop: "coatingDeviceType",
					label: "设备型号"
				},{
					prop: "distance",
					label: "喷涂距离(mm)"
				},{
					prop: "powderRate",
					label: "送粉率",
					formatter: function(row, col){
						let value = row[col];
						if(value){
							return `${value} ` + POWDER_RATE_UNITS[row.powderRateUnit].title; 
						}
					}
				}
			],

			editCoatingForm: {
				dialogFormVisible: false,
				form: {...emptyCoating}
			},

			editCoatingFormRules: {
				name: [{ required: true, message: '请填写涂层材料名称', trigger: 'blur'}],
				current: [
					{ required: true, message: '请填写电流', trigger: 'blur'}, 
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				outputPower: [
					{ required: true, message: '请填写输出功率', trigger: 'blur'}, 
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				totalFlowAmount: [
					{ required: true, message: '请填写总气流量', trigger: 'blur'}, 
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				distance: [
					{ required: true, message: '请填写喷涂距离', trigger: 'blur'}, 
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				powderRate: [
					{ required: true, message: '请填写送粉率', trigger: 'blur'}, 
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				platingType: [{ required: true, message: '请选择喷涂方法', trigger: 'change'}],
				workingGas: [{ required: true, message: '请输入工作气体', trigger: 'blur'}],
				mixedGas: [{ required: true, message: '请填写混合气体', trigger: 'blur'}],
				coatingDeviceType: [{ required: true, message: '请输入设备型号', trigger: 'blur'}],
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
				this.editCoatingForm.form = {...editCoating};
				this.editCoatingForm.dialogFormVisible = true;

				this.$nextTick(() => {
          this.$refs['editCoatingFormRef'].clearValidate();
        })
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

		addCoatingClickHandler(){
			this.editCoatingForm.dialogFormVisible = true;
			this.editCoatingForm.form = {...emptyCoating};
			this.$nextTick(() => {
				this.$refs['editCoatingFormRef'].clearValidate();
			})
		},

		editCoatingFormCancelHandler(){
			this.$refs.editCoatingFormRef.resetFields();
			this.editCoatingForm.dialogFormVisible = false;
			this.editCoatingForm.form = {...emptyCoating};
		},

		editCoatingFormConfirmHandler(type){
			this.$refs.editCoatingFormRef.validate((valid) => {
          if (!valid) {
            return;
					}
					
					this.editCoatingForm.form.type = type;

					if(this.editCoatingForm.form.id){
						this.updateCoating(this.editCoatingForm.form).then(() => {
							Notification({
								title: '成功',
								message: '修改成功',
								type: 'success'
							});
							this.resetEditCoatingForm();
						})
					}else{
						this.addCoating(this.editCoatingForm.form).then(resp => {
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
			this.editCoatingForm.form = {...emptyCoating}
		}
  }
}