<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading"><span class="glyphicon glyphicon-th-list"></span> 
                    Danh sách số đã nhập</div>
                <div class="panel-body mr-10">
                    <table class="table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
                                <th>Hình</th>
                                <th @click="sortBy('nguoinhap')">Người nhập
                                    <span class="arrow" :class="sortOrders['nguoinhap'] > 0 ? 'asc' : 'dsc'">
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
                                <th @click="sortBy('daily')">Đại lý
                                    <span class="arrow" :class="sortOrders['daily'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('ngaynhap')">Ngày nhập
                                    <span class="arrow" :class="sortOrders['ngaynhap'] > 0 ? 'asc' : 'dsc'">
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
                                <td>{{ so.user.name }}</td>
                                <td>{{ so.tuso }}</td>
                                <td>{{ so.denso }}</td>
                                <td>{{ so.menhgia }}</td>
                                <td>{{ so.daily.tendaily }}</td>
                                <td>{{ so.ngaynhap }}</td>
                                <td>
                                    <a v-on:click="updateNhapso(so,index)"
                                        class="btn btn-xs btn-default">
                                        <span class="glyphicon glyphicon-pencil"></span> Sửa
                                    </a>
                                    <a href="#"
                                        class="btn btn-xs btn-danger"
                                        v-on:click="deleteSo()">
                                        <span class="glyphicon glyphicon-remove"></span> Xóa
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
                <div class="panel-heading"><span class="glyphicon glyphicon-plus"></span> Màn hình nhập số</div>
                <div class="panel-body">
                    <form>
                        <div class="form-row">
                            <div class="form-group nopadding-left-right">
                                <label for="inputForTuso">Từ số</label>
                                <input class="form-control" type="text" placeholder="Từ số"
                                id="inputForTuso"
                                v-model="nhapso.tuso" maxlength="6"
                                v-on:input="$v.nhapso.tuso.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.nhapso.tuso.required">Nhập số bắt đầu.</p>
                                    <p class="error" v-else-if="!$v.nhapso.tuso.numeric">Số không hợp lệ.</p>
                                    <p class="error" v-else-if="!$v.nhapso.tuso.between">Số trong khoản 1->999.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group nopadding-left-right">
                                <label for="inputForDenso">Đến số</label>
                                <input class="form-control" type="text" placeholder="Từ số"
                                id="inputForDenso"
                                v-model="nhapso.denso" maxlength="6"
                                v-on:input="$v.nhapso.denso.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.nhapso.denso.required">Nhập đến số.</p>
                                    <p class="error" v-else-if="!$v.nhapso.denso.numeric">Số không hợp lệ.</p>
                                    <p class="error" v-else-if="!$v.nhapso.denso.between">Số trong khoản 1->999.</p>
                                    <p class="error" v-else-if="!$v.nhapso.denso.number_greater">Số phải lớn hơn số bắt đầu.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group nopadding-left-right">
                                <label for="inputMenhGia">Mệnh giá</label>
                                <select id="inputMenhGia" class="form-control" v-model="nhapso.menhgia">
                                    <option value="" disabled>Mệnh giá</option>
                                    <option value="10000">10.000</option>
                                    <option value="20000">20.000</option>
                                    <option value="50000">50.000</option>
                                </select>
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.nhapso.menhgia.required">Chọn mệnh giá.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group nopadding-left-right">
                                <label for="inputDaily">Đại lý</label>
                                <select class="form-control" v-model="nhapso.daily_id" 
                                v-on:input="$v.nhapso.daily_id.$touch"
                                v-bind:class="{'is-danger': $v.nhapso.daily_id.$error, 
                                valid: $v.nhapso.daily_id.$dirty && !$v.nhapso.daily_id.$invalid}">
                                    <option value="" disabled>Chọn Đại lý</option>
                                    <option v-for="c in dailies" :value="c.value" 
                                    v-bind:key="c.text">{{c.text}}</option>
                                </select>

                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.nhapso.daily_id.required">Chọn đại lý.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="inputngaysinh">Ngày nhập</label>
                                <!-- <date-picker name="date" id="inputngaysinh"
                                v-model="nhapso.ngaynhap" 
                                :config="config"></date-picker> -->
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <a class="btn btn-success"
                                @click.prevent="saveNhapso()">
                                <span class="icon is-small">
                                    <i class="fa fa-check"></i>Lưu
                                </span>
                                </a>
                                <a class="btn btn-primary" @click.prevent="clear()">
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
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength,maxLength,numeric,between } from 'vuelidate/lib/validators'
// Import this component
// import datePicker from 'vue-bootstrap-datetimepicker';

