
//object to store map data
//can be used in the future to store more map specific data
var iwmMapObj = [];
var iwmgeocharts = [];
var apiversion = iwmparam[0]['apiversion'];
//var apiversion = "1.1";


//We're loading version 42 of the API, latest version had bugs for text labels 
google.charts.load('42', {packages:['geochart']});
google.charts.setOnLoadCallback(iwmDrawVisualization);

//var options = {packages: ['geochart'], callback : iwmDrawVisualization};
//google.load('visualization', '1', options);


function iwmDrawVisualization(skipNotVisible) {

	if (typeof google.visualization != "undefined") {

	    var data = {};
	    var values = {};
	    var listener_actions = {};
	    var listener_custom = {};
	    var identifier = {};

		for (var key in iwmparam) {	

			var mapid = iwmparam[key]['id'];

			if(skipNotVisible && iwmMapObj[mapid] && !iwmMapObj[mapid].div.is(':visible')) {
				continue;
			}

			var keydiv = document.getElementById("map_canvas_"+mapid);
			if(iwmparam[key]['region'] && keydiv) {



				var usehtml = parseInt(iwmparam[key]['usehtml']);

				/* Disable HTML tooltips on iOS */
				/*if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
					usehtml = 0;
				}*/

				var iwmid = parseInt(iwmparam[key]['id']);
				var bgcolor = iwmparam[key]['bgcolor'];  
				var stroke = parseInt(iwmparam[key]['stroke']);
				var bordercolor = iwmparam[key]['bordercolor']; 
				var incolor = iwmparam[key]['incolor']; 
				var actcolor = iwmparam[key]['actcolor']; 
				var width = parseInt(iwmparam[key]['width']); 
				var height = parseInt(iwmparam[key]['height']);
				var ratio = (iwmparam[key]['aspratio'] === '1');
				var interactive = (iwmparam[key]['interactive'] === 'true');
				var toolt = iwmparam[key]['tooltip'];
				var region = iwmparam[key]['region']; 
				var resolution = iwmparam[key]['resolution']; 
				var markersize = parseInt(iwmparam[key]['markersize']); 
				var displaymode = iwmparam[key]['displaymode'];  
				var placestxt =  iwmparam[key]['placestxt']; 
				var projection = iwmparam[key]['projection']; 

				placestxt = placestxt.replace(/^\s+|\s+$/g,'');

				var action = iwmparam[key]['action']; 
				var customaction = iwmparam[key]['custom_action']; 

				identifier[mapid] = iwmid;
				listener_actions[mapid] = action;
				listener_custom[mapid] = customaction;

				var places = placestxt.split(";");
										
			   data[mapid] = new google.visualization.DataTable();
			   
			   	if(displaymode == "markers02" || displaymode == "text02") {

			   		 

				     data[mapid].addColumn('number', 'Lat');                                
				     data[mapid].addColumn('number', 'Long');
				 }
			   
			   
				data[mapid].addColumn('string', 'Country'); // Implicit domain label col.
				data[mapid].addColumn('number', 'Value'); // Implicit series 1 data col.
				data[mapid].addColumn({type:'string', role: 'tooltip', p:{html:true}}); // 
					
					var colorsmap = [];
					var colorsmapecho = "";		
					
				values[mapid] = {};
				dataindex = {};

					//places.length-1 to eliminate empty value at the end
				for (var i = 0; i < places.length-1; i++) {
					var entry = places[i].split(",");
					
					var ttitle = entry[1].replace(/&#59/g,";");
					ttitle = ttitle.replace(/&#44/g,",");
					var ttooltip = entry[2].replace(/&#59/g,";");
					ttooltip = ttooltip.replace(/&#44/g,",");

					/* Disable HTML content in tooltips on iOS */
					/*if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
						
						ttooltip = ittooltip.replace(/(<([^>]+)>)/ig,"");

					}*/

					var iwmcode = entry[0];
					iwmcode = iwmcode.replace(/^\s+|\s+$/g,'');

					//we create an index, to use after with the setSelection functions
					dataindex[iwmcode] = i;
					
					
					//If data != markers02
					if(displaymode != "markers02" && displaymode != "text02") {
					

						data[mapid].addRows([[{v:iwmcode,f:ttitle},i,ttooltip]]);
						var index = iwmcode;

						}

					else {

						var trim = entry[0].replace(/^\s+|\s+$/g,"");
						var latlon = trim.split(" ");
						var lat = parseFloat(latlon[0]);
						var lon = parseFloat(latlon[1]);
									
								
						//data[mapid].addRows([[lat,lon,ttitle,i,ttooltip]]);
						data[mapid].addRows([[lat,lon,ttitle,i,ttooltip]]);		
						
						var index = lat;


						//finally set dislay mode of markers02 to proper value
						//displaymode = "markers";
						
						}


					var colori = entry[4];
					
					values[mapid][index] = entry[3].replace(/&#59/g,";");
					values[mapid][index] = values[mapid][index].replace(/&#44/g,",");	
					
					colorsmapecho = colorsmapecho + "'"+colori+"',";
					colorsmap.push(colori);


					
					}
					
					
				defmaxvalue = 0;
				if ((places.length-2) > 0) {
				defmaxvalue = places.length-2;	
				}
				
				if(displaymode=="markers02"){
					displaymode="markers";
				}
				if(displaymode=="text02"){
					displaymode="text";
				}	 	 	

				var htmltooltip = false;
				if(usehtml==1) {
					htmltooltip = true;
				}

				var options = {
					projection: projection,
					backgroundColor: {fill:bgcolor,stroke:bordercolor ,strokeWidth:stroke },
					colorAxis:  {minValue: 0, maxValue: defmaxvalue,  colors: colorsmap},
					legend: 'none',	
					backgroundColor: {fill:bgcolor,stroke:bordercolor ,strokeWidth:stroke },		
					datalessRegionColor: incolor,
					displayMode: displaymode, 
					enableRegionInteractivity: interactive,
					resolution: resolution,
					sizeAxis: {minValue: 1, maxValue:1,minSize:markersize,  maxSize: markersize},
					region:region,
					keepAspectRatio: ratio,
					width:width,
					height:height,
					magnifyingGlass: {enable: true, zoomFactor: 5.0},
					tooltip: {trigger:toolt, isHtml: htmltooltip},
					domain: 'IN'		
					};

				console.log(options);

				var divid = "map_canvas_"+iwmid;  	

			    iwmgeocharts[mapid] = new google.visualization.GeoChart(document.getElementById(divid));
				
				
				if(action!="none") {

					 google.visualization.events.addListener(iwmgeocharts[mapid], 'select', (function(x) {

		             return function () {

		                var selection = iwmgeocharts[x].getSelection();

		                if (selection.length == 1) {
		                    var selectedRow = selection[0].row;
		                    var selectedRegion = data[x].getValue(selectedRow, 0);
		                    

		                    if(values[x][selectedRegion]!=""){

		                    	//console.log(values[x][selectedRegion]);
		                   
		                   		iwm_run_action(selectedRegion,values[x][selectedRegion],identifier[x],listener_actions[x],listener_custom[x]);
		                    
		                    }
		                }
		            }
		        })(mapid));

				}
				console.log(data[mapid]);
				iwmgeocharts[mapid].draw(data[mapid], options);

				
				google.visualization.events.addListener(iwmgeocharts[mapid], 'ready', function () {
					if (typeof iwm_callback == 'function') { 
					  iwm_callback(); 
					}
				 });


				//code to console log the image url data
				/* 
				google.visualization.events.addListener(geocharts[key], 'ready', function () {
					 var imgurl = geocharts[key].getImageURI();
			         console.log(imgurl);
			    });
				*/

				/* Code to create animation */
				/*
				google.visualization.events.addListener(iwmgeocharts[key], 'ready', function () {
					var time = 50;
					jQuery('#map_canvas_8 circle').each( function(){
					var circle = jQuery(this);
				    setTimeout( function(){ circle.fadeTo( "slow", 1 ); }, time);
				    time +=50;
					});
				 });
				*/





				//Create a new object for this map

				if(!iwmMapObj[mapid]) {

					iwmMapObj[mapid] = {
						div: jQuery('#'+divid),
						data: dataindex
					};

				} 

				iwmMapObj[mapid].lastWidth = iwmMapObj[mapid].div.parent().width();

				


			}
		}

	} else {
		console.log('API file not loaded yet');
	}
}


function iwm_run_action(selected,value,id,action,customaction) {

	//console.log('values for action:'+selected+';'+value+';'+id+';'+action+';'+customaction);

	if(action == 'i_map_action_open_url') {	
		document.location = value; 
	}
		
	if(action == 'i_map_action_alert') {
		
		alert(value); 
	}

	if(action == 'i_map_action_open_url_new') {
		
		window.open(value); 
	}

	if(action == 'i_map_action_content_below' || action == 'i_map_action_content_above' ) {
		document.getElementById('imap'+id+'message').innerHTML = value;

		//we check if there's a dropdown so we set selection to be the same as region clicked
		var dropdown = document.getElementById('imap-dropdown-'+id);
		if(dropdown) {
			document.getElementById('imap'+id+'-'+selected).selected=true;
		}

	}

	if(action == 'i_map_action_content_below_scroll' || action == 'i_map_action_content_above_scroll' ) {
		document.getElementById('imap'+id+'message').innerHTML = value;

		jQuery("html, body").animate({scrollTop:jQuery("#imap"+id+"message").position().top}, "slow");

		//we check if there's a dropdown so we set selection to be the same as region clicked
		var dropdown = document.getElementById('imap-dropdown-'+id);
		if(dropdown) {
			document.getElementById('imap'+id+'-'+selected).selected=true;
		}

	}

	if(action == 'i_map_action_colorbox_content') {

		jQuery.colorbox({html:value});

	}


	if(action == 'i_map_action_colorbox_iframe') {

		jQuery.colorbox({open:true,href:value,iframe:true, width:"80%", height:"80%"});

	}

	if(action == 'i_map_action_colorbox_image') {

		jQuery.colorbox({open:true,href:value,photo:true});

	}

	if(action == 'i_map_action_colorbox_inline') {

		var inline = jQuery(value);
		jQuery.colorbox({inline:true, href:inline});

	}

	if(action == 'i_map_action_custom') {

		var name = "iwm_custom_action_"+id;
		window[name](value);
	}
}


// Functions to set selection and remove selection. 
// Can be used by externel elements to trigger the selection


function iwm_setSelection(code, map) {

		map = map || false;

		if(map) {

			//console.log(iwmMapObj[map]);

			var index = iwmMapObj[map].data[code];
		    iwmgeocharts[map].setSelection([{row: index, column: null}]);

		}

		
	    
}

function iwm_clearSelection(map) {
		map = map || false;
		if(map) {

			 iwmgeocharts[map].setSelection(null); 

		}     
}

function iwm_select(code,map) {

		map = map || '0';
		var index = iwmMapObj[map].data[code];
		iwmgeocharts[map].setSelection([{row: index, column: null}]);
		google.visualization.events.trigger(iwmgeocharts[map], 'select', {}); 

}


/*
jQuery(document).ajaxSuccess(function($) {

	iwmDrawVisualization(); 
		
}); */
