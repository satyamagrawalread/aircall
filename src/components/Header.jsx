import React from 'react'
import '../styles/header.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    // const navigate = useNavigate();
  return (
    <div className='mainContainer'>
        <Link to='/' className="tab activityTab" >Activity</Link>
        <Link to='/archive' className="tab archivedTab">Archive</Link>
    </div>
  )
}
