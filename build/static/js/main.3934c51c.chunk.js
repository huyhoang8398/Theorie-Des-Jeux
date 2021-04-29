(this["webpackJsonpgame-theory-react"]=this["webpackJsonpgame-theory-react"]||[]).push([[0],{13:function(e,t,s){},14:function(e,t,s){},16:function(e,t,s){"use strict";s.r(t);var n=s(1),l=s.n(n),r=s(3),c=s.n(r),i=(s(13),s(2)),a=(s(14),s(5)),u=s(6),h=s(8),o=s(7),j=s(0),b=function(e){Object(h.a)(s,e);var t=Object(o.a)(s);function s(e){var n;return Object(a.a)(this,s),(n=t.call(this,e)).activeStyle={border:"1px solid #000",display:"block",margin:"4px 0",padding:"4px",width:"30px",textAlign:"center"},n.defaultStyle={border:"1px solid #eee",display:"block",margin:"4px 0",padding:"4px",width:"30px",textAlign:"center"},n}return Object(u.a)(s,[{key:"onChange",value:function(e){var t=this.props.value,s=e.target.value,n=(""+s).length-(""+t).length;this.props.matrix.setCellValue(this.props.x,this.props.y,s),this.setState({value:s}),this.props.matrix.moveCell(n,0)}},{key:"onClick",value:function(e){this.props.matrix.setCell(e.target.selectionStart,this.props.x,this.props.y)}},{key:"onKeyUp",value:function(e){var t=0,s=0;switch(e.key){case"ArrowUp":t=-1;break;case"ArrowRight":s=1;break;case"ArrowDown":t=1;break;case"ArrowLeft":s=-1}this.props.matrix.moveCell(s,t)}},{key:"focus",value:function(){var e=c.a.findDOMNode(this);e.focus();var t=this.props.matrix.state.caret;e.setSelectionRange(t,t)}},{key:"componentDidMount",value:function(){this.props.active&&this.focus()}},{key:"componentDidUpdate",value:function(){this.props.active&&this.focus()}},{key:"render",value:function(){var e=this.defaultStyle;return this.props.active&&(e=this.activeStyle),Object(j.jsx)("input",{ref:"input",type:"text",style:e,value:this.props.value,readOnly:this.props.readonly,onClick:this.onClick.bind(this),onKeyUp:this.onKeyUp.bind(this),onChange:this.onChange.bind(this)})}}]),s}(l.a.Component),d=function(e){Object(h.a)(s,e);var t=Object(o.a)(s);function s(e){var n;return Object(a.a)(this,s),(n=t.call(this,e)).state={x:-1,y:-1,caret:0,columns:n.props.columns},n.style={overflow:"hidden",display:"inline-block",borderLeft:"2px solid #333",borderRight:"2px solid #333",padding:"0 2px",borderRadius:"4px"},n}return Object(u.a)(s,[{key:"getHeight",value:function(){return this.state.columns[0].length}},{key:"getWidth",value:function(){return this.state.columns.length}},{key:"getCellValue",value:function(e,t){return e<0||t<0||e>this.getWidth()-1||t>this.getHeight()-1?"":this.state.columns[e][t]}},{key:"setCellValue",value:function(e,t,s){var n=this.state.columns;n[e][t]=s,this.setState({columns:n})}},{key:"getColumn",value:function(e){return this.state.columns[e]}},{key:"setColumn",value:function(e,t){var s=this.state.columns;s[e]=t,this.setState({columns:s})}},{key:"getColumns",value:function(){return this.state.columns}},{key:"getRow",value:function(e){for(var t=new Array(this.getWidth()),s=this.state.columns,n=0;n<s.length;n++)t[n]=s[n][e];return t}},{key:"setRow",value:function(e,t){for(var s=this.state.columns,n=0;n<t.length;n++)s[n][e]=t[n];this.setState({columns:s})}},{key:"getRows",value:function(){for(var e=new Array(this.getHeight()),t=0;t<this.getHeight();t++)e[t]=this.getRow(t);return e}},{key:"isResizeableX",value:function(){var e=this.props.resize;return!this.props.readonly&&("horizontal"===e||"both"===e||void 0===e)}},{key:"isResizeableY",value:function(){var e=this.props.resize;return!this.props.readonly&&("vertical"===e||"both"===e||void 0===e)}},{key:"setCell",value:function(e,t,s){this.truncate(t,s),this.setState({caret:e,x:t,y:s})}},{key:"moveCell",value:function(e,t){var s,n=this.state.x;this.state.caret+e>(""+this.getCellValue(n,this.state.y)).length?(n++,s=0):this.state.caret+e<0?(n--,s=(""+this.getCellValue(n,this.state.y)).length):s=this.state.caret+e;var l=this.state.y+t;n<0||l<0||(!this.isResizeableX()&&n>=this.getWidth()&&(n=this.state.x),!this.isResizeableY()&&l>=this.getHeight()&&(l=this.state.y),this.truncate(n,l),n>=this.getWidth()&&this.isResizeableX()&&this.addColumn(),this.state.y+t>=this.getHeight()&&this.isResizeableY()&&this.addRow(),this.setState({caret:s,x:n,y:l}))}},{key:"addRow",value:function(){for(var e=this.state.columns,t=0;t<e.length;t++)e[t].push("");this.setState({height:this.getHeight()+1,columns:e})}},{key:"addColumn",value:function(){for(var e=this.state.columns,t=new Array(this.getHeight()),s=0;s<t.length;s++)t[s]="";e.push(t),this.setState({width:this.state.width+1,columns:e})}},{key:"isRowEmpty",value:function(e){for(var t=0;t<this.state.columns.length;t++){var s=this.state.columns[t];if((""+s[s.length-1]).length>0)return!1}return!0}},{key:"isColumnEmpty",value:function(e){for(var t=this.state.columns[e],s=0;s<t.length;s++)if((""+t[s]).length>0)return!1;return!0}},{key:"removeRow",value:function(e){for(var t=0;t<this.state.columns.length;t++)this.state.columns[t].splice(e,1);this.setState({columns:this.state.columns})}},{key:"removeColumn",value:function(e){this.state.columns.splice(e,1),this.setState({columns:this.state.columns})}},{key:"truncate",value:function(e,t){for(var s=this.getWidth()-1;s>e;s--)this.isColumnEmpty(s)&&this.isResizeableX()&&this.removeColumn(s);for(var n=this.getHeight()-1;n>t;n--)this.isRowEmpty(n)&&this.isResizeableY()&&this.removeRow(n)}},{key:"render",value:function(){var e=this.state.x*this.getHeight()+this.state.y,t=0;this.state.columns=this.props.columns;var s=this.state.columns.map((function(s,n){var l=s.map((function(s,l){var r=t===e,c=Object(j.jsx)(b,{value:s,matrix:this,x:n,y:l,active:r,readonly:this.props.readonly},n+"-"+l);return t++,c}),this);return Object(j.jsx)("div",{style:{float:"left",padding:"2px"},children:l},n)}),this);return Object(j.jsx)("div",{style:this.style,children:s})}}]),s}(l.a.Component);var x=function(){var e=Object(n.useState)([[2,0],[1,1]]),t=Object(i.a)(e,2),s=t[0],l=(t[1],Object(n.useState)([[1,0],[0,2]])),r=Object(i.a)(l,2),c=r[0],a=(r[1],Object(n.useState)([[0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2,0,1,2],[0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2,0,0,0,1,1,1,2,2,2],[0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2]])),u=Object(i.a)(a,2),h=u[0],o=(u[1],Object(n.useState)("------")),b=Object(i.a)(o,2),x=b[0],O=b[1],p=Object(n.useRef)(null),f=Object(n.useRef)(null),v=Object(n.useState)("------"),g=Object(i.a)(v,2),m=g[0],y=g[1],C=Object(n.useRef)(null),k=Object(n.useRef)(null),S=Object(n.useState)(!1),R=Object(i.a)(S,2),w=R[0],V=R[1],A=Object(n.useRef)(null),z=Object(n.useRef)(null),P=Object(n.useState)([[]]),H=Object(i.a)(P,2),N=H[0],T=H[1],W=Object(n.useState)([[]]),_=Object(i.a)(W,2),L=_[0],M=_[1],B=Object(n.useState)("------"),I=Object(i.a)(B,2),U=I[0],D=I[1],E=Object(n.useRef)(null),F=Object(n.useRef)(null),X=Object(n.useRef)(null),Y=Object(n.useState)([[]]),K=Object(i.a)(Y,2),J=K[0],$=K[1],q=Object(n.useState)("------"),G=Object(i.a)(q,2),Q=G[0],Z=G[1],ee=Object(n.useRef)(null),te=Object(n.useState)("------"),se=Object(i.a)(te,2),ne=se[0],le=se[1],re=Object(n.useRef)(null),ce={overflow:"hidden",display:"inline-block"};return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("h1",{children:"Part 1"}),Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"row",children:[Object(j.jsxs)("div",{className:"column",children:[Object(j.jsx)("h1",{children:"RewardA"}),Object(j.jsx)(d,{ref:p,columns:s,resize:"none"})]}),Object(j.jsxs)("div",{className:"column",children:[Object(j.jsx)("h1",{children:"RewardB"}),Object(j.jsx)(d,{ref:f,columns:c,resize:"none"})]})]}),Object(j.jsx)("button",{onClick:function(){if(null!==p.current&&null!==f.current){var e=p.current,t=f.current,s=e.getCellValue(0,0)+","+e.getCellValue(1,0)+";"+e.getCellValue(0,1)+","+e.getCellValue(1,1);s+="#",s+=t.getCellValue(0,0)+","+t.getCellValue(1,0)+";"+t.getCellValue(0,1)+","+t.getCellValue(1,1),fetch("http://localhost:8082/api/part1",{method:"POST",body:s}).then((function(e){return e.text()})).then((function(e){O(e)}))}},children:"Check"}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsx)("div",{children:"Result:"}),Object(j.jsx)("div",{dangerouslySetInnerHTML:{__html:x}}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsxs)("div",{children:[Object(j.jsxs)("label",{children:["User enter prob of player A to simulating (0.0-1.0):",Object(j.jsx)("input",{ref:C,style:{margin:"10px"},type:"text"})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{children:["User enter prob of player B to simulating (0.0-1.0):",Object(j.jsx)("input",{ref:k,style:{margin:"10px"},type:"text"})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{children:["Show step by step:",Object(j.jsx)("input",{defaultChecked:w,onChange:function(){return V(!w)},style:{margin:"10px"},type:"checkbox"})]}),Object(j.jsx)("br",{}),Object(j.jsx)("button",{onClick:function(){if(null!==p.current&&null!==f.current&&null!==C.current&&null!==k.current){var e=p.current,t=f.current,s=C.current.value,n=k.current.value;if(""!==s&&""!==n){var l=w;l+="#",l+=s,l+="#",l+=n,l+="$",l+=e.getCellValue(0,0)+","+e.getCellValue(1,0)+";"+e.getCellValue(0,1)+","+e.getCellValue(1,1),l+="#",l+=t.getCellValue(0,0)+","+t.getCellValue(1,0)+";"+t.getCellValue(0,1)+","+t.getCellValue(1,1),fetch("http://localhost:8082/api/simulate1",{method:"POST",body:l}).then((function(e){return e.text()})).then((function(e){y(e)}))}}},style:{margin:"10px"},children:"Simulate"})]}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsx)("div",{children:"Result:"}),Object(j.jsx)("div",{dangerouslySetInnerHTML:{__html:m}})]}),Object(j.jsx)("h1",{children:"Part 2"}),Object(j.jsxs)("div",{children:[Object(j.jsxs)("label",{children:["Number of A's actions:",Object(j.jsx)("input",{ref:A,style:{margin:"10px"},type:"text"})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{children:["Number of B's actions:",Object(j.jsx)("input",{ref:z,style:{margin:"10px"},type:"text"})]}),Object(j.jsx)("br",{}),Object(j.jsx)("button",{onClick:function(){var e=z.current.value,t=A.current.value;if(""!==e&&""!==t&&!(e<1||t<1)){for(var s=[],n=0;n<e;n++){s.push([]);for(var l=0;l<t;l++)s[n].push(1)}var r=s.map((function(e){return e.slice()}));T(s),M(r)}},style:{margin:"10px"},children:"Create"})]}),Object(j.jsxs)("div",{children:[Object(j.jsxs)("div",{className:"row",children:[Object(j.jsxs)("div",{className:"column",children:[Object(j.jsx)("h1",{children:"RewardA"}),Object(j.jsx)("div",{style:ce,children:Object(j.jsxs)("table",{children:[Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Action"}),Object(j.jsx)("th",{children:"Player B"})]}),Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Player A"}),Object(j.jsx)("td",{children:Object(j.jsx)(d,{ref:E,columns:N,resize:"none"})})]})]})})]}),Object(j.jsxs)("div",{className:"column",children:[Object(j.jsx)("h1",{children:"RewardB"}),Object(j.jsx)("div",{style:ce,children:Object(j.jsxs)("table",{children:[Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Action"}),Object(j.jsx)("th",{children:"Player B"})]}),Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Player A"}),Object(j.jsx)("td",{children:Object(j.jsx)(d,{ref:F,columns:L,resize:"none"})})]})]})})]})]}),Object(j.jsx)("button",{onClick:function(){if(null!==E.current&&null!==F.current){var e,t,s=E.current,n=F.current,l=s.getHeight(),r=s.getWidth(),c="",i="";for(t=0;t<l;t++){for(e=0;e<r-1;e++)c+=s.getCellValue(e,t),c+=",",i+=n.getCellValue(e,t),i+=",";c+=s.getCellValue(r-1,t),c+=";",i+=n.getCellValue(r-1,t),i+=";"}var a=c.substring(0,c.length-1)+"#"+i.substring(0,c.length-1);fetch("http://localhost:8082/api/part2",{method:"POST",body:a}).then((function(e){return e.text()})).then((function(e){D(e)}))}},children:"Check"}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsx)("div",{children:"Result:"}),Object(j.jsx)("div",{dangerouslySetInnerHTML:{__html:U}})]}),Object(j.jsx)("h1",{children:"Part 3"}),Object(j.jsxs)("div",{children:[Object(j.jsxs)("label",{children:["Number of players:",Object(j.jsx)("input",{ref:X,style:{margin:"10px"},type:"text"})]}),Object(j.jsx)("br",{}),Object(j.jsx)("button",{onClick:function(){var e=X.current.value;if(""!==e&&!(e<1)){for(var t=[],s=0;s<e;s++)t.push([]),t[s].push(2);$(t)}},style:{margin:"10px"},children:"Create"})]}),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{style:ce,children:Object(j.jsxs)("table",{children:[Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{}),Object(j.jsx)("th",{children:"Player"})]}),Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Maximum of choice"}),Object(j.jsx)("td",{children:Object(j.jsx)(d,{ref:ee,columns:J,resize:"none"})})]})]})}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsx)("button",{onClick:function(){if(null!==ee.current){for(var e=ee.current,t=e.getWidth(),s="",n=0;n<t-1;n++)s+=e.getCellValue(n,0),s+=",";s+=e.getCellValue(t-1,0),fetch("http://localhost:8082/api/part3",{method:"POST",body:s}).then((function(e){return e.text()})).then((function(e){Z(e)}))}},children:"Check"}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsx)("div",{children:"Result:"}),Object(j.jsx)("div",{dangerouslySetInnerHTML:{__html:Q}})]}),Object(j.jsx)("h1",{children:"Part 4"}),Object(j.jsx)("div",{children:Object(j.jsx)("label",{children:"Number of players: 3"})}),Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{style:ce,children:Object(j.jsxs)("table",{children:[Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{}),Object(j.jsx)("th",{children:"Player"})]}),Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Strategy"}),Object(j.jsx)("td",{children:Object(j.jsx)(d,{ref:re,columns:h,resize:"none"})})]})]})}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsx)("button",{onClick:function(){if(null!==re.current){for(var e=re.current,t="",s=0;s<26;s++){for(var n=0;n<2;n++)t+=e.getCellValue(n,s),t+=",";t+=e.getCellValue(2,s),t+=";"}for(var l=0;l<2;l++)t+=e.getCellValue(l,26),t+=",";t+=e.getCellValue(2,26),fetch("http://localhost:8082/api/part4",{method:"POST",body:t}).then((function(e){return e.text()})).catch((function(e){le("<h1>Wrong input</h1>"),console.log("Wrong input")})).then((function(e){le(e)}))}},children:"Check"}),Object(j.jsx)("br",{}),Object(j.jsx)("br",{}),Object(j.jsx)("div",{children:"Result:"}),Object(j.jsx)("div",{dangerouslySetInnerHTML:{__html:ne}})]})]})},O=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,17)).then((function(t){var s=t.getCLS,n=t.getFID,l=t.getFCP,r=t.getLCP,c=t.getTTFB;s(e),n(e),l(e),r(e),c(e)}))};c.a.render(Object(j.jsx)(l.a.StrictMode,{children:Object(j.jsx)(x,{})}),document.getElementById("root")),O()}},[[16,1,2]]]);
//# sourceMappingURL=main.3934c51c.chunk.js.map