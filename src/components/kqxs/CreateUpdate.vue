<template>
    <div class="row">
        <div class="container-fluid">
            <form @submit.prevent="saveKqxs()">
                <div class="row">
                    <div class="form-group col-md-7 pt-10">
                        <label for="inputTendai">Tên đài</label>
                        <input v-if="kqxs.id && kqxs.id>0" type="text" class="form-control"
                            maxlength="20" disabled id="inputTendai"
                            v-model="kqxs.dai_id">
                        <select v-else class="form-control" id="inputTendai"
                            v-on:input="$v.kqxs.dai_id.$touch" v-model="kqxs.dai_id">
                            <option value="" disabled>Chọn đài</option>
                            <option v-for="d in danh_sach_dai_trong_ngay" :value="d.value" 
                            v-bind:key="d.value">{{d.text}}</option>
                        </select>
                        <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.dai_id.required">Chọn đài.</p>
                        </div>
                    </div>

                    <div class="form-group col-md-5">
                        <label for="inputLoaive">Loại vé</label>
                        <input type="text" placeholder="Nhập loại vé" class="form-control"
                            maxlength="20" id="inputLoaive"
                            v-model="kqxs.loaive"
                            v-on:input="$v.kqxs.loaive.$touch">

                        <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.loaive.required">Nhập loại vé.</p>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="form-group col-xs-12">
                        <label for="inputGiai8"> Giải 8</label>
                        <input type="text" maxlength="2" id="inputGiai8"
                        placeholder="Nhập số cho giải 8" class="form-control"
                            v-model="kqxs.giai_8"
                            v-on:input="$v.kqxs.giai_8.$touch">
                        <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.giai_8.required">Nhập số giải 8.</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12">
                        <label for="inputGiai7"> Giải 7</label>
                        <input type="text" maxlength="3" id="inputGiai7"
                            placeholder="Nhập số cho giải 7" class="form-control"
                                v-model="kqxs.giai_7"
                                v-on:input="$v.kqxs.giai_7.$touch">
                        <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.giai_7.required">Nhập số giải 7.</p>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="form-group col-xs-12">
                        <label for="inputGiai6"> Giải 6</label>
                        <div class="input-group" id="inputGiai6">
                            <input type="text" class="form-control" 
                            v-model="kqxs.giai_61"
                            v-on:input="$v.kqxs.giai_61.$touch"
                            maxlength="4" placeholder="Nhập số cho giải 6"/>
                            <span class="input-group-addon">-</span>
                            <input type="text" class="form-control" 
                            v-model="kqxs.giai_62"
                            v-on:input="$v.kqxs.giai_62.$touch"
                            maxlength="4" placeholder="Nhập số cho giải 6"/>
                            <span class="input-group-addon">-</span>
                            <input type="text" class="form-control" 
                            v-model="kqxs.giai_63"
                            v-on:input="$v.kqxs.giai_63.$touch"
                            maxlength="4" placeholder="Nhập số cho giải 6"/>
                        </div>
                        <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.giai_61.required">Nhập số giải 6.</p>
                            <p class="error" v-else-if="!$v.kqxs.giai_62.required">Nhập số giải 6.</p>
                            <p class="error" v-else-if="!$v.kqxs.giai_63.required">Nhập số giải 6.</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12">
                        <label class="inputGiai5"> Giải 5</label>
                        <input type="text" placeholder="Nhập số cho giải 5" class="form-control"
                            v-model="kqxs.giai_5" maxlength="4" id="inputGiai5"
                            v-on:input="$v.kqxs.giai_5.$touch">
                            <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.giai_5.required">Nhập số giải 5.</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12">
                        <label for="inputGiai4"> Giải 4</label>
                        <div class="input-group" id="inputGiai4">
                            <input type="text" placeholder="Nhập số cho giải 4" class="form-control"
                            v-model="kqxs.giai_41" maxlength="5"
                            v-on:input="$v.kqxs.giai_41.$touch">
                            <span class="input-group-addon">-</span>
                            <input type="text" placeholder="Nhập số cho giải 4" class="form-control"
                            v-model="kqxs.giai_42" maxlength="5"
                            v-on:input="$v.kqxs.giai_42.$touch">
                            <span class="input-group-addon">-</span>
                            <input type="text" placeholder="Nhập số cho giải 4" class="form-control"
                            v-model="kqxs.giai_43" maxlength="5"
                            v-on:input="$v.kqxs.giai_43.$touch">
                            <span class="input-group-addon">-</span>
                            <input type="text" placeholder="Nhập số cho giải 4" class="form-control"
                            v-model="kqxs.giai_44" maxlength="5"
                            v-on:input="$v.kqxs.giai_44.$touch">
                            <span class="input-group-addon">-</span>
                            <input type="text" placeholder="Nhập số cho giải 4" class="form-control"
                            v-model="kqxs.giai_45" maxlength="5"
                            v-on:input="$v.kqxs.giai_45.$touch">
                            <span class="input-group-addon">-</span>
                            <input type="text" placeholder="Nhập số cho giải 4" class="form-control"
                            v-model="kqxs.giai_46" maxlength="5"
                            v-on:input="$v.kqxs.giai_46.$touch">
                            <span class="input-group-addon">-</span>
                            <input type="text" placeholder="Nhập số cho giải 4" class="form-control"
                            v-model="kqxs.giai_47" maxlength="5"
                            v-on:input="$v.kqxs.giai_47.$touch">
                        </div>
                        <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.giai_41.required">Nhập số giải 4.</p>
                            <p class="error" v-else-if="!$v.kqxs.giai_42.required">Nhập số giải 4.</p>
                            <p class="error" v-else-if="!$v.kqxs.giai_43.required">Nhập số giải 4.</p>
                            <p class="error" v-else-if="!$v.kqxs.giai_44.required">Nhập số giải 4.</p>
                            <p class="error" v-else-if="!$v.kqxs.giai_45.required">Nhập số giải 4.</p>
                            <p class="error" v-else-if="!$v.kqxs.giai_46.required">Nhập số giải 4.</p>
                            <p class="error" v-else-if="!$v.kqxs.giai_47.required">Nhập số giải 4.</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12">
                        <label class="inputGiai3">Giải 3</label>
                        <div class="input-group" id="inputGiai3">
                            <input type="text" placeholder="Nhập số cho giải 3" class="form-control"
                                v-model="kqxs.giai_31" maxlength="5"
                                v-on:input="$v.kqxs.giai_31.$touch">
                            <span class="input-group-addon">-</span>
                            <input type="text" placeholder="Nhập số cho giải 3" class="form-control"
                                v-model="kqxs.giai_32" maxlength="5"
                                v-on:input="$v.kqxs.giai_32.$touch">
                            <span class="input-group-addon">-</span>
                            <input type="text" placeholder="Nhập số cho giải 3" class="form-control"
                                v-model="kqxs.giai_33" maxlength="5"
                                v-on:input="$v.kqxs.giai_33.$touch">
                        </div>
                        <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.giai_31.required">Nhập số giải 3.</p>
                            <p class="error" v-else-if="!$v.kqxs.giai_32.required">Nhập số giải 3.</p>
                            <p class="error" v-else-if="!$v.kqxs.giai_33.required">Nhập số giải 3.</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12">
                        <label class="inputGiai2">Giải 2</label>
                        <input type="text" placeholder="Nhập số cho giải 2" class="form-control"
                            v-model="kqxs.giai_2" maxlength="5" id="inputGiai2"
                            v-on:input="$v.kqxs.giai_2.$touch">
                        <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.giai_2.required">Nhập số giải 2.</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12">
                        <label class="inputGiai1">Giải 1</label>
                        <input type="text" placeholder="Nhập số cho giải 1" class="form-control"
                            v-model="kqxs.giai_1" maxlength="5" id="inputGiai1"
                            v-on:input="$v.kqxs.giai_1.$touch">
                        <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.giai_1.required">Nhập số giải 1.</p>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-xs-12">
                        <label class="inputGiaiDatBiet"> Giải đặt biệt</label>
                        <input type="text" id="inputGiaiDatBiet" placeholder="Nhập số cho giải đặt biệt" class="form-control"
                            v-model="kqxs.giai_datbiet" maxlength="6"
                            v-on:input="$v.kqxs.giai_datbiet.$touch">
                        <div v-if="$v.$error">
                            <p class="error" v-if="!$v.kqxs.giai_datbiet.required">Nhập số giải đặt biệt.</p>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-xs-12">
                        <a class="btn btn-success">
                            <span class="glyphicon glyphicon-save"></span>Lưu</a>
                        <router-link :to="{name: 'kqxs'}"
                            class="btn btn-warning">
                            <span class="glyphicon glyphicon-arrow-left"></span> Quay lại
                            </router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
