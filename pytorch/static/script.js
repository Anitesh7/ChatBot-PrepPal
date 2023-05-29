const text = document.querySelector(".typing-second");

    const textLoad = () => {
        setTimeout(() => {
            text.textContent = "Thanks for using me"
        }, 0 );
        setTimeout(() => {
            text.textContent = "Have a good day"
        }, 4000 );
        setTimeout(() => {
            text.textContent = "You are welcome"
        }, 8000 );
    }

    textLoad();
    setInterval(textLoad, 12000);


// var slider = document.getElementById("slider");
// var sliderWidth = slider.offsetWidth;


// window.addEventListener('load',windowLoad); 
// function windowLoad(){
//     document.documentElement.classList.add('loaded')
// }

// if (count < items){
    //     slideList.style.left = "-" + count * 730 + "px";
    //     count++;
    // }
    // else if(count = items){
    //     slideList.style.left = "0px"
    //     count = 1;
    // }

let slideIndex = 0;
// showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("group-member-page");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    // slides[i].style.transform = 'translateX(0%)';
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "flex";  
  setTimeout(showSlides, 2000); 
}

let listdownstate = false;
// let listActive= document.querySelector('.list-active');
let menuitemlist = document.querySelector('.menu-item-list ')

// listActive.addEventListener('click',togglelist);

// function togglelist() {
//     this.listdownstate = !this.listdownstate;
//     if(this.listdownstate) {
//         menuitemlist.style.display = "block"
//     }
//     else{
//         menuitemlist.style.display = "none"
//     }
// }

function loader(element) {
    element.textContent = '.';
    
    loadInterval = setInterval(() => {
        element.textContent += '.';

        if(element.textContent === '....'){
            element.textContent = '';
        }
    },300)
}

