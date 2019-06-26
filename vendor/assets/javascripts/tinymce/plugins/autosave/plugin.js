/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.9 (2019-06-26)
 */
!function(r){"use strict";var o=function(t){var e=t,r=function(){return e};return{get:r,set:function(t){e=t},clone:function(){return o(r())}}},t=tinymce.util.Tools.resolve("tinymce.PluginManager"),n=tinymce.util.Tools.resolve("tinymce.util.Delay"),a=tinymce.util.Tools.resolve("tinymce.util.LocalStorage"),i=tinymce.util.Tools.resolve("tinymce.util.Tools"),u=function(t,e){var r=t||e,n=/^(\d+)([ms]?)$/.exec(""+r);return(n[2]?{s:1e3,m:6e4}[n[2]]:1)*parseInt(r,10)},s=function(t){var e=t.getParam("autosave_prefix","tinymce-autosave-{path}{query}{hash}-{id}-");return e=(e=(e=(e=e.replace(/\{path\}/g,r.document.location.pathname)).replace(/\{query\}/g,r.document.location.search)).replace(/\{hash\}/g,r.document.location.hash)).replace(/\{id\}/g,t.id)},c=function(t,e){var r=t.settings.forced_root_block;return""===(e=i.trim(void 0===e?t.getBody().innerHTML:e))||new RegExp("^<"+r+"[^>]*>((\xa0|&nbsp;|[ \t]|<br[^>]*>)+?|)</"+r+">|<br>$","i").test(e)},f=function(t){var e=parseInt(a.getItem(s(t)+"time"),10)||0;return!((new Date).getTime()-e>u(t.settings.autosave_retention,"20m"))||(l(t,!1),!1)},l=function(t,e){var r=s(t);a.removeItem(r+"draft"),a.removeItem(r+"time"),!1!==e&&t.fire("RemoveDraft")},m=function(t){var e=s(t);!c(t)&&t.isDirty()&&(a.setItem(e+"draft",t.getContent({format:"raw",no_events:!0})),a.setItem(e+"time",(new Date).getTime().toString()),t.fire("StoreDraft"))},v=function(t){var e=s(t);f(t)&&(t.setContent(a.getItem(e+"draft"),{format:"raw"}),t.fire("RestoreDraft"))},d=function(t,e){var r=u(t.settings.autosave_interval,"30s");e.get()||(n.setInterval(function(){t.removed||m(t)},r),e.set(!0))},g=function(t){t.undoManager.transact(function(){v(t),l(t)}),t.focus()};function y(n){for(var o=[],t=1;t<arguments.length;t++)o[t-1]=arguments[t];return function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=o.concat(t);return n.apply(null,r)}}var p=tinymce.util.Tools.resolve("tinymce.EditorManager"),D=function(r,t){return function(t){t.setDisabled(!f(r));var e=function(){return t.setDisabled(!f(r))};return r.on("StoreDraft RestoreDraft RemoveDraft",e),function(){return r.off("StoreDraft RestoreDraft RemoveDraft",e)}}};!function e(){t.add("autosave",function(t){var e,r,n=o(!1);return t.editorManager.on("BeforeUnload",function(t){var e;i.each(p.get(),function(t){t.plugins.autosave&&t.plugins.autosave.storeDraft(),!e&&t.isDirty()&&t.getParam("autosave_ask_before_unload",!0)&&(e=t.translate("You have unsaved changes are you sure you want to navigate away?"))}),e&&(t.preventDefault(),t.returnValue=e)}),d(e=t,n),e.ui.registry.addButton("restoredraft",{tooltip:"Restore last draft",icon:"restore-draft",onAction:function(){g(e)},onSetup:D(e)}),e.ui.registry.addMenuItem("restoredraft",{text:"Restore last draft",icon:"restore-draft",onAction:function(){g(e)},onSetup:D(e)}),t.on("init",function(){t.getParam("autosave_restore_when_empty",!1)&&t.dom.isEmpty(t.getBody())&&v(t)}),{hasDraft:y(f,r=t),storeDraft:y(m,r),restoreDraft:y(v,r),removeDraft:y(l,r),isEmpty:y(c,r)}})}()}(window);