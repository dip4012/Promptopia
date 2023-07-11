"use client"

import Profile from "@/components/Profile"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserProfilePage({ params }) {
	const searchParams = useSearchParams()

	const username = searchParams.get("name")
	const [prompts, setPrompts] = useState([])

	useEffect(() => {
		const fetchPrompts = async () => {
			const response = await fetch(`/api/users/${params?.id}/prompts`)
			const data = await response.json()

			setPrompts(data)
		}

		fetchPrompts()
	}, [params.id])

	return (
		<Profile
			name={username}
			desc={`Welcome to ${username}'s personalized page`}
			data={prompts}
		/>
	)
}
