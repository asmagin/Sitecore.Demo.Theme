window.console||(console={},console.log=function(){}),function(t){t(function(){t(".code").each(function(){var e=document.createTextNode(t.trim(t(this)[0].innerHTML));t(this).html(e);var a=ace.edit(t(this).attr("id"));a.setFontSize(13),a.getSession().setMode("ace/mode/html")})})}(jQuery),function(t){t(function(){t(".owl-carousel").each(function(){var e="undefined"!=typeof t(this).attr("data-options")?t.parseJSON(t(this).attr("data-options")):{};e.navigationText=['<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>','<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'],t(this).owlCarousel(e)})})}(jQuery),function(t){t(function(){t(".counter").each(function(){var e=t(this).data("to"),a=e/(t(this).data("speed")/100),s=this,i=setInterval(function(){var n=Math.ceil(parseInt(t(s).html())+a);t(s).html(n),n>=e&&(t(s).html(e),clearInterval(i))},100)})})}(jQuery),function(t){t(function(){t('input[type="file"]').on("change",function(e){var a=t(this).val().split("\\")[t(this).val().split("\\").length-1];t('label[for="'+t(this).attr("id")+'"]').html(a).addClass("active")})})}(jQuery),function(t){t(function(){t(".grid-filter").each(function(){var e=t(t(this).attr("data-grid-filter")),a=t(this).find("[data-group]");e.shuffle({itemSelector:"[data-groups]"}),e.get(0).addEventListener(Shuffle.EventType.LAYOUT,function(){t(this).find("img").imagesLoaded().always(function(t){console.log("loading image!"),e.shuffle("update")}).done(function(){e.shuffle("update"),console.log("done loading"),setTimeout(function(){e.shuffle("update")},1e3)})}),t(this).find("img").imagesLoaded().always(function(t){console.log("loading image!"),e.shuffle("update")}).done(function(){e.shuffle("update"),console.log("done loading"),setTimeout(function(){e.shuffle("update")},1e3)}),a.on("click",function(s){a.removeClass("active"),t(this).addClass("active"),e.shuffle("shuffle",t(this).attr("data-group"))}),t(this).find(".grid-filter-sort").on("change",function(){var a=t(this).data("reverse")||!1,s=this.value,i={reverse:!a,by:function(t){return t.attr("data-"+s)}};e.shuffle("sort",i)}),t(this).find(".grid-filter-search").on("keyup change",function(t){var a=this.value.toLowerCase();e.shuffle("shuffle",function(t,e){return t.attr("data-search-term").toLowerCase().indexOf(a)!==-1})})})}),t(".row-col-eq").colequalizer()}(jQuery),function(t){t(function(){t(document).delegate('*[data-toggle="lightbox"]',"click",function(e){e.preventDefault(),t(this).ekkoLightbox()})})}(jQuery),function(t){t(function(){t('[data-toggle="tooltip"]').tooltip()})}(jQuery),function(t){t(function(){t("[data-toggle-class]").on("click keypress",function(e){switch(e.preventDefault(),t(this).data("toggle-class")){case"is-searching":t("#siteNavbar").collapse("hide")}t(t(this).attr("data-target")).toggleClass(t(this).attr("data-toggle-class")),t(this).parent().find("input").focus()})})}(jQuery),function(t){t(function(){t(".sidebar.sidebar-dynamic ul li a").on("click",function(e){e.preventDefault(),t(this).parent().toggleClass("open")}),t("body").on("click",'[data-toggle="sidebar"]',function(e){e.preventDefault(),console.log(this),t("html").toggleClass("show-sidebar-left","left"==t(this).attr("data-side")&&!t("html").hasClass("show-sidebar-left")),t("html").toggleClass("show-sidebar-right","right"==t(this).attr("data-side")&&!t("html").hasClass("show-sidebar-right")),t(".sidebar-closed, .sidebar-opened").toggle()}),t("html").hasClass("show-sidebar-left")||t("html").hasClass("show-sidebar-left")?t(".sidebar-closed").hide()&&t(".sidebar-opened").show():t(".sidebar-closed").show()&&t(".sidebar-opened").hide()})}(jQuery),function(t){t(function(){t('[href="styles/white-wonder.css"]').attr("data-themetype","main"),t('[href="styles/dayfrost.css"]').attr("data-themetype","main"),t('[href="styles/niteflight.css"]').attr("data-themetype","main"),t('[data-toggle="theme"]').on("click",function(){t('[data-themetype="'+t(this).attr("data-themetype")+'"]').attr("disabled","disabled"),t('[href="styles/'+t(this).attr("data-theme")+'.css"]').removeAttr("disabled")})})}(jQuery),function(t){t(function(){t('[data-toggle="popover"]').popover()})}(jQuery),function(t){t(function(){var e,a=t(t.parseHTML('<span id="mq-detector"><span class="visible-xs"></span><span class="visible-sm"></span><span class="visible-md"></span><span class="visible-lg"></span></span>'));a.css("visibility","hidden"),t("body").append(a),a.children().each(function(){t(this).is(":visible")&&(e=t(this).attr("class").substring(t(this).attr("class").length-2))})})}(jQuery);