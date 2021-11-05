(this["webpackJsonpfind-a-cowin"]=this["webpackJsonpfind-a-cowin"]||[]).push([[0],{149:function(e,t,c){},150:function(e,t,c){},178:function(e,t,c){},202:function(e,t,c){},203:function(e,t,c){},204:function(e,t,c){},205:function(e,t,c){},209:function(e,t,c){"use strict";c.r(t);var n,s=c(0),i=c.n(s),a=c(19),r=c.n(a),o=(c(149),c(35)),l=(c(150),c(10)),d=c(30),u="SETTINGS_CALENDARBYDIST_VIEW",j="SETTINGS_CALENDARBYDIST_AR",b="SETTINGS_CALENDARBYDIST_AR_INT",h="table",f=!1,O=null,m={calendarByDistrictView:localStorage.getItem(u)||h,calendarByDistrictAutoRefresh:"true"===localStorage.getItem(j)||f,calendarByDistrictAutoRefreshInterval:parseInt(localStorage.getItem(b))||O},p=Object(d.c)({name:"settings",initialState:m,reducers:{resetSettings:function(e,t){localStorage.setItem("SETTINGS","true"),localStorage.setItem(u,h),localStorage.setItem(j,f),localStorage.setItem(b,O),e.calendarByDistrictView=h,e.calendarByDistrictAutoRefresh=f,e.calendarByDistrictAutoRefreshInterval=O},setCalendarByDistrictView:function(e,t){var c=t.payload.viewName;e.calendarByDistrictView=c,localStorage.setItem(u,c)},setCalendarByDistrictAutoRefreshInterval:function(e,t){var c=t.payload.interval;null===c?(e.calendarByDistrictAutoRefresh=!1,e.calendarByDistrictAutoRefreshInterval=null,localStorage.setItem("SETTINGS_CALENDARBYDIST_AR","false"),localStorage.removeItem("SETTINGS_CALENDARBYDIST_AR_INT")):(e.calendarByDistrictAutoRefresh=!0,e.calendarByDistrictAutoRefreshInterval=c,localStorage.setItem("SETTINGS_CALENDARBYDIST_AR","true"),localStorage.setItem("SETTINGS_CALENDARBYDIST_AR_INT",c.toString()))}}}),v=p.actions,x=v.resetSettings,g=v.setCalendarByDistrictView,N=v.setCalendarByDistrictAutoRefreshInterval,I=p.reducer,y=c(23),S=c(31),w=c.n(S),D=c(42),k=c(54),R=c(43),A=c.n(R),_=c(11);function C(e){return Object(_.filter)((function(e){return"Free"===e.fee_type}),e)}function T(e){return Object(_.filter)((function(e){return"Paid"===e.fee_type}),e)}function B(e,t){var c=Object(_.filter)((function(e){return Object(_.some)((function(e){return t.includes(e.vaccine)}),e.sessions)}),e),n=[];return c.forEach((function(e){var c=Object(_.clone)(e);c.sessions=Object(_.filter)((function(e){return t.includes(e.vaccine)}),e.sessions),n.push(c)})),n}function E(e,t){return Object(_.filter)((function(e){var c=[e.center_id.toString(),e.name,e.address,e.block_name].join(" ").toLowerCase();return Object(_.some)((function(e){return c.indexOf(e.toLowerCase())>=0}),t)}),e)}function F(e,t,c,n){var s=n[0]?e[c[0]]===t[0]&&e[c[1]]===t[1]:e[c[0]]===t[0]||e[c[1]]===t[1];return 2===t.length?s:3===t.length&&(n[1]?s&&e[c[2]]!==t[2]:s||e[c[2]]!==t[2])}function L(e,t){var c,n,s,i=t.eighteenAbove,a=t.eighteenFortyFour,r=t.fortyFiveAbove,o="min_age_limit",l="max_age_limit";if(i===a&&i===r)return e;if(i&&a)c=[18,44],n=[o,l],s=[!1];else if(i&&r)c=[18,45,44],n=[o,o,l],s=[!1,!0];else if(a&&r)c=[45,44],n=[o,l],s=[!1];else if(i)c=[18,void 0],n=[o,l],s=[!0];else if(a)c=[18,44],n=[o,l],s=[!0];else{if(!r)return e;c=[45,void 0],n=[o,l],s=[!0]}var d=Object(_.filter)((function(e){return Object(_.some)((function(e){return F(e,c,n,s)}),e.sessions)}),e),u=[];return d.forEach((function(e){var t=Object(_.clone)(e);t.sessions=Object(_.filter)((function(e){return F(e,c,n,s)}),e.sessions),u.push(t)})),u}function P(e,t){return Object(_.orderBy)((function(e){return Object(_.sumBy)((function(e){return e.available_capacity}),e.sessions)}),t,e)}var V=Object(d.b)("cowin/calendarByDistrict",function(){var e=Object(D.a)(w.a.mark((function e(t){var c,n,s;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.districtId,n=t.date,e.next=3,A.a.get("https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=\n            ".concat(c,"&date=").concat(n));case 3:return s=e.sent,e.abrupt("return",s.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),G=Object(d.b)("cowin/fetchStates",Object(D.a)(w.a.mark((function e(){var t;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.a.get("https://cdn-api.co-vin.in/api/v2/admin/location/states");case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))),M=Object(d.b)("cowin/fetchDistricts",function(){var e=Object(D.a)(w.a.mark((function e(t){var c,n;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.stateId,e.next=3,A.a.get("https://cdn-api.co-vin.in/api/v2/admin/location/districts/".concat(c));case 3:return n=e.sent,e.abrupt("return",n.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),H=Object(d.b)("cowin/fetchVaccinationReports",function(){var e=Object(D.a)(w.a.mark((function e(t){var c,n,s,i;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.stateId,n=t.districtId,s=t.date,e.next=3,A.a.get("https://api.cowin.gov.in/api/v1/reports/v2/getVacPublicReports?\n        state_id=".concat(c,"&district_id=").concat(n,"&date=").concat(s));case 3:return i=e.sent,e.abrupt("return",i.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),Y=Object(d.b)("cowin/fetchPublicReports",function(){var e=Object(D.a)(w.a.mark((function e(t){var c,n,s,i;return w.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c=t.stateId,n=t.districtId,s=t.date,e.next=3,A.a.get("https://api.cowin.gov.in/api/v1/reports/v2/getPublicReports?\n        state_id=".concat(c,"&district_id=").concat(n,"&date=").concat(s));case 3:return i=e.sent,e.abrupt("return",i.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),q=Object(d.c)({name:"cowin",initialState:{states:[],districts:[],selected:{stateEnt:{stateName:"Select a State",stateId:null},districtEnt:{districtName:"Select a District",districtId:null}},calendarByDistrict:{centers:[]},vaccinationReports:{},publicReports:{},status:{states:"idle",districts:"idle",calendarByDistrict:"idle",vaccinationReports:"idle",publicReports:"idle"},error:{states:null,districts:null,calendarByDistrict:null,vaccinationReports:null,publicReports:null},filters:{keywords:[],feeType:{Free:!0,Paid:!0},vaccines:{covaxin:{name:"COVAXIN",checked:!0},covishield:{name:"COVISHIELD",checked:!0},sputnik:{name:"SPUTNIK V",checked:!0}},ages:{minAge:null,maxAge:null,eighteenAbove:!0,eighteenFortyFour:!0,fortyFiveAbove:!0}},sort:{session:{doses:["desc","desc"]},center:{totalDoses:"desc"}}},reducers:{resetDistrictStore:function(e){e.districts=[]},resetCalendarByDistrictStore:function(e){e.calendarByDistrict={centers:[]}},setSelectedState:function(e,t){var c=t.payload.stateName;e.selected.stateEnt.stateName=c,t.payload.stateId?e.selected.stateEnt.stateId=t.payload.stateId:e.selected.stateEnt.stateId=null},setSelectedDistrict:function(e,t){var c=t.payload.districtName;e.selected.districtEnt.districtName=c,t.payload.districtId?e.selected.districtEnt.districtId=t.payload.districtId:e.selected.districtEnt.districtId=null},setFeeFilter:function(e,t){var c=t.payload,n=c.feeType,s=c.typeSelected;e.filters.feeType[n]=s},setKeywordFilter:function(e,t){e.filters.keywords=t.payload},setVaccineFilter:function(e,t){var c=t.payload,n=c.vaccine,s=c.value;switch(n){case"COVAXIN":e.filters.vaccines.covaxin.checked=s;break;case"COVISHIELD":e.filters.vaccines.covishield.checked=s;break;case"SPUTNIK V":e.filters.vaccines.sputnik.checked=s}},setAgeFilter:function(e,t){var c=t.payload,n=c.age,s=c.value;switch(n){case"age-18-above":e.filters.ages.eighteenAbove=s;break;case"age-18-44":e.filters.ages.eighteenFortyFour=s;break;case"age-45-above":e.filters.ages.fortyFiveAbove=s}}},extraReducers:(n={},Object(y.a)(n,V.pending,(function(e){e.status.calendarByDistrict="loading"})),Object(y.a)(n,V.fulfilled,(function(e,t){e.status.calendarByDistrict="succeeded",e.calendarByDistrict=t.payload})),Object(y.a)(n,V.rejected,(function(e,t){e.status.calendarByDistrict="failed",e.error.calendarByDistrict=t.error.message})),Object(y.a)(n,G.pending,(function(e){e.status.states="loading"})),Object(y.a)(n,G.fulfilled,(function(e,t){e.status.states="succeeded",e.states=t.payload.states})),Object(y.a)(n,G.rejected,(function(e,t){e.status.states="failed",e.error.states=t.error.message})),Object(y.a)(n,M.pending,(function(e){e.status.districts="loading"})),Object(y.a)(n,M.fulfilled,(function(e,t){e.status.districts="succeeded",e.districts=t.payload.districts})),Object(y.a)(n,M.rejected,(function(e,t){e.status.districts="failed",e.error.districts=t.error.message})),Object(y.a)(n,H.fulfilled,(function(e,t){e.status.vaccinationReports="succeeded",e.error.vaccinationReports=null,e.vaccinationReports=t.payload})),Object(y.a)(n,H.rejected,(function(e,t){e.status.vaccinationReports="failed",e.error.vaccinationReports=t.error.message})),Object(y.a)(n,Y.fulfilled,(function(e,t){e.status.publicReports="succeeded",e.error.publicReports=null,e.publicReports=t.payload})),Object(y.a)(n,Y.rejected,(function(e,t){e.status.publicReports="failed",e.error.publicReports=t.error.message})),n)}),W=q.actions,z=W.resetDistrictStore,K=W.resetCalendarByDistrictStore,U=W.setKeywordFilter,X=W.setFeeFilter,J=W.setVaccineFilter,Q=W.setAgeFilter,Z=W.setSelectedState,$=W.setSelectedDistrict,ee=function(e){return e.cowin.filters.keywords},te=function(e){return e.cowin.filters.feeType},ce=function(e){return e.cowin.filters.vaccines},ne=function(e){return e.cowin.filters.ages},se=function(e){return e.cowin.states},ie=function(e){return e.cowin.districts},ae=function(e){return e.cowin.selected.stateEnt},re=function(e){return e.cowin.selected.districtEnt},oe=Object(k.a)((function(e){return e.cowin.calendarByDistrict.centers}),te,ee,ce,ne,(function(e){return e.cowin.sort}),(function(e,t,c,n,s,i){var a=[];if(t.Free!==t.Paid&&(t.Free?a.push(C):t.Paid&&a.push(T)),n){var r=Object(_.pickBy)((function(e){return e.checked}),n),o=[];Object.values(r).forEach((function(e){return o.push(e.name)})),o.length>0&&a.push(Object(_.partialRight)(B,[o]))}return s&&a.push(Object(_.partialRight)(L,[s])),c.length>0&&a.push(Object(_.partialRight)(E,[c])),a.push(Object(_.partialRight)(P,[[i.center.totalDoses]])),Object(_.flow)(a)(e)})),le=q.reducer,de=(c(178),c(33)),ue=c(218),je=c(1);function be(e){var t=e.sessions;return Object(je.jsx)(je.Fragment,{children:t&&t.map((function(e,t){return Object(je.jsxs)(ue.w,{className:"session",intent:de.a.PRIMARY,children:[Object(je.jsx)(ue.i,{icon:"calendar"}),Object(je.jsx)("span",{className:"session-info",children:e.date}),Object(je.jsx)("span",{className:"session-info",children:e.vaccine}),Object(je.jsxs)("span",{className:"session-info",children:["Dose 1: ",e.available_capacity_dose1]}),Object(je.jsxs)("span",{className:"session-info",children:["Dose 2: ",e.available_capacity_dose2]})]},t)}))})}function he(e){var t=e.sessions;return Object(je.jsxs)("table",{className:"bp3-html-table bp3-html-table-bordered bp3-html-table-condensed bp3-interactive sessions-table",children:[Object(je.jsx)("thead",{children:Object(je.jsxs)("tr",{children:[Object(je.jsx)("th",{children:"Date"}),Object(je.jsx)("th",{children:"Vaccine"}),Object(je.jsx)("th",{children:"Dose 1"}),Object(je.jsx)("th",{children:"Dose 2"}),Object(je.jsx)("th",{children:"Min. Age"}),Object(je.jsx)("th",{children:"Max. Age"})]})}),Object(je.jsx)("tbody",{children:t&&t.map((function(e,t){return Object(je.jsxs)("tr",{children:[Object(je.jsx)("td",{children:e.date}),Object(je.jsx)("td",{children:e.vaccine}),Object(je.jsx)("td",{children:e.available_capacity_dose1}),Object(je.jsx)("td",{children:e.available_capacity_dose2}),Object(je.jsx)("td",{children:e.min_age_limit||"-"}),Object(je.jsx)("td",{children:e.max_age_limit||"-"})]},t)}))})]})}var fe={Paid:de.a.WARNING,Free:de.a.SUCCESS};function Oe(e){var t,c=e.center,n=Object(l.c)((function(e){return e.settings.calendarByDistrictView}));return"table"===n?t=Object(je.jsx)(he,{sessions:c.sessions}):"tags"===n&&(t=Object(je.jsx)(be,{sessions:c.sessions})),Object(je.jsxs)("div",{className:"center bp3-elevation-1",children:[Object(je.jsxs)("div",{className:"center-info-container",children:[Object(je.jsx)("span",{className:"center-name",children:c.name}),Object(je.jsx)(ue.w,{className:"center-fee-type",intent:fe[c.fee_type],children:c.fee_type}),"Paid"===c.fee_type&&Object(je.jsx)("div",{className:"vaccine-fee-tags",children:c.vaccine_fees.map((function(e,t){return Object(je.jsxs)(ue.w,{className:"fee-type",children:[e.vaccine,": \u20b9 ",e.fee]},t)}))})]}),Object(je.jsxs)("div",{className:"center-info-container",children:[Object(je.jsx)("span",{className:"center-info",children:c.address}),Object(je.jsxs)("span",{className:"center-info",children:["[",c.block_name,"]"]})]}),Object(je.jsx)("div",{className:"sessions",children:t})]},c.center_id)}var me=c(219),pe=function(e,t,c,n){var s=t.toLowerCase(),i=e.toLowerCase();return n?s===i:s.indexOf(i)>=0},ve=function(e){var t=e.setState,c=e.selectedState,n=e.states;return Object(je.jsx)("div",{className:"selector slot-toolbar-item",children:Object(je.jsx)(me.a,{items:n,popoverProps:{popoverClassName:"selector-popover",minimal:!0},inputValueRenderer:function(e){return e.state_name},itemRenderer:function(e,t){var c=t.handleClick;t._modifiers,t._query;return Object(je.jsx)(ue.l,{text:e.state_name,onClick:c},e.state_id)},onItemSelect:function(e,c){t(e)},itemPredicate:function(e,t,c,n){return pe(e,t.state_name,0,n)},noResults:Object(je.jsx)(ue.l,{disabled:!0,text:"No results."}),children:Object(je.jsx)(ue.a,{fill:!0,text:c.stateName,rightIcon:"caret-down"})})})},xe=function(e){var t=e.setDistrict,c=e.selectedDistrict,n=e.districts;return Object(je.jsx)("div",{className:"selector slot-toolbar-item",children:Object(je.jsx)(me.a,{items:n,popoverProps:{popoverClassName:"selector-popover",minimal:!0},inputValueRenderer:function(e){return e.district_name},itemRenderer:function(e,t){var c=t.handleClick;t._modifiers,t._query;return Object(je.jsx)(ue.l,{text:e.district_name,onClick:c},e.district_id)},onItemSelect:function(e,c){t(e)},itemPredicate:function(e,t,c,n){return pe(e,t.district_name,0,n)},noResults:Object(je.jsx)(ue.l,{disabled:!0,text:"No results."}),children:Object(je.jsx)(ue.a,{fill:!0,text:c.districtName,rightIcon:"caret-down"})})})},ge=i.a.memo(ve),Ne=i.a.memo(xe),Ie=c(46);function ye(e){var t=Object(l.b)(),c=Object(l.c)(te),n=e.alignmentVertical,s=function(e,n){t(X({feeType:n,typeSelected:!c[n]}))};return Object(je.jsx)("div",{className:"fee-types",children:Object(je.jsxs)(ue.d,{fill:!0,vertical:n,children:[Object(je.jsx)(ue.c,{className:"fee-type-checkbox",label:"Free",checked:c.Free,onChange:function(e){return s(0,"Free")},alignIndicator:Ie.a.RIGHT}),Object(je.jsx)(ue.c,{className:"fee-type-checkbox",label:"Paid",checked:c.Paid,onChange:function(e){return s(0,"Paid")},alignIndicator:Ie.a.RIGHT})]})})}function Se(e,t,c){var n=e.getMonth(),s=e.getDate().toString(),i=e.getFullYear().toString(),a=i.substr(-2);return 1===(n=(n+1).toString()).length&&(n="0"+n),1===s.length&&(s="0"+s),2===c?[i,n,s].join(t):[s,n,a].join(t)}c(202);var we=function(e){var t=Object(l.b)(),c=e.isOpen,n=e.setIsOpen,s=Object(l.c)((function(e){return e.settings.calendarByDistrictView})),i=Object(l.c)((function(e){return e.settings.calendarByDistrictAutoRefresh})),a=Object(l.c)((function(e){return e.settings.calendarByDistrictAutoRefreshInterval})),r={table:"Table",tags:"Tags",4e3:"4 Seconds",5e3:"5 Seconds",6e3:"6 Seconds",1e4:"10 Seconds"},o=function(){return n(!1)},d=["tags","table"],u=[4e3,5e3,6e3,1e4];return Object(je.jsxs)(ue.e,{id:"settings",className:"bp3-dialog settings-dialog",isOpen:c,canOutsideClickClose:!0,onClose:o,usePortal:!1,children:[Object(je.jsxs)("div",{className:"bp3-dialog-header",children:[Object(je.jsx)("h4",{className:"bp3-heading",children:"Settings"}),Object(je.jsx)(ue.a,{"aria-label":"Close",className:"bp3-dialog-close-button bp3-button bp3-minimal",icon:"cross",onClick:o})]}),Object(je.jsxs)("div",{className:"bp3-dialog-body",children:[Object(je.jsx)(ue.b,{className:"settings-item",children:Object(je.jsxs)(ue.d,{vertical:!0,children:[Object(je.jsx)("div",{className:"settings-caption-vertical",children:"View appointments of a Center as"}),Object(je.jsxs)("div",{className:"bp3-html-select",children:[Object(je.jsx)("select",{onChange:function(e){t(g({viewName:e.target.value}))},value:s,children:d&&d.map((function(e,t){return Object(je.jsx)("option",{value:e,children:r[e]},t)}))}),Object(je.jsx)(ue.i,{icon:"double-caret-vertical"})]})]})}),Object(je.jsx)(ue.b,{className:"settings-item",children:Object(je.jsxs)(ue.d,{fill:!0,children:[Object(je.jsx)(ue.v,{label:"Auto refresh data",checked:i,onChange:function(e){e.target.checked?t(N({interval:5e3})):t(N({interval:null}))},alignIndicator:"right"}),Object(je.jsx)("div",{className:"settings-caption-horizontal",children:"Auto-refresh Interval"}),Object(je.jsxs)("div",{className:"bp3-html-select",children:[Object(je.jsx)("select",{onChange:function(e){t(N({interval:e.target.value}))},value:a||"",disabled:!i,children:u&&u.map((function(e,t){return Object(je.jsx)("option",{value:e,children:r[e]},t)}))}),Object(je.jsx)(ue.i,{icon:"double-caret-vertical"})]})]})})]})]})},De=(c(203),c(38)),ke=c(57);function Re(){var e=Object(l.b)(),t=Object(s.useState)(!1),c=Object(o.a)(t,2),n=c[0],i=c[1],a=Object(l.c)(ce),r=Object(l.c)(ne),d=function(t,c){e(J({vaccine:c,value:t.target.checked}))},u=function(t){e(Q({age:t.target.id,value:t.target.checked}))};return Object(je.jsx)(De.a,{content:Object(je.jsxs)("div",{children:[Object(je.jsxs)("div",{className:"filter-group",children:[Object(je.jsx)(ue.h,{children:"Vaccines"}),Object(je.jsx)(ue.c,{className:"filter-item",label:"Covaxin",checked:a.covaxin.checked,onChange:function(e){return d(e,"COVAXIN")},alignIndicator:Ie.a.RIGHT}),Object(je.jsx)(ue.c,{className:"filter-item",label:"Covishield",checked:a.covishield.checked,onChange:function(e){return d(e,"COVISHIELD")},alignIndicator:Ie.a.RIGHT}),Object(je.jsx)(ue.c,{className:"filter-item",label:"Sputnik V",checked:a.sputnik.checked,onChange:function(e){return d(e,"SPUTNIK V")},alignIndicator:Ie.a.RIGHT})]}),Object(je.jsxs)("div",{className:"filter-group is-hidden-desktop",children:[Object(je.jsx)(ue.h,{children:"Fee Type"}),Object(je.jsx)(ye,{alignmentVertical:!0})]}),Object(je.jsxs)("div",{className:"filter-group",children:[Object(je.jsx)(ue.h,{children:"Age"}),Object(je.jsx)(ue.c,{className:"filter-item",id:"age-18-above",label:"18 and above",checked:r.eighteenAbove,onChange:u,alignIndicator:Ie.a.RIGHT}),Object(je.jsx)(ue.c,{className:"filter-item",id:"age-18-44",label:"18 to 44",checked:r.eighteenFortyFour,onChange:u,alignIndicator:Ie.a.RIGHT}),Object(je.jsx)(ue.c,{className:"filter-item",id:"age-45-above",label:"45 and above",checked:r.fortyFiveAbove,onChange:u,alignIndicator:Ie.a.RIGHT})]}),Object(je.jsx)(ue.a,{intent:de.a.DANGER,className:ke.a.POPOVER2_DISMISS,text:"Close",fill:!0})]}),popoverClassName:ke.a.POPOVER2_CONTENT_SIZING,interactionKind:"click",isOpen:n,onInteraction:function(e){return i(e)},placement:"bottom",children:Object(je.jsx)(ue.a,{icon:"filter-list",text:"Filters"})})}function Ae(){var e,t=Object(l.b)(),c=Object(l.c)((function(e){return e.cowin.status.calendarByDistrict})),n=Object(l.c)(se),i=Object(l.c)(ie),a=Object(l.c)(oe),r=Object(l.c)(ae),d=Object(l.c)(re),u=Object(l.c)(ee),j=Object(s.useState)(!1),b=Object(o.a)(j,2),h=b[0],f=b[1],O=Object(l.c)((function(e){return e.settings.calendarByDistrictAutoRefresh})),m=Object(l.c)((function(e){return e.settings.calendarByDistrictAutoRefreshInterval})),p=Object(l.c)((function(e){return e.cowin.status.states})),v=Object(s.useRef)(),x=function(){if("Select a District"!==d.districtName&&"Select a State"!==r.stateName){var e=new Date;e=Se(e,"-"),console.log("Refreshing data",(new Date).toLocaleTimeString(),{districtName:d.districtName}),t(V({districtId:d.districtId,date:e}))}};Object(s.useEffect)((function(){if(O){console.log("Old timeout:",v.current),clearInterval(v.current);var e=setInterval((function(){x()}),m);return v.current=e,console.log("New timeout:",v.current),function(){return clearInterval(v.current)}}})),"idle"===c||"Select a district"===d.district_name?e=Object(je.jsx)(ue.q,{icon:"info-sign",title:"Select State and District",description:"You will be able to refresh data for a single center without reloading the page."}):"loading"===c?e=Object(je.jsx)(ue.u,{className:"centers-loading-spinner",intent:de.a.PRIMARY,size:50}):"succeeded"===c&&0===a.length?e=Object(je.jsx)(ue.q,{icon:"issue",title:"Currently, no slots are available.",description:"Please check again after sometime."}):"succeeded"===c?e=a.length>0?a.map((function(e,t){return Object(je.jsx)(Oe,{center:e},t)})):Object(je.jsx)(ue.q,{icon:"zoom-out",title:"No centers match your query.",description:"It might be helpful to divide search into multiple keywords."}):"failed"===c&&(e=Object(je.jsx)(ue.q,{icon:"error",title:"There was a problem!",description:"Couldn't load data."}));var g=Object(je.jsx)(ue.a,{icon:"cross",minimal:!0,onClick:function(){return t(U([]))}});Object(s.useEffect)((function(){"idle"===p&&t(G())}),[p,t]);return Object(je.jsxs)("div",{className:"slot-checker-container",children:[Object(je.jsxs)("div",{className:"slot-checker",children:[Object(je.jsx)("div",{className:"header",children:"Slot Finder"}),Object(je.jsx)("div",{className:"slot-toolbar-container",children:Object(je.jsxs)("div",{className:"slot-toolbar columns",children:[Object(je.jsxs)("div",{className:"slot-toolbar-item-group selectors column is-narrow-desktop",children:[Object(je.jsx)(ge,{states:n,selectedState:r,setState:function(e){t(z()),t(K()),t(Z({stateId:e.state_id,stateName:e.state_name})),t(M({stateId:e.state_id})),t($({districtName:"Select a District"}))}}),Object(je.jsx)(Ne,{districts:i,selectedDistrict:d,setDistrict:function(e){t($({districtId:e.district_id,districtName:e.district_name}));var c=new Date;c=Se(c,"-"),t(V({districtId:e.district_id,date:c}))}})]}),Object(je.jsxs)("div",{className:"slot-toolbar-item-group column",children:[Object(je.jsx)(ue.x,{className:"slot-toolbar-item search",leftIcon:"search",placeholder:"Search with multiple keywords..",onChange:function(e){return t(U(e))},values:u,rightElement:g}),Object(je.jsx)("div",{className:"is-hidden-mobile slot-toolbar-item fee-types-container",children:Object(je.jsx)(ye,{alignmentVertical:!1})})]}),Object(je.jsxs)("div",{className:"slot-toolbar-item-group column is-narrow-desktop",children:[Object(je.jsx)("div",{className:"slot-toolbar-item",children:Object(je.jsx)(ue.a,{icon:"refresh",text:"Refresh",onClick:x})}),Object(je.jsx)("div",{className:"slot-toolbar-item",children:Object(je.jsx)(Re,{})}),Object(je.jsx)("div",{className:"slot-toolbar-item",children:Object(je.jsx)(ue.a,{icon:"settings",text:"Settings",onClick:function(){f(!h)}})})]})]})}),Object(je.jsx)("div",{className:"centers",children:e})]}),Object(je.jsx)(we,{isOpen:h,setIsOpen:f})]})}var _e=c(37),Ce=c(16),Te=c(220),Be=c(3),Ee=c(55);c(204);function Fe(){return Object(je.jsx)("div",{id:"home",children:Object(je.jsx)("div",{className:"home-container",children:Object(je.jsxs)("div",{className:"home-content",children:[Object(je.jsx)(ue.f,{className:"home-title",children:"Find-a-CoWIN"}),Object(je.jsx)("span",{children:"A slot finder/checker for the CoWIN vaccination platform"}),Object(je.jsx)("span",{children:"built using the CoWIN Public API."}),Object(je.jsxs)("div",{className:"home-links",children:[Object(je.jsx)("a",{href:"https://faraaz.tech/contact",children:Object(je.jsx)(Ee.a,{content:"Get in touch",position:"bottom",children:Object(je.jsx)(ue.a,{className:Be.a.MINIMAL,icon:"user",text:"faraaz.tech"})})}),Object(je.jsx)("a",{href:"https://github.com/faraazb/find-a-cowin",children:Object(je.jsx)(Ee.a,{content:"Check out the source code",position:"bottom",children:Object(je.jsx)(ue.a,{className:Be.a.MINIMAL,icon:"git-branch",text:"GitHub"})})})]}),Object(je.jsx)(ue.g,{className:"home-help-title",children:"Help regarding Usage"}),Object(je.jsx)("div",{className:"home-help",children:Object(je.jsxs)("table",{class:"bp3-html-table bp3-html-table-bordered query-table",children:[Object(je.jsx)("thead",{children:Object(je.jsxs)("tr",{children:[Object(je.jsx)("th",{children:"Query"}),Object(je.jsx)("th",{children:"Answer"})]})}),Object(je.jsxs)("tbody",{children:[Object(je.jsxs)("tr",{children:[Object(je.jsx)("td",{children:"Nothing happens when I type in the search bar.."}),Object(je.jsxs)("td",{children:["Press enter key! This is so that you can use multiple keywords. For e.g. ",Object(je.jsx)(ue.x,{values:["Andheri","Borivali"]})," to get all the centers that match for ",Object(je.jsx)("b",{children:"either"})," Andheri or Borivali."]})]}),Object(je.jsxs)("tr",{children:[Object(je.jsx)("td",{children:"What does the refresh button do?"}),Object(je.jsx)("td",{children:"It fetches the data again, without refreshing the page or resetting your filters."})]}),Object(je.jsxs)("tr",{children:[Object(je.jsx)("td",{children:"What does auto-refresh under Settings do?"}),Object(je.jsx)("td",{children:"It regularly fetches new data for the selected district at the selected interval."})]})]})]})})]})})})}c(205);function Le(){return Object(je.jsx)("div",{id:"four-o-four",children:Object(je.jsx)("div",{className:"four-o-four-container",children:Object(je.jsxs)("div",{className:"four-o-four-content",children:[Object(je.jsx)(ue.f,{className:"four-o-four-title big",children:"404"}),Object(je.jsx)(ue.f,{className:"four-o-four-title",children:"Not Found"}),Object(je.jsx)("span",{children:"Please visit any of the below links."}),Object(je.jsxs)("div",{className:"four-o-four-links",children:[Object(je.jsx)(_e.b,{to:"/",children:Object(je.jsx)(ue.a,{className:Be.a.MINIMAL,icon:"search",text:"Slot Finder"})}),Object(je.jsx)(_e.b,{to:"/about",children:Object(je.jsx)(ue.a,{className:Be.a.MINIMAL,icon:"info-sign",text:"About"})})]})]})})})}Te.a.onlyShowFocusOnTabs();var Pe=function(){var e=Object(l.b)(),t=!localStorage.getItem("SETTINGS"),c=function(){var e=Object(s.useState)(window.matchMedia("(prefers-color-scheme: dark)").matches),t=Object(o.a)(e,2),c=t[0],n=t[1],i=function(e){n(e.matches)};return Object(s.useEffect)((function(){var e=window.matchMedia("(prefers-color-scheme: dark)");return e.addEventListener("change",i),function(){return e.removeEventListener("change",i)}}),[]),c}(),n=Object(s.useState)({name:c?"Light Theme":"Dark Theme",icon:c?"flash":"moon"}),i=Object(o.a)(n,2),a=i[0],r=i[1];return Object(s.useEffect)((function(){c&&document.getElementById("app").classList.add("bp3-dark")}),[c]),Object(s.useEffect)((function(){t&&(console.log("Resetting settings"),e(x()))})),Object(je.jsx)(_e.a,{basename:"/find-a-cowin",children:Object(je.jsxs)("div",{id:"app",children:[Object(je.jsxs)(ue.m,{children:[Object(je.jsxs)(ue.o,{align:Ie.a.LEFT,children:[Object(je.jsx)(_e.b,{to:"/",id:"find-a-cowin",children:Object(je.jsx)(ue.p,{className:"navigation-header",children:Object(je.jsx)("span",{className:"bp3-heading",children:"Find-a-CoWIN"})})}),Object(je.jsx)(ue.n,{}),Object(je.jsx)(_e.b,{to:"/about",children:Object(je.jsx)(ue.a,{className:Be.a.MINIMAL,icon:"info-sign",text:"About"})})]}),Object(je.jsx)(ue.o,{align:Ie.a.RIGHT,children:Object(je.jsx)(ue.a,{className:Be.a.MINIMAL,icon:a.icon,text:a.name,onClick:function(){var e=document.getElementById("app");e.classList.contains("bp3-dark")?(e.classList.remove("bp3-dark"),r({name:"Dark Theme",icon:"moon"})):e.classList.contains("bp3-dark")||(e.classList.add("bp3-dark"),r({name:"Light Theme",icon:"flash"}))}})})]}),Object(je.jsx)("div",{className:"app-route",children:Object(je.jsxs)(Ce.c,{children:[Object(je.jsx)(Ce.a,{path:"/about",children:Object(je.jsx)(Fe,{})}),Object(je.jsx)(Ce.a,{exact:!0,path:"/",children:Object(je.jsx)(Ae,{})}),Object(je.jsx)(Ce.a,{path:"*",children:Object(je.jsx)(Le,{})})]})})]})})},Ve=Object(d.a)({reducer:{cowin:le,settings:I}}),Ge=(c(207),c(208),function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,221)).then((function(t){var c=t.getCLS,n=t.getFID,s=t.getFCP,i=t.getLCP,a=t.getTTFB;c(e),n(e),s(e),i(e),a(e)}))});r.a.render(Object(je.jsx)(i.a.StrictMode,{children:Object(je.jsx)(l.a,{store:Ve,children:Object(je.jsx)(Pe,{})})}),document.getElementById("root")),Ge()}},[[209,1,2]]]);
//# sourceMappingURL=main.13ade29f.chunk.js.map