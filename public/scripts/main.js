import ChatMessage from "./components/TheMessageComponent.js"

(() => {
        console.log('fired');

        // load the socket library and make a connection
        const socket = io();

        //messenger services event handling -> incoming from the manager
        function setUserId({sID, message}) {
                //incoming connected event with data
                //debugger;
                vm.socketID = sID;
         }

        function appendMessage(message) {
                //debugger;
                vm.messages.push(message);
        }
        function appendUsername(username) {
                //debugger;
                vm.username.push(username);
        }

        const vm = new Vue({
                data: {
                        messages: [],
                        nickname: "",
                        username: "",
                        socketID: "",
                        message: ""
                },

                created: function(){
                        console.log('its alive!');
                },

                methods: {
                        dispatchMessage() {
                                //debugger;
                                socket.emit('chatmessage', {content: this.message, name: this.username || ""});

                                this.message = "";
                        },
                        dispatchUsername() {
                                //debugger;
                                socket.emit('username', {content: this.username, name: this.username || ""});

                                this.username = "";
                        }
                },



                components: {
                        newmessage: ChatMessage
                }
        }).$mount("#app");

        socket.addEventListener("connected", setUserId);
        socket.addEventListener('message', appendMessage);
        socket.addEventListener('username', appendUsername);
})();