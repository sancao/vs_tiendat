<template>
    <div class="container-fluid">
        <br />
        <div class="panel panel-default" v-for='(so, index) in kqxs' :key='index'>
            <div class="panel-heading">
                <h1 class="panel-title">Kết quá xổ số miền nam đài {{so.dai_id}}</h1>
                <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
                <a @click="exportPdf(so.id)" class="btn btn-primary">export pdf</a>
            </div>
            <table class="table table-bordered table-hover table-striped specialCollapse">
                <thead>
                    <tr>
                        <th class="col-md-1"><b>{{calculateDate(so.ngayxo)}}</b></th>
                        <th class="col-md-1"><b>KQXS đài {{so.dai_id}}</b></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>Giải 8</b></td>
                        <td><b>{{so.giai_8}}</b></td>
                    </tr>
                    <tr>
                        <td><b>Giải 7</b></td>
                        <td><b>{{so.giai_7}}</b></td>
                    </tr>
                    <tr>
                        <td><b>Giải 6</b></td>
                        <td><b>{{so.giai_61}}</b> - <b>{{so.giai_62}}</b> - <b>{{so.giai_63}}</b></td>
                    </tr>
                    <tr>
                        <td><b>Giải 5</b></td>
                        <td><b>{{so.giai_5}}</b></td>
                    </tr>
                    <tr>
                        <td><b>Giải 4</b></td>
                        <td>
                            <b>{{so.giai_41}}</b> - <b>{{so.giai_42}}</b> - <b>{{so.giai_43}}</b> - <b>{{so.giai_44}}</b> - <b>{{so.giai_45}}</b> - <b>{{so.giai_46}}</b> - <b>{{so.giai_47}}</b>
                        </td>
                    </tr>
                    <tr>
                        <td><b>Giải 3</b></td>
                        <td><b>{{so.giai_31}}</b> - <b>{{so.giai_32}}</b> - <b>{{so.giai_33}}</b></td>
                    </tr>
                    <tr>
                        <td><b>Giải 2</b></td>
                        <td><b>{{so.giai_2}}</b></td>
                    </tr>
                    <tr>
                        <td><b>Giải 1</b></td>
                        <td><b>{{so.giai_1}}</b></td>
                    </tr>

                    <tr>
                        <td><b>Giải Đặc biệt</b></td>
                        <td><b>{{so.giai_datbiet}}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return{
                kqxs:[],
                src:''
            }
        },
        mounted(){
            let vm=this
            vm.get_kqxs_trong_ngay()

            $(document).on('click', '.panel-heading span.clickable', function(e){
                var $this = $(this);
                if(!$this.hasClass('panel-collapsed')) {
                    $this.parents('.panel').find('.specialCollapse').slideUp();
                    $this.addClass('panel-collapsed');
                    $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
                } else {
                    $this.parents('.panel').find('.specialCollapse').slideDown();
                    $this.removeClass('panel-collapsed');
                    $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
                }
            })
        },
        methods:{
            exportPdf(id) {
                let app = this;
                axios.get('/pdf-kqxs/' + id, {responseType: 'arraybuffer'})
                    .then(function (response) {
                        debugger;
                        let blob = new Blob([response.data], { type: 'application/pdf' })
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = id+'-myfile.pdf'
                        link.click()
                    })
                    .catch(function (resp) {
                        alert("Could not delete company");
                    });
            },
            get_kqxs_trong_ngay(){
                let vm = this;
                axios.get('/kqxs/kqxs-trong-ngay')
                    .then(function (resp) {
                        vm.kqxs=resp.data.data;
                    })
                    .catch(function (resp) {
                });
            },

            calculateDate(date){
                switch(date) {
                    case "Monday":
                        return "Thứ Hai";
                        break;
                    case "Tuesday":
                        return "Thứ Ba";
                        break;
                    case "Wednesday":
                        return "Thứ Tư";
                        break;
                    case "Thursday":
                        return "Thứ Năm";
                        break;
                    case "Friday":
                        return "Thứ Sáu";
                        break;
                    case "Saturday":
                        return "Thứ Bảy";
                        break;
                    case "Sunday":
                        return "Chủ Nhật";
                        break;
                }
            }
        }
    }
</script>

<style scoped>
.row{
    margin-top:40px;
    padding: 0 10px;
}

.clickable{
    cursor: pointer;   
}

.panel-heading span {
	margin-top: -20px;
	font-size: 17px;
}

.table > thead > tr > th{
    border-right: 1px solid #ddd;
    border-bottom:0;
    text-align: center;
}

.table > tbody > tr > td{
    border-right: 1px solid #ddd;
    text-align: center;
    font-size: 18px;
}

.table > thead > tr > th:last-of-type {
    border-right: 0px;
}

.table > tbody > tr > td:last-of-type {
    border-right: 0px;
}

.panel-body {
    padding: 0;
}
.panel-body > .table{margin-bottom:0px;}
</style>