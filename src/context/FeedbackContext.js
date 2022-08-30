import { createContext, useEffect, useState } from 'react'

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
    const res = await fetch('/feedback?_sort=id&_order=desc')
    const data = await res.json()
    setFeedback(data)
    setIsLoading(false)
  }


  const addFeedback = async  (newFeedback) => {
    const res = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await res.json()
    setFeedback([data, ...feedback])
  }

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, {method: 'DELETE'})
      //devolve array sem o id passado
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  //update feedback item
  const updateFeedback = async (id, updatedItem) => {
    const res = fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })

    const data = await res.json()

    setFeedback(
      feedback.map((item) =>
        item.id === id ? { ...item, ...data } : item
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
