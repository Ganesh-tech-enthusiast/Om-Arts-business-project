
export default function Sizebtn({id,label, activeSize, setActiveSize}) {

    return (
    <>
    <button
  className={`px-3 py-1 rounded-xl 
  md:px-6 md:py-2 md:text-xl
${
    activeSize === id
      ? 'bg-white text-gray-900 border-3 border-blue-500'
      : 'bg-gray-600 text-gray-400'
  }`}
  onClick={() => setActiveSize(id)}
>
  {label}
</button>

    </>
    )
}
