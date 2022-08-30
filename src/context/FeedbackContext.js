import { createContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([
/* No need for dummy data. Fetched from jsonserver api
     {
      id: 1,
      text: 'This is item nº1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This is item nº2',
      rating: 5,
    },
    {
      id: 3,
      text: 'This is item nº3',
      rating: 3,
    }, */
  ])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
   }, [])

   //fetch feedback
   const fetchFeedback = async () => {
    const res = await fetch('http://localhost:5000/feedback?_sort=id&_order=desc')
    const data = await res.json()
    setFeedback(data)
    setIsLoading(false)
  }


  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      //devolve array sem o id passado
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  //update feedback item
  const updateFeedback = (id, updateItem) => {
    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...updateItem } : item
      )
    )
  }

  //set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        //feedback: feedback
        feedback,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
        feedbackEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
