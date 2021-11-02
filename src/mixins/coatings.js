import {mapActions, mapState} from 'vuex';
import {isNumberVailatorForFormInput} from '../utiles/index';

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
  data: function(){
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
				}
			],

			editCoatingForm: {
				dialogFormVisible: false,
				form: {...emptyCoating}
			},

			editCoatingFormRules: {
				name: [{ required: true, message: '请填写名称', trigger: 'blur'}],
				current: [
					{ required: true, message: '请填写电流', trigger: 'blur'}, 
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
				workingGasId: [{ required: true, message: '请选择工作气体类型', trigger: 'change'}],
				coatingDeviceId: [{ required: true, message: '请选择设备', trigger: 'change'}],
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
			this.editCoatingForm.form = {...emptyCoating}
		}
  }
}