(this["webpackJsonpdatta-able-rv18.0.4"]=this["webpackJsonpdatta-able-rv18.0.4"]||[]).push([[11],{1326:function(e,t,a){"use strict";var n=a(258),r=a(208),o=a(209),i=a(211),l=a(210),s=a(13),c=a.n(s),d=a(1403),m=a(1393),u=a(1361),p=(a(1325),a(357)),h=a(1323),g=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={isOption:e.props.isOption,fullCard:!1,collapseCard:!1,loadCard:!1,cardRemove:!1},e.cardReloadHandler=function(){e.setState({loadCard:!0}),setInterval((function(){e.setState({loadCard:!1})}),3e3)},e.cardRemoveHandler=function(){e.setState({cardRemove:!0})},e}return Object(o.a)(a,[{key:"render",value:function(){var e,t,a,r,o,i=this,l=[];return this.state.isOption&&(a=c.a.createElement("div",{className:"card-header-right"},c.a.createElement(d.a,{alignRight:!0,className:"btn-group card-option"},c.a.createElement(d.a.Toggle,{id:"dropdown-basic",className:"btn-icon"},c.a.createElement("i",{className:"feather icon-more-horizontal"})),c.a.createElement(d.a.Menu,{as:"ul",className:"list-unstyled card-option"},c.a.createElement(d.a.Item,{as:"li",className:"dropdown-item",onClick:function(){i.setState((function(e){return{fullCard:!e.fullCard}}))}},c.a.createElement("i",{className:this.state.fullCard?"feather icon-minimize":"feather icon-maximize"}),c.a.createElement("a",{href:h.a.BLANK_LINK}," ",this.state.fullCard?"Restore":"Maximize"," ")),c.a.createElement(d.a.Item,{as:"li",className:"dropdown-item",onClick:function(){i.setState((function(e){return{collapseCard:!e.collapseCard}}))}},c.a.createElement("i",{className:this.state.collapseCard?"feather icon-plus":"feather icon-minus"}),c.a.createElement("a",{href:h.a.BLANK_LINK}," ",this.state.collapseCard?"Expand":"Collapse"," ")),c.a.createElement(d.a.Item,{as:"li",className:"dropdown-item",onClick:this.cardReloadHandler},c.a.createElement("i",{className:"feather icon-refresh-cw"}),c.a.createElement("a",{href:h.a.BLANK_LINK}," Reload ")),c.a.createElement(d.a.Item,{as:"li",className:"dropdown-item",onClick:this.cardRemoveHandler},c.a.createElement("i",{className:"feather icon-trash"}),c.a.createElement("a",{href:h.a.BLANK_LINK}," Remove ")))))),r=c.a.createElement(m.a.Header,null,c.a.createElement(m.a.Title,{as:"h5"},this.props.title),a),this.state.fullCard&&(l=[].concat(Object(n.a)(l),["full-card"]),e={position:"fixed",top:0,left:0,right:0,width:this.props.windowWidth,height:this.props.windowHeight}),this.state.loadCard&&(l=[].concat(Object(n.a)(l),["card-load"]),t=c.a.createElement("div",{className:"card-loader"},c.a.createElement("i",{className:"pct-loader1 anim-rotate"}))),this.state.cardRemove&&(l=[].concat(Object(n.a)(l),["d-none"])),this.props.cardClass&&(l=[].concat(Object(n.a)(l),[this.props.cardClass])),o=c.a.createElement(m.a,{className:l.join(" "),style:e},r,c.a.createElement(u.a,{in:!this.state.collapseCard},c.a.createElement("div",null,c.a.createElement(m.a.Body,null,this.props.children))),t),c.a.createElement(p.a,null,o)}}]),a}(s.Component);t.a=g},1345:function(e,t,a){"use strict";a.d(t,"a",(function(){return r}));var n=a(359);function r(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=Object(n.a)(e))){var t=0,a=function(){};return{s:a,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,o,i=!0,l=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return i=e.done,e},e:function(e){l=!0,o=e},f:function(){try{i||null==r.return||r.return()}finally{if(l)throw o}}}}},1395:function(e,t,a){"use strict";a.r(t);var n=a(1345),r=a(208),o=a(209),i=a(211),l=a(210),s=a(13),c=a.n(s),d=a(357),m=a(261),u=a.n(m),p=a(625),h=a.n(p),g=(a(627),a(1326)),f=a(1392),E=a(1372),I=a(626),v=a(1331),C=a.n(v),y=a(260),b=a.n(y),j=a(262),L=a.n(j),w=(a(628),a(630),a(1363)),S=a(624),O=a.n(S),R=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).onSelectionChanged=function(e){n.setState({SelectID:e.selectedRowsData[0]._id})},n.onSelectClick=function(e){n.props.OnHide(n.state.SelectID)},n.onCloseClick=function(e){n.props.OnHide(0)},n.state={SelectID:0,jList:[]},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){console.log("User",this.props.ItemList)}},{key:"render",value:function(){return c.a.createElement(s.Fragment,null,c.a.createElement(w.a,{size:"xl",show:this.props.Show,onHide:this.onCloseClick,backdrop:"static",keyboard:!1},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"List of Items")),c.a.createElement(w.a.Body,null,c.a.createElement(O.a,{id:"grid-list",dataSource:this.props.ItemList,keyExpr:"_id",showBorders:!0,wordWrapEnabled:!0,allowSearch:!0,selection:{mode:"single"},hoverStateEnabled:!0,onSelectionChanged:this.onSelectionChanged},c.a.createElement(S.SearchPanel,{visible:!0}),c.a.createElement(S.GroupPanel,{visible:!0}),c.a.createElement(S.Paging,{defaultPageSize:20}),c.a.createElement(S.Column,{dataField:"_id",visible:!1}),c.a.createElement(S.Column,{dataField:"name",caption:"Item Name"})),c.a.createElement("br",null),c.a.createElement("br",null),c.a.createElement(E.a,{variant:"secondary",onClick:this.onSelectClick},"Open"),c.a.createElement(E.a,{variant:"secondary",onClick:this.onCloseClick,icon:"feather icon-layers"},"Close"))))}}]),a}(s.Component),x=a(629),k=a.n(x),N=function(e){Object(i.a)(a,e);var t=Object(l.a)(a);function a(e){var n;return Object(r.a)(this,a),(n=t.call(this,e)).OnClickSave=function(){1==n.FormLayout.validate().isValid?C.a.fire({type:"info",showCancelButton:!0,text:"Do you want to save ?",confirmButtonText:"Yes",cancelButtonText:"No",allowOutsideClick:!1,allowEscapeKey:!1}).then((function(e){if(e.value){n.setState({LoadPanelVisible:!0});var t=new FormData;if(t.append("vendorId",n.state.jItems.vendorId),t.append("masterCategoryId",n.state.jItems.masterCategoryId),t.append("subCategoryId",n.state.jItems.subCategoryId),t.append("name",n.state.jItems.name),t.append("description",n.state.jItems.description),t.append("price",n.state.jItems.price),t.append("discount",n.state.jItems.discount),t.append("isAvailable",n.state.jItems.isAvailable),t.append("status",n.state.jItems.status),0!=n.state.File.length?n.state.File.forEach((function(e){t.append("images",e)})):t.append("images",[]),0==n.state.ItemID)var a={method:"post",url:"".concat(L.a.URL,"product"),headers:{Authorization:"Bearer "+localStorage.getItem("accessToken"),"Content-Type":"application/json"},data:t};else{console.log("deleteimages",n.state.jlRemovedImage),t.append("productId",n.state.jItems.productId),t.append("deletedImages",JSON.stringify(n.state.jlRemovedImage));a={method:"put",url:"".concat(L.a.URL,"product"),headers:{Authorization:"Bearer "+localStorage.getItem("accessToken"),"Content-Type":"application/json"},data:t}}n.serverRequest=u()(a).then((function(e){e.data.success?(n.onLoadPanelHiding(e.data.message,"success"),n.componentDidMount(),n.OnClearForm()):n.onLoadPanelHiding(null==e.data.error?e.data.message:e.data.error,"error")})).catch((function(e){n.onLoadPanelHiding("Error","error"),console.log(e)}))}else"cancel"==e.dismiss||e.dismiss})):b()({message:"Fields marked with * are required",type:"error",displayTime:3e3,position:{at:"top right",offset:"50"}})},n.OnClearForm=function(){console.log("clear"),n.setState({ItemID:0,jItems:{},jlItem:[],LoadPanelVisible:!1,ListViewing:!1,jMasterCategory:[],jSubCategory:[],jVender:[],File:[],jlImageView:[],jlImageId:[],jlRemovedImage:[]}),n.componentDidMount()},n.onLoadPanelHiding=function(e,t){n.setState({LoadPanelVisible:!1}),b()({message:e,type:t,displayTime:3e3,position:{at:"top right",offset:"50"}})},n.OnListClickEvent=function(){n.setState({ListViewing:!n.state.ListViewing},(function(){}))},n.onValueChanged=function(e){n.setState({File:e.value}),console.log("++++++++++",n.state)},n.OnListClickEvent=function(e){console.log("+++++++++",e),n.setState({ListViewing:!n.state.ListViewing},(function(){if(n.state.ListViewing){var t={method:"get",url:"".concat(L.a.URL,"product"),headers:{Authorization:"Bearer "+localStorage.getItem("accessToken"),"Content-Type":"application/json"}};n.serverRequest=u()(t).then((function(e){e.data.success?(n.setState({jlItem:e.data.data}),console.log("-----------------------",n.state)):n.onLoadPanelHiding(null==e.data.error?e.data.message:e.data.error,"error")})).catch((function(e){n.onLoadPanelHiding("Error","error"),console.log(e)}))}n.state.ListViewing||0==e||n.setState({ItemID:e},(function(){return n.OnLoadData()}))}))},n.onRowRemoved=function(e){n.state.jlRemovedImage.push(e.key)},n.state={ItemID:0,jItems:{},jlItem:[],LoadPanelVisible:!1,ListViewing:!1,jMasterCategory:[],jSubCategory:[],jVender:[],File:[],jlImageView:[],jlImageId:[],jlRemovedImage:[]},n.FormRef=c.a.createRef(),n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this,t={method:"get",url:"".concat(L.a.URL,"category"),headers:{Authorization:"Bearer "+localStorage.getItem("accessToken"),"Content-Type":"application/json"}},a={method:"get",url:"".concat(L.a.URL,"vendor"),headers:{Authorization:"Bearer "+localStorage.getItem("accessToken"),"Content-Type":"application/json"}};this.serverRequest=u()(t).then((function(t){if(t.data.success){var a=[];t.data.data.map((function(e){if(e.subCategory.length>0){console.log();var t,r=Object(n.a)(e.subCategory);try{for(r.s();!(t=r.n()).done;){var o=t.value;a.push(o)}}catch(i){r.e(i)}finally{r.f()}}})),e.setState({jMasterCategory:t.data.data,jSubCategory:a})}else e.onLoadPanelHiding(null==t.data.error?t.data.message:t.data.error,"error")})).catch((function(t){e.onLoadPanelHiding("Error","error"),console.log(t)})),this.serverRequest=u()(a).then((function(t){t.data.success?e.setState({jVender:t.data.data}):e.onLoadPanelHiding(null==t.data.error?t.data.message:t.data.error,"error")})).catch((function(t){e.onLoadPanelHiding("Error","error"),console.log(t)}))}},{key:"renderGridCell",value:function(e){return console.log("celldate",e.value),c.a.createElement("div",null,c.a.createElement("img",{style:{width:"100px",height:"100px",padding:"10px"},src:e.value}))}},{key:"OnLoadData",value:function(){var e=this,t=[],a=[],r=[];this.state.jlItem.map((function(o){if(o._id==e.state.ItemID){t.push({vendorId:o.vendor,masterCategoryId:o.masterCategory,subCategoryId:o.subCategory,name:o.name,description:o.description,price:o.price,discount:o.discount,isAvailable:o.isAvailable,status:o.status,productId:o._id}),console.log("value.images",e.state.jlItem);var i,l=Object(n.a)(o.images);try{for(l.s();!(i=l.n()).done;){var s=i.value;console.log(s),a.push(s.imageUrl),r.push(s)}}catch(c){l.e(c)}finally{l.f()}}})),console.log("filterDate",t),console.log("filterDate",r),this.setState({jItems:t[0],jlImageView:a,jlImageId:r})}},{key:"render",value:function(){return c.a.createElement(d.a,null,c.a.createElement(g.a,{title:"Manage Items"},c.a.createElement(h.a,{ref:this.FormRef,colCount:2,formData:this.state.jItems},c.a.createElement(p.Item,{dataField:"name",editorOptions:{maxLength:100}},c.a.createElement(p.Label,{text:"Item Name"}),c.a.createElement(p.RequiredRule,{message:"Item Name is required"})),c.a.createElement(p.Item,{dataField:"vendorId",editorType:"dxSelectBox",editorOptions:{items:this.state.jVender,valueExpr:"_id",displayExpr:"name"}},c.a.createElement(p.Label,{text:"Vender"}),c.a.createElement(p.RequiredRule,null)),c.a.createElement(p.Item,{dataField:"masterCategoryId",editorType:"dxSelectBox",editorOptions:{items:this.state.jMasterCategory,valueExpr:"_id",displayExpr:"name"}},c.a.createElement(p.Label,{text:"Main Category"}),c.a.createElement(p.RequiredRule,null)),c.a.createElement(p.Item,{dataField:"subCategoryId",editorType:"dxSelectBox",editorOptions:{items:this.state.jSubCategory,valueExpr:"_id",displayExpr:"name"}},c.a.createElement(p.Label,{text:"Sub Category"}),c.a.createElement(p.RequiredRule,null)),c.a.createElement(p.Item,{colSpan:2,dataField:"description",editorType:"dxTextArea",editorOptions:this.notesOptions},c.a.createElement(p.Label,{text:"Item Description"}),c.a.createElement(p.RequiredRule,{message:"Item Description is required"})),c.a.createElement(p.Item,{dataField:"price",editorType:"dxNumberBox",editorOptions:{maxLength:50,format:"#,##0.00"}},c.a.createElement(p.Label,{text:"Price"}),c.a.createElement(p.RequiredRule,{message:"Price is required"})),c.a.createElement(p.Item,{dataField:"discount",editorType:"dxNumberBox",editorOptions:{maxLength:50,format:"#,##0.00"}},c.a.createElement(p.Label,{text:"Discount"})),c.a.createElement(p.Item,{dataField:"isAvailable",editorType:"dxCheckBox"},c.a.createElement(p.Label,{text:"Active"})),c.a.createElement(p.Item,{dataField:"status",editorType:"dxCheckBox"},c.a.createElement(p.Label,{text:"Published"})),c.a.createElement(p.Item,{dataField:"FileUpload",editorType:"dxFileUploader",editorOptions:{multiple:!0,uploadMode:"useForm",allowCanceling:!0,onValueChanged:this.onValueChanged}})),c.a.createElement(O.a,{id:"grid-subject",ref:this.GridRef,dataSource:this.state.jlImageId,keyExpr:"_id",showBorders:!0,allowSearch:!0,onRowRemoved:this.onRowRemoved},c.a.createElement(S.Editing,{mode:"popup",useIcons:!0,allowDeleting:!0},c.a.createElement(S.Popup,{title:"Add Main Category",showTitle:!0})),c.a.createElement(S.Column,{dataField:"imageUrl",cellRender:this.renderGridCell})),c.a.createElement("div",{className:"widget-container"},c.a.createElement(k.a,{id:"gallery",dataSource:this.state.jlImageView,height:300,slideshowDelay:2e3,loop:!0,showNavButtons:!0,showIndicator:!0})),c.a.createElement(f.a,{bg:"",variant:"light"},c.a.createElement(E.a,{variant:"success",icon:"feather icon-layers",onClick:this.OnClickSave},"Save"),c.a.createElement(E.a,{variant:"warning",icon:"feather icon-layers",onClick:this.OnClearForm},"Clear"),c.a.createElement(E.a,{variant:"primary",icon:"feather icon-layers",onClick:this.OnListClickEvent},"View List"))),c.a.createElement(I.LoadPanel,{message:"Processing.... Please, wait...",shadingColor:"rgba(0,0,0,0.4)",onHiding:this.onLoadPanelHiding,visible:this.state.LoadPanelVisible,showIndicator:!0,shading:!0,showPane:!0,closeOnOutsideClick:!1,width:500}),c.a.createElement(R,{Show:this.state.ListViewing,OnHide:this.OnListClickEvent,ItemList:this.state.jlItem}))}},{key:"FormLayout",get:function(){return this.FormRef.current.instance}}]),a}(s.Component);t.default=N}}]);
//# sourceMappingURL=11.828f6f67.chunk.js.map