<template>
    <div class="container-fluid">
        <div class="row" v-if="user">
            <nav class="navbar navbar-default navbar-static-top navbar-fixed-top">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <!-- Collapsed Hamburger -->
                        <button type="button" class="navbar-toggle collapsed" 
                        data-toggle="collapse" data-target="#app-navbar-collapse">
                            <span class="sr-only">Toggle Navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>

                        <!-- Branding Image -->
                        <router-link  :to="{ name: 'trang-chu' }" class="navbar-brand">
                            <span class="glyphicon glyphicon-home"></span>Tiến Đạt</router-link>
                    </div>
                    <div class="collapse navbar-collapse" id="app-navbar-collapse">
                        <ul class="nav navbar-nav">
                            <li>
                                <router-link :to="{ name: 'chon-so' }">
                                <span class="glyphicon glyphicon-compressed"></span> Chọn Số
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'nhap-so' }">
                                <span class="glyphicon glyphicon-import"></span> Nhập Cùi
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'giao-so' }">
                                <span class="glyphicon glyphicon-export"></span> Giao Cùi
                                </router-link>
                            </li>
                            <li>
                                <router-link :to="{ name: 'tra-thuong' }">
                                <span class="glyphicon glyphicon-gift"></span> Trả Thưởng
                                </router-link>
                            </li>
                        </ul>
                        <ul class="nav navbar-nav">
                            <li>
                                <router-link :to="{ name: 'pdf' }">
                                <span class="glyphicon glyphicon-compressed"></span> Báo Cáo
                                </router-link>
                            </li>
                        </ul>
                        <!-- Left Side Of Navbar -->
                        <ul class="nav navbar-nav">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" 
                                role="button" aria-expanded="false">
                                    <span class="glyphicon glyphicon-cog"></span> Hệ Thống
                                    <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li><router-link :to="{ name: 'dai-ly-ve-so' }">
                                        <span class="glyphicon glyphicon-th-large"></span> Đại Lý</router-link></li>

                                    <li><router-link :to="{ name: 'users' }">
                                        <span class="glyphicon glyphicon-user"></span> Người Dùng</router-link></li>

                                    <li><router-link :to="{ name: 'kqxs' }">
                                        <span class="glyphicon glyphicon-briefcase"></span> Nhập KQXS</router-link></li>
                                </ul>
                            </li>
                        </ul>
                        
                        <!-- Right Side Of Navbar -->
                        <ul class="nav navbar-nav navbar-right">
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" 
                                role="button" aria-expanded="false">
                                    Xin chào <strong> {{ user.name}} </strong>
                                    <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                    <router-link :to="{ name: 'profile' }">
                                    <span class="glyphicon glyphicon-user"></span> Thông tin người dùng
                                    </router-link></li>
                                    <li>
                                        <a href="#">
                                            <span class="glyphicon glyphicon-log-out"></span> Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div class="row row-view"><router-view></router-view></div>
    </div>
</template>

<script>
export default {
    name: 'app',
    computed: {
        user () {
            return this.$store.state.authentication.user;
        },
    }
};
</script>

<style>
.row-view{margin-top: 60px;}
</style>