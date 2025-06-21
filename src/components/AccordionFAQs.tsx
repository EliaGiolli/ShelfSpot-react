import { FAQs } from "../services/homePageData"
import * as Accordion from '@radix-ui/react-accordion';
import { useTheme } from '../custom hooks/useTheme';

function AccordionFAQs() {
  const theme = useTheme();

  // Theme-based classes
  const sectionBg = theme === 'light' ? 'bg-white' : 'bg-amber-950';
  const headingText = theme === 'light' ? 'text-amber-700' : 'text-amber-300';
  const itemBg = theme === 'light' ? 'bg-amber-50' : 'bg-amber-900';
  const triggerText = theme === 'light' ? 'text-amber-700' : 'text-amber-200';
  const triggerHover = theme === 'light' ? 'hover:bg-amber-100' : 'hover:bg-amber-800';
  const triggerFocus = theme === 'light' ? 'focus-visible:ring-amber-400' : 'focus-visible:ring-amber-700';
  const contentText = theme === 'light' ? 'text-gray-700' : 'text-amber-100';

  return (
    <>
      <section className={`py-16 ${sectionBg} px-6 max-w-4xl mx-auto rounded-lg shadow-md`}>
        <h2 className={`text-3xl font-bold ${headingText} mb-8 text-center`}>Frequently Asked Questions</h2>
        <Accordion.Root type="single" collapsible className="space-y-4">
        {FAQs.map(({ question, answer }, i) => (
            <Accordion.Item key={i} value={`item-${i}`} className={`${itemBg} rounded-md shadow-sm`}>
            <Accordion.Header>
                <Accordion.Trigger
                  className={`w-full px-6 py-4 text-left text-lg font-semibold ${triggerText} ${triggerHover} focus:outline-none focus-visible:ring ${triggerFocus} rounded-md`}
                >
                {question}
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className={`px-6 py-4 ${contentText}`}>
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