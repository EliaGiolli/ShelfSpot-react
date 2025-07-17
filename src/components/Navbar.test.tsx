import { screen, render } from "@testing-library/react"
import UserEvent from "@testing-library/user-event"
import { expect,test,describe, vi, beforeEach } from 'vitest'
import { MemoryRouter } from "react-router"

import Navbar from "./Navbar"

import { Provider } from "react-redux"
import { store } from "../store/store"
//even if the navbar has children, there's no need to import them here for testing

let mockTheme = 'light';

vi.mock('../custom hooks/useTheme.tsx', () => ({
    useTheme: () => mockTheme
}));

describe('while routing every link has the correct class', () => {

    test('the book link gets the underline class on focus ', async () => {

        render(
            //initialEntries makes possibile to test one specific route
            <MemoryRouter initialEntries={["/books"]}>
                <Provider store={store} >
                    <Navbar />
                </Provider>
            </MemoryRouter>
        );
        //getByRole gets exactly the link "books"
        const listItem = screen.getByRole("link", { name: /books/i })
        expect(listItem).toHaveClass('underline');
    });

    test('the home link does not get the underline class on focus ', async () => {

        render(
           
            <MemoryRouter initialEntries={["/home"]}>
                <Provider store={store} >
                    <Navbar />
                </Provider>
            </MemoryRouter>
        );
        
        const homeLinks = screen.getAllByRole("link");
        const homeNavLink = homeLinks.find(link => link.getAttribute('aria-label') === 'Home page' )
        expect(homeNavLink).toHaveClass('underline');
    });
});



describe('test dark/light theme', () => {

    beforeEach(() => {
        vi.resetModules();
    });

    test('applies the right classes for dark theme', async () => {

        mockTheme = 'dark';

        const {default: Navbar} = await import('./Navbar');
        
        render(

            <MemoryRouter>
                <Provider store={store} >
                    <Navbar />
                </Provider>
            </MemoryRouter>
        )

   
    const links = screen.getAllByRole('link');

    const loansLinkDark = links.find(link => link.getAttribute('aria-label') === 'ShelfSpot Home');
    expect(loansLinkDark).toBeTruthy(); 
    
    expect(loansLinkDark).toHaveClass('text-yellow-200');
    })


    test('applies the right classes for light theme', async () => {

        mockTheme = 'light';

        const {default: Navbar} = await import('./Navbar');

          render(
            <MemoryRouter>
                <Provider store={store} >
                    <Navbar />
                </Provider>
            </MemoryRouter>
        )

        
    const links = screen.getAllByRole('link');

    const loansLinkLight = links.find(link => link.getAttribute('aria-label') === 'ShelfSpot Home');
    expect(loansLinkLight).toBeTruthy(); 
    
    expect(loansLinkLight).toHaveClass('text-yellow-300');
    })
})
