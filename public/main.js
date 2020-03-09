const socket = io();
const {name, room } = $.deparam(window.location.search);

socket.on("connect", ()=>{
    console.log("connected to server successfully!")
    socket.emit ("newUser", {
        name,room
    })
})

socket.on("disconnect", ()=>{
    console.log("Disconnected to server!")
})

// socket.on("sendEmail", msg =>{
//     console.log(msg);
//     socket.emit("replyEmail", {
//         to: "Hi admin",
//         content: "tttttttttttttt"
//     })
// })

socket.on("msgFromServer", msg=>{
    // console.log('nnn',msg);
    // const liTag = $('<li>'+msg.content+'</li>')
    const olTag = $("#messages");
    // olTag.append(liTag);

    const template = $("#message-template").html();
    const html = Mustache.render(template, {
        from: msg.from,
        content: msg.content,
        createdAt: msg.createdAt
    })

    olTag.append(html);
})

socket.on("locationFromServer", msg=>{
    // console.log(msg);
    // const liTag = $('<li></li>')
    // const aTag =   $(`<a href= "https://www.google.com/maps?q=${msg.lat},${msg.lng}" target="_blank">My Location</a>`)
    // liTag.append(aTag);
    // const olTag = $("#messages");
    // olTag.append(liTag);

    const olTag = $("#messages");
    // olTag.append(liTag);

    const template = $("#location-template").html();
    const html = Mustache.render(template, {
        from: msg.from,
        href: `https://www.google.com/maps?q=${msg.lat},${msg.lng}`,
        createdAt: msg.createdAt
    })

    olTag.append(html);
})

socket.on("newUser", msg=>{
    console.log(msg);
    const liTag = $('<li>'+msg.content+'</li>')
    const olTag = $("#messages");
    olTag.append(liTag);
})

socket.on("listOfUsers", msg=>{
    const users = msg.users;
    const divUsers = $("#user");

    const olTag = $("<ol></ol>");

    console.log(users);
    
    users.forEach(user=>{
        const liTag = $(`<li>${user.name}</li>`)
        olTag.append(liTag);
    })

    divUsers.html(olTag);
})

socket.on("wellcome", msg=>{
    console.log(msg);
    const liTag = $('<li>'+msg.content+'</li>')
    const olTag = $("#messages");
    olTag.append(liTag);
})

//xu ly form
$('#message-form').on('submit', (e)=>{
    e.preventDefault();

    
    socket.emit('msgFromClient', {
        from: name,
        content: $('[name=message]').val(),
        //createdAt: new Date()
    })

    $('[name=message]').val('');
    $('#messages').animate({
        scrollTop: $('#messages')[0].scrollHeight
    },100)
})




//Send location
$('#send-location').on('click', e=>{
    if(!navigator.geolocation){
        alert('The browser do not support!')
    }else{
        navigator.geolocation.getCurrentPosition(position=>{
            console.log(position);

            socket.emit('locationFromClient', {
                from: name,
                lat: position.coords.latitude,
                lng: position.coords.longitude
            })
        })
    }
})

// $(document).ready(function() { 
//     $("[name=message]").on('change',() =>{ 
//         $('#messages').scrollTop($('#messages').height()); 
//     }); 
// }); 