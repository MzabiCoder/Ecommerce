
export const Spinner = () => {
    return (
        <div className="w-full flex justify-center items-center py-20">
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-slate-700"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 animate-spin"></div>
            </div>
        </div>
    )
}