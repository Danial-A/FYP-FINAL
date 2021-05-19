import React from 'react'
import {Route,Redirect} from 'react-router-dom'

const PrivateRoute = ({component:Component ,LoggedIn, ...rest})=>{
    const logged = LoggedIn()
    console.log(logged)
    return(
        <Route
        {...rest}
        render = {(props)=>{
            if(logged){
                <Component {...props}/>
            }else{
                <Redirect to ={{
                    pathname:"/sign-in",
                    from: props.location
                }}/>
            }
        }}
    /> 
    )
    
}

export default PrivateRoute

