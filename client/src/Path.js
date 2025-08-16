import React from 'react'
import {Routes,Route} from 'react-router-dom'
import  routes from './routes/config'

function Path() {
  return (
    <Routes>
        {routes.map((item,index)=> (
            <Route 
                key={index} 
                path={item.path}    
                element ={item.component}
            />
         ))}
    </Routes>
  )
}

export default Path
