"use client"

import { Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function() {
    const router = useRouter()
    return (
        <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-2">
                        <Shield className="h-8 w-8 text-blue-400" />
                        <span className="text-xl font-bold text-white">Good Auth</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push("/organization/projects")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium">
                            Projects
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
