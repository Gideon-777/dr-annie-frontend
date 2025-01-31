import React from 'react';
import steps from './Steps.js'
import Chatbot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import botAvatar from './icon0.png'

const theme = {
  background: '#FFFFFF',
  fontFamily: 'sans-serif',
  /*headerBgColor: '#C779D0',*/
  headerBgColor: '#a8edff',
  headerFontColor: '#000000',
  headerFontSize: '18px',
  botBubbleColor: '#a8edff',
  botFontColor: '#000000',
  userBubbleColor: '#fff',
  userFontColor: '#000000',
};

const Chat = () => {
return (

   <ThemeProvider theme={theme}>

   <div>
        <p className='logo7 f1 white'>
        {"DR.ANNIE"}
        </p>
    </div>

    <div>
      <Chatbot className='chat' steps={steps} 
                  headerTitle="Discuter avec Dr.Annie"
                  placeholder="Ecrivez ici ..."
                  botAvatar={botAvatar}
                  customDelay="400"
                  width="700px"
                  /*floating="true"*/
                  enableMobileAutoFocus="true"

      />
    </div>
      </ThemeProvider>    

);
};

export default Chat;