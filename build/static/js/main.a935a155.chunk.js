(this["webpackJsonpgame-theory-react"]=this["webpackJsonpgame-theory-react"]||[]).push([[0],{13:function(t,e,s){},14:function(t,e,s){},16:function(t,e,s){"use strict";s.r(e);var n=s(1),i=s.n(n),l=s(3),r=s.n(l),a=(s(13),s(2)),c=(s(14),s(5)),o=s(6),u=s(8),h=s(7),d=s(0),j=function(t){Object(u.a)(s,t);var e=Object(h.a)(s);function s(t){var n;return Object(c.a)(this,s),(n=e.call(this,t)).activeStyle={border:"1px solid #000",display:"block",margin:"4px 0",padding:"4px",width:"30px",textAlign:"center"},n.defaultStyle={border:"1px solid #eee",display:"block",margin:"4px 0",padding:"4px",width:"30px",textAlign:"center"},n}return Object(o.a)(s,[{key:"onChange",value:function(t){var e=this.props.value,s=t.target.value,n=(""+s).length-(""+e).length;this.props.matrix.setCellValue(this.props.x,this.props.y,s),this.setState({value:s}),this.props.matrix.moveCell(n,0)}},{key:"onClick",value:function(t){this.props.matrix.setCell(t.target.selectionStart,this.props.x,this.props.y)}},{key:"onKeyUp",value:function(t){var e=0,s=0;switch(t.key){case"ArrowUp":e=-1;break;case"ArrowRight":s=1;break;case"ArrowDown":e=1;break;case"ArrowLeft":s=-1}this.props.matrix.moveCell(s,e)}},{key:"focus",value:function(){var t=r.a.findDOMNode(this);t.focus();var e=this.props.matrix.state.caret;t.setSelectionRange(e,e)}},{key:"componentDidMount",value:function(){this.props.active&&this.focus()}},{key:"componentDidUpdate",value:function(){this.props.active&&this.focus()}},{key:"render",value:function(){var t=this.defaultStyle;return this.props.active&&(t=this.activeStyle),Object(d.jsx)("input",{ref:"input",type:"text",style:t,value:this.props.value,readOnly:this.props.readonly,onClick:this.onClick.bind(this),onKeyUp:this.onKeyUp.bind(this),onChange:this.onChange.bind(this)})}}]),s}(i.a.Component),b=function(t){Object(u.a)(s,t);var e=Object(h.a)(s);function s(t){var n;return Object(c.a)(this,s),(n=e.call(this,t)).state={x:-1,y:-1,caret:0,columns:n.props.columns},n.style={overflow:"hidden",display:"inline-block"},n.contentStyle={overflow:"hidden",display:"inline-block",borderLeft:"2px solid #333",borderRight:"2px solid #333",padding:"0 2px",borderRadius:"4px"},n}return Object(o.a)(s,[{key:"getHeight",value:function(){return this.state.columns[0].length}},{key:"getWidth",value:function(){return this.state.columns.length}},{key:"getCellValue",value:function(t,e){return t<0||e<0||t>this.getWidth()-1||e>this.getHeight()-1?"":this.state.columns[t][e]}},{key:"setCellValue",value:function(t,e,s){var n=this.state.columns;n[t][e]=s,this.setState({columns:n})}},{key:"getColumn",value:function(t){return this.state.columns[t]}},{key:"setColumn",value:function(t,e){var s=this.state.columns;s[t]=e,this.setState({columns:s})}},{key:"getColumns",value:function(){return this.state.columns}},{key:"getRow",value:function(t){for(var e=new Array(this.getWidth()),s=this.state.columns,n=0;n<s.length;n++)e[n]=s[n][t];return e}},{key:"setRow",value:function(t,e){for(var s=this.state.columns,n=0;n<e.length;n++)s[n][t]=e[n];this.setState({columns:s})}},{key:"getRows",value:function(){for(var t=new Array(this.getHeight()),e=0;e<this.getHeight();e++)t[e]=this.getRow(e);return t}},{key:"isResizeableX",value:function(){var t=this.props.resize;return!this.props.readonly&&("horizontal"===t||"both"===t||void 0===t)}},{key:"isResizeableY",value:function(){var t=this.props.resize;return!this.props.readonly&&("vertical"===t||"both"===t||void 0===t)}},{key:"setCell",value:function(t,e,s){this.truncate(e,s),this.setState({caret:t,x:e,y:s})}},{key:"moveCell",value:function(t,e){var s,n=this.state.x;this.state.caret+t>(""+this.getCellValue(n,this.state.y)).length?(n++,s=0):this.state.caret+t<0?(n--,s=(""+this.getCellValue(n,this.state.y)).length):s=this.state.caret+t;var i=this.state.y+e;n<0||i<0||(!this.isResizeableX()&&n>=this.getWidth()&&(n=this.state.x),!this.isResizeableY()&&i>=this.getHeight()&&(i=this.state.y),this.truncate(n,i),n>=this.getWidth()&&this.isResizeableX()&&this.addColumn(),this.state.y+e>=this.getHeight()&&this.isResizeableY()&&this.addRow(),this.setState({caret:s,x:n,y:i}))}},{key:"addRow",value:function(){for(var t=this.state.columns,e=0;e<t.length;e++)t[e].push("");this.setState({height:this.getHeight()+1,columns:t})}},{key:"addColumn",value:function(){for(var t=this.state.columns,e=new Array(this.getHeight()),s=0;s<e.length;s++)e[s]="";t.push(e),this.setState({width:this.state.width+1,columns:t})}},{key:"isRowEmpty",value:function(t){for(var e=0;e<this.state.columns.length;e++){var s=this.state.columns[e];if((""+s[s.length-1]).length>0)return!1}return!0}},{key:"isColumnEmpty",value:function(t){for(var e=this.state.columns[t],s=0;s<e.length;s++)if((""+e[s]).length>0)return!1;return!0}},{key:"removeRow",value:function(t){for(var e=0;e<this.state.columns.length;e++)this.state.columns[e].splice(t,1);this.setState({columns:this.state.columns})}},{key:"removeColumn",value:function(t){this.state.columns.splice(t,1),this.setState({columns:this.state.columns})}},{key:"truncate",value:function(t,e){for(var s=this.getWidth()-1;s>t;s--)this.isColumnEmpty(s)&&this.isResizeableX()&&this.removeColumn(s);for(var n=this.getHeight()-1;n>e;n--)this.isRowEmpty(n)&&this.isResizeableY()&&this.removeRow(n)}},{key:"render",value:function(){var t=this.state.x*this.getHeight()+this.state.y,e=0;this.state.columns=this.props.columns;var s=this.state.columns.map((function(s,n){var i=s.map((function(s,i){var l=e===t,r=Object(d.jsx)(j,{value:s,matrix:this,x:n,y:i,active:l,readonly:this.props.readonly},n+"-"+i);return e++,r}),this);return Object(d.jsx)("div",{style:{float:"left",padding:"2px"},children:i},n)}),this);return Object(d.jsx)("div",{style:this.style,children:Object(d.jsxs)("table",{children:[Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"Action"}),Object(d.jsx)("th",{children:"Player B"})]}),Object(d.jsxs)("tr",{children:[Object(d.jsx)("th",{children:"Player A"}),Object(d.jsx)("td",{children:Object(d.jsx)("div",{style:this.contentStyle,children:s})})]})]})})}}]),s}(i.a.Component);var v=function(){var t=Object(n.useState)("------"),e=Object(a.a)(t,2),s=e[0],i=e[1],l=Object(n.useRef)(null),r=Object(n.useRef)(null),c=Object(n.useRef)(null),o=Object(n.useRef)(null),u=Object(n.useState)([[]]),h=Object(a.a)(u,2),j=h[0],v=h[1],p=Object(n.useState)([[]]),f=Object(a.a)(p,2),g=f[0],m=f[1],x=Object(n.useState)("------"),y=Object(a.a)(x,2),O=y[0],C=y[1],k=Object(n.useRef)(null),R=Object(n.useRef)(null);return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("h1",{children:"Part 1"}),Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{className:"row",children:[Object(d.jsxs)("div",{className:"column",children:[Object(d.jsx)("h1",{children:"RewardA"}),Object(d.jsx)(b,{ref:l,columns:[[2,0],[1,1]],resize:"none"})]}),Object(d.jsxs)("div",{className:"column",children:[Object(d.jsx)("h1",{children:"RewardB"}),Object(d.jsx)(b,{ref:r,columns:[[1,0],[0,2]],resize:"none"})]})]}),Object(d.jsx)("button",{onClick:function(){if(null!==l.current&&null!==r.current){var t=l.current,e=r.current,s=t.getCellValue(0,0)+","+t.getCellValue(1,0)+";"+t.getCellValue(0,1)+","+t.getCellValue(1,1);s+="#",s+=e.getCellValue(0,0)+","+e.getCellValue(1,0)+";"+e.getCellValue(0,1)+","+e.getCellValue(1,1),fetch("http://localhost:8082/api/part1",{method:"POST",body:s}).then((function(t){return t.text()})).then((function(t){i(t)}))}},children:"Check"}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)("div",{children:"Result:"}),Object(d.jsx)("div",{dangerouslySetInnerHTML:{__html:s}})]}),Object(d.jsx)("h1",{children:"Part 2"}),Object(d.jsxs)("div",{children:[Object(d.jsxs)("label",{children:["Number of A's actions:",Object(d.jsx)("input",{ref:c,style:{margin:"10px"},type:"text"})]}),Object(d.jsx)("br",{}),Object(d.jsxs)("label",{children:["Number of B's actions:",Object(d.jsx)("input",{ref:o,style:{margin:"10px"},type:"text"})]}),Object(d.jsx)("br",{}),Object(d.jsx)("button",{onClick:function(){var t=o.current.value,e=c.current.value;if(""!==t&&""!==e&&!(t<1||e<1)){for(var s=[],n=0;n<t;n++){s.push([]);for(var i=0;i<e;i++)s[n].push(1)}var l=s.map((function(t){return t.slice()}));v(s),m(l)}},style:{margin:"10px"},children:"Create"})]}),Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{className:"row",children:[Object(d.jsxs)("div",{className:"column",children:[Object(d.jsx)("h1",{children:"RewardA"}),Object(d.jsx)(b,{ref:k,columns:j,resize:"none"})]}),Object(d.jsxs)("div",{className:"column",children:[Object(d.jsx)("h1",{children:"RewardB"}),Object(d.jsx)(b,{ref:R,columns:g,resize:"none"})]})]}),Object(d.jsx)("button",{onClick:function(){if(null!==k.current&&null!==R.current){var t,e,s=k.current,n=R.current,i=s.getHeight(),l=s.getWidth(),r="",a="";for(e=0;e<i;e++){for(t=0;t<l-1;t++)r+=s.getCellValue(t,e),r+=",",a+=n.getCellValue(t,e),a+=",";r+=s.getCellValue(l-1,e),r+=";",a+=n.getCellValue(l-1,e),a+=";"}var c=r.substring(0,r.length-1)+"#"+a.substring(0,r.length-1);fetch("http://localhost:8082/api/part2",{method:"POST",body:c}).then((function(t){return t.text()})).then((function(t){C(t)}))}},children:"Check"}),Object(d.jsx)("br",{}),Object(d.jsx)("br",{}),Object(d.jsx)("div",{children:"Result:"}),Object(d.jsx)("div",{dangerouslySetInnerHTML:{__html:O}})]})]})},p=function(t){t&&t instanceof Function&&s.e(3).then(s.bind(null,17)).then((function(e){var s=e.getCLS,n=e.getFID,i=e.getFCP,l=e.getLCP,r=e.getTTFB;s(t),n(t),i(t),l(t),r(t)}))};r.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(v,{})}),document.getElementById("root")),p()}},[[16,1,2]]]);
//# sourceMappingURL=main.a935a155.chunk.js.map