$("#slideshow > div:gt(0)").hide();


setInterval(function() { 
  $('#slideshow > div:first')
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo('#slideshow');
},  3000);



//gor google maps on about page
function initMap() {
// accessed map and set the location
 var mapDiv = document.getElementById('map');
 var map = new google.maps.Map(mapDiv, {
      center: {lat:49.407063, lng:8.629881},
      zoom: 16
    });

// additional features to map
var marker=new google.maps.Marker({
    position:{lat:49.407063, lng:8.629881},
    animation: google.maps.Animation.BOUNCE
})
   marker.setMap(map);
var infowindow = new google.maps.InfoWindow({
                 content:"My Current Position"
            });
    infowindow.open(map,marker);
}
//Devlopers button on about page
$(document).ready(function(){

 //Accessed logedIn users profile and show in upper right corner...................................
           //for consistancy after refresh check if user is logged in and if yes then keep his name "displayed" and loginButton "undisplayed"
           var userprofile=localStorage.getItem('username');
           if(userprofile!=null){
                $(".loggedin_username").append(userprofile + '<b class="caret"></b>');
                $(".loggedin_username").after(`<ul class="dropdown-menu">
                                              <li><a href="" id="logoutbtn">logout</a></li>
			          			                      </ul>`);
           }                            
           if(localStorage.getItem('alreadyloggedin')=='true')
           {
             $('#loginsignupbtn').css({'display':'none'});
           }

            $("#developer").click(function(){
                                  $("#github").toggle(500);
                                });
//login form made visible onclick of login button on navigation bar
$('#loginsignupbtn').click(function()
  {
         $('#backdrop-login').css('display','block');
         $('#backdrop-login').addClass('backdropvisible');
  })  
//on click of "Register" link on login form->1.signup form added, and 2.login form removed
$('#signup').click(function()
 {
        $('#backdrop-login').css('display','none');
        $('#backdrop-signup').css('display','block');
        $('#backdrop-signup').addClass('backdropvisible');
        $('#backdrop-login').removeClass('backdropvisible');
}) 
//on close(X) button of signupform 1.signupform removed, and 2.loginformadded
 $('#signupclose').click(function()
 {
        $('#backdrop-signup').css('display','none');
        $('#backdrop-signup').removeClass('backdropvisible');
        $('#backdrop-login').addClass('backdropvisible');
}) 
//on close(X) button of loginform 1.loginform removed
$('#loginclose').click(function()
{        $('#backdrop-login').css('display','none');
         $('#backdrop-login').removeClass('backdropvisible');
});
/**********************************************LOGIN/LOGOUT/SIGNUP************************************************************************************* */
 $("#logoutbtn").click(function()
 {
   //on logout  login option made available back
   localStorage.clear();
   $("#loginsignupbtn").css({'display':'block'});
 })

 $('#loginform').submit(function(e)
 {
     e.preventDefault();
     if($('#emailfield').val()!='' &&  $('#passwordfield').val()!='')
        {
            alert("login Button clicked"); 
            $.ajax({
                   url:"/home/login",
                   type:'POST',
                   dataType:'JSON',
                   data: JSON.stringify({  email:    $('#emailfield').val(),
                                           password: $('#passwordfield').val()
                                        }),
                   contentType:'application/json',     
                   complete:function(){
                            console.log("Completed.....")
                   },
                   success:function(data){
                            //localStorage.clear();
                            localStorage.setItem('token',data.obj);
                            localStorage.setItem('username',data.username);
                            localStorage.setItem('alreadyloggedin',true);
                           //Updated the login/logout feature
                               //removed login/logout button
                                $("#loginsignupbtn").css({'display':'none'});
                               //attached loggedin user name and logout feature
                                $(".loggedin_username").append(data.username + '<b class="caret"></b>');
                                $(".loggedin_username").after(`<ul class="dropdown-menu">
                                                                     <li><a href="" id="logoutbtn">logout</a></li>
				                                                           </ul>`);
                              //removed loginform after submit is clicked
                               $('#backdrop-login').css('display','none');
                               $('#backdrop-login').removeClass('backdropvisible');
                 },
                   error:function(jQxhr){
                               console.log("the the error has occured= ",jQxhr);
                       }
                    });
            }        
     });//login end.............................
     $('.signupbtn').click(function(e)
     {
           var username=$('#namefield').val();
           var surname= $('#surnamefield').val();
           var email=   $('#signupemailfield').val();
           var password=$('#signuppasswordfield').val();
           e.preventDefault();
           if(username!='' && surname!='' && email!='' && password!='')
           {
                 alert("Signup Button clicked"); 
                 console.log("signup data on client side ", $('#namefield').val(),$('#surnamefield').val(),$('#signupemailfield').val(),$('#signuppasswordfield').val());
                 $.ajax({
                     url:'/home/signup',
                     type:"POST",
                     dataType:'JSON',
                     data: JSON.stringify({   username:    username,
                                              surname:     surname,
                                              email:       email,
                                              password:    password
                                           }),
                     contentType:'application/json',     
                     complete:function(){
                              console.log("Completed.....");
                               },
                     success:function(data){
                                 
                                      console.log(data.obj);
                                      $('#backdrop-signup').css('display','none');
                                      $('#backdrop-signup').removeClass('backdropvisible');
                             
                              },
                     error:function(jQxhr){
                             console.log("the  error has occured= ",jQxhr);
                     }                      
                
                 });
           }
     });  
 /********************************************RESTRICTED FEATURES******************************************************************** */
    //for new "releases"
    $("#newreleases").click(function(e) 
    {
         e.preventDefault();     
         alert("clicked newreleases");
          var token1=localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
         console.log("token is ",token1);
         
         $.ajax({
                type:"GET",
                url:"/newreleases"+token1,
                success:function()
                {
                 window.location.href = '/newreleases'+token1;
                },
                error:function()
                {

                }
         });
    });
    //for "show list"
    $("#tvserieslist").click(function(e) 
    {
         e.preventDefault();
         alert("clicked tvserieslist");
         var token2=localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
         console.log("token is ",token2);
              
         $.ajax({
                type:"get",
                url:`/showlist${token2}`,
                 success:function()
                {
                  window.location.href = '/showlist'+token2;
                },
                error:function()
                {

                }
         });
    });
    //for "All episodes"
   
    $("#episodelist").click(function(e) 
    {
         e.preventDefault();
         alert("clicked episodelist");
         var token3=localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
         console.log("token is ",token3);
              
         $.ajax({
                type:"get",
                url:`/episodelist${token3}`,
                 success:function()
                {
                  window.location.href = '/episodelist'+token3;
                },
                error:function()
                {

                }
         });
    });
    
     
});


 
