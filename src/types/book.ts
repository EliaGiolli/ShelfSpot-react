export interface Book {
    key: string;
    title: string;
    author: string[];
    subject:string[];
    first_publish_year: number,
    cover_i: number
};

export interface BookProps {
    books?: Book[]
}

export interface Favourites {
    id:string,
    userId:string,
    userName:string,
    lastName:string
    bookId:string,
    bookTitle: string
}