"use strict";(self.webpackChunkmean_video_chat=self.webpackChunkmean_video_chat||[]).push([[847],{5847:(j,m,o)=>{o.r(m),o.d(m,{DashboardLayoutModule:()=>O});var p=o(9942),c=o(3077),l=o(3317),g=o(472),f=o(727),x=o(2340),i=o(4650),y=o(7185),C=o(2195),u=o(6895);const v=function(a){return{"submenu-active":a}};function w(a,n){if(1&a){const t=i.EpF();i.TgZ(0,"li",9),i.NdJ("click",function(){const r=i.CHM(t).index,h=i.oxw(2).index,J=i.oxw();return i.KtG(J.addSubmenu(h,r))}),i.TgZ(1,"a",10),i._UZ(2,"i",11),i._uU(3),i.qZA()()}if(2&a){const t=n.$implicit;i.xp6(1),i.Q6J("routerLink",t.url)("ngClass",i.VKq(7,v,t.class)),i.xp6(1),i.Tol(t.icon),i.Q6J("ngClass",i.VKq(9,v,t.class)),i.xp6(1),i.hij(" ",t.name," ")}}function _(a,n){if(1&a&&(i.ynx(0),i.TgZ(1,"ul",7),i.YNc(2,w,4,11,"li",8),i.qZA(),i.BQk()),2&a){const t=i.oxw().$implicit;i.xp6(1),i.ekj("open",t.showHide),i.xp6(1),i.Q6J("ngForOf",t.children)}}const A=function(a){return{active:a}},k=function(a){return[a]},D=function(){return[]};function M(a,n){if(1&a){const t=i.EpF();i.TgZ(0,"li",4)(1,"a",5),i.NdJ("click",function(){const r=i.CHM(t).index,h=i.oxw();return i.KtG(h.addSubmenu(r))}),i._UZ(2,"i"),i._uU(3),i.qZA(),i.YNc(4,_,3,3,"ng-container",6),i.qZA()}if(2&a){const t=n.$implicit;i.xp6(1),i.ekj("dropDown-div",t.children&&t.children.length),i.Q6J("ngClass",i.VKq(9,A,t.class))("routerLink",t.children?i.DdM(13,D):i.VKq(11,k,t.url)),i.xp6(1),i.Tol(t.icon),i.xp6(1),i.hij(" ",t.name," "),i.xp6(1),i.Q6J("ngIf",t.children&&t.children.length)}}let S=(()=>{class a{constructor(t,e){this.route=t,this.globalService=e,this.route.events.subscribe(s=>{s instanceof l.m2&&(this.currentUrl=s.url,setTimeout(()=>{this.getCurrentNav()}))})}ngOnInit(){this.navigationItems=this.navItems,this.currentUrl=this.route.url,this.getCurrentNav()}getCurrentNav(){this.navigationItems=this.navItems;const t=this;this.navigationItems&&t.navigationItems.length&&t.navigationItems.filter(e=>{if(t.currentUrl===e.url?(e.showHide=!0,e.class="active"):(e.showHide=!1,e.class=""),e.children&&e.children.length){const s=e.children.filter(r=>(r.class="","/"+t.currentUrl.split("/")[1]===r.url||t.currentUrl===r.url));if(s.length){e.class="active";const r=e.children.indexOf(s[0]);e.children[r].class="active",e.showHide=!0}else e.showHide=!1,e.class=""}})}addSubmenu(t,e){this.navigationItems.filter(s=>{this.navigationItems[t].name!==s.name?(s.showHide=!1,s.class="",this.checkChildMenu(s,e)):e>=0&&(this.checkChildMenu(s,e),this.navigationItems[t].children[e].class="active")}),this.navigationItems[t].class="active",!this.navigationItems[t].showHide||e>=0?this.navigationItems[t].showHide=!0:(this.navigationItems[t].showHide=!1,this.navigationItems[t].class=""),this.navigationItems[t].children||(this.navigationItems[t].class="active")}checkChildMenu(t,e){e>=0&&t.children&&t.children.length&&t.children.filter(s=>{s.showHide=!1,s.class=""}),this.globalService.sendActionChildToParent("false")}}return a.\u0275fac=function(t){return new(t||a)(i.Y36(l.F0),i.Y36(p.Uh))},a.\u0275cmp=i.Xpm({type:a,selectors:[["app-dashboard-sidebar"]],inputs:{navItems:"navItems"},decls:4,vars:1,consts:[[1,"sidebar","collapse","navbar-collapse","pt-2"],["role","nav",1,"sidebar-nav","ps"],[1,"nav"],["class","nav-item",4,"ngFor","ngForOf"],[1,"nav-item"],["type","button",1,"nav-link",3,"ngClass","routerLink","click"],[4,"ngIf"],["role","menu","aria-labelledby","button-animated",1,"list-unstyled","dropDown"],["class"," nav-item","role","menuitem",3,"click",4,"ngFor","ngForOf"],["role","menuitem",1,"nav-item",3,"click"],[1,"nav-link",3,"routerLink","ngClass"],[3,"ngClass"]],template:function(t,e){1&t&&(i.TgZ(0,"aside",0)(1,"div",1)(2,"ul",2),i.YNc(3,M,5,14,"li",3),i.qZA()()()),2&t&&(i.xp6(3),i.Q6J("ngForOf",e.navItems))},dependencies:[u.mk,u.sg,u.O5,l.rH],styles:[".text-secondary[_ngcontent-%COMP%]{color:#d53a46!important}.nav-item[_ngcontent-%COMP%]{border-radius:0;border:none;background-color:transparent;color:#fff;transition:all .4s ease 0s;text-transform:capitalize;cursor:pointer;border-top:.1px solid rgb(128,128,128)!important}.nav-item.submenu-active[_ngcontent-%COMP%]{color:#fff!important;background-color:#d53a46!important}"]}),a})();function T(a,n){if(1&a){const t=i.EpF();i.TgZ(0,"div",18)(1,"a",19),i.NdJ("click",function(){i.CHM(t);const s=i.oxw();return i.KtG(s.logout())}),i._UZ(2,"i",20),i._uU(3," Logout"),i.qZA()()}}const N=function(a,n){return{"sidebar-desk":a,"sidebar-mob":n}},I=[{path:"",component:(()=>{class a{constructor(t,e,s,r){this.jwtService=t,this.router=e,this.globalService=s,this.toastr=r,this.addDesktopClass=!0,this.subscription=new f.w0,this.addMobClass=!1,this.currentUser=new p.ar,this.navItems=g.t,this.test={}}ngOnInit(){this.currentUser=this.jwtService.getCurrentUser(),this.subscription=this.globalService.getActionChildToParent().subscribe(t=>{t&&(this.currentUser=this.jwtService.getCurrentUser())}),this.navItems=this.currentUser.role===x.N.role.adminRole?JSON.parse(JSON.stringify(g.t)):JSON.parse(JSON.stringify([g.t[0]]))}toggleClass(){window.innerWidth>992?this.addDesktopClass?(this.addMobClass=!1,this.addDesktopClass=!1):this.addDesktopClass=!0:this.addMobClass=!this.addMobClass}logout(){this.jwtService.destroyToken(),this.globalService.logOut(),this.router.navigate(["/login"]),this.toastr.success("You have logged out successfully. ","Success")}}return a.\u0275fac=function(t){return new(t||a)(i.Y36(p.Tj),i.Y36(l.F0),i.Y36(p.Uh),i.Y36(y._W))},a.\u0275cmp=i.Xpm({type:a,selectors:[["app-dashboard-layout"]],decls:22,vars:9,consts:[[1,"app-dashboard",3,"ngClass"],[1,"header-fixed"],[1,"navbar","navbar-expand-sm","navbar-light","bg-white"],["href","#",1,"navbar-brand"],["src","assets/img/brand/AMW_Logo-2.png"],["type","button","data-toggle","collapse","data-target",".navbarSupportedContent","aria-controls","navbarSupportedContent","aria-label","Toggle navigation",1,"navbar-toggler","d-block","dashboard",3,"click"],[1,"navbar-toggler-icon"],[1,"nav","navbar-nav","ml-auto","d-block"],["dropdown","","placement","bottom right",1,"nav-item","dropdown"],["data-toggle","dropdown","href","#","role","button","aria-haspopup","true","aria-expanded","false","dropdownToggle","",1,"nav-link","text-primary","text-capitalize",3,"click"],["width","35px",1,"m-0","img-avatar","img-circle",3,"src"],[1,"pt-2","p-1","text-primary"],[1,"fa","fa-gear","pt-2","text-primary"],["class","dropdown-menu dropdown-menu-right","aria-labelledby","simple-dropdown",4,"dropdownMenu"],[1,"app-dashboard-body"],[3,"navItems"],[1,"main","row","mr-0"],[1,"container"],["aria-labelledby","simple-dropdown",1,"dropdown-menu","dropdown-menu-right"],[1,"dropdown-item","p-2","pl-3","cursor-pointer",3,"click"],[1,"fa","fa-lock","p-1"]],template:function(t,e){1&t&&(i._UZ(0,"app-loading"),i.TgZ(1,"section",0)(2,"header",1)(3,"nav",2)(4,"a",3),i._UZ(5,"img",4),i.qZA(),i.TgZ(6,"button",5),i.NdJ("click",function(){return e.toggleClass()}),i._UZ(7,"span",6),i.qZA(),i.TgZ(8,"ul",7)(9,"li",8)(10,"a",9),i.NdJ("click",function(){return!1}),i._UZ(11,"img",10),i.TgZ(12,"span",11),i._uU(13),i.qZA(),i._UZ(14,"i",12),i._uU(15," \xa0\xa0 "),i.qZA(),i.YNc(16,T,4,0,"div",13),i.qZA()()()(),i.TgZ(17,"div",14),i._UZ(18,"app-dashboard-sidebar",15),i.TgZ(19,"main",16)(20,"div",17),i._UZ(21,"router-outlet"),i.qZA()()()()),2&t&&(i.xp6(1),i.Q6J("ngClass",i.WLB(6,N,e.addDesktopClass,e.addMobClass)),i.xp6(5),i.uIk("aria-expanded",!e.addDesktopClass),i.xp6(5),i.Q6J("src",e.currentUser.profileImage?e.currentUser.profileImage:"assets/img/brand/avatar.png",i.LSH),i.xp6(2),i.AsE(" ",e.currentUser.userName," (",e.currentUser.role,")"),i.xp6(5),i.Q6J("navItems",e.navItems))},dependencies:[C.N,u.mk,l.lC,c.Hz,c.Mq,c.TO,S],styles:[".text-secondary{color:#d53a46!important}.app .header-fixed,.app-dashboard .header-fixed{position:fixed;z-index:1020;width:100%}.app .header-fixed .navbar-light .navbar-toggler,.app-dashboard .header-fixed .navbar-light .navbar-toggler{border-color:#4285f4}.app .header-fixed .navbar-light .navbar-toggler .navbar-toggler-icon,.app-dashboard .header-fixed .navbar-light .navbar-toggler .navbar-toggler-icon{background-image:url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgb(66,133,244,1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\")}.app .header-fixed .navbar-light .navbar-toggler.navbar-toggler:focus,.app-dashboard .header-fixed .navbar-light .navbar-toggler.navbar-toggler:focus{box-shadow:none}.app,app-dashboard-layout,app-root{display:flex;flex-direction:column;min-height:100vh}.app-dashboard-body{min-height:calc(100vh - 2px);max-height:calc(100vh - 2px)}.app-dashboard-body{padding-top:67px;background-color:#e4e5e6}.app-dashboard-body .backtotop{position:fixed;bottom:60px;right:20px;opacity:0;transition:all .4s ease 0s}.app-dashboard-body .backtotop button{background:#e4e5e6;border-width:0px;box-shadow:none;border-radius:50%;width:40px;height:40px;color:#4285f4}.app-dashboard-body .show-scrollTop{opacity:1;transition:all .2s ease-in-out}.dashboard-toggle{border:0}.main{transition:margin-left .25s,margin-right .25s,width .25s,flex .25s;margin-left:0}.avatar>img,.img-avatar,.img-circle{max-width:100%;height:auto;border-radius:50em}.app-dashboard .dropdown-menu{position:absolute!important;top:100%!important;left:0!important;z-index:1000!important;float:left!important;min-width:10rem!important;margin:.125rem 0 0!important;font-size:.875rem!important;color:#334151!important;text-align:left!important;list-style:none!important;background-color:#fff!important;background-clip:padding-box!important;border:1px solid #e1e6f1!important}@media (min-width: 992px){.sidebar-desk .sidebar{margin-left:0}}@media (min-width: 992px) and (min-width: 992px){.sidebar-desk .main{margin-left:200px}}.sidebar{position:fixed;z-index:1019;width:200px;min-height:calc(100vh - 67px);display:flex;flex-direction:column;padding:0;color:#fff;background-color:#27568a;margin-left:-200px;display:block!important;transition:margin-left .25s,margin-right .25s,width .25s,flex .25s}.sidebar .sidebar-nav{position:relative;flex:1;width:200px;height:calc(100vh - 65px);overflow:auto}.sidebar .sidebar-nav .nav{display:block;margin-bottom:0;list-style:none;min-height:100%;padding:0;width:100%}.sidebar .sidebar-nav .nav li{padding:0}.sidebar .sidebar-nav .nav li .nav-link{display:block;padding:.75rem 1rem;color:#fff;text-decoration:none;background:transparent;font-size:14px}.sidebar .sidebar-nav .nav li .nav-link.active{background-color:#d53a46}.sidebar .sidebar-nav .nav li .nav-link:hover:not(.active){color:#fff}.sidebar .sidebar-nav .nav li .nav-link.dropDown-div{padding-right:40px;position:relative}.sidebar .sidebar-nav .nav li .nav-link.dropDown-div:after{content:\"\\f107\";font-family:FontAwesome;position:absolute;right:10px;top:0;bottom:0;display:flex;justify-content:center;align-items:center;transition:all .4s ease 0s;width:20px;height:20px;margin:auto}.sidebar .sidebar-nav .nav li .nav-link.dropDown-div.active:after{transform:rotate(180deg)}.sidebar .sidebar-nav .nav li .nav-link i{margin-right:7px}.sidebar .sidebar-nav .nav li .dropDown{max-height:0;padding:0;margin:0;overflow-y:hidden;width:100%;transition:max-height .3s ease-in-out}.sidebar .sidebar-nav .nav li .dropDown.open{max-height:1500px}.sidebar .sidebar-nav .nav li .dropDown li{padding-left:15px}.sidebar .sidebar-nav .nav li .dropDown li:hover{background-color:#f13b3e8f;padding-left:20px}.sidebar-mob{position:relative}@media (max-width: 991.5px){.sidebar-mob .sidebar{margin-left:0}}@media (min-width: 991.9px){.sidebar-mob .sidebar{margin-left:0}.sidebar-mob .main{margin-left:200px}}\n"],encapsulation:2}),a})(),canActivate:[p.a1],children:[{path:"dashboard",loadChildren:()=>Promise.all([o.e(592),o.e(319)]).then(o.bind(o,5319)).then(a=>a.DashboardModule)},{path:"users",loadChildren:()=>o.e(114).then(o.bind(o,1114)).then(a=>a.UsersModule)}]}];let Z=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=i.oAB({type:a}),a.\u0275inj=i.cJS({imports:[l.Bz.forChild(I),l.Bz]}),a})();var d=o(7340);const b="400ms cubic-bezier(0.4,0.0,0.2,1)";(0,d.oB)({height:0,visibility:"hidden"}),(0,d.jt)(b,(0,d.oB)({height:"*",visibility:"visible"})),(0,d.oB)({height:"*",visibility:"visible"}),(0,d.jt)(b,(0,d.oB)({height:0,visibility:"hidden"}));let E=(()=>{class a{static forRoot(){return{ngModule:a,providers:[]}}}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=i.oAB({type:a}),a.\u0275inj=i.cJS({}),a})(),O=(()=>{class a{}return a.\u0275fac=function(t){return new(t||a)},a.\u0275mod=i.oAB({type:a}),a.\u0275inj=i.cJS({imports:[p.eY,Z,E.forRoot(),c.mr.forRoot()]}),a})()}}]);