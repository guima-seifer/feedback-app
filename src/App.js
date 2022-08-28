function App() {
    const title = 'Feedback app'
    const body = ''
    const comments = [
        {id: 1, text: 'Comment one'},
        {id: 2, text: 'Comment two'},
        {id: 3, text: 'Comment three'},
        ]

    //wrap with a div, because only one element can be returned
    return (
        <div className='container'>
        <h1>{title.toUpperCase()}</h1>
        <p>{body}</p>

        <div className='comments'>
        <h3>Comments ({comments.length})</h3>
        <ul>
            {comments.map((comment, index) => (
                <li key={index}>{comment.text}</li>
            ))}
        </ul>
        <p></p>

        </div>

        </div>
    )
}
export default App