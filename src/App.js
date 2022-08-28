import Header from './components/Header'
import FeedbackData from './data/FeedbackData'
import { useState } from 'react'
import FeedbackList from './components/FeedbackList'

function App() {
    const [feedback, setFeedback] = useState(FeedbackData)
    const deleteFeedback = (id) => {
        if(window.confirm('Are you sure you want to delete?')){
            //devolve array sem o id passado
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }
    
    //wrap with a div, because only one element can be returned
    return (
        <>
        <Header />
        <div className='container'>
        <FeedbackList feedback={feedback} handleDelete={deleteFeedback}/>
        </div>
        </>
    )
} 
export default App