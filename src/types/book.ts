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