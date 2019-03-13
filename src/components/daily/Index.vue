<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
            <div class="panel panel-default">
                <div class="panel-heading"><span class="glyphicon glyphicon-th-list"></span> 
                    Danh sách đại lý vé số</div>
                <div class="panel-body mr-10">
                    <table class="table table-bordered table-striped table-responsive">
                        <thead>
                            <tr>
                                <th @click="sortBy('tendaily')">Mã đại lý
                                    <span class="arrow" :class="sortOrders['tendaily'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>

                                <th @click="sortBy('madaily')">Tên đại lý
                                    <span class="arrow" :class="sortOrders['madaily'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('diachi')"> Địa chỉ
                                    <span class="arrow" :class="sortOrders['diachi'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                
                                <th @click="sortBy('sodienthoai')">Số điện thoại
                                    <span class="arrow" :class="sortOrders['sodienthoai'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th @click="sortBy('capdaily')">Cấp
                                    <span class="arrow" :class="sortOrders['capdaily'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                
                                <th @click="sortBy('dailyquanly')">Đại lý quản lý
                                    <span class="arrow" :class="sortOrders['dailyquanly'] > 0 ? 'asc' : 'dsc'">
                                    </span>
                                </th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for='(so, index) in filteredAndSortedData' :key='index'>
                                <td>{{ so.madaily }}</td>
                                <td>{{ so.tendaily }}</td>
                                <td>{{ so.diachi }}</td>
                                <td>{{ so.sodienthoai }}</td>
                                <td>{{ so.cap }}</td>
                                <td>{{ so.dailyquanly==1?'Cấp quản lý Đại lý':'Cấp đại lý' }}</td>
                                <td>
                                    <a v-on:click="daily=so"
                                        class="btn btn-xs btn-default">
                                        <span class="glyphicon glyphicon-pencil"></span> Sửa
                                    </a>
                                    <a href="#"
                                        class="btn btn-xs btn-danger"
                                        v-on:click="deleteDaily(so.id,index)">
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
                <div class="panel-heading"><span class="glyphicon glyphicon-plus"></span> Tạo mới Đại lý</div>
                <div class="panel-body">
                    <form id="form-dai-ly" class="form-input">
                        <div class="form-row">
                            <div class="form-group nopadding-left-right">
                                <label for="inputTendaily">Tên đại lý</label>
                                <input class="form-control" type="text" placeholder="Tên đại lý"
                                id="inputTendaily"
                                v-model="daily.tendaily" minlength="10" maxlength="15"
                                v-on:input="$v.daily.tendaily.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" 
                                    v-if="!$v.daily.tendaily.required">Nhập tên đại lý.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group nopadding-left-right">
                                <label for="inputCapdaily">Cấp đại lý</label>
                                <select id="inputCapdaily" class="form-control" v-model="daily.cap">
                                    <option value="" disabled>Cấp đại lý</option>
                                    <option value="cap1">Cấp 1</option>
                                    <option value="cap2">Cấp 2</option>
                                    <option value="cap3">Cấp 3</option>
                                </select>
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.daily.cap.required">Chọn cấp đại lý.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group nopadding-left-right">
                                <label for="inputSodienthoai">Số điện thoại</label>
                                <input class="form-control" type="text" placeholder="Số điện thoại"
                                id="inputSodienthoai"
                                v-model.lazy="daily.sodienthoai" minlength="10" maxlength="15"
                                v-on:input="$v.daily.sodienthoai.$touch">
                                <div v-if="$v.$error">
                                    <p class="error" v-if="!$v.daily.sodienthoai.required">Nhập số điện thoại.</p>
                                    <p class="error" v-if="!$v.daily.sodienthoai.numeric">Số điện thoại không hợp lệ.</p>
                                    <p class="error" v-if="!$v.daily.sodienthoai.isUnique">Số điện thoại đã được sử dụng.</p>
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group nopadding-left-right">
                                <label for="inputDiachi">Địa chỉ</label>
                                <textarea class="form-control" type="text" placeholder="Địa chỉ"
                                id="inputDiachi"
                                v-model="daily.diachi" maxlength="200"
                                v-on:input="$v.daily.diachi.$touch"></textarea>
                                <div v-if="$v.$error">
                                    <p class="error" 
                                    v-if="!$v.daily.diachi.required">Nhập địa chỉ.</p>
                                </div>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group nopadding-left-right">
                                <a class="btn btn-success"
                                v-on:click="saveDaily(daily.id)">
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
  </div>
