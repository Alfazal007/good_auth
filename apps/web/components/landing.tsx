"use client"

import { Shield, Users, Key, Zap, Lock, Globe, ArrowRight, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Landing() {
    const router = useRouter()
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Shield className="h-8 w-8 text-blue-400" />
                            <span className="text-xl font-bold text-white">Good Auth</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-gray-800" onClick={() => { router.push("/auth/signin") }}>
                                Sign In
                            </button>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium" onClick={() => { router.push("/auth/signup") }} >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                    <div className="text-center">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-900/30 rounded-full text-blue-300 text-sm font-medium mb-8 border border-blue-800/50">
                            <Zap className="h-4 w-4 mr-2" />
                            Trusted by 10,000+ developers
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Authentication Made
                            <span className="block text-blue-400">Simple & Secure</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Drop-in authentication and user management for your applications.
                            Get started in minutes with our developer-first platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center transition-all hover:scale-105">
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                            <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                                View Documentation
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-900/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for authentication</h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Comprehensive authentication features that scale with your application
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:bg-gray-800/70">
                            <div className="bg-blue-600/20 p-3 rounded-lg w-fit mb-4">
                                <Key className="h-6 w-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Multi-Factor Authentication</h3>
                            <p className="text-gray-400">Secure your users with SMS, email, and authenticator app support</p>
                        </div>

                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:bg-gray-800/70">
                            <div className="bg-green-600/20 p-3 rounded-lg w-fit mb-4">
                                <Users className="h-6 w-6 text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">User Management</h3>
                            <p className="text-gray-400">Complete user lifecycle management with roles and permissions</p>
                        </div>

                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:bg-gray-800/70">
                            <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-4">
                                <Lock className="h-6 w-6 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Session Management</h3>
                            <p className="text-gray-400">Secure session handling with automatic refresh and revocation</p>
                        </div>

                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:bg-gray-800/70">
                            <div className="bg-orange-600/20 p-3 rounded-lg w-fit mb-4">
                                <Globe className="h-6 w-6 text-orange-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Social Login</h3>
                            <p className="text-gray-400">One-click login with Google, GitHub, Facebook, and more</p>
                        </div>

                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:bg-gray-800/70">
                            <div className="bg-red-600/20 p-3 rounded-lg w-fit mb-4">
                                <Shield className="h-6 w-6 text-red-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
                            <p className="text-gray-400">SOC 2 compliant with advanced threat protection</p>
                        </div>

                        <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all hover:bg-gray-800/70">
                            <div className="bg-teal-600/20 p-3 rounded-lg w-fit mb-4">
                                <Zap className="h-6 w-6 text-teal-400" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                            <p className="text-gray-400">Global CDN with 99.9% uptime and sub-100ms response times</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Ship faster with
                                <span className="text-blue-400"> Good Auth</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                Stop building authentication from scratch. Our platform handles all the security complexities
                                so you can focus on building your core product.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <Check className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-white">5-minute setup</h3>
                                        <p className="text-gray-400">Get authentication running in your app instantly</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Check className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-white">Framework agnostic</h3>
                                        <p className="text-gray-400">Works with React, Vue, Angular, and more</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <Check className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-white">Always compliant</h3>
                                        <p className="text-gray-400">GDPR, SOC 2, and HIPAA compliance built-in</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
                            <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm">
                                <div className="text-gray-500 mb-2">// Initialize Good Auth</div>
                                <div className="text-blue-400">import</div>
                                <div className="text-white"> GoodAuth </div>
                                <div className="text-blue-400">from</div>
                                <div className="text-green-400"> '@goodauth/react'</div>
                                <div className="text-white">;</div>
                                <br />
                                <div className="text-blue-400">const</div>
                                <div className="text-white"> auth = </div>
                                <div className="text-blue-400">new</div>
                                <div className="text-yellow-400"> GoodAuth</div>
                                <div className="text-white">(</div>
                                <div className="text-green-400">'your-api-key'</div>
                                <div className="text-white">);</div>
                                <br />
                                <div className="text-gray-500">// That's it! 🎉</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to secure your application?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join thousands of developers who trust Good Auth for their authentication needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105">
                            Start Free Trial
                        </button>
                        <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                            Talk to Sales
                        </button>
                    </div>
                </div>
            </section>

            <footer className="bg-gray-900 border-t border-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <Shield className="h-8 w-8 text-blue-400" />
                                <span className="text-xl font-bold text-white">Good Auth</span>
                            </div>
                            <p className="text-gray-400 max-w-md">
                                The most developer-friendly authentication platform.
                                Secure, scalable, and simple to implement.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Product</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold mb-4">Company</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 Good Auth. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
