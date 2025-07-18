"use client"

import React, { useEffect, useState } from 'react'
import { Shield, Plus, FolderOpen, ArrowLeft, Key, Copy, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'sonner'

interface Project {
    _id?: string
    name: string
}

interface SecretAndKey {
    apiKey: string
    apiSecret: string
}

function Projects() {
    const [currentView, setCurrentView] = useState<'list' | 'project'>('list')
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [projects, setProjects] = useState<Project[]>([])
    const [newProjectName, setNewProjectName] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [showSecret, setShowSecret] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)
    const [apiKeySecret, setApiKeySecret] = useState<SecretAndKey | null>(null)

    async function createNewProject() {
        try {
            setIsCreating(true)
            const existingProjects = await axios.post("http://localhost:3000/api/app/create", {
                name: newProjectName
            }, {
                withCredentials: true
            })
            if (existingProjects.status != 201) {
                toast(`Issue creating the project`)
            }
            await getExistingProjects()
            setNewProjectName("")
        } catch (err: any) {
            toast(`${err.message}`)
        } finally {
            setIsCreating(false)
        }
    }

    useEffect(() => {
        if (!selectedProject) {
            return
        }
        getApiKeyForProject(selectedProject._id!)
    }, [selectedProject])

    async function getApiKeyForProject(projectId: string) {
        try {
            const existingProjects = await axios.post("http://localhost:3000/api/app/createApiKeyAndSecret", {
                projectId
            }, {
                withCredentials: true
            })
            if (existingProjects.status != 200) {
                toast(`Issue creating the apikey and secret`)
            }
            setApiKeySecret({ apiKey: existingProjects.data.apiKey, apiSecret: existingProjects.data.apiSecret })
        } catch (err: any) {
            toast(`${err.message}`)
        }
    }

    async function getExistingProjects() {
        try {
            const existingProjects = await axios.get("http://localhost:3000/api/app/getProjects", {
                withCredentials: true
            })
            if (existingProjects.status != 200) {
                toast(`Issue fetching the data`)
            }
            setProjects(existingProjects.data.projects)
        } catch (err: any) {
            toast(`${err.message}`)
        }
    }

    useEffect(() => {
        const email = Cookies.get('email')
        const id = Cookies.get('id')
        if (!email || !id) {
            router.push("/auth/signin")
            return
        }
        getExistingProjects()
    }, [])

    const router = useRouter()

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newProjectName.trim()) return

        setIsCreating(true)
        setTimeout(() => {
            const newProject: Project = {
                name: newProjectName.trim(),
            }
            setProjects(prev => [newProject, ...prev])
            setNewProjectName('')
            setIsCreating(false)
        }, 1000)
    }

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project)
        setCurrentView('project')
    }

    const generateApiKeys = async () => {
        if (!selectedProject) return

        setIsGenerating(true)
        // Simulate API call
        setTimeout(() => {
            const apiKey = `ga_live_${Math.random().toString(36).substring(2, 18)}`
            const secret = `gs_live_${Math.random().toString(36).substring(2, 18)}`

            const updatedProject = {
                ...selectedProject,
                apiKey,
                secret
            }

            setSelectedProject(updatedProject)
            setProjects(prev => prev.map(p => p._id === selectedProject._id ? updatedProject : p))
            setIsGenerating(false)
        }, 1500)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        // You could add a toast notification here
    }

    if (currentView === 'project' && selectedProject) {
        return (
            <div className="min-h-screen bg-gray-900 text-white">
                {/* Navigation */}
                <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <Shield className="h-8 w-8 text-blue-400" />
                                <span className="text-xl font-bold text-white">Good Auth</span>
                            </div>
                            <button
                                onClick={() => setCurrentView('list')}
                                className="flex items-center text-gray-400 hover:text-white transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Projects
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">{selectedProject.name}</h1>
                    </div>

                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-semibold text-white mb-2">API Credentials</h2>
                                <p className="text-gray-400">Use these credentials to authenticate your application</p>
                            </div>
                            {!apiKeySecret?.apiKey && (
                                <button
                                    onClick={generateApiKeys}
                                    disabled={isGenerating}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                                >
                                    {isGenerating ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    ) : (
                                        <Plus className="h-5 w-5 mr-2" />
                                    )}
                                    {isGenerating ? 'Generating...' : 'Generate API Keys'}
                                </button>
                            )}
                        </div>

                        {apiKeySecret?.apiKey ? (
                            <div className="space-y-6">
                                {/* API Key */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        API Key
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 font-mono text-sm text-white">
                                            {apiKeySecret?.apiKey}
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(apiKeySecret?.apiKey!)}
                                            className="bg-gray-700 hover:bg-gray-600 border border-gray-600 p-3 rounded-lg transition-colors"
                                            title="Copy API Key"
                                        >
                                            <Copy className="h-4 w-4 text-gray-300" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Secret Key
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <div className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 font-mono text-sm text-white">
                                            {showSecret ? apiKeySecret?.apiSecret : '••••••••••••••••••••'}
                                        </div>
                                        <button
                                            onClick={() => setShowSecret(!showSecret)}
                                            className="bg-gray-700 hover:bg-gray-600 border border-gray-600 p-3 rounded-lg transition-colors"
                                            title={showSecret ? 'Hide Secret' : 'Show Secret'}
                                        >
                                            {showSecret ? <EyeOff className="h-4 w-4 text-gray-300" /> : <Eye className="h-4 w-4 text-gray-300" />}
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(apiKeySecret?.apiSecret!)}
                                            className="bg-gray-700 hover:bg-gray-600 border border-gray-600 p-3 rounded-lg transition-colors"
                                            title="Copy Secret Key"
                                        >
                                            <Copy className="h-4 w-4 text-gray-300" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="bg-gray-700/50 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                                    <Key className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-white mb-2">No API Keys Generated</h3>
                                <p className="text-gray-400 mb-6">Generate your first set of API credentials to get started</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navigation */}
            <nav className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <Shield className="h-8 w-8 text-blue-400" />
                            <span className="text-xl font-bold text-white">Good Auth</span>
                        </div>
                        <button
                            onClick={() => { router.push("/organization/home") }}
                            className="flex items-center text-gray-400 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </button>
                    </div>
                </div>
            </nav>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
                    <p className="text-gray-400">Manage your authentication projects and API keys</p>
                </div>

                {/* Create New Project */}
                <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Create New Project</h2>
                    <form onSubmit={handleCreateProject} className="flex gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                placeholder="Enter project name"
                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <button
                            onClick={createNewProject}
                            disabled={isCreating || !newProjectName.trim()}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
                        >
                            {isCreating ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            ) : (
                                <Plus className="h-5 w-5 mr-2" />
                            )}
                            {isCreating ? 'Creating...' : 'Create Project'}
                        </button>
                    </form>
                </div>

                <div className="bg-gray-800 rounded-xl border border-gray-700">
                    <div className="p-6 border-b border-gray-700">
                        <h2 className="text-xl font-semibold text-white">Your Projects</h2>
                    </div>

                    {projects.length === 0 ? (
                        <div className="p-12 text-center">
                            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-white mb-2">No projects yet</h3>
                            <p className="text-gray-400">Create your first project to get started</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-700">
                            {projects.map((project) => (
                                <div
                                    key={project._id}
                                    onClick={() => handleProjectClick(project)}
                                    className="p-6 hover:bg-gray-700/50 cursor-pointer transition-colors"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-blue-600/20 p-3 rounded-lg">
                                                <FolderOpen className="h-6 w-6 text-blue-400" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-white">{project.name}</h3>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center text-green-400 text-sm">
                                                <Key className="h-4 w-4 mr-1" />
                                                API Keys Active
                                            </div>
                                            <div className="text-gray-400">→</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Projects
