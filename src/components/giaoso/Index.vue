<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading"><span class="glyphicon glyphicon-th-list"></span> 
                    Danh sách số đã giao</div>
                <div class="panel-body mr-10">
                    <table class="table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
                                <th>Hình</th>
                                <th @click="sortBy('socui')">Số cùi
                                    <span class="arrow" :class="sortOrders['socui'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('tuso')">Từ số
                                    <span class="arrow" :class="sortOrders['tuso'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('denso')">Đến số
                                    <span class="arrow" :class="sortOrders['denso'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                
                                <th @click="sortBy('menhgia')">Mệnh giá
                                    <span class="arrow" :class="sortOrders['menhgia'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('tongtien')">Tổng tiền
                                    <span class="arrow" :class="sortOrders['tongtien'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('daily')">Đại lý
                                    <span class="arrow" :class="sortOrders['daily'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('ngaygiao')">Ngày giao
                                    <span class="arrow" :class="sortOrders['ngaygiao'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='(so, index) in filteredAndSortedData' :key='index'>
                                <td>
                                    <figure>
                                        <img v-if="so.menhgia==10000" class="rounded"  width="100" height="100" :src="'images/10.jpg'">
                                        <img v-else-if="so.menhgia==20000"  width="100" height="100" class="rounded" :src="'images/20.jpg'">
                                        <img v-else class="rounded"  width="100" height="100" :src="'images/50.jpg'">
                                    </figure>
                                </td>
                                <td>{{ so.nhapso.socui }}</td>
                                <td>{{ so.tuso }}</td>
                                <td>{{ so.denso }}</td>
                                <td>{{ so.menhgia }}</td>
                                <td>{{ so.tongtien }}</td>
                                <td>{{ so.daily.tendaily }}</td>
                                <td>{{ so.daily.created_at }}</td>
                                <td>
                                    <a v-on:click="updateGiaoso(so,index)"
                                        class="btn btn-xs btn-default">
                                        <span class="glyphicon glyphicon-pencil"></span> Sửa
                                    </a>
                                    <a href="#"
                                        class="btn btn-xs btn-danger"
                                        v-on:click="deleteSo(so.id,index)">
                                        <span class="glyphicon glyphicon-remove"></span> Xóa
                                    </a>
                                    <a href="#" @click="exportPdf(10)"
                                        class="btn btn-xs btn-info">
                                        <span class="glyphicon glyphicon-print"></span> In phiếu giao
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="form-group">
                        <ul class="pagination hidden-xs pull-right">
                            <li v-if="pagination.current_page > 1">
                                <a href="#" aria-label="Previous"
                                @click.prevent="changePage(pagination.current_page - 1)">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            <li v-for="(page,index) in pagesNumber" :key='index'
                                v-bind:class="[ page == isActived ? 'active' : '']">
                                <a href="#"
                                @click.prevent="changePage(page)">{{ page }}</a>
                            </li>
                            <li v-if="pagination.current_page < pagination.last_page">
                                <a href="#" aria-label="Next"
                                @click.prevent="changePage(pagination.current_page + 1)">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </div> 
                </div>
            </div>    
      </div>
      <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading"><span class="glyphicon glyphicon-plus"></span> Màn hình giao số</div>
                <div class="panel-body">
                    <form id="form-giao-so" class="form-input">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputForSocui">Số cùi gốc</label>
                                <select class="form-control" v-model="giaoso.socui" @change="changeSocui()" 
                                v-on:input="$v.giaoso.socui.$touch">
                                    <option value="" disabled>Chọn cùi số hiện có ---->>> [số cùi] --- [từ số] --- [đến số]</option>
                                    <option v-for="c in nhapsos_ddl" :value="c.value" 
                                    v-bind:key="c.value">{{c.text}}</option>
                                </select>
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.giaoso.socui.required">Chọn số cùi gốc.</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputForTuso">Từ số</label>
                                <input class="form-control" type="text" placeholder="Từ số"
                                id="inputForTuso"
                                v-model="giaoso.tuso" maxlength="4"
                                v-on:input="$v.giaoso.tuso.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.giaoso.tuso.required">Nhập số bắt đầu.</p>
                                    <p class="error" v-else-if="!$v.giaoso.tuso.numeric">Số không hợp lệ.</p>
                                    <p class="error" v-else-if="!$v.giaoso.tuso.between">Số trong khoản 1->999.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputForDenso">Đến số</label>
                                <input class="form-control" type="text" placeholder="Đến số"
                                id="inputForDenso"
                                v-model="giaoso.denso" maxlength="4"
                                v-on:input="$v.giaoso.denso.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.giaoso.denso.required">Nhập đến số.</p>
                                    <p class="error" v-else-if="!$v.giaoso.denso.numeric">Số không hợp lệ.</p>
                                    <p class="error" v-else-if="!$v.giaoso.denso.between">Số trong khoản 1->999.</p>
                                    <p class="error" v-else-if="!$v.giaoso.denso.number_greater">Số phải lớn hơn số ở ô Từ Số.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputMenhGia">Mệnh giá</label>
                                <select id="inputMenhGia" class="form-control" v-model="giaoso.menhgia">
                                    <option value="" disabled>Mệnh giá</option>
                                    <option value="10000">Mệnh giá 10.000</option>
                                    <option value="20000">Mệnh giá 20.000</option>
                                    <option value="50000">Mệnh giá 50.000</option>
                                </select>
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.giaoso.menhgia.required">Chọn mệnh giá.</p>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label for="inputTongtien">Tổng tiền</label>
                                <input class="form-control" type="text" readonly placeholder="Tổng tiền" id="inputTongtien"
                                v-model="tongtien_recall">
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputDaily">Đại lý</label>
                                <select class="form-control" v-model="giaoso.daily_id" 
                                v-on:input="$v.giaoso.daily_id.$touch">
                                    <option value="" disabled>Chọn Đại lý</option>
                                    <option v-for="c in dailies" :value="c.value" 
                                    v-bind:key="c.text">{{c.text}}</option>
                                </select>

                                <div v-if="$v.$error">
                                    <p class="error" 
                                    v-if="!$v.giaoso.daily_id.required">Chọn đại lý.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputngaygiao">Ngày giao</label>
                               <input v-model="giaoso.ngaygiao" class="form-control" id="inputngaygiao" type="text" readonly/>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <a class="btn btn-success" v-on:click="saveGiaoso()">
                                    <span class="icon is-small">
                                        <i class="fa fa-check"></i>Lưu
                                    </span>
                                </a>
                                <a class="btn btn-primary" v-on:click="clear()">
                                    <span>Thêm mới</span>
                                    <span class="icon is-small">
                                        <i class="fa fa-times"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
      </div>
    </div>
    <!-- Modal -->
    <div v-if="showModal">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" @click="showModal=false">
                                <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 class="modal-title">Xem thông tin vé đã giao</h4>
                            </div>
                            <div class="modal-body">
                                <div id="giaoso_inve_pdf"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
  </div>
</template>

<script>
import pdfobj from 'pdfobject'
import { validationMixin } from 'vuelidate'
import { required,between, minLength,maxLength,numeric } from 'vuelidate/lib/validators'
import moment from 'moment';

// Import required dependencies 
//   import 'bootstrap/dist/css/bootstrap.css';
  
  // Import this component
  import datePicker from 'vue-bootstrap-datetimepicker';
  
  // Import date picker css
//   import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

const number_greater =
  (value, vm) => (value > vm.tuso);

var axios = require("axios");
  export default {
    components: {
      datePicker
    },
    mixins: [validationMixin],
    data: function () {
      return {
          showModal:false,
            nhapsos_ddl:[],
            submitStatus: null,
            menhgia:[{value:null,text:"Chọn mệnh giá..."},
            {value:"10000",text:"Mệnh giá [10.000]"},
            {value:"20000",text:"Mệnh giá [20.000]"},
            {value:"50000",text:"Mệnh giá [50.000]"}],
            giaoso:{
                id:0,
                socui:"",
                hinhanh:null,
                tuso:null,
                denso:null,
                daily_id:"",
                menhgia:"",
                tongtien:"",
                ngaygiao:moment().format('YYYY-MM-DD hh:mm:ss a'),
                index:-1
            },
            dailies:[],
            filterValue: '',
            searchValue:'',
            sortKey:'', 
            sortOrders: [],
            giaosos: [],
            columns: ['hinhanh','user','socui','tuso','denso','menhgia','tongtien','daily','ngaygiao','thaotac'],
            pagination: {
                total: 0, 
                per_page: 2,
                from: 1, 
                to: 0,
                current_page: 1
            },
            offset: 4,
            pagesNumber:[],
            isActived:'',
            showRight:false, 
            showModal:false,
            show: false,
            label: 'loading...',
            overlay: true   
      }
    },

    validations: {
        giaoso: {
            socui: {
                required
            },
            tuso: {
                required,
                numeric,
                minLength: minLength(4),
                maxLength:maxLength(4),
                between:between(0,9999)
            },
            denso: {
                required,
                numeric,
                minLength: minLength(4),
                maxLength:maxLength(4),
                number_greater:true,
                between:between(0,9999)
            },
            menhgia: {
                required,
            },
            daily_id:{
                required
            }
        }
    },
    mounted() {
        let vm=this
        // load list nhapso
        vm.ds_so_da_nhap()
        // load list daily
        vm.ds_daily()

        vm.columns.forEach(function (key) {
            vm.sortOrders[key] = 1;
        });

        vm.getGiaoSoAndPaging(vm.pagination.current_page);
    },
    computed: {
        tongtien_recall(){
            if(this.giaoso.menhgia>0 && this.giaoso.denso>0 && this.giaoso.tuso>0){
                this.giaoso.tongtien= (this.giaoso.denso-this.giaoso.tuso+1)*this.giaoso.menhgia
            }

            return this.giaoso.tongtien
        },
        filteredAndSortedData() {
            let vm=this;
            let sortKey = vm.sortKey;
            let order = vm.sortOrders[sortKey] || 1;
            // Apply filter first`
            debugger
            let result = vm.giaosos;
            if (vm.filterValue) {
                result = result.filter(item =>vm.searchLike(item));
            }
            // Sort the remaining values
            if(vm.sortKey==='') return result;
            
            vm.sortKey='';
            return result.slice().sort(function (a, b) {
                a = a[sortKey];
                b = b[sortKey];
                return (a === b ? 0 : a > b ? 1 : -1) * order;
            });
        }
    },
    methods: {
        exportPdf(id){
            let app = this
            debugger
            app.showModal = true
			axios.get('/giaoso/inve-pdf/' + id, {responseType: 'arraybuffer'})
				.then(function (response) {
					debugger
					let blob = new Blob([response.data], { type: 'application/pdf' })
					let link = document.createElement('a')
					pdfobj.embed(window.URL.createObjectURL(blob), "#giaoso_inve_pdf")
				})
				.catch(function (resp) {
					alert("Could not delete company");
            });
        },
        changeSocui(){
            if(this.giaoso.socui>0){
                this.get_socui_by_id(this.giaoso.socui)
            }
        },
        get_socui_by_id(id){
            let vm = this;
            axios.get('/nhapso/'+id)
                .then(function (resp) {
                    debugger
                    if(resp.data.data){
                        vm.giaoso.tuso=resp.data.data.tuso;
                    }
                })
                .catch(function (resp) {
            });
        },
        updateGiaoso(so,index){
            debugger
            this.giaoso.id=so.id
            this.giaoso.socui=so.socui
            this.giaoso.tuso=so.tuso
            this.giaoso.denso=so.denso
            this.giaoso.daily_id=so.daily_id
            this.giaoso.menhgia=so.menhgia
            this.giaoso.tongtien=so.tongtien
            this.giaoso.ngaygiao=so.created_at
            this.giaoso.index=index
        },
        changeMenhGia(){
            if(this.giaoso.menhgia>0){
                this.giaoso.tongtien=(this.giaoso.denso-this.giaoso.tuso)*this.giaoso.menhgia
            }
        },
        deleteSo(id,index){
            if(!id) return
            if (confirm("Bạn thật sự muốn xóa?")) {
                let app = this;
                debugger
                axios.delete('/giaoso/delete/'+id)
                    .then(function (resp) {
                        app.giaosos.splice(index, 1);
                        app.$toasted.show("Xóa thành công !!!", { 
                            theme: "bubble", 
                            position: "top-right", 
                            duration : 3000
                        });
                    })
                    .catch(function (resp) {
                });
            }
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
        ds_so_da_nhap(){
            let vm = this;
            axios.get('/nhapso/list-nhapso-ddl')
                .then(function (resp) {
                    debugger
                    vm.nhapsos_ddl=resp.data.data;
                })
                .catch(function (resp) {
            });
        },
        saveGiaoso() {
            debugger
            var app = this;
            app.$v.giaoso.$touch();
            if (!app.$v.giaoso.$invalid) 
            {
                axios.post('/giaoso/add', app.giaoso)
                .then(function (resp) {
                    
                    debugger;
                    if(app.giaoso.id<=0){
                        app.giaoso=resp.data.data
                        app.giaosos.push(resp.data.data);
                    }else{
                        app.giaosos[app.giaoso.index].daily=resp.data.data.daily
                        app.giaosos[app.giaoso.index].daily_id=resp.data.data.daily_id
                        app.giaoso=app.giaosos[app.giaoso.index]
                    }

                    app.$toasted.show("Lưu dữ liệu giao số thành công !!!", { 
                        theme: "bubble", 
                        position: "top-right", 
                        duration : 3000
                    });
                })
                .catch(function (resp) {
                    app.toasted.show("Đã có lỗi xảy ra, vui lòng thử lại.", { 
                        theme: "bubble", 
                        position: "top-right", 
                        duration : 3000
                    });
                });
            }
        },
        deleteGiaoso(id, index) {
            if (confirm("Bạn thật sự muốn xóa?")) {
                let app = this;
                axios.delete('/giaoso/delete/' + id)
                    .then(function (resp) {
                        app.giaosos.splice(index, 1);
                        app.$toasted.show("Xóa thành công !!!", { 
                            theme: "bubble", 
                            position: "top-right", 
                            duration : 3000
                        });
                    })
                    .catch(function (resp) {
                        app.$toasted.show("Không xóa được, đã có lỗi xảy ra !!!", { 
                            theme: "bubble", 
                            position: "top-right", 
                            duration : 3000
                        });
                    });
            }
        },
        getGiaoSoAndPaging(page){
            let vm = this;
            axios.get('/giaoso/list?page='+page+'&text='+vm.searchValue)
                .then(function (resp) {
                    vm.giaosos=resp.data.data.data.data;
                    vm.pagination= resp.data.data.pagination;
                    vm.pagesNumber=vm.getPagesNumber(resp.data.data.data);
                    vm.isActived=vm.getIsActived(resp.data.data.pagination);
                })
                .catch(function (resp) {
                    console.log(resp);
            });
        },
        clear() {
            this.giaoso={id:0,tuso:null,denso:null,menhgia:"",daily_id:"",ngaygiao:moment().format('YYYY-MM-DD hh:mm:ss a')}
        },

        revertDateFormat (val) {
            return this.$moment(val, 'DD-MM-YYYY hh:mm:ss a').format('YYYY-MM-DD hh:mm:ss a')
        },
        convertDateFormat (val) {
            return this.$moment(val, 'YYYY-MM-DD hh:mm:ss a').format('DD-MM-YYYY hh:mm:ss a')
        },
        
        searchLike:function(item){
            return item.tuso.includes(this.filterValue)
            ||item.denso.includes(this.filterValue)
            ||item.menhgia.includes(this.filterValue)
            ||item.daily.includes(this.filterValue)
        },

        isNumeric:function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        getIsActived: function (pagination) {
            return pagination.current_page;
        },
        getPagesNumber: function (pagination) {
            if (!pagination.to) {
                return [];
            }
            var from = pagination.current_page - this.offset;
            if (from < 1) {
                from = 1;
            }
            var to = from + (this.offset * 2);
            if (to >= pagination.last_page) {
                to = pagination.last_page;
            }
            var pagesArray = [];
            while (from <= to) {
                pagesArray.push(from);
                from++;
            }
            return pagesArray;
        },
        changePage: function (page) {
            this.pagination.current_page = page;
            this.getGiaoSoAndPaging(page);
        },
        sortBy: function(sortKey) { 
            this.sortKey = sortKey;
            this.sortOrders[sortKey] = this.sortOrders[sortKey] * -1;
        }
    }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.pdfobject-container { height: 40rem; border: 1rem solid rgba(0,0,0,.1); }
</style>
