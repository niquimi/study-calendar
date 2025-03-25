# Study Calendar v.0.1

A simple study calendar application to manage study sessions and subjects.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
- You have installed [MySQL](https://www.mysql.com/).

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/study-calendar.git
    cd study-calendar
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

1. Create a `.env` file in the root directory and add your database configuration:
    ```env
    DB_HOST=your-database-host
    DB_USER=your-database-username
    DB_PASS=your-database-password
    DB_NAME=your-database-name
    PORT=3000
    ```

2. Import the database schema using the `schema.sql` file:
    ```sh
    mysql -u your-database-username -p your-database-name < study-calendar/schema.sql
    ```

## Running the Project

1. Start the server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Usage

- To add a new subject, use the form on the main page.
- To register a study session, fill in the session details and submit the form.
- To start a study session, use the timer functionality provided.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.