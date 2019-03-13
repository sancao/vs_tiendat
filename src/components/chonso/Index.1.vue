<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="wrap">
                        <div class="clocks">
                            <h4><span class="glyphicon glyphicon-th-list"></span> 
                            Danh sách số dự thưởng ngày <p class="date">{{ date }}</p>
                            </h4>
                        </div>

                        <div class="clocks">
                            <h1 class="time">{{ time }}</h1>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <table class="table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
                                <th @click="sortBy('tendaily')">Đại Lý
                                    <span class="arrow" :class="sortOrders['tendaily'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>

                                <th @click="sortBy('soduthuong')">Số dự thưởng
                                    <span class="arrow" :class="sortOrders['madaily'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>

                                <th @click="sortBy('menhgia')">Mệnh giá
                                    <span class="arrow" :class="sortOrders['menhgia'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('tienduthuong')">
                                    Tiền dự thưởng
                                    <span class="arrow" :class="sortOrders['tienduthuong'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                
                                <th @click="sortBy('loduthuong')">Lô dự thưởng
                                    <span class="arrow" :class="sortOrders['loduthuong'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('daiduthuong')">Đài dự thưởng
                                    <span class="arrow" :class="sortOrders['daiduthuong'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='(so, index) in filteredAndSortedData' :key='index'>
                                <td>{{ so.daily.tendaily }}</td>
                                <td>{{ so.soduthuong }}</td>
                                <td>{{ so.menhgia }}</td>
                                <td>{{ so.tienduthuong }}</td>
                                <td>{{ so.loduthuong }}</td>
                                <td>{{ so.daiduthuong }}</td>
                                <td>
                                    <a @click.prevent="update_chonso(so,index)"
                                        class="btn btn-xs btn-default">
                                        <span class="glyphicon glyphicon-pencil"></span> Sửa
                                    </a>
                                    <a href="#"
                                        class="btn btn-xs btn-danger"
                                        @click.prevent="deleteSo(so.id,index)">
                                        <span class="glyphicon glyphicon-remove"></span> Xóa
                                    </a>
                                    <a href="#"
                                        class="btn btn-xs btn-info"
                                        @click.prevent="inve(so.id)">
                                        <span class="glyphicon glyphicon-print"></span> In Vé
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
                <div class="panel-heading"><h4><span class="glyphicon glyphicon-plus"></span>Màn hình quản lý số dự thưởng</h4></div>
                <div class="panel-body">
                    <form id="form-chon-so" class="form-input">
                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <label for="inputDaiDuThuong">Đài dự thưởng</label>
                                <div class="select is-fullwidth">
                                    <select class="form-control" v-model="chonso.daiduthuong" id="inputDaiDuThuong"
                                        v-on:input="$v.chonso.daiduthuong.$touch">
                                        <option value="" disabled>Chọn đài</option>
                                        <option v-for="d in ds_dai" :value="d.value" 
                                        v-bind:key="d.text">{{d.text}}</option>
                                    </select>
                                    <div v-if="$v.$error">
                                        <p class="error" v-if="!$v.chonso.daiduthuong.required">Chọn đài dự thưởng.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-5">
                                <label for="inputTienDuThuong">Tiền dự thưởng</label>
                                <input class="form-control" type="text" placeholder="Tiền dự thưởng"
                                id="inputTienDuThuong"
                                v-model="chonso.tienduthuong" minlength="2" maxlength="6"
                                v-on:input="$v.chonso.tienduthuong.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.chonso.tienduthuong.required">Nhập tiền dự thưởng.</p>
                                    <p class="error" v-if="!$v.chonso.tienduthuong.numeric">Vui lòng nhập số.</p>
                                </div>
                            </div>

                            <div class="form-group col-md-4">
                                <label for="inputMenhGia">Mệnh giá</label>
                                <select id="inputMenhGia" class="form-control" v-model="chonso.menhgia" @change="changeMenhGia()">
                                    <option value="" disabled>Mệnh giá</option>
                                    <option value="10000">10.000</option>
                                    <option value="20000">20.000</option>
                                    <option value="50000">50.000</option>
                                </select>
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.chonso.menhgia.required">Chọn Mệnh giá.</p>
                                    <p class="error" v-else-if="!$v.chonso.menhgia.must_be_full_devisible">Chọn giá khác.</p>
                                </div>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="inputMenhGiaNum">Số vé</label>
                                <input class="form-control" type="text" placeholder="Số vé" disabled
                                id="inputMenhGiaNum"
                                v-model="chonso.menhgia_count" maxlength="6"
                                v-on:input="$v.chonso.menhgia_count.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.chonso.menhgia_count.required">Nhập số vé.</p>
                                    <p class="error" v-if="!$v.chonso.menhgia_count.numeric">Vui lòng nhập số.</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="selectLoDuThuong">Lô dự thưởng</label>
                                <select id="selectLoDuThuong" class="form-control" v-model="chonso.loduthuong">
                                    <option value="" disabled>Chọn lô dự thưởng</option>
                                    <option value="Đầu">Đầu</option>
                                    <option value="Đuôi">Đuôi</option>
                                    <option value="Đầu đuôi">Đầu đuôi</option>
                                    <option value="18 lô">18 lô</option>
                                </select>
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.chonso.loduthuong.required">Chọn lô dự thưởng.</p>
                                </div>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputSoDuThuong">Số dự thưởng</label>
                                <input class="form-control" type="text" placeholder="Số dự thưởng"
                                id="inputSoDuThuong"
                                v-model="chonso.soduthuong" minlength="2" maxlength="6"
                                v-on:input="$v.chonso.soduthuong.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.chonso.soduthuong.required">Nhập số dự thưởng.</p>
                                    <p class="error" v-if="!$v.chonso.soduthuong.numeric">Vui lòng nhập số.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputHanMucConSo">Hạn mức con số</label>
                                <input class="form-control" type="text" placeholder="Hạn mức" id="inputHanMucConSo"
                                v-model="chonso.hanmucconso">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.chonso.hanmucconso.required">Nhập hạn mức.</p>
                                    <p class="error" v-if="!$v.chonso.hanmucconso.numeric">Vui lòng nhập số.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-12">
                                <a class="btn btn-success"
                                v-on:click="saveChonso()">
                                <span class="icon is-small">
                                    <i class="fa fa-check"></i>Lưu
                                </span>
                                </a>
                                <a class="btn btn-primary" v-on:click="addNew()">
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
                                <h4 class="modal-title">Xem thông tin vé đã chọn</h4>
                            </div>
                            <div class="modal-body">
                                <div id="chonso_inve_pdf"></div>
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
import { required, minLength,maxLength,between,numeric } from 'vuelidate/lib/validators';
import moment from 'moment';

