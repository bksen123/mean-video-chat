"use strict";(self.webpackChunkmean_video_chat=self.webpackChunkmean_video_chat||[]).push([[348],{348:(x,_,d)=>{d.r(_),d.d(_,{LoginModule:()=>A});var g=d(3317),h=d(9942),n=d(4650),O=d(7579),L=d(6063);class y extends O.x{constructor(a=1/0,e=1/0,t=L.l){super(),this._bufferSize=a,this._windowTime=e,this._timestampProvider=t,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=e===1/0,this._bufferSize=Math.max(1,a),this._windowTime=Math.max(1,e)}next(a){const{isStopped:e,_buffer:t,_infiniteTimeWindow:s,_timestampProvider:o,_windowTime:r}=this;e||(t.push(a),!s&&t.push(o.now()+r)),this._trimBuffer(),super.next(a)}_subscribe(a){this._throwIfClosed(),this._trimBuffer();const e=this._innerSubscribe(a),{_infiniteTimeWindow:t,_buffer:s}=this,o=s.slice();for(let r=0;r<o.length&&!a.closed;r+=t?1:2)a.next(o[r]);return this._checkFinalizedStatuses(a),e}_trimBuffer(){const{_bufferSize:a,_timestampProvider:e,_buffer:t,_infiniteTimeWindow:s}=this,o=(s?1:2)*a;if(a<1/0&&o<t.length&&t.splice(0,t.length-o),!s){const r=e.now();let l=0;for(let c=1;c<t.length&&t[c]<=r;c+=2)l=c;l&&t.splice(0,l+1)}}}class w extends O.x{constructor(){super(...arguments),this._value=null,this._hasValue=!1,this._isComplete=!1}_checkFinalizedStatuses(a){const{hasError:e,_hasValue:t,_value:s,thrownError:o,isStopped:r,_isComplete:l}=this;e?a.error(o):(r||l)&&(t&&a.next(s),a.complete())}next(a){this.isStopped||(this._value=a,this._hasValue=!0)}complete(){const{_hasValue:a,_value:e,_isComplete:t}=this;t||(this._isComplete=!0,a&&super.next(e),super.complete())}}var I=d(6895);class S{constructor(){}loadScript(a,e,t,s=null){if(typeof document<"u"&&!document.getElementById(a)){let o=document.createElement("script");o.async=!0,o.src=e,o.onload=t,s||(s=document.head),s.appendChild(o)}}}class R{}let p=(()=>{class i extends S{constructor(e,t={scope:"email"}){super(),this.clientId=e,this.initOptions=t}initialize(){return new Promise((e,t)=>{try{this.loadScript(i.PROVIDER_ID,"https://apis.google.com/js/api.js",()=>{gapi.load("client:auth2",()=>{gapi.client.init(Object.assign(Object.assign({},this.initOptions),{client_id:this.clientId})).then(()=>{this.auth2=gapi.auth2.getAuthInstance(),e()}).catch(s=>{t(s)})})})}catch(s){t(s)}})}getLoginStatus(e){const t=Object.assign(Object.assign({},this.initOptions),e);return new Promise((s,o)=>{if(this.auth2.isSignedIn.get()){const r=new R,l=this.auth2.currentUser.get().getBasicProfile(),c=this.auth2.currentUser.get().getAuthResponse(!0);this.setUserProfile(r,l),r.response=c;const u=m=>{r.authToken=m.access_token,r.idToken=m.id_token,s(r)};t.refreshToken?this.auth2.currentUser.get().reloadAuthResponse().then(u):u(c)}else o(`No user is currently logged in with ${i.PROVIDER_ID}`)})}signIn(e){const t=Object.assign(Object.assign({},this.initOptions),e);return new Promise((s,o)=>{(t&&t.offline_access?this.auth2.grantOfflineAccess(e):this.auth2.signIn(e)).then(c=>{const u=new R;if(c&&c.code)u.authorizationCode=c.code;else{const m=this.auth2.currentUser.get().getBasicProfile(),v=this.auth2.currentUser.get().getAuthResponse(!0),N=v.access_token,z=v.id_token;this.setUserProfile(u,m),u.authToken=N,u.idToken=z,u.response=v}s(u)},c=>{o(c)}).catch(c=>{o(c)})})}signOut(e){return new Promise((t,s)=>{let o;o=e?this.auth2.disconnect():this.auth2.signOut(),o.then(r=>{r?s(r):t()}).catch(r=>{s(r)})})}setUserProfile(e,t){e.id=t.getId(),e.name=t.getName(),e.email=t.getEmail(),e.photoUrl=t.getImageUrl(),e.firstName=t.getGivenName(),e.lastName=t.getFamilyName()}}return i.PROVIDER_ID="GOOGLE",i})(),f=(()=>{class i{constructor(e){this.providers=new Map,this.autoLogin=!1,this._user=null,this._authState=new y(1),this.initialized=!1,this._initState=new w,e instanceof Promise?e.then(t=>{this.initialize(t)}):this.initialize(e)}get authState(){return this._authState.asObservable()}get initState(){return this._initState.asObservable()}initialize(e){this.autoLogin=void 0!==e.autoLogin&&e.autoLogin;const{onError:t=console.error}=e;e.providers.forEach(s=>{this.providers.set(s.id,s.provider)}),Promise.all(Array.from(this.providers.values()).map(s=>s.initialize())).then(()=>{if(this.autoLogin){const s=[];let o=!1;this.providers.forEach((r,l)=>{let c=r.getLoginStatus();s.push(c),c.then(u=>{u.provider=l,this._user=u,this._authState.next(u),o=!0}).catch(console.debug)}),Promise.all(s).catch(()=>{o||(this._user=null,this._authState.next(null))})}}).catch(s=>{t(s)}).finally(()=>{this.initialized=!0,this._initState.next(this.initialized),this._initState.complete()})}refreshAuthToken(e){return new Promise((t,s)=>{if(this.initialized)if(e!==p.PROVIDER_ID)s(i.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN);else{const o=this.providers.get(e);o?o.getLoginStatus({refreshToken:!0}).then(r=>{r.provider=e,this._user=r,this._authState.next(r),t()}).catch(r=>{s(r)}):s(i.ERR_LOGIN_PROVIDER_NOT_FOUND)}else s(i.ERR_NOT_INITIALIZED)})}signIn(e,t){return new Promise((s,o)=>{if(this.initialized){let r=this.providers.get(e);r?r.signIn(t).then(l=>{l.provider=e,s(l),this._user=l,this._authState.next(l)}).catch(l=>{o(l)}):o(i.ERR_LOGIN_PROVIDER_NOT_FOUND)}else o(i.ERR_NOT_INITIALIZED)})}signOut(e=!1){return new Promise((t,s)=>{if(this.initialized)if(this._user){let r=this.providers.get(this._user.provider);r?r.signOut(e).then(()=>{t(),this._user=null,this._authState.next(null)}).catch(l=>{s(l)}):s(i.ERR_LOGIN_PROVIDER_NOT_FOUND)}else s(i.ERR_NOT_LOGGED_IN);else s(i.ERR_NOT_INITIALIZED)})}}return i.ERR_LOGIN_PROVIDER_NOT_FOUND="Login provider not found",i.ERR_NOT_LOGGED_IN="Not logged in",i.ERR_NOT_INITIALIZED="Login providers not ready yet. Are there errors on your console?",i.ERR_NOT_SUPPORTED_FOR_REFRESH_TOKEN="Chosen login provider is not supported for refreshing a token",i.\u0275fac=function(e){return new(e||i)(n.LFG("SocialAuthServiceConfig"))},i.\u0275prov=n.Yz7({token:i,factory:i.\u0275fac}),i})(),T=(()=>{class i{constructor(e){if(e)throw new Error("SocialLoginModule is already loaded. Import it in the AppModule only")}static initialize(e){return{ngModule:i,providers:[f,{provide:"SocialAuthServiceConfig",useValue:e}]}}}return i.\u0275fac=function(e){return new(e||i)(n.LFG(i,12))},i.\u0275mod=n.oAB({type:i}),i.\u0275inj=n.cJS({providers:[f],imports:[[I.ez]]}),i})();var b=d(2340),k=d(6405),U=d(7185);function D(i,a){if(1&i){const e=n.EpF();n.TgZ(0,"div",10)(1,"div",11),n._UZ(2,"img",12),n.TgZ(3,"h3",13),n._uU(4," AMW ZOOM "),n.qZA()(),n.TgZ(5,"div",3)(6,"div",14)(7,"button",15),n.NdJ("click",function(){n.CHM(e);const s=n.oxw();return n.KtG(s.loginWithGoogle())}),n._UZ(8,"img",16),n.TgZ(9,"span"),n._uU(10,"CONTINUE WITH GOOGLE"),n.qZA()()()()()}}function E(i,a){1&i&&(n.TgZ(0,"div",10)(1,"div",11)(2,"div",17),n._UZ(3,"img",18),n.qZA()()())}let P=(()=>{class i{constructor(e,t,s,o,r,l,c,u){this.router=e,this.jwtService=t,this.spinner=s,this.usersService=o,this.globalService=r,this.toastr=l,this.socialAuthService=c,this.route=u,this.login=new h.ar,this.loadingLoader=!1,this.amwZoomId=""}ngOnInit(){this.route.params.subscribe(e=>{this.amwZoomId=e.amwZoomId})}doLogin(){let e={...this.login};this.usersService.doSignIn(e).subscribe({next:t=>{if(this.loadingLoader=!0,200===t.status){let s=t.data;s.profileImage=e.profileImage,this.toastr.success(t.message,"Success"),this.jwtService.saveToken(s.authorization),this.jwtService.saveCurrentUser(JSON.stringify(s)),this.jwtService.getCurrentUser(),this.amwZoomId?setTimeout(()=>{window.location.replace(b.N.baseUrl+this.amwZoomId)},3e3):setTimeout(()=>{this.router.navigate(["/dashboard"])},3e3)}else this.toastr.error(t.message,"Error"),this.loadingLoader=!1},error:t=>{this.loadingLoader=!1,this.spinner.hide(),this.toastr.error(t.message,"Error")}})}loginWithGoogle(){this.socialAuthService.signIn(p.PROVIDER_ID).then(e=>{this.spinner.show(),e.authToken&&(this.login.email=e.email,this.login.userName=e.firstName+" "+e.lastName,this.login.profileImage=e.photoUrl,this.spinner.hide(),this.doLogin())}).catch(e=>{console.log("err",JSON.stringify(e))})}}return i.\u0275fac=function(e){return new(e||i)(n.Y36(g.F0),n.Y36(h.Tj),n.Y36(k.t2),n.Y36(h.fz),n.Y36(h.Uh),n.Y36(U._W),n.Y36(f),n.Y36(g.gz))},i.\u0275cmp=n.Xpm({type:i,selectors:[["app-login"]],decls:13,vars:2,consts:[[1,"app-body","app-login"],[1,"main","d-flex","align-items-center"],[1,"container"],[1,"row"],[1,"col-xl-4","col-lg-6","col-md-8","mx-auto"],[1,"card","p-4","mb-0","position-relative"],[1,"d-flex","custom-border"],[1,"secondary-bg"],[1,"primary-bg"],["class","card-body text-center",4,"ngIf"],[1,"card-body","text-center"],[1,"row","p-4"],["src","assets/img/brand/AMW_Logo.png","alt","company-logo",1,"d-block","mx-auto",2,"width","12rem"],[1,"pt-3","login-heading","text-danger"],[1,"col-12","d-flex","justify-content-center"],["type","button","id","login-btn",1,"btn","btn-primary","px-4","d-flex","align-items-center",3,"click"],["src","assets/img/brand/google-logo.png","alt","google-logo",1,"me-2","shadow","bg-light"],[1,"col-12","d-flex","justify-content-center","align-items-center"],["src","assets/img/brand/loader.gif","alt","loader",1,"d-block","mx-auto",2,"width","150px"]],template:function(e,t){1&e&&(n.TgZ(0,"div",0)(1,"main",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"div",6),n._UZ(7,"span",7)(8,"span",8)(9,"span",7)(10,"span",8),n.qZA(),n.YNc(11,D,11,0,"div",9),n.YNc(12,E,4,0,"div",9),n.qZA()()()()()()),2&e&&(n.xp6(11),n.Q6J("ngIf",!t.loadingLoader),n.xp6(1),n.Q6J("ngIf",t.loadingLoader))},dependencies:[I.O5],styles:[".text-secondary[_ngcontent-%COMP%]{color:#d53a46!important}.app-login[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]{height:100vh}.app-login[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]{min-height:295px}.app-login[_ngcontent-%COMP%]   .main[_ngcontent-%COMP%]   .card[_ngcontent-%COMP%]   .login-heading[_ngcontent-%COMP%]{text-align:center;color:gray;font-family:Montserrat}"]}),i})();const M=[{path:"",component:P,pathMatch:"full"},{path:":amwZoomId",component:P,pathMatch:"full"}];let j=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=n.oAB({type:i}),i.\u0275inj=n.cJS({imports:[g.Bz.forChild(M),g.Bz]}),i})(),A=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=n.oAB({type:i}),i.\u0275inj=n.cJS({providers:[{provide:"SocialAuthServiceConfig",useValue:{autoLogin:!1,providers:[{id:p.PROVIDER_ID,provider:new p("1051803384347-91967jipju1ume5ul4dcr5g84bfaja56.apps.googleusercontent.com")}]}}],imports:[h.eY,j,T]}),i})()}}]);