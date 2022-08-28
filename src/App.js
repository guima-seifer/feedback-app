import Header from './components/Header'
import FeedbackData from './data/FeedbackData'
import { useState } from 'react'
import FeedbackList from './components/FeedbackList'

function App() {
    const [feedback, setFeedback] = useState(FeedbackData)
    const deleteFeedback = (id) => {

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