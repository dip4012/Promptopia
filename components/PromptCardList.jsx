import PromptCard from "./PromptCard"

export default function PromptCardList({
	data,
	handleTagClick,
	handleEdit,
	handleDelete,
}) {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((prompt) => (
				<PromptCard
					key={prompt._id}
					prompt={prompt}
					handleTagClick={() => handleTagClick && handleTagClick(prompt.tag)}
					handleEdit={() => handleEdit && handleEdit(prompt)}
					handleDelete={() => handleDelete && handleDelete(prompt)}
				/>
			))}
		</div>
	)
}
