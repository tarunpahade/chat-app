'use client';
import Image from "next/image";
import { useState } from "react";
import axios from 'axios'

export default function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [forgetPassword, setForgetPassword] = useState(false);
    const [buttonDisabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setisSuccess] = useState(false)
    const [error, seterror] = useState(false)
    const [responseText, setresponseText] = useState('')
    const onLogin = async (e: any) => {
        console.log("hello");

        e.preventDefault();

        try {
            setLoading(true);
            const res = await axios.post("api/users/login", user);
            console.log(res);
            alert('Login successful')



        } catch (error) {
            console.log("Login Failed", error);

            console.log('Invalid Password');
            seterror(true)


        } finally {
            setLoading(false);
        }
    };


    const sendEmail = async (e: any) => {
        e.preventDefault();
        try {
            console.log('Send email');
            const res = await axios.post('/api/users/forgotpassword', { email: user.email })
            console.log(res, 'this is response');

            if (res.data.message === 'Mail sent to Your email') {
                setisSuccess(true)
            } else if (res.statusText) {
                seterror(true)
                setresponseText('No user Found')
            }
        } catch (error: any) {
            console.log(error.response.data);
        }
    }




    return (
        <>
            {forgetPassword ? (
                //class to flex-direction:column

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Forget Password
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={sendEmail}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md mt-6 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Send Mail
                                </button>
                            </div>
                        </form>
                        {isSuccess === true ? <label className="block text-sm font-medium leading-6 mt-5">Mail sent to your email</label> :
                            null}
                        {error === true ? <label className="block text-sm font-medium leading-6 mt-5 ">{responseText} Please  <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Signup
                        </a></label> : null}
                    </div>
                </div>


            ) : (
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <h1 className="text-center">{loading ? "Loading..." : "Login"}</h1>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={onLogin}>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a onClick={() => setForgetPassword(true)} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                                {error && <p className="border border-red-500 p-2 mt-4">Invalid password try again</p>}
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                Start a 14 day free trial
                            </a>
                        </p>
                    </div>
                </div>)}
        </>
    )
}
