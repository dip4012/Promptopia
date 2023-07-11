"use client"

import Form from "@/components/Form"
import { useSession } from "next-auth/react"
import Error from "next/error"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function UpdatePrompt() {
	const router = useRouter()
	const { data: session } = useSession()
	const searchParams = useSearchParams()

	const promptId = searchParams.get("id")
	const [submitting, setSubmitting] = useState(false)
	const [prompt, setPrompt] = useState({
		prompt: "",
		tag: "",
	})

	useEffect(() => {
		const getPrompt = async () => {
			const response = await fetch(`/api/prompt/${promptId}`)
			const data = await response.json()

			setPrompt({
				prompt: data.prompt,
				tag: data.tag,
			})
		}

		promptId && getPrompt()
	}, [promptId])

	const updatePrompt = async (e) => {
		e.preventDefault()
		setSubmitting(true)

		try {
			if (!promptId) {
				throw new Error("Prompt ID not found")
			}

			const response = await fetch(`/api/prompt/${promptId}`, {
				method: "PATCH",
				body: JSON.stringify({
					prompt: prompt.prompt,
					tag: prompt.tag,
				}),
			})

			if (response.ok) {
				router.push("/profile")
			}
		} catch (error) {
			console.log(error)
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<Form
			type="Edit"
			prompt={prompt}
			setPrompt={setPrompt}
			submitting={submitting}
			handleSubmit={updatePrompt}
		/>
	)
}
