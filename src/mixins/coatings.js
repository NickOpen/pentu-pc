import {mapActions, mapState} from 'vuex';
import {isNumberVailatorForFormInput} from '../utiles/index';
import {POWDER_RATE_UNITS, PLATING_TYPES, COATING_TYPES} from '../config/sysConstants';
import {Notification} from 'element-ui';

let emptyCoating = {
	name: "",
	current: null,
	materialSpec: "",
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
	docReferences: "",
	vacuumPressure: null
};

const defaultColumn = [
	{
		prop: "id",
		label: "ID"
	},{
		prop: "name",
		label: "涂层材料"
	},{
		prop: "materialSpec",
		label: "材料规格"
	},{
		prop: "platingType",
		label: "喷涂方法",
		formatter: function(row, col){
			let value = row[col];
			if(value){
				return PLATING_TYPES[value].title
			}else{
				return '/';
			}
		}
	},{
		prop: "outputPower",
		label: "输出功率"
	},{
		prop: "current",
		label: "电流(A)"
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
		prop: "distance",
		label: "喷涂距离(mm)"
	},{
		prop: "powderRate",
		label: "送粉率",
		formatter: function(row, col){
			let value = row[col];
			if(value){
				return `${value} ` + POWDER_RATE_UNITS[row.powderRateUnit].title; 
			}else{
				return '/';
			}
		}
	},{
		prop: "coatingDeviceType",
		label: "设备型号"
	},
];

export default {
  data: function(){
    return {
      columns: defaultColumn,
			subMenuTypeKey: "",

			editCoatingForm: {
				dialogFormVisible: false,
				form: {...emptyCoating}
			},

			editCoatingFormRules: {
				current: [
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				outputPower: [
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				totalFlowAmount: [ 
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				powderRate: [
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				],
				vacuumPressure: [
					{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
				]
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
		},
		calcColumns: function(){
			if(!this.subMenuTypeKey){
				return this.columns;
			}else{
				switch(this.subMenuTypeKey){
					case COATING_TYPES.VACUUM.key: {
						return this.columns.reduce((prevBuffer, currentNode) => {
							let newObjNode = Object.assign({}, currentNode);
							if(newObjNode.prop === 'mixedGas'){
								newObjNode.label = "真空室压力（Pa）";
								newObjNode.prop = 'vacuumPressure';
							}

							if(newObjNode.prop !== 'outputPower' && newObjNode.prop !== 'current'){
								prevBuffer.push(newObjNode);
								return prevBuffer;
							}else{
								return prevBuffer;
							}
						}, []);
					}
					case COATING_TYPES.AIR_COLD.key: {
						return this.columns.reduce((prevBuffer, currentNode) => {
							let newObjNode = Object.assign({}, currentNode);
							if(newObjNode.prop !== 'outputPower' && newObjNode.prop !== 'current'){
								prevBuffer.push(newObjNode);
								return prevBuffer;
							}else{
								return prevBuffer;
							}
						}, []);
					}
					case COATING_TYPES.AURORA.key: {
						return this.columns.reduce((prevBuffer, currentNode) => {
							let newObjNode = Object.assign({}, currentNode);
							if(newObjNode.prop !== 'outputPower' && newObjNode.prop !== 'current'){
								prevBuffer.push(newObjNode);
								return prevBuffer;
							}else{
								return prevBuffer;
							}
						}, []);
					}
					default: {
						return this.columns;
					}
				}
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
  },

	mounted(){
		const {key} = this.$route.meta;
		if(key){
			this.subMenuTypeKey = key;
		}else{
			this.subMenuTypeKey = "";
		}
	}
}

export function catingMixFactory({ column = defaultColumn }) {
	return {
		data: function(){
			return {
				columns: column,
				subMenuTypeKey: "",
	
				editCoatingForm: {
					dialogFormVisible: false,
					form: {...emptyCoating}
				},
	
				editCoatingFormRules: {
					current: [
						{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
					],
					outputPower: [
						{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
					],
					totalFlowAmount: [ 
						{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
					],
					powderRate: [
						{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
					],
					vacuumPressure: [
						{ validator: isNumberVailatorForFormInput, trigger: 'blur'}
					]
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
			},
			calcColumns: function(){
				if(!this.subMenuTypeKey){
					return this.columns;
				}else{
					switch(this.subMenuTypeKey){
						case COATING_TYPES.VACUUM.key: {
							return this.columns.reduce((prevBuffer, currentNode) => {
								let newObjNode = Object.assign({}, currentNode);
								if(newObjNode.prop === 'mixedGas'){
									newObjNode.label = "真空室压力（Pa）";
									newObjNode.prop = 'vacuumPressure';
								}
	
								if(newObjNode.prop !== 'outputPower' && newObjNode.prop !== 'current'){
									prevBuffer.push(newObjNode);
									return prevBuffer;
								}else{
									return prevBuffer;
								}
							}, []);
						}
						case COATING_TYPES.AIR_COLD.key: {
							return this.columns.reduce((prevBuffer, currentNode) => {
								let newObjNode = Object.assign({}, currentNode);
								if(newObjNode.prop !== 'outputPower' && newObjNode.prop !== 'current'){
									prevBuffer.push(newObjNode);
									return prevBuffer;
								}else{
									return prevBuffer;
								}
							}, []);
						}
						case COATING_TYPES.AURORA.key: {
							return this.columns.reduce((prevBuffer, currentNode) => {
								let newObjNode = Object.assign({}, currentNode);
								if(newObjNode.prop !== 'outputPower' && newObjNode.prop !== 'current'){
									prevBuffer.push(newObjNode);
									return prevBuffer;
								}else{
									return prevBuffer;
								}
							}, []);
						}
						default: {
							return this.columns;
						}
					}
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
		},
	
		mounted(){
			const {key} = this.$route.meta;
			if(key){
				this.subMenuTypeKey = key;
			}else{
				this.subMenuTypeKey = "";
			}
		}
	}
}