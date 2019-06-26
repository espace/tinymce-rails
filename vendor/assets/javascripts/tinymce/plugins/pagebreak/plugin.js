/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.9 (2019-06-26)
 */
!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager"),n=tinymce.util.Tools.resolve("tinymce.Env"),a=function(e){return e.getParam("pagebreak_separator","\x3c!-- pagebreak --\x3e")},i=function(e){return e.getParam("pagebreak_split_block",!1)},t=function(){return"mce-pagebreak"},r=function(){return'<img src="'+n.transparentSrc+'" class="mce-pagebreak" data-mce-resize="false" data-mce-placeholder />'},o=function(o){var c=a(o),n=new RegExp(c.replace(/[\?\.\*\[\]\(\)\{\}\+\^\$\:]/g,function(e){return"\\"+e}),"gi");o.on("BeforeSetContent",function(e){e.content=e.content.replace(n,r())}),o.on("PreInit",function(){o.serializer.addNodeFilter("img",function(e){for(var n,a,t=e.length;t--;)if((a=(n=e[t]).attr("class"))&&-1!==a.indexOf("mce-pagebreak")){var r=n.parent;if(o.schema.getBlockElements()[r.name]&&i(o)){r.type=3,r.value=c,r.raw=!0,n.remove();continue}n.type=3,n.value=c,n.raw=!0}})})},c=r,u=t,g=function(e){e.addCommand("mcePageBreak",function(){e.settings.pagebreak_split_block?e.insertContent("<p>"+c()+"</p>"):e.insertContent(c())})},m=function(n){n.on("ResolveName",function(e){"IMG"===e.target.nodeName&&n.dom.hasClass(e.target,u())&&(e.name="pagebreak")})},s=function(e){e.ui.registry.addButton("pagebreak",{icon:"page-break",tooltip:"Page break",onAction:function(){return e.execCommand("mcePageBreak")}}),e.ui.registry.addMenuItem("pagebreak",{text:"Page break",icon:"page-break",onAction:function(){return e.execCommand("mcePageBreak")}})};!function l(){e.add("pagebreak",function(e){g(e),s(e),o(e),m(e)})}()}();