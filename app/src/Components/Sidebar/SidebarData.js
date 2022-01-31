import React, {useState} from 'react'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

export const SidebarData= [
    {
        title: 'Ships',
        path: '/',
        icon: <AiIcons.AiFillProject/>,
        cName: 'nav-text'
    },
    {
        title: 'Crew Members',
        path: '/crew',
        icon: <AiIcons.AiOutlineTeam/>,
        cName: 'nav-text'
    }
]
