import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { expect, test, describe, vi, beforeEach } from 'vitest';

import Button from './Button';

//tests start below

let mockTheme = 'light';

vi.mock('../custom hooks/useTheme', () => ({
    useTheme: () => mockTheme
}))

describe('button component', () => {

    test("the button accepts children inside it", async () => {
        render(<Button>Click me</Button>);

        const button = screen.getByRole('button'); 
        expect(button).toHaveTextContent("Click me");
    });

    test('button shows a piece of text when clicked', async () => {
    
        const handleClick = vi.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
    
        const button = screen.getByRole('button');
        await userEvent.click(button);
        //I'm mocking a function (vi.fn()) and want to track calls.
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('the button can be disabled when disabled=true', async () => {

        render(<Button disabled>I'm disabled</Button>);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    test('it renders an enableds button when disabled = false', () => {

        render(<Button disabled={false}>Click me</Button>);

        const button = screen.getByRole('button');
        expect(button).toBeEnabled();
    });


    test('button has type="submit"', () => {

        render(<Button type="submit">Submit</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'submit');
    });

    test('button defaults to type="button" if not specified', () => {

        render(<Button type="button">Default type</Button>);

        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('type', 'button');
    });
});

describe('test the dark and light theme', () => {
    beforeEach(() => {
        vi.resetModules(); // clears the cache for the mocked modules
    });

    test('light theme',  async () => {

        mockTheme = 'light'

        const {default: Button} = await import ('./Button');
        render(<Button>Light theme</Button>);

        const lightBtn = screen.getByRole('button');
        expect(lightBtn).toHaveClass('bg-amber-400', 'text-gray-200');
    });

    
    test('dark theme',  async () => {
        
        mockTheme = 'dark';

        const {default: Button} = await import ('./Button');
        render(<Button>Dark theme</Button>);

        const darkBtn = screen.getByRole('button');
        expect(darkBtn).toHaveClass('bg-yellow-400', 'text-zinc-900');
    })

})