const must_be_full_devisible =
  (value, vm) => (vm.tienduthuong%value==0);

var axios = require("axios");
  export default {
    mixins: [validationMixin],
    data: function () {
      return {
        showModal:false,
        time: '',
        date: '',
        submitStatus: null,
        currentDay:moment(),
        ds_dai:[],
        chonso:{
          id:0,
          index:-1,
          soduthuong:null,
          hanmucconso:null,
          tienduthuong:null,
          loduthuong:"",
          menhgia:"",
          menhgia_count:null,
          ngayduthuong:moment(),
          daiduthuong:"",
          text_daiduthuong:null
        },
        filterValue: '',
        searchValue:'',
        sortKey:'', 
        sortOrders: [],
        chonsos: [],
        columns: ['soduthuong','menhgia','tienduthuong','lodutuong','daiduthuong'],
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
        week: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
      }
    },

      validations: {
          chonso: {
              soduthuong: {
                  required,
                  minLength: minLength(2),
                  maxLength:maxLength(6),
                  numeric
              },
              hanmucconso:{
                required,
                numeric
              },
              tienduthuong: {
                  required,
                  minLength: minLength(2),
                  maxLength:maxLength(6),
                  numeric
              },
              loduthuong: {
                  required
              },
              daiduthuong:{
                required,
              },
              menhgia:{
                  required,
                  numeric,
                  must_be_full_devisible
              },
              menhgia_count:{
                  required,
                  numeric
              }
          }
      },
      mounted() {
        let vm=this;
        vm.columns.forEach(function (key) {
            vm.sortOrders[key] = 1;
        });
        vm.danh_sach_dai()

        setInterval(()=>this.updateTime(), 1000);

        vm.getChonsosPaging(vm.pagination.current_page);
      },
      computed: {
          filteredAndSortedData() {
              let vm=this;
              let sortKey = vm.sortKey;
              let order = vm.sortOrders[sortKey] || 1;
              // Apply filter first
              let result = vm.chonsos;
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
      watch: {
        //   time: function(val){
        //       var threeThirty = moment('03:30 pm', "HH:mm a");
        //       var currentTime = moment();
        //       debugger
        //       if(currentTime.isAfter(threeThirty)){
        //           this.time=val
        //           this.date=moment(this.date).add(1, 'days');
        //       }
        // },
      },
      methods: {
        inve(id){
            let app = this
            debugger
            app.showModal = true
			axios.get('/chonso/inve-pdf/' + id, {responseType: 'arraybuffer'})
				.then(function (response) {
					debugger
					let blob = new Blob([response.data], { type: 'application/pdf' })
					let link = document.createElement('a')
					pdfobj.embed(window.URL.createObjectURL(blob), "#chonso_inve_pdf")
				})
				.catch(function (resp) {
                    debugger
					alert("có lỗi xảy ra, vui lòng kiểm tra lại!");
            });
        },
        updateTime() {
            var cd = new Date();
            this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            this.date = this.zeroPadding(cd.getDate(), 2) + '-' + this.zeroPadding(cd.getMonth()+1, 2) + '-' + this.zeroPadding(cd.getFullYear(), 4) + ' ' + this.week[cd.getDay()];
        },
        zeroPadding(num, digit) {
            var zero = '';
            for(var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        changeMenhGia(){
            if(this.chonso.tienduthuong%this.chonso.menhgia==0){
                this.chonso.menhgia_count=this.chonso.tienduthuong/this.chonso.menhgia
            }else{
                this.chonso.menhgia_count=null
            }
        },
        danh_sach_dai(){
             let vm = this;
            axios.get('/danh-sach-dai-trong-ngay')
                .then(function (resp) {
                    debugger
                    vm.ds_dai=resp.data.data;
                })
                .catch(function (resp) {
            });
        },
        saveChonso() {
          var app = this;
          this.$v.chonso.$touch();
          if (!this.$v.chonso.$invalid) 
          {
            axios.post('/chonso/add', app.chonso)
            .then(function (resp) {
                if(app.chonso.id<=0){
                    app.chonso=resp.data.data
                    app.chonsos.push(resp.data.data)
                }else{
                    app.chonsos[app.chonso.index]=resp.data.data
                }

                app.$toasted.show("Lưu dữ liệu mua số thành công !!!", { 
                    theme: "bubble", 
                    position: "top-right", 
                    duration : 3000
                });
            })
            .catch(function (resp) {
                console.log(resp);
                app.$toasted.show("Đã có lỗi xảy ra, không thành công !!!", { 
                    theme: "bubble", 
                    position: "top-right", 
                    duration : 3000
                });
            });
          }
        },
        deleteSo(id, index) {
            if (confirm("Bạn thật sự muốn xóa?")) {
                let app = this;
                axios.delete('/chonso/delete/' + id)
                  .then(function (resp) {
                      app.chonsos.splice(index, 1);
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
        getChonsosPaging(page){
            let vm = this;
            axios.get('/chonso/list?page='+page+'&text='+vm.searchValue)
                .then(function (resp) {
                    vm.chonsos=resp.data.data.data.data;
                    debugger
                    vm.pagination= resp.data.data.pagination;
                    vm.pagesNumber=vm.getPagesNumber(resp.data.data.data);
                    vm.isActived=vm.getIsActived(resp.data.data.pagination);
                })
                .catch(function (resp) {
                    console.log(resp);
                    // alert("Không thế hiển thị danh sách công ty, đã có lỗi !!!");
            });
        },
        update_chonso(so,index){
            this.chonso=so
            this.chonso.index=index
        },
        addNew() {
            this.chonso={
                id:0,
                index:-1,
                soduthuong:null,
                hanmucconso:null,
                tienduthuong:null,
                loduthuong:"",
                menhgia:"",
                menhgia_count:null,
                ngayduthuong:moment(),
                daiduthuong:"",
                text_daiduthuong:null
            }
        },
        searchLike:function(item){
            return item.soduthuong.includes(this.filterValue)
            ||item.tienduthuong.includes(this.filterValue)
            ||item.loduthuong.includes(this.filterValue)
            ||item.daiduthuong.includes(this.filterValue);
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
            this.getChonsosPaging(page);
        },
        sortBy: function(sortKey) { 
            this.sortKey = sortKey;
            this.sortOrders[sortKey] = this.sortOrders[sortKey] * -1;
        }
      }
  }
</script>

<style scoped>
input{
    padding:5px;
}

p {
    margin: 0;
    padding: 0;
}
#clock {
    font-family: 'Share Tech Mono', monospace;
    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #daf6ff;
    text-shadow: 0 0 20px rgba(10, 175, 230, 1),  0 0 20px rgba(10, 175, 230, 0);
}
#clock .time {
    letter-spacing: 0.05em;
    font-size: 80px;
    padding: 5px 0;
}
#clock .date {
    letter-spacing: 0.1em;
    font-size: 24px;
}
#clock .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
}
</style>
