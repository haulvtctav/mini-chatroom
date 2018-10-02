$(() => {
    //make connection
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    //Emit message
    send_message.click(() => {
        socket.emit('new_message', {
            message: message.val()
        })
    })

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    })

    //Emit a username
    send_username.click(() => {
        emit_message();
    })

    emit_message = () => {
        socket.emit('change_username', {
            username: username.val()
        })
    }

    socket.on("change_username", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='notify'>" + data.username + " connected </p>")
    });

    //Emit typing
    message.bind("keypress", () => {
        setTimeout(() => {
            socket.emit('typing')
        }, 1000);
        socket.emit('untyping');
    })

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })

    socket.on('untyping', (data) => {
        feedback.html('');
    })
});