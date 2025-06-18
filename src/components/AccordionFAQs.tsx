import { FAQs } from "../services/homePageData"
import * as Accordion from '@radix-ui/react-accordion';


function AccordionFAQs() {
  return (
    <>
      <section className="py-16 bg-white px-6 max-w-4xl mx-auto rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-amber-700 mb-8 text-center">Frequently Asked Questions</h2>
        <Accordion.Root type="single" collapsible className="space-y-4">
        {FAQs.map(({ question, answer }, i) => (
            <Accordion.Item key={i} value={`item-${i}`} className="bg-amber-50 rounded-md shadow-sm">
            <Accordion.Header>
                <Accordion.Trigger className="w-full px-6 py-4 text-left text-lg font-semibold text-amber-700 hover:bg-amber-100 focus:outline-none focus-visible:ring focus-visible:ring-amber-400 rounded-md">
                {question}
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-6 py-4 text-gray-700">
                {answer}
            </Accordion.Content>
            </Accordion.Item>
        ))}
        </Accordion.Root>
      </section>
    </>
  )
}

export default AccordionFAQs