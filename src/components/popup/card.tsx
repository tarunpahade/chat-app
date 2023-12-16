'use client'
import Image from "next/image";
import React, { useState } from "react";

interface Props {
    email: string,
    username: string,
    image: string,
    onPopupViewUser:any
}
export const Card = ({ email, username, image,onPopupViewUser }: Props) => {
    return (
    <>
            <div className="flex items-center p-4">
                <Image
                    src={image}
                    alt="User image"
                    width={10}
                    height={10}
                    className="h-10 w-10 flex-none rounded-full"
                />
                <div className="ml-4 flex-auto">
                    <div className="font-medium">{username}</div>
                    <div className="mt-1 text-slate-700">{email}</div>
                </div>
                <div onClick={() => {

                    onPopupViewUser({ email, imageUrl: image, username: username })
                  
                }} className="pointer-events-auto ml-4 flex-none rounded-md px-2 py-[0.3125rem] font-medium text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:text-white hover:bg-indigo-500  cursor-context-menu">
                    view
                </div>
            </div>
        
    </>
    );
};