// Import date picker css
// import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
import moment from 'moment';

const number_greater =
  (value, vm) => (value > vm.tuso);

var axios = require("axios");
  export default {
    //   components: {
    //         datePicker
    //     },
    mixins: [validationMixin],
    data: function () {
      return {
        submitStatus: null,
        menhgia:[{value:null,text:"Chọn mệnh giá..."},{value:"10000",text:"Mệnh giá [10.000]"},{value:"20000",text:"Mệnh giá [20.000]"},
        {value:"50000",text:"Mệnh giá [50.000]"}],
        nhapso:{
            id:0,
            hinhanh:null,
            tuso:null,
            denso:null,
            daily_id:"",
            menhgia:"",
            ngaynhap:moment(),
            index:-1
        },
        dailies:[],
        filterValue: '',
        searchValue:'',
        sortKey:'', 
        sortOrders: [],
        nhapsos: [],
        columns: ['hinhanh','nguoinhap','tuso','denso','menhgia','daily','ngaynhap','thaotac'],
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
        overlay: true,
        config: {
            format: 'YYYY-MM-DD h:mm:ss',
            useCurrent: false,
            showClear: true,
            showClose: true,
        }    
      }
    },

    validations: {
        nhapso: {
            tuso: {
                required,
                numeric,
                minLength: minLength(1),
                maxLength:maxLength(6),
                between:between(1, 999)
            },
            denso: {
                required,
                numeric,
                minLength: minLength(1),
                maxLength:maxLength(6),
                between:between(1, 999),
                number_greater
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
        let vm=this;

        // load list daily
        vm.ds_daily()

        vm.columns.forEach(function (key) {
            vm.sortOrders[key] = 1;
        });

        vm.getNhapSoAndPaging(vm.pagination.current_page);
    },
    computed: {
        filteredAndSortedData() {
            let vm=this;
            let sortKey = vm.sortKey;
            let order = vm.sortOrders[sortKey] || 1;
            // Apply filter first`
            debugger
            let result = vm.nhapsos;
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
        updateNhapso(so,index){
            this.nhapso=so
            this.nhapso.index=index
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
        saveNhapso() {
            debugger
            var app = this;
            app.$v.nhapso.$touch();
            if (!app.$v.nhapso.$invalid) 
            {
                debugger
                axios.post('/nhapso/add', app.nhapso)
                .then(function (resp) {
                    app.$toasted.show("Lưu dữ liệu giao số thành công !!!", { 
                        theme: "bubble", 
                        position: "top-right", 
                        duration : 3000
                    });
                    debugger;
                    if(app.nhapso.id<=0){
                        app.nhapso=resp.data.data
                        app.nhapsos.push(resp.data.data);
                    }else{
                        debugger
                        app.nhapsos[app.nhapso.index].daily=resp.data.data.daily
                        app.nhapsos[app.nhapso.index].daily_id=resp.data.data.daily_id
                        app.nhapso=app.nhapsos[app.nhapso.index]
                    }
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
        deleteNhapso(id, index) {
            if (confirm("Bạn thật sự muốn xóa?")) {
                let app = this;
                axios.delete('/nhapso/delete/' + id)
                    .then(function (resp) {
                        app.nhapsos.splice(index, 1);
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
        getNhapSoAndPaging(page){
            let vm = this;
            axios.get('/nhapso/list?page='+page+'&text='+vm.searchValue)
                .then(function (resp) {
                    debugger
                    vm.nhapsos=resp.data.data.data.data;
                    vm.pagination= resp.data.data.pagination;
                    vm.pagesNumber=vm.getPagesNumber(resp.data.data.data);
                    vm.isActived=vm.getIsActived(resp.data.data.pagination);
                })
                .catch(function (resp) {
                    console.log(resp);
            });
        },
        clear() {
            this.nhapso={daily_id:"",id:0,tuso:"",denso:"",ngaynhap:moment(),menhgia:""}
        },

        revertDateFormat (val) {
            return this.$moment(val, 'DD-MM-YYYY').format('YYYY-MM-DD')
        },
        convertDateFormat (val) {
            return this.$moment(val, 'YYYY-MM-DD HH:mm:ss').format('DD-MM-YYYY HH:mm:ss')
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
            this.getNhapSoAndPaging(page);
        },
        sortBy: function(sortKey) { 
            this.sortKey = sortKey;
            this.sortOrders[sortKey] = this.sortOrders[sortKey] * -1;
        }
    }
}
</script>

<style scoped>

</style>
