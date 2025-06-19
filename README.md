# 📚 Search4YourBook

Search4YourBook is a modern web application that allows users to explore and manage books through the OpenLibrary API. Built with React, TypeScript, and Tailwind CSS, it provides a seamless experience for book enthusiasts to discover, save, and borrow their favorite reads.

## 🚀 Features

- **Book Discovery**: Search and browse books by genre using the OpenLibrary API
- **User Authentication**: Secure login, registration, and logout functionality
- **Personal Library**: Save favorite books to your personal collection
- **Book Borrowing System**: Simulate a library experience with a borrowing system
- **Protected Routes**: Secure access to user-specific features
- **Responsive Design**: Modern UI built with Tailwind CSS
- **State Management**: Efficient data handling with Redux Toolkit
- **API Integration**: Seamless communication with external APIs and local mock database

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **API Integration**: Axios
- **Form Handling**: React Hook Form
- **UI Components**: Radix UI
- **Testing**: Jest
- **Development**: Vite
- **Mock Database**: JSON Server

## 📦 Project Structure

```
src/
├── api/           # API integration and mock database
├── components/    # Reusable UI components
├── custom hooks/  # Custom React hooks
├── features/      # Feature-specific components
├── layouts/       # Layout components
├── pages/         # Page components
├── router/        # Route configuration
├── services/      # Service layer
├── store/         # Redux store configuration
├── types/         # TypeScript type definitions
├── App.tsx        # Root component
└── main.tsx       # Application entry point
```

## 🚀 Getting Started

1. **Clone the repository**
   ```sh
   git clone https://github.com/EliaGiolli/Search4YourBook.git
   cd Search4YourBook
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Start the development server**
   ```sh
   npm run dev
   ```

4. **Start the mock database server**
   ```sh
   npm run server
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Development

- **Development Server**: `npm run dev`
- **Mock Database**: `npm run server`
- **Build**: `npm run build`
- **Linting**: `npm run lint`

## 🧪 Testing

The project uses Jest for testing. Run tests with:
```sh
npm test
```

## 🔐 Authentication

The application implements a complete authentication system:
- User registration
- Login/Logout functionality
- Protected routes
- User-specific features

## 📚 Book Management

- **Search**: Browse books by genre
- **Favorites**: Save books to your personal collection
- **Borrowing**: Simulate a library borrowing system
- **Details**: View comprehensive book information

## 🔄 API Integration

The application integrates with:
- OpenLibrary API for book data
- Local JSON Server for user data and authentication
- Redux Toolkit for state management

## 🛠️ Future Improvements

- Implement pagination for book listings
- Add advanced search filters
- Enhance the borrowing system with due dates
- Add social features (reviews, ratings)
- Implement real-time notifications

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Elia Giolli**
- GitHub: [@EliaGiolli](https://github.com/EliaGiolli)
- LinkedIn: [Elia Giolli](https://www.linkedin.com/in/eliagiolli/)

