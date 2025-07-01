import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect,test,describe, vi, beforeEach } from 'vitest'

import Input from './Input'


let mockTheme = 'light';

vi.mock('../custom hooks/useTheme', () => ({
    useTheme: () => mockTheme
}));

describe('input component made by a RadixUI primitive', () => {
    
    test('renders the correct value and type', async () => {

        const handleInputChange = vi.fn();

        render(<Input searchTerm="thriller" handleInputChange={handleInputChange} />);
        //In RTL inputs tags are 'textbox'
        const inputEl = screen.getByRole('textbox');
        expect(inputEl).toHaveValue("thriller");
        expect(inputEl).toHaveAttribute("type", "text");
    });

    test("calls onChange event after user input", async () => {

        const handleInputChange = vi.fn();

        render(<Input searchTerm="" handleInputChange={handleInputChange} />);

        const inputEl = screen.getByRole('textbox');
        await userEvent.type(inputEl, 'romance');

        expect(handleInputChange).toHaveBeenCalled();
    });

    test('htmlFor and the id of the input have the same value', () => {

        render(<Input />);

        const inputEl = screen.getByRole('textbox');
        const label = screen.getByText('Type here the book genre');

        label.getAttribute('for');
        inputEl.getAttribute('id');
        //toBe verifies that the expected value is strictly equal(===) to the received value
        //If the conditions is true, then the test is passed, otherwise it fails
        expect(inputEl.getAttribute('id')).toBe(label.getAttribute('for'));
    })
});

describe('test dark/light theme', () => {

    beforeEach(() => {
        vi.resetModules();
    });

    test('applies the right classes for dark theme', async () => {

        mockTheme = 'dark';

        const {default: Input} = await import('./Input');
        render(<Input />)

        const darkInput = screen.getByRole('textbox')
        const darkLabel = screen.getByText('Type here the book genre');
        expect(darkInput).toHaveClass('inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded bg-slate-800 hover:bg-slate-700 px-2.5 text-[15px] leading-none text-yellow-100 shadow shadow-zinc-900 outline-yellow-400 focus:shadow-yellow-900 border-2 border-slate-700');
        expect(darkLabel).toHaveClass('text-[15px] font-medium leading-[35px] text-yellow-100');
    })


    test('applies the right classes for light theme', async () => {

        mockTheme = 'light';

        const {default: Input} = await import('./Input');
        render(<Input />)

        const lightInput = screen.getByRole('textbox')
        const lightLabel = screen.getByText('Type here the book genre');
        expect(lightInput).toHaveClass('inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded bg-gray-50 hover:bg-amber-100 px-2.5 text-[15px] leading-none text-gray-900 shadow shadow-gray-300 outline-amber-500 focus:shadow-gray-400 border-2 border-amber-200');
        expect(lightLabel).toHaveClass('text-[15px] font-medium leading-[35px] text-gray-400');
    })
})
