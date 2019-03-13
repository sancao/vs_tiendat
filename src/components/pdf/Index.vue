<template>
	<div class="container-fluid">
		<div class="row">
			<div class="col-md-10">
				<div class="col-md-2 mb-3">
					<label for="validationLoaibaocao">Loại báo cáo</label>
					<select class="form-control" v-model="search_form.loai_bc" id="validationLoaibaocao">
						<option value="" disabled>Chọn loại báo cáo</option>
						<option v-for="c in list_bc" :value="c.value" 
						v-bind:key="c.text">{{c.text}}</option>
					</select>
				</div>
				<div class="col-md-2 mb-3">
					<label for="validationDaily">Đại lý</label>
					<select class="form-control" v-model="search_form.daily_id" id="validationDaily">
						<option value="" disabled>Chọn Đại lý</option>
						<option v-for="c in dailies" :value="c.value" 
						v-bind:key="c.text">{{c.text}}</option>
					</select>
				</div>
				
				<div class="col-md-2 mb-3">
					<label for="validationDaiduthuong">Đài dự thưởng</label>
					<select class="form-control" v-model="search_form.daiduthuong" id="validationDaiduthuong">
						<option value="" disabled>Chọn đài</option>
						<option v-for="d in ds_dai" :value="d.value" 
						v-bind:key="d.text">{{d.text}}</option>
					</select>
				</div>

				<div class="col-md-2 mb-3">
					<label for="validationNgay">Ngày</label>
					<input type="text" class="form-control" id="validationNgay" placeholder="Chọn ngày">
				</div>

				<div class="col-md-2 mb-3">
					<label for="validationLoaichuso">Loại chữ số</label>
					<select class="form-control" v-model="search_form.loaichuso" id="validationLoaichuso">
						<option value="" disabled>Chọn loại chữ số</option>
						<option value="2">2 chữ số</option>
						<option value="3">3 chữ số</option>
						<option value="4">4 chữ số</option>
					</select>
				</div>
				<div class="col-md-2 mb-3">
					<label for="validationMenhgia">Mệnh giá</label>
					<select class="form-control" v-model="search_form.menhgia" id="validationMenhgia">
						<option value="" disabled>Chọn mệnh giá</option>
						<option value="10000">Mệnh giá 10.000</option>
						<option value="20000">Mệnh giá 20.000</option>
						<option value="50000">Mệnh giá 50.000</option>
					</select>
				</div>
			</div>
			<div class="col-md-2">
				<a @click="exportPdf(10)" class="btn btn-primary" style="margin-top: 25px;" id="validationSubmit">Xem báo cáo</a>
			</div>
		</div>
		<hr>
		<div class="row">
			<div id="pdf_review_screen"></div>
		</div>
	</div>
</template>
<script>
import pdfobj from 'pdfobject'
export default {
	data () {
		return {
			search_form:{
				loai_bc:"",
				daily_id:"",
				ngay:null,
				loaichuso:"",
				daiduthuong:"",
				menhgia:""
			},
			list_bc:[{value:1,text:"Báo cáo doanh số bán"},{value:"2",text:"Báo cáo KQ trúng thưởng"}],
			src:'',
			dailies:[],
			ds_dai:[]
		}
	},
	mounted(){
		let vm=this;

        // load list daily
		vm.ds_daily()
		vm.danh_sach_dai()
	},
	methods: {
		danh_sach_dai(){
             let vm = this;
            axios.get('/danh-sach-dai-trong-ngay')
                .then(function (resp) {
                    vm.ds_dai=resp.data.data;
                })
                .catch(function (resp) {
            });
        },
		ds_daily(){
            let vm = this;
            axios.get('/daily/list-all')
                .then(function (resp) {
                    debugger
                    vm.dailies=resp.data.data;
                })
                .catch(function (resp) {
            });
        },
		printJS(){
			var w = window.open("about:blank");
			w.document.write(pdf);
			w.print();
		},
		password: function(updatePassword, reason) {

			updatePassword(prompt('password is "test"'));
		},
		error: function(err) {

			console.log(err);
		},
		exportPdf(id) {
			let app = this;
			axios.get('/pdf-kqxs/' + id, {responseType: 'arraybuffer'})
				.then(function (response) {
					debugger;
					let blob = new Blob([response.data], { type: 'application/pdf' })
					let link = document.createElement('a')
					app.src=window.URL.createObjectURL(blob)
					pdfobj.embed(app.src, "#pdf_review_screen")
				})
				.catch(function (resp) {
					alert("Could not delete company");
				});
		},
	}
}
</script>

<style>
	.pdfobject-container { height: 100rem; border: 1rem solid rgba(0,0,0,.1); }
</style>