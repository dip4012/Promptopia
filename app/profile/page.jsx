"use client"

import Profile from "@/components/Profile"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ProfilePage() {
	const { data: session } = useSession()
	const router = useRouter()
	const [prompts, setPrompts] = useState([])

	useEffect(() => {
		const fetchPrompts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/prompts`)
			const data = await response.json()

			setPrompts(data)
		}

		session?.user.id && fetchPrompts()
	}, [session?.user.id])

	const handleEdit = (prompt) => {
		router.push(`/update-prompt?id=${prompt._id}`)
	}

	const handleDelete = async (prompt) => {
		const hasConfirmed = confirm("Are you sure you want to delete this prompt?")

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${prompt._id}`, {
					method: "DELETE",
				})

				const filteredPrompts = await prompts.filter((p) => p._id !== prompt._id)
				setPrompts(filteredPrompts)
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<Profile
			name="My"
			desc="Welcome to your personalized page"
			data={prompts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	)
}
