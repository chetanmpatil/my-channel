
	$(document).ready(function(){
			
			$("#usr").focus(function()
			{
				   $(this).toggleClass('expand-searchbox');
			})
			
			$("#btnGetTV").click(function(){
             var html = '';
			 var requestData = $('#usr').val();
             var resultElement = $('#resultDiv');
            // var token=localStorage.getItem('token') ? localStorage.getItem('token'):'';
			// console.log("the url to send is= ",`http://api.tvmaze.com/search/shows?q=${requestData}&token=${token}`);
             $.ajax({
					url : 'http://api.tvmaze.com/search/shows?q='+requestData,
					method:'get',
					data:{},
					dataType : 'json',
					
					success : function(data){
                               if(data.message != null)
						       {
						       	alert(data.message);
						       }
                               $.each(data,function(i,item){

							          html +=	
							          '<div class="jumbotron top-space">' +
							          '<div class="row">'+
							          '<div class="col-sm-4">' +
                                           '<br>' + 
							          		'<h3><b>'+ item.show.name + '</b></h3>' + '<br>'+
							          		'<a href="' + item.show.url + '" target="_blank"><img src='+ item.show.image.medium +'></a>' + 
											'<hr>'+
							          '</div>'+
							          '<div class="col-sm-8">'+
							          	'<h4><b>'+ 'Genres: </b></h4>' + item.show.genres  + '<br>'+
							          	'<h4><b>Summary:</b></h4> '+ item.show.summary + '<br>' +
							          	'<h4><b>Rating:</b></h4>' + item.show.rating.average+'&nbsp;<i class="fa fa-star ratingstar" aria-hidden="true"></i>'+'<br>'+
							          	'<h4><b>Premiered on and Status:</b></h4>' + item.show.premiered +
							          			 ', '+ item.show.status + '<br>' +
							          	'<h4><b>Airs at</b></h4> ' + item.show.schedule.time +' on ' + item.show.schedule.days+ ' '+'<i class="fa fa-clock-o" aria-hidden="true"></i>'+
							          	'<br> <hr>' +
										'<p class="text-right"><a class="btn btn-primary btn-large" href="' + item.show.url + '" target="_blank">Detail Information »</a> </p>'+   
							          '</div>' +
							          '</div>' +
          
							          '</div>';
							          
						/*
							if(item.show.network.name !== "null")
							{	
					        html += '<h2>Network:</h2>' + item.show.network.name;
		                    	$('#resultDiv').html(html);


							}
							else
								{	
					        html += '<h2>Network:</h2>' + item.show.webChannel.name;
		                    	$('#resultDiv').html(html);


							}
							*/
							          $('#resultDiv').html(html);
							
                                   });
						}
					});
              });
});
