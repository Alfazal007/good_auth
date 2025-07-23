"use client"

import React, { useContext, useState } from 'react'
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { UserContext } from '../context/UserContext'
import { GoogleRedirect } from './GoogleRedirect'

export function SignIn(props: { redirectUrl: string, orgName: string, router: AppRouterInstance, orgId: string, apiKey: string }) {
    const { redirectUrl, orgName, router } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { setUser } = useContext(UserContext)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try {
            const signInUrl = `http://localhost:8000/api/signin`
            const dataToSend = {
                email,
                password,
                orgId: props.orgId
            }
            console.log({ dataToSend })
            const userResponse = await axios.post(signInUrl, dataToSend, { withCredentials: true })
            console.log("setting",
                {
                    email: userResponse.data.email,
                    id: userResponse.data.id,
                    accessToken: userResponse.data.accessToken
                }
            )
            setUser({
                email: userResponse.data.email,
                id: userResponse.data.id,
                accessToken: userResponse.data.accessToken
            })
            router.push(redirectUrl)
            return
        } catch (err) {
            console.log({ err })
            toast("Issue signing in")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <Shield className="h-8 w-8 text-blue-400" />
                        <span className="text-2xl font-bold text-white">{orgName}</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
                    <p className="text-gray-400">Sign in to your account to continue</p>
                </div>

                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                    <GoogleRedirect redirectUrl={redirectUrl} apiKey={props.apiKey} orgId={props.orgId} />

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">Or continue with email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
                                />
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-400 mt-6">
                        Don't have an account?{' '}
                        <button className="text-blue-400 hover:text-blue-300 font-medium" onClick={() => { router.push("/auth/signup") }}>
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignIn
