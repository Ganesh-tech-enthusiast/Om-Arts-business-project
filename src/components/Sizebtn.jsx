
export default function Sizebtn({ id, label, activeSize, setActiveSize }) {

  return (
    <>
      <button
        className={`px-3 py-1 rounded-xl 
  md:px-6 md:py-2 md:text-xl transition-all duration-200 font-medium
${activeSize === id
            ? 'bg-blue-600 text-white border-2 border-blue-600 shadow-md dark:bg-blue-600 dark:text-white'
            : 'bg-stone-200 text-stone-600 hover:bg-stone-300 border-2 border-transparent dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600'
          }`}
        onClick={() => setActiveSize(id)}
      >
        {label}
      </button>

    </>
  )
}
