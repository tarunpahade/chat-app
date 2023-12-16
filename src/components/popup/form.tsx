'use client'


import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { XCircle } from 'react-feather'
import axios from 'axios'
export const Form = ({ closeForm }: any) => {
  const [email, setemail] = useState('')
  const [message, setMessage] = useState('')
  const { data: session } = useSession()
  const [sucessfullySentMail, setSucessfullySentMail] = useState(false)
  const [error, setError] = useState(false)
  const sendEMail = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {

      const res = await axios.post('/api/users/sendEmail', {
        reciverEmail: email, message, senderMail: session?.user.email
      })

      setSucessfullySentMail(true)

    } catch (error: any) {
      console.log('Error while Sending Mail', error);
      setError(true)
    }
  }
  return (
    <form className='px-14' onSubmit={sendEMail}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">

          <XCircle className='relative right-10 top-3' onClick={closeForm} />
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">

                  <input value={email} onChange={(e) => setemail(e.target.value)} type="email" name="email" id="email" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900  focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith@gmail.com" />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Enter Message</label>
              <div className="mt-2">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} id="about" name="about" rows={3} className="bg-white block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
              </div>
            </div>



            <button type='submit' className="pointer-events-auto w-[250px] rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Mail Message
            </button>
          </div>
          {sucessfullySentMail === true ? <label className="block text-sm font-medium leading-6 mt-5">Mail sent to your email</label> :
            null}
          {error && <p className="border border-red-500 p-2 mt-4">Error while Sending Mail </p>}



        </div>
      </div>
    </form>

  )
}
