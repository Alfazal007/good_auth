"use client"

import React, { useState } from 'react'
import { Shield, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { GoogleRedirect } from './GoogleRedirect'

export function SignUp({ orgName, router, orgId, redirectUrl, apiKey }: { redirectUrl: string, orgName: string, router: AppRouterInstance, orgId: string, apiKey: string }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            console.log("Passwords do not match")
            return
        }
        setIsLoading(true)
        const signUpUrl = `http://localhost:8000/api/signup`
        const dataBeingSent = {
            "email": formData.email,
            "password": formData.password,
            "orgId": orgId
        }
        console.log({ dataBeingSent })
        try {
            const signUpResponse = await axios.post(signUpUrl, dataBeingSent)
            if (signUpResponse.status == 201) {
                router.push("/auth/signin")
                return
            } else {
                console.log("Issue signing up")
            }
        } catch (err) {
            console.log({ err })
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
                    <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
                    <p className="text-gray-400">Get started with {orgName} today</p>
                </div>

                <div className="bg-gray-800 p-8 rounded-xl border border-gray-700">
                    <GoogleRedirect redirectUrl={redirectUrl} apiKey={apiKey} orgId={orgId} />

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
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
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
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Create a password"
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Confirm your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 mt-1"
                                required
                            />
                            <span className="ml-2 text-sm text-gray-300">
                                I agree to the{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
                                {' '}and{' '}
                                <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="text-center text-gray-400 mt-6">
                        Already have an account?{' '}
                        <button className="text-blue-400 hover:text-blue-300 font-medium" onClick={() => { router.push("/auth/signin") }}>
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
}
