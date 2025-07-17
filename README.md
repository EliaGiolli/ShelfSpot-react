# 📚 Shelfspot - React and Typescript

ShelfSpot is a modern web application that allows users to explore and manage books through the OpenLibrary API. Built with React, TypeScript, and Tailwind CSS, it provides a seamless experience for book enthusiasts to discover, save, and borrow their favorite reads.

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
- **API Integration**: Axios, Redux Toolkit Query
- **Form Handling**: React Hook Form and Zod
- **UI Components**: Radix UI
- **Testing**: Vitest, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom
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

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) as the test runner, along with [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/), [@testing-library/user-event](https://testing-library.com/docs/user-event/intro/), and [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) for writing and asserting UI tests.

### Running Tests

You can run all tests from the command line using:

```sh
npm test
```

This will execute all test files (e.g., [`Button.test.tsx`](src/components/Button.test.tsx), [`Input.test.tsx`](src/components/Input.test.tsx)) in your project and display the results in the console.

### Interactive Test UI

To run tests with the Vitest UI (for a visual, interactive experience):

```sh
npm run test:ui
```

This will open a browser window where you can see test results, re-run tests, and debug interactively.

### Notes

- All test files should be named with `.test.tsx` or `.test.ts` and placed alongside the components or in a `__tests__` folder.
- You can use the full power of Testing Library and Vitest for component, integration, and unit tests.
- For more information, see the [Vitest documentation](https://vitest.dev/guide/) and [Testing Library docs](https://testing-library.com/docs/).


## 🛠️ Future Improvements

- Implement pagination for book listings
- Implement a real backend server + DB with Express.js and MongoDB
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

## Local Development

This project is frontend-only. To test features like login, favourites, and loans, you need to run a mock API server locally.

### 1. Start the mock API (json-server)

```bash
cd api
npx json-server --watch db.json --port 3001
```

### 2. Start the frontend

```bash
npm install
npm run dev
```

### 3. Configure the frontend to use the local API

Make sure your `.env` file contains:

```
VITE_API_BASE_URL=http://localhost:3001/
```

---

**Note:**  
The deployed version on Vercel is frontend-only and does not support backend features.  
For full functionality, always run the mock API locally as described above.

---

## Why this is a good move

- **Simplicity:** No more serverless headaches or fake persistence.
- **Beginner-friendly:** Anyone can clone and run locally, no cloud config needed.
- **Transparency:** You’re honest about the project’s scope and limitations.

---

If you want, I can help you:
- Clean up the repo (remove serverless files, update `.env`, etc.)
- Write or update the README with clear instructions

Just let me know what you want to do next!