input{
    margin-top: -5px;
}
select{
    margin-top: -5px;
}
</style>

<script>
    import { required, minLength,maxLength,numeric } from 'vuelidate/lib/validators';

    export default {
        data: function () {
            return{
                kqxs: {
                    id:null,
                    dai_id:'',
                    loaive:null,
                    giai_8:null,
                    giai_7:null,
                    giai_61:null,
                    giai_62:null,
                    giai_63:null,
                    giai_5:null,
                    giai_41:null,
                    giai_42:null,
                    giai_43:null,
                    giai_44:null,
                    giai_45:null,
                    giai_46:null,
                    giai_47:null,
                    giai_31:null,
                    giai_32:null,
                    giai_33:null,
                    giai_2:null,
                    giai_1:null,
                    giai_datbiet:null,
                },
                danh_sach_dai_trong_ngay:[]
            }
        },
        validations: {
            kqxs: {
                dai_id: {
                    required,
                    minLength: minLength(2),
                    maxLength:maxLength(50)
                },
                loaive: {
                    required,
                    minLength: minLength(2),
                    maxLength:maxLength(20)
                },
                giai_8: {
                    required,
                    numeric,
                    minLength: minLength(2),
                    maxLength:maxLength(2)
                },
                giai_7: {
                    required,
                    numeric,
                    minLength: minLength(3),
                    maxLength:maxLength(3)
                },
                giai_61: {
                    required,
                    numeric,
                    minLength: minLength(4),
                    maxLength:maxLength(4)
                },
                giai_62: {
                    required,
                    numeric,
                    minLength: minLength(4),
                    maxLength:maxLength(4)
                },
                giai_63: {
                    required,
                    numeric,
                    minLength: minLength(4),
                    maxLength:maxLength(4)
                },
                giai_5: {
                    required,
                    numeric,
                    minLength: minLength(4),
                    maxLength:maxLength(4)
                },

                giai_41: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },

                giai_42: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },

                giai_43: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },

                giai_44: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },

                giai_45: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },

                giai_46: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },
                giai_47: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },
                giai_31: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },
                giai_32: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },
                giai_33: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },
                giai_2: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },
                giai_1: {
                    required,
                    numeric,
                    minLength: minLength(5),
                    maxLength:maxLength(5)
                },
                giai_datbiet: {
                    required,
                    numeric,
                    minLength: minLength(6),
                    maxLength:maxLength(6)
                }
            }
        },
        mounted(){
            let vm=this
            let id = vm.$route.params.id;
            if(id && id>0){
                vm.getKqxsById(id)
            }

            vm.danh_sach_dai()
        },
        methods: {
            getKqxsById(id){
                let app=this
                app.kqxs.id = id;
                axios.get('/kqxs/get-by-id/' + id)
                .then(function (resp) {
                    debugger
                    app.kqxs = resp.data;
                })
                .catch(function () {
                    alert("Could not load your company")
                });
            },
            danh_sach_dai(){
                let vm = this;
                axios.get('/danh-sach-dai-trong-ngay')
                    .then(function (resp) {
                        vm.danh_sach_dai_trong_ngay=resp.data.data;
                    })
                    .catch(function (resp) {
                });
            },
            saveKqxs() {
                this.$v.kqxs.$touch();
                if (!this.$v.kqxs.$invalid) {
                    var app = this;
                    axios.post('/kqxs/add-edit', app.kqxs)
                    .then(function (resp) {
                        app.$router.push({path: '/kqxs'});
                    })
                    .catch(function (resp) {
                        console.log(resp);
                        alert("Could not create your kqxs");
                    });    
                }
            }
        }
    }
</script>