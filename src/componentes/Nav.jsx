import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <div>
      <div className=" navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
  <h1 className='font-bold font-sans text-3xl'>R.k </h1>
  </div>
  <div className="navbar-end py-10">
    <ul>
        <li><button className="btn btn-soft btn-accent"><Link to='/form'>create Id Card</Link></button></li>
    </ul>
  </div>
</div>
    </div>
  );
}

export default Nav;
