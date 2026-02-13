
import './mainLayout.css'
const mainLayout = () => {
  return (
    
    <div className='container1'>
       
             {/*footer chatbot*/}
            <div className='chat-footer'>
                <p className='ask'>Ask me</p>
              <form action="#"className='chat-form'>
                <input type='text' placeholder='Message...' className='message-input'required/>
               <button className="material-symbols-rounded">arrow_upward_alt</button>
              </form>
            </div>
    </div>
  );
        
}

export default mainLayout