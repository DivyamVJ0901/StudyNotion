import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router-dom';

const SidebarLink = ({link , iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation(); // Yaha useLocation() hook ki need padti hai acitve color ke liye ki kis link ka color yellow karna hai or kiska nahi
    
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    } 

    return ( 
        <NavLink
            to = {link.path}
            // onClick={}
            className = {`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-300"}`}
        >   
            <span className={`absolute left-0 top-0 h-[100%] w-[0.15rem] bg-yellow-50 
            ${matchRoute(link.path) ? "opacity-100" : "opacity-0" }`}>
            </span>
                <div className='flex items-center gap-x-2'>
                    <Icon className="text-lg"/>
                    <span>{link.name}</span>
                </div>
        </NavLink>
    )  
}

export default SidebarLink
