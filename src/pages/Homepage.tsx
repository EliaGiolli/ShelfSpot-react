import HeroSection from "../components/HeroSection"
import Reviews from "../components/Reviews"
import AccordionFAQs from "../components/AccordionFAQs"
import Benefits from "../components/Benefits"
import BorrowingCTA from "../components/BorrowingCTA"

function Homepage() {
  return (
    <>
      <HeroSection />
      <section className="mt-15">
        <Benefits />
      </section>
      <section className="my-30">
        <Reviews />
      </section>
      <section className="my-30">
        <AccordionFAQs />
      </section>
      <section className="mb-30">
        <BorrowingCTA />
      </section>
    </>
  )
}

export default Homepage