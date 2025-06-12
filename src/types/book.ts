export interface Books {
    key: string;
    title: string;
    author: string[];
    subject:string[];
    first_publish_year: number
};

export interface BooksProps {
    books?: Books[]
}