</template>


<script>
import { validationMixin } from 'vuelidate'
import { required, minLength,maxLength,numeric } from 'vuelidate/lib/validators';

  export default {
    mixins: [validationMixin],
    data: function () {
      return {
        submitStatus: null,
        daily:{
            id:0,
            tendaily:null,
            cap:"",
            diachi:null,
            sodienthoai:null
        },
        filterValue: '',
        searchValue:'',
        sortKey:'', 
        sortOrders: [],
        dailies: [],
        columns: ['madaily','tendaily','diachi','sodienthoai','cap','dailyquanly'],
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
        daily: {
            tendaily: {
                required,
                minLength: minLength(2),
                maxLength:maxLength(50)
            },
            diachi: {
                required,
                maxLength:maxLength(200)
            },
            sodienthoai: {
                required,
                minLength: minLength(10),
                numeric,
                async isUnique(value) {
                    debugger
                    if (value === '' || value==null) return true
                    if(this.daily && this.daily.id>0){
                        return true
                    }
                    const res = await this.checkPhoneUnique(value);
                    debugger
                    return Boolean(res.data.data);
                }
            },
            cap:{
                required
            }
        }
    },
    mounted() {
        let vm=this;
        vm.columns.forEach(function (key) {
            vm.sortOrders[key] = 1;
        });

        vm.getDailiesPaging(vm.pagination.current_page);
    },
    computed: {
        filteredAndSortedData() {
            let vm=this;
            let sortKey = vm.sortKey;
            let order = vm.sortOrders[sortKey] || 1;
            // Apply filter first`
            let result = vm.dailies;
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
        checkPhoneUnique(phone){
            return this.axios.get(`/daily/phone/unique/${phone}`)
        },
        saveDaily(id) {
            debugger
            var app = this;
            app.$v.daily.$touch();
            if (!app.$v.daily.$invalid) 
            {
                debugger
                var newDaily = app.daily;
                newDaily.id=id?id:0
                app.axios.post('/daily/add', newDaily)
                .then(function (resp) {
                    app.$toasted.show("Lưu dữ liệu đại lý thành công !!!", { 
                        theme: "bubble", 
                        position: "top-right", 
                        duration : 3000
                    });
                    debugger;
                    if(!id || id<=0){
                        newDaily.madaily=resp.data.data.madaily
                        newDaily.dailyquanly=resp.data.data.dailyquanly
                        newDaily.id=resp.data.data.id
                        app.dailies.push(newDaily);
                    }

                    app.daily={};
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
        deleteDaily(id, index) {
            if (confirm("Bạn thật sự muốn xóa?")) {
                let app = this;
                app.axios.delete('/daily/delete/' + id)
                    .then(function (resp) {
                        app.dailies.splice(index, 1);
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
        getDailiesPaging(page){
            let vm = this;
            vm.axios.get('/daily/list?page='+page+'&text='+vm.searchValue)
                .then(function (resp) {
                    vm.dailies=resp.data.data.data.data;
                    vm.pagination= resp.data.data.pagination;
                    vm.pagesNumber=vm.getPagesNumber(resp.data.data.data);
                    vm.isActived=vm.getIsActived(resp.data.data.pagination);
                })
                .catch(function (resp) {
                    console.log(resp);
                    // alert("Không thế hiển thị danh sách công ty, đã có lỗi !!!");
            });
        },
        clear() {
            this.daily={}
        },
        
        searchLike:function(item){
            return item.tendaily.includes(this.filterValue)
            ||item.madaily.includes(this.filterValue)
            ||item.diachi.includes(this.filterValue)
            // ||item.email.includes(this.filterValue)
            ||item.sodienthoai.includes(this.filterValue)
            ||item.cap.includes(this.filterValue);
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
            this.getDailiesPaging(page);
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
