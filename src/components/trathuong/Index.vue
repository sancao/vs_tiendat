<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading"><span class="glyphicon glyphicon-plus"></span> 
                    Danh sách số đã chọn</div>
                <div class="panel-body mr-10">
                    <table class="table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
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
                                
                                <th @click="sortBy('sodienthoai')">Mobile
                                    <span class="arrow" :class="sortOrders['sodienthoai'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='(so, index) in filteredAndSortedData' :key='index'>
                                <td>{{ so.soduthuong }}</td>
                                <td>{{ so.menhgia }}</td>
                                <td>{{ so.tienduthuong }}</td>
                                <td>{{ so.loduthuong }}</td>
                                <td>{{ so.daiduthuong }}</td>
                                <td>{{ so.sodienthoai }}</td>
                                <td>
                                    <a v-on:click="update(so,index)"
                                        class="btn btn-xs btn-default">
                                        <span class="glyphicon glyphicon-pencil"></span> Sửa
                                    </a>
                                    <a href="#"
                                        class="btn btn-xs btn-danger"
                                        v-on:click="deleteSo(so.id,index)">
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
                <div class="panel-heading"><span class="glyphicon glyphicon-plus"></span> Tạo mới user</div>
                <div class="panel-body">
                    <form id="form-tra-thuong" class="form-input">
                        <div class="form-row">
                            <div class="form-group col-md-7 nopadding-left-right">
                                <label for="inputForPhone">Số điện thoại</label>
                                <input class="form-control" type="text" placeholder="Số điện thoại" :disabled="chonso.id>0"
                                id="inputForPhone"
                                v-model="chonso.sodienthoai" minlength="10" maxlength="15"
                                v-on:input="$v.chonso.sodienthoai.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" 
                                    v-if="!$v.chonso.sodienthoai.required">Nhập số điện thoại.</p>
                                </div>
                            </div>

                            <div class="form-group col-md-5">
                                <label for="inputDaiDuThuong">Đài dự thưởng</label>
                                <div class="select is-fullwidth">
                                    <select class="form-control" v-model="chonso.daiduthuong" id="inputDaiDuThuong"
                                        v-on:input="$v.chonso.daiduthuong.$touch">
                                        <option value="" disabled>Chọn đài</option>
                                        <option v-for="d in dais" :value="d.value" 
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
                                <input class="form-control" type="number" placeholder="Tiền dự thưởng"
                                id="inputTienDuThuong"
                                v-model="chonso.tienduthuong" minlength="2" maxlength="6"
                                v-on:input="$v.chonso.tienduthuong.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.chonso.tienduthuong.required">Nhập tiền dự thưởng.</p>
                                </div>
                            </div>

                            <div class="form-group col-md-4">
                                <label for="inputMenhGia">Mệnh giá</label>
                                <select id="inputMenhGia" class="form-control" v-model="chonso.menhgia">
                                    <option value="" disabled>Mệnh giá...</option>
                                    <option value="10000">10.000</option>
                                    <option value="20000">20.000</option>
                                    <option value="50000">50.000</option>
                                </select>
                                <div v-if="$v.$error">
                                        <p class="error" v-if="!$v.chonso.menhgia.required">Chọn mệnh giá.</p>
                                    </div>
                            </div>
                            <div class="form-group col-md-3">
                                <label for="inputMenhGiaNum">Số vé</label>
                                <input class="form-control" type="number" placeholder="Số vé"
                                id="inputMenhGiaNum"
                                v-model="chonso.menhgia_count" maxlength="6"
                                v-on:input="$v.chonso.menhgia_count.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" 
                                    v-if="!$v.chonso.menhgia_count.required">Nhập số dự thưởng.</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputSoDuThuong">Số dự thưởng</label>
                                <input class="form-control" type="number" placeholder="Số dự thưởng"
                                id="inputSoDuThuong"
                                v-model="chonso.soduthuong" minlength="2" maxlength="6"
                                v-on:input="$v.chonso.soduthuong.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" 
                                    v-if="!$v.chonso.soduthuong.required">Nhập số dự thưởng.</p>
                                </div>
                            </div>
                            

                            <div class="form-group col-md-6">
                                <label for="inputLoDuThuong">Lô dự thưởng</label>
                                <input class="form-control" type="number" placeholder="Lô dự thưởng"
                                id="inputLoDuThuong"
                                v-model="chonso.loduthuong" min="1" max="999"
                                v-on:input="$v.chonso.loduthuong.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.chonso.loduthuong.required">Nhập lô dự thưởng.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputHanMucConSo">Hạn mức con số</label>
                                <input class="form-control" type="number" placeholder="Hạn mức" id="inputHanMucConSo"
                                v-model="chonso.hanmucconso">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.chonso.hanmucconso.required">Nhập hạn mức.</p>
                                </div>
                            </div>

                            <div class="form-group col-md-6">
                                <label for="inputTongHanMuc">Tổng hạn mức</label>
                                <input class="form-control" type="number" placeholder="Tổng hạn mức"
                                v-model="chonso.tonghanmuc" id="inputTongHanMuc">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.chonso.tonghanmuc.required">Nhập tổng hạn mức.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <a class="btn btn-success"
                                v-on:click="saveChonso(chonso.id)">
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
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength,maxLength } from 'vuelidate/lib/validators';
var axios = require("axios");
  export default {
    components: {
    //   Datepicker
    },
    mixins: [validationMixin],
    data: function () {
      return {
        dais:[{value:"vl",text:"Vĩnh Long"},{value:"tn",text:"Tây Ninh"},
        {value:"tphcm",text:"Thành phố hồ chí minh"},{value:"la",text:"Long An"}],
        submitStatus: null,
        chonso:{
          id:0,
          index:-1,
          sodienthoai:null,
          soduthuong:null,
          hanmucconso:null,
          tonghanmuc:null,
          tienduthuong:null,
          loduthuong:null,
          menhgia:"",
          menhgia_count:null,
          ngayduthuong:this.$moment().format('YYYY-MM-DD'),
          daiduthuong:"",
          text_daiduthuong:null
        },
        filterValue: '',
        searchValue:'',
        sortKey:'', 
        sortOrders: [],
        chonsos: [],
        columns: ['soduthuong','menhgia','tienduthuong','lodutuong','daiduthuong','sodienthoai'],
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
          chonso: {
              soduthuong: {
                  required,
                  minLength: minLength(2),
                  maxLength:maxLength(6)
              },
              hanmucconso:{
                required,
              },
              tonghanmuc:{
                required,
              },
              tienduthuong: {
                  required,
                  minLength: minLength(2),
                  maxLength:maxLength(6)
              },
              loduthuong: {
                  required,
                  minLength: minLength(1),
                  maxLength:maxLength(18)
              },
              daiduthuong:{
                required,
              },
              sodienthoai:{
                required
              },
              menhgia:{
                  required
              },
              menhgia_count:{
                  required
              }
          }
      },
      mounted() {
          let vm=this;
          vm.columns.forEach(function (key) {
              vm.sortOrders[key] = 1;
          });

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
      methods: {
        saveChonso(id) {
          var app = this;
          this.$v.chonso.$touch();
          if (!this.$v.chonso.$invalid) 
          {
            var newChonso = app.chonso;
            newChonso.id=id?id:0
            axios.post('/chonso/add', newChonso)
            .then(function (resp) {
                
                app.chonso={ngayduthuong:app.$moment().format('YYYY-MM-DD')}
                if(!id || id<=0){
                  app.chonsos.push(newChonso)
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
        update(so,index){
            this.chonso=so
            this.chonso.index=index
        },
        addNew() {
            this.chonso={ngayduthuong:this.$moment().format('YYYY-MM-DD')}
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
</style>
