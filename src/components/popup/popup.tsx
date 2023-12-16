'use client'
import React, { useState } from 'react'
import { Card } from './card'
import { User, XCircle } from 'react-feather'
import { Form } from './form';

interface People {
    username: string;
    email: string;
    imageUrl: string;
    lastSeen?: string; // Make it optional
    lastSeenDateTime?: string;
    id: number;
    password: string
}

export const Popup = ({ showPopup, people ,onPopupViewUser}: any) => {
    const [emailFilter, setEmailFilter] = useState("")
    const [forms, setForm] = useState(false)
    const closePopup = () => {
        showPopup()
    }
    const closeForm = () => {
        setForm(false)
    }

    return (



        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="pointer-events-auto  relative z-10 w-[22.75rem] rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-700 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
                {forms ? (
                    <div className='bg-white '>

                        <Form closeForm={closeForm} />
                    </div>
                ) : (


                    <div>
                        <div className="flex items-center px-3.5 py-2.5 text-slate-400">

                            <div className='flex p-0 m-0'>
                                <svg
                                    className="mr-0 mt-2 h-5 w-5 stroke-slate-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"

                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                </svg>

                                <input value={emailFilter} onChange={(e) => setEmailFilter(e.target.value)} className="flex items-center border-0 px-3.5 py-2.5 text-slate-400 text-xs bg-slate-50" placeholder='Enter Email...' />

                                <XCircle className='ml-12 pt-1.5' onClick={closePopup} />
                            </div>

                        </div>
                        <div className="border-t border-slate-400/20 px-3.5 py-3">

                            <div className="mb-1.5 text-[0.6875rem] font-semibold text-slate-500">
                                Recent searches
                            </div>
                            <div className="flex items-center rounded-md p-1.5   hover:bg-slate-200">
                                <User className='mr-2.5 bt h-5 w-5 flex-none stroke-slate-400'></User>

                                @floydmiles
                            </div>
                            <div className="flex items-center rounded-md p-1.5  hover:bg-slate-200">
                                <User className='mr-2.5   h-5 w-5 flex-none stroke-slate-400'></User>

                                @tomKook
                            </div>
                        </div>
                        <div className='w-full items-center justify-center object-center '>
                            <div className="w-full h-44  overflow-y-auto divide-y divide-slate-400/20 rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
                                {people
                                    .filter((item2: People) =>
                                        item2.email.toLowerCase().includes(emailFilter.toLowerCase())
                                    )
                                    .map((item: People) => (
                                        <Card onPopupViewUser={onPopupViewUser} image={item.imageUrl} key={item.id} username={item.username} email={item.email} />
                                    ))}

                                <div className="p-4" onClick={() => setForm(true)}>
                                    <div className="pointer-events-auto rounded-md px-4 py-2 text-center font-medium shadow-sm ring-1 ring-slate-700/10  text-white bg-indigo-500 cursor-context-menu">
                                        Send Invite
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                )}
            </div>
        </div>

    )
}