function typeText(element, text){
    let index = 0;
    let interval = setInterval(() => {
        if(index < text.length){
            element.innerHTML += text.charAt(index);
            index++;
        }
         else{
            clearInterval(interval);
        }
    },20)
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(value){
    console.log("at chatstripe " + value)
    return (
        `
            <div class="messages-item messages-item-visitor">
                <div class="message" >${value}</div>
            </div>
        
        `
    )
    
}

class Chatbot {
    constructor() {
        this.args = {
            openChat: document.querySelector('.btn'),
            closeChat: document.querySelector('.chat-cancel'),
            openHome: document.querySelector('.menu-home'),
            closeAbout: document.querySelector('.about-cancel'),
            chatBot: document.querySelector('.chatbot'),
            menuList: document.querySelector('.menu-list'),
            aboutButton: document.querySelector('.about-us'),
            aboutWindow: document.querySelector('.about-window'),
            menuChat: document.querySelector('.menu-chat'),
            sendButton: document.querySelector('.send-button'),
            contactInfo: document.querySelector('.contact-info'),
            contactUs: document.querySelector('.contact-us'),
            closeContactUs: document.querySelector('.contactus-cancel')
        }
        this.state = false;
        this.aboutstate = false;
        this.messages = [];
        this.count =1;
        this.contactinfostate = false;

    }
    display() {
        const {openChat, closeChat, openHome, chatBot,menuList,aboutButton,aboutWindow,closeAbout,menuChat,sendButton,contactInfo,contactUs,closeContactUs} = this.args;
        openChat.addEventListener('click', () =>{
            this.openState(chatBot);
            this.windowLoad(menuList);
        }); 
        // openChat.addEventListener('click', function(){
        //     chatBot.style.display = 'flex';
        //     chatBot.style.transform = 'translateY(0%)';
        //     chatBot.style.opacity = '1';
        //   });
        
        // closeChat.addEventListener('click', function(){
        //     chatBot.style.display = 'none';
        //     chatBot.style.transform = 'translateY(67%)';
        //     chatBot.style.opacity = '0';
        //   });
        closeChat.addEventListener('click', () => {
            this.closeState(chatBot);
            this.windowUnload(menuList);
        });
        openHome.addEventListener('click',()=>{
            this.closeState(chatBot);
            this.windowUnload(menuList);
            this.closeAbout(aboutWindow);
            this.windowUnload(aboutWindow);
            this.closeContactus(contactInfo);
        });
        menuChat.addEventListener('click', () =>{
            this.closeContactus(contactInfo);
            this.closeAbout(aboutWindow);
            this.windowUnload(aboutWindow);
        }); 
        aboutButton.addEventListener('click',()=>{
            this.closeContactus(contactInfo);
            this.openAbout(aboutWindow);
            this.windowLoad(aboutWindow);
        })
        closeAbout.addEventListener('click',()=>{
            this.closeAbout(aboutWindow);
            this.windowUnload(aboutWindow);
        })
        contactUs.addEventListener('click', ()=> {
            this.closeAbout(aboutWindow);
            this.windowUnload(aboutWindow);
            this.openContactus(contactInfo);
        })
        closeContactUs.addEventListener('click',()=> {
            this.closeContactus(contactInfo)})

        sendButton.addEventListener('click', () => this.onSendButton(chatBot))

        const node = chatBot.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if(key === "Enter"){
            this.onSendButton(chatBot)
            }
        })

    }
    openContactus(window){
        this.contactinfostate = true;
        window.classList.add('about--active')
    }
    closeContactus(window){
        this.contactinfostate = false;
        window.classList.remove('about--active')
    }

    toggleState(chatbot) {
        this.state = !this.state;
        if(this.state) {
            chatbot.classList.add('chat--active')
        }
        else{
            chatbot.classList.remove('chat--active')
        }
    }
    openState(chatbot){
        this.aboutstate = true;
        chatbot.classList.add('chat--active')
    }
    closeState(chatbot){
        this.aboutstate = false;
        chatbot.classList.remove('chat--active')
    }

    windowLoad(menu){
        menu.classList.add('loaded')
    }
    windowUnload(menu){
        menu.classList.remove('loaded')
    }

    openAbout(window){
        this.aboutstate = true;
        window.classList.add('about--active')
    }
    closeAbout(window){
        this.aboutstate = false;
        window.classList.remove('about--active')
    }

    onSendButton(chatbot){
        var textField = chatbot.querySelector('input');
        let botmessage = '';
        let text1 = textField.value;
        if(text1 === "" ){
            return;
        }

        let msg1 = {name: "User", message: text1}
        this.messages.push(msg1);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            body: JSON.stringify({message: text1}),

            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(r => r.json())
        .then(r => {
            let msg2 = {name: "Bot", message: r.answer};
            // console.log(msg2)
            botmessage = r.answer;
            this.messages.push(msg2);
            this.updateText(chatbot, botmessage)

            textField.value = ''
        }).catch((error) => {
            console.error('Error: ',error);
            this.updateText(chatbot, botmessage)
            textField.value = ''
        });
    }

    updateText(chatbot, botmessage){
        var html = '';
        let uniqueId  = '';
        let msg = ''
        this.messages.slice().reverse().forEach(function(item,index, arr){
            if(item.name === "Bot"){
                uniqueId = generateUniqueId()
                msg = ''
                // console.log(arr.length, index)
                if (index == 0){ 
                    msg = ''
                }
                else{
                    msg = item.message
                }
                // html += '<div class="messages-item messages-item-visitor">' + item.message + '</div>'
                
                html += '<div class="messages-item messages-item-visitor" id ="' + uniqueId +'">' + msg + '</div>'
                // html += chatStripe(botmessage)
                return botmessage;
            }
            else{
                html += '<div class="messages-item messages-item-operator">' + item.message + '</div>'
            }
           
            
        });

        const chatmessage = chatbot.querySelector('.chatbox-messages');
        chatmessage.innerHTML = html;

        // const messageDiv = document.getElementById(uniqueId)
        const messageDiv = document.querySelector('.messages-item-visitor');
        const data = botmessage;
        const parsedData = data.trim()

        typeText(messageDiv, parsedData)
    }
}

const chatbot = new Chatbot();
chatbot.display();