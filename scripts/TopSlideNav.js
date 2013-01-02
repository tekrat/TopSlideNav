/* 
** TopSlideNav **
JavaScript object to create a drop down navigation
Copyright (c) 2013 Ervin Kosch, released under the GPL 3 license
https://github.com/tekrat/TopSlideNav
*/
var TopSlideNav = {
	"imgpath":"/images/topslidenav/",
	"slidemessage":"Navigation",
	"iconsize":64,
	"links":[],
	"LinkObjectIcon": 0,
	"LinkObjectText": 0,
	"AddLinks":function(Icon, URL, Title){

		// Init
		if(TopSlideNav.LinkObjectIcon == 0){
			TopSlideNav.LinkObjectIcon = document.createElement('tr');
			TopSlideNav.LinkObjectText = document.createElement('tr');
		}

		// Render Icon
		var Holder = document.createElement('td');
		Holder.setAttribute("align", "center");
		Holder.setAttribute("valign", "bottom");
		Holder.setAttribute("width", TopSlideNav.iconsize);

		var Link = document.createElement('a');
		Link.setAttribute("href", URL);
		Link.setAttribute("style", "text-decoration: none;");

		var Image = document.createElement('img');
		Image.setAttribute("src", Icon);
		Image.setAttribute("alt", Title);
		Image.setAttribute("border", 0);
		Image.setAttribute("width", TopSlideNav.iconsize);
		Image.setAttribute("height", TopSlideNav.iconsize);

		Link.appendChild(Image);
		Holder.appendChild(Link);
		var Temp = TopSlideNav.LinkObjectIcon;
		Temp.appendChild(Holder);
		TopSlideNav.LinkObjectIcon = Temp;

		// Render Text Link
		var Holder = document.createElement('td');
		Holder.setAttribute("align", "center");
		Holder.setAttribute("valign", "top");
		Holder.setAttribute("width", TopSlideNav.iconsize);

		var Link = document.createElement('a');
		Link.setAttribute("href", URL);
		Link.setAttribute("style", "text-decoration: none;");
		Link.setAttribute("class", "TopSlideNavLink");
		Link.innerHTML = Title;

		Holder.appendChild(Link);
		var Temp = TopSlideNav.LinkObjectText;
		Temp.appendChild(Holder);
		TopSlideNav.LinkObjectText = Temp;

	},
	"Render": function(){
		// Assembly table
		var Table = document.createElement('table');
		Table.setAttribute("id", "TopSlideNavIcons");
		Table.appendChild(TopSlideNav.LinkObjectIcon);
		Table.appendChild(TopSlideNav.LinkObjectText);

		// Generate the click bar
		var ClickBox = document.createElement('div');
		ClickBox.setAttribute("align", "center"); 
		ClickBox.setAttribute("id", "TopSlideNavClick");

		var InnerBox = document.createElement('img');
		InnerBox.setAttribute("src", TopSlideNav.imgpath + "spacer.gif");
		InnerBox.setAttribute("align", "absmiddle");
		InnerBox.setAttribute("style", "margin: 2px;");
		ClickBox.appendChild(InnerBox);

		var InnerBox = document.createElement('span');
		InnerBox.innerHTML = TopSlideNav.slidemessage;
		ClickBox.appendChild(InnerBox);		

		var InnerBox = document.createElement('img');
		InnerBox.setAttribute("src", TopSlideNav.imgpath + "spacer.gif");
		InnerBox.setAttribute("align", "absmiddle");
		InnerBox.setAttribute("style", "margin: 2px;");
		ClickBox.appendChild(InnerBox);

		// Overall box
		var DIV = document.createElement('div');
		DIV.setAttribute("style", "position: absolute; z-index: 1000; left:0px; top:0px; width: 100%;");
		DIV.setAttribute("align", "left");
		DIV.setAttribute("id", "TopSlideNavTable");
		DIV.appendChild(Table);
		DIV.appendChild(ClickBox);

		document.getElementsByTagName('body')[0].appendChild(DIV);
		TopSlideNav.ResetWidth();

		if (window.addEventListener) {
			window.addEventListener('onresize', TopSlideNav.ResetWidth, false);
		}
		else if (window.attachEvent) {
			window.attachEvent('onresize', TopSlideNav.ResetWidth );
		}

		
	},

	"ResetWidth": function(){
		document.getElementById("TopSlideNavClick").setAttribute("onclick", "TopSlideNav.Show();");
		document.getElementById("TopSlideNavTable").setAttribute("onclick", "TopSlideNav.Show();");
		document.getElementById("TopSlideNavTable").style.width =
			window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth||0;
		document.getElementById("TopSlideNavTable").style.top = (document.getElementById("TopSlideNavIcons").offsetHeight * -1) + "px";

	},

	"Show": function(){
		try{
			var CurrentPOS = parseFloat( document.getElementById("TopSlideNavTable").style.top );
			if(CurrentPOS == 0){
				if (typeof jQuery == 'undefined') {
					document.getElementById("TopSlideNavTable").style.top = (document.getElementById("TopSlideNavIcons").offsetHeight * -1) + "px";
				}else{
					$('#TopSlideNavTable').stop().animate({"top": (document.getElementById("TopSlideNavIcons").offsetHeight * -1) });
				}
			}else{
				if (typeof jQuery == 'undefined') {
					document.getElementById("TopSlideNavTable").style.top = "0px";
				}else{
					$('#TopSlideNavTable').stop().animate({"top": 0});
				}
			}
		}catch(ex){}
	}



	

	
}
