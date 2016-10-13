
$(document).ready(function(){




$("#btnGetTV").click(function(){
				var html2 = '';
				var requestEpisodes = $('#usr').val();
				var resultElementEp = $('#resultDiv');
				var url2 = 'http://api.tvmaze.com/singlesearch/shows?q=' + requestEpisodes + '&embed=episodes';
			/*	var searcharray=requestEpisodes.split(',');
                var searchbynumbers=searcharray.splice(1,2);
				var searchbyname=searcharray.splice(0,1);
				console.log("search by number ",searchbynumbers.length);
				var url2=null;
                var showid=null;
				if(searchbynumbers.length>1 && searchbynumbers.length<3)
				{
                   var cacheurl='http://api.tvmaze.com/singlesearch/shows?q=' + searchbyname + '&embed=episodes';
				    $.ajax({
					url : cacheurl,
					method:'get',
					data: {},
					dataType : 'json',
					success : function(data){
                              showid=data.id;
							  console.log("showid is ",showid," season number "+searchbynumbers[0]+" episode number "+searchbynumbers[1]);
					          if(showid!=null)
				              {  var urlwithnumber= "http://api.tvmaze.com/shows/" + showid + "/episodebynumber?season=" + searchbynumbers[0] + '&number=' + searchbynumbers[1];
					              console.log(urlwithnumber);
								  getService(urlwithnumber);
					          }
						  }
					});
				    
			   }
                if(searchbynumbers.length==0)
				{
                   var url = 'http://api.tvmaze.com/singlesearch/shows?q=' + requestEpisodes + '&embed=episodes';
				   console.log("executed");
				   getService(url);
				} */
               var getvalue = requestEpisodes + "&embed=episodes";
              
					$.ajax({
					url : url2,
					method:'get',
					data: {},
					dataType : 'json',
					success : function(data){
                              var episodelist = data._embedded.episodes;
						//$('#resultDiv').html(data._embedded.episodes[0].name);
                        $.each(episodelist,function(i,item){


							html2 += 
							'<div class="jumbotron top-space">'+
							'<div class="row">'+
							'<div class="col-sm-4">' +
                                '<h3>'+ item.name + '</h3>' + '<br>'+
								'<img src ='+ item.image.original +'>'+ '<hr>' +	
							'</div>' +
							'<div class="col-sm-8">'+

								'<h4>Season: '  + item.season+ '</h4>' +
								'<h4>Episode number: ' + item.number + '</h4>' + 
								'<h4>Airdate: ' + item.airdate + '</h4>' + '<br>'+
								'<h4>Summary:</h4>' + item.summary + '<hr>'+
							'</div>' +



							'</div>' +
							'</div>' +
							'</div>';


							$('#resultDiv').html(html2);

								
						});

						

						}

				});
				

			});

});