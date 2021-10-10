var firebaseConfig = {
      apiKey: "AIzaSyBdoNLqx-lz-ypvx3hIV9LXghjc2Z5O_KU",
      authDomain: "kwitter-730c3.firebaseapp.com",
      databaseURL: "https://kwitter-730c3-default-rtdb.firebaseio.com",
      projectId: "kwitter-730c3",
      storageBucket: "kwitter-730c3.appspot.com",
      messagingSenderId: "64880101662",
      appId: "1:64880101662:web:305882400e1766d1d0210f"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var user_name=localStorage.getItem("user_name");
    var room_name=localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name1=message_data['name'];
message=message_data['message'];
like=message_data['like'];

name_with_tag="<h4>"+name1+"<img class='user_tick' src='tick.png'></h4>";
message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"
span_with_tag= "<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span></button><hr>";

row = name_with_tag + message_with_tag +like_button + span_with_tag;
document.getElementById("output").innerHTML+=row;
//End code
      } });  }); }
getData();

function logout(){
      window.location="index.html";
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
}

function send(){
     var message1 =document.getElementById("msg").value;
     firebase.database().ref(room_name).push({
           name:user_name,
           message:message1,
           like:0
     });
     document.getElementById("msg").value="";
}

function updateLike(message_id){
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_Likes = Number(likes)+1;
      console.log(updated_Likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_Likes
      });

}