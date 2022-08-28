import React from 'react'
import Card from '../components/shared/Card'
import {Link} from 'react-router-dom'

function AboutPage() {
  return <Card>
    <div className='about'>
    <p>From React Front to Back 2022</p>

    <p>
        <Link to="/">Back Home</Link>
    </p>
    </div>
  </Card>
}

export default AboutPage