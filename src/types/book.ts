export interface Books {
    key: string;
    title: string;
    author: string[];
    subject:string[];
    first_publish_year: number,
    cover_i: number
};

export interface BooksProps {
    books?: Books[]
}

export interface Loans {
    id: string,
    userId: string,
    userName: string,
    lastName: string,
    bookId: string,
    borrowDate: Date,
    dueDate: Date
    returnDate?: Date
}

export interface Favourites {
    id:string,
    userId:string,
    userName:string,
    lastName:string
    bookId:string,
    bookTitle: string
}