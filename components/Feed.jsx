"use client"

import { useEffect, useState } from "react"
import PromptCardList from "./PromptCardList"

export default function Feed() {
	const [prompts, setPrompts] = useState([])

	// Search states
	const [searchText, setSearchText] = useState("")
	const [searchTimeout, setSearchTimeout] = useState(null)
	const [searchedResults, setSearchedResults] = useState([])

	useEffect(() => {
		const fetchPrompts = async () => {
			const response = await fetch("/api/prompt")
			const data = await response.json()

			setPrompts(data)
		}

		fetchPrompts()
	}, [])

	const filterPrompts = (text) => {
		const regex = new RegExp(text, "i")
		return prompts.filter(
			(prompt) =>
				regex.test(prompt.creator._id) ||
				regex.test(prompt.tag) ||
				regex.test(prompt.prompt)
		)
	}

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout)
		setSearchText(e.target.value)

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const filteredPrompts = filterPrompts(searchText)
				setSearchedResults(filteredPrompts)
			}, 500)
		)
	}

	const handleTagClick = (tag) => {
		setSearchText(tag)

		const filteredPrompts = filterPrompts(tag)
		setSearchedResults(filteredPrompts)
	}

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for a tag or a username"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>
			{searchText ? (
				<PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
			) : (
				<PromptCardList data={prompts} handleTagClick={handleTagClick} />
			)}
		</section>
	)
}
