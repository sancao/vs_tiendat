<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading"><span class="glyphicon glyphicon-th-list"></span> 
                    Danh sách người dùng trong hệ thống</div>
                <div class="panel-body mr-10">
                    <table class="table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
                                <th @click="sortBy('tendaily')">Đại lý
                                    <span class="arrow" :class="sortOrders['tendaily'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('name')">Họ tên
                                    <span class="arrow" :class="sortOrders['name'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>

                                <th @click="sortBy('phone')">Điện thoại
                                    <span class="arrow" :class="sortOrders['phone'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('email')">Email
                                    <span class="arrow" :class="sortOrders['email'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('address')">Địa chỉ
                                    <span class="arrow" :class="sortOrders['address'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                
                                <th @click="sortBy('role')">Quyền
                                    <span class="arrow" :class="sortOrders['role'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('gender')">Giới tính
                                    <span class="arrow" :class="sortOrders['gender'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='(so, index) in filteredAndSortedData' :key='index'>
                                <td>{{ so.daily.tendaily }}</td>
                                <td>{{ so.name }}</td>
                                <td>{{ so.phone }}</td>
                                <td>{{ so.email }}</td>
                                <td>{{ so.address }}</td>
                                <td>{{ so.role }}</td>
                                <td>{{ so.gender }}</td>
                                <td>
                                    <a v-on:click="updateUser(so,index)"
                                        class="btn btn-xs btn-default">
                                        <span class="glyphicon glyphicon-pencil"></span> Sửa
                                    </a>
                                    <a href="#"
                                        class="btn btn-xs btn-danger"
                                        v-on:click="deleteUser(so.id,index)">
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
                <div class="panel-heading"><span class="glyphicon glyphicon-plus"></span> {{user.id>0?"Cập nhât người dùng":"Tạo mới người dùng"}}</div>
                <div class="panel-body">
                    <form id="form-nguoi-dung" class="form-input">
                        <div class="form-row">
                            <div class="col-md-8 form-group">
                                <label for="inputHoten">Họ tên</label>
                                <input class="form-control" type="text" placeholder="Họ tên" id="inputHoten"
                                v-model="user.name" maxlength="50"
                                v-on:input="$v.user.name.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.user.name.required">Nhập họ tên.</p>
                                </div>
                            </div>
                            <div class="col-md-4 form-group">
                                <label for="inputGioitinh">Giới tính</label>
                                <select id="inputGioitinh" class="form-control" v-model="user.gender">
                                    <option value="" disabled>Giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.user.gender.required">Chọn giới tính.</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-12 form-group">
                                <label for="inputDaily">Đại lý</label>
                                <select id="inputDaily" class="form-control" v-model="user.daily_id">
                                    <option value="" disabled>Chọn Đại Lý</option>
                                    <option v-for="d in dailies" :value="d.value" 
                                        v-bind:key="d.value">{{d.text}}</option>
                                </select>
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.user.daily_id.required">Chọn đại lý.</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-row" v-show='user.id==0'>
                            <div class="col-md-12 form-group">
                                <label for="inputPhone">Điện thoại</label>
                                <input class="form-control" type="text" placeholder="Điện thoại"
                                id="inputPhone"
                                v-model="user.phone" minlength="10" maxlength="15"
                                v-on:input="$v.user.phone.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.user.phone.required">Nhập số điện thoại.</p>
                                    <p class="error" v-else-if="!$v.user.phone.numeric">Số điện thoại không đúng.</p>
                                    <p class="error" v-else-if="!$v.user.phone.isUnique">Số điện thoại này đã tồn tại.</p>
                                    <p class="error" v-else-if="!$v.user.phone.minLength">Số điện thoại ít nhất {{ $v.user.phone.$params.minLength.min }} số.</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-row" v-show='user.id==0'>
                            <div class="col-md-12 form-group">
                                <label for="inputEmail">Email</label>
                                <input class="form-control" type="text" placeholder="Email"
                                id="inputEmail"
                                v-model="user.email" maxlength="100"
                                v-on:input="$v.user.email.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.user.email.required">Nhập email.</p>
                                    <p class="error" v-if="!$v.user.email.email">Email không hợp lệ.</p>
                                    <p class="error" v-if="!$v.user.email.isUnique">Email này đã tồn tại.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-12 form-group">
                                <label for="inputDiachi">Địa chỉ</label>
                                <textarea class="form-control" type="text" placeholder="Địa chỉ"
                                id="inputDiachi"
                                v-model="user.address" maxlength="200"
                                v-on:input="$v.user.address.$touch"></textarea>
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.user.address.required">Nhập địa chỉ.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-12 form-group">
                                <label for="inputRole">Quyền sử dụng</label>
                                <select id="inputRole" class="form-control" v-model="user.role">
                                    <option value="" disabled>Chọn quyền</option>
                                    <option value="nhanvien">Nhân viên bán vé</option>
                                    <option value="daily">Đại lý</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.user.role.required">Chọn quyền.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="col-md-12 form-group">
                                <a class="btn btn-success"
                                @click.prevent="saveUser()">
                                <span class="icon is-small">
                                    <i class="fa fa-check"></i>Lưu
                                </span>
                                </a>
                                <a class="btn btn-primary" @click.prevent="refreshUser()">
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
import { required,requiredIf, minLength,maxLength,email,url,numeric } from 'vuelidate/lib/validators';
var axios = require("axios");
  export default {
    mixins: [validationMixin],
    data: function () {
      return {
          dailies:[],
        submitStatus: null,
        user:{
          name:null,
          gender:"Khác",
          phone:null,
          email:null,
          daily_id:"",
          address:null,
          role:"",
          index:-1,
          id:0
        },
        filterValue: '',
        searchValue:'',
        sortKey:'', 
        sortOrders: [],
        users: [],
        columns: ['tendaily','name','phone','email','address','role','gender'],
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
          user: {
              name: {
                  required,
                  maxLength:maxLength(50)
              },
              gender:{
                  required
              },
              phone: {
                    required,
                    numeric,
                    minLength: minLength(10),
                    maxLength:maxLength(15),
                    async isUnique(value) {
                        if (value == '' || value==null) return true
                        if(this.user && this.user.id>0) return true
                        const res = await this.checkPhoneUnique(value);
                        return Boolean(res.data.data);
                    }
              },
              email: {
                    required: requiredIf(function () {
                        return !this.user.id || this.user.id<=0
                    }),
                    email,
                    maxLength:maxLength(50),
                    async isUnique(value) {
                        debugger
                        if (value == '' || value==null) return true
                        if(this.user && this.user.id>0) return true

                        const res = await this.checkEmailUnique(value);
                        return Boolean(res.data.data);
                    }
              },
              daily_id:{
                  required
              },
              role:{
                  required
              },
              address:{
                  required
              }
          }
      },
      mounted() {
          let vm=this;
          // load list daily
          vm.ds_daily()

          // load table data
          vm.columns.forEach(function (key) {
              vm.sortOrders[key] = 1;
          });

          vm.getUsersPaging(vm.pagination.current_page);
      },
      computed: {
          filteredAndSortedData() {
              let vm=this;
              let sortKey = vm.sortKey;
              let order = vm.sortOrders[sortKey] || 1;
              // Apply filter first
              let result = vm.users;
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
        updateUser(u,index){
            this.user=u
            this.user.index=index
        },
        checkPhoneUnique(phone){
            return axios.get(`user/phone/unique/${phone}`)
        },
        checkEmailUnique(email){
            return axios.get(`user/email/unique/${email}`)
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
        saveUser() {
            debugger
            let app=this
            app.$v.user.$touch();
            if (!app.$v.user.$invalid) 
            {
                axios.post('/user/add', app.user)
                .then(function (resp) {
                    debugger
                    app.$toasted.show("Lưu Người dùng thành công !!!", { 
                        theme: "bubble", 
                        position: "top-right", 
                        duration : 3000
                    });

                    // app.refreshUser()
                    if(!app.user || app.user.id<=0){
                        app.user=resp.data.data
                        app.users.push(resp.data.data)
                    }else{
                        debugger
                        app.users[app.user.index].daily=resp.data.data.daily
                        app.users[app.user.index].daily_id=resp.data.data.daily_id
                        app.user=app.users[app.user.index]
                    }
                })
                .catch(function (resp) {
                    console.log(resp);
                });
            }
        },
        getUsersPaging(page){
            let vm = this;
            axios.get('/user/list?page='+page+'&text='+vm.searchValue)
                .then(function (resp) {
                    vm.users=resp.data.data.data.data;
                    vm.pagination= resp.data.data.pagination;
                    vm.pagesNumber=vm.getPagesNumber(resp.data.data.data);
                    vm.isActived=vm.getIsActived(resp.data.data.pagination);
                })
                .catch(function (resp) {
                    console.log(resp);
            });
        },
        update(user,index){
            this.user=user
            this.user.index=index
        },
        refreshUser() {
            this.user={role:"daily",id:0,daily_id:"",role:""}
        },
        searchLike:function(item){
            return item.name.includes(this.filterValue)
            ||item.tendaily.includes(this.filterValue)
            ||item.email.includes(this.filterValue)
            ||item.phone.includes(this.filterValue)
            ||item.gender.includes(this.filterValue)
            ||item.address.includes(this.filterValue);
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
            this.getUsersPaging(page);
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
