var name1 = localStorage.getItem("user_name");
document.getElementById("user_name").innerHTML = "Welcome " + name1 +" !";

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

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
 room_name = childKey;
      //Start code
            console.log("room name: "+room_name);
            row="<div class='room_name' id="+room_name+" onclick='redirectToRoomName(this.id)' >#"+room_name + "</div><hr>";
            document.getElementById("output").innerHTML += row;
            
      //End code
      });});}

      
getData();

function logout(){
      window.location="index.html";
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
}    


function addroom(){
      var room_name=document.getElementById("room_name").value;
      localStorage.setItem("room_name", room_name);
      firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
      });
      window.location="kwitter_page.html";
      document.getElementById("room_name").value="";
}

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location="kwitter_page.html";      
}