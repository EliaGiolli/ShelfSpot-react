import { reviews } from "../services/homePageData"

function Reviews() {

  return (
    <>
      <div className="py-16 bg-white px-6 max-w-6xl mx-auto rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-amber-700 mb-10 text-center">What Our Readers Say</h2>
        <div className="grid gap-8 md:grid-cols-3">
        {reviews.map(({ name, text }, i) => (
            <blockquote key={i} className="p-6 bg-amber-50 rounded-lg shadow-md text-gray-800">
            <p className="mb-4 italic">"{text}"</p>
            <footer className="font-semibold text-amber-700">— {name}</footer>
            </blockquote>
        ))}
        </div>
      </div>    
    </>
  )
}

export default Reviews