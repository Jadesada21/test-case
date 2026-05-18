

export const handleKeyDown = (e: React.KeyboardEvent, onSubmit: () => void) => {
    if (e.key === 'Enter') onSubmit()
}