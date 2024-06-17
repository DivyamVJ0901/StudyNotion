import React from 'react'
import {sidebarLinks} from "../../../data/dashboard-links"
import {logout} from "../../../services/operations/authAPI"
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../common/ConfirmationModal'

export default function Sidebar() {

    const {user , loading:profileLoading} = useSelector((state) => state.profile)
    const {loading:authLoading} = useSelector((state) => state.auth)

    const [confirmationModal , setConfirmationModal] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(profileLoading || authLoading)
    {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }

    return (
        <div className='text-richblack-500'>
            <div className='flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10'>
                <div className='flex flex-col px-6'>
                    {
                        sidebarLinks.map((link) => {
                            if(link.type && user?.accountType !== link.type)
                                return null;
                            return (
                                <SidebarLink link={link} iconName={link.icon} key={link.id}/>
                            )
                        })}
                </div>

                    {/* This is the horizontal line */}
                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
            
                <div className='flex flex-col px-6'>
                    <SidebarLink
                    link={{name:"Settings" , path:"/dashboard/settings"}}
                    iconName = "VscSettingsGear"
                    />

                    <button
                    onClick={() => {
                            setConfirmationModal({
                                text1: "Are you sure ?",
                                text2: "You will be logged out of your account.",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: () => dispatch(logout(navigate)),
                                btn2Handler: () => setConfirmationModal(null),
                            });
                            console.log("Confirmation Modal State:", confirmationModal);
                        }}
                        className='text-sm font-medium text-richblack-300 px-8 py-2'
                    >
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>  

                    </button>


                </div>       
            
            </div>

            {/* Null wale case me confirmationalModal render hi nahi hoga aur jab null nahi hoga us time render hoga to confirmationalModal render ho jaayega and it will be visible */}
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
    )
}