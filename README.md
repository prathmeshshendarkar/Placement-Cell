# Student Interview Management System

## Overview
The Student Interview Management System is a comprehensive web application designed to streamline the process of managing student interviews. From storing student details to organizing interview schedules and tracking results, this platform offers a robust set of features to simplify the entire process.

## Key Features
- **User Authentication**: Secure sign-up and sign-in functionality for employees.
- **Student Management**: Add, edit, and view student details, including their college, status, and scores.
- **Interview Management**: Create, update, and list interviews, with options to assign students and track interview results.
- **Result Tracking**: Efficiently manage interview results, including pass/fail statuses and detailed feedback.
- **External Job Listings**: Fetch and display real-time job listings relevant to students, enhancing their career prospects.
- **Data Export**: Download all data in CSV format for easy analysis and reporting.

## Installation
1. **Clone the Repository**: 
    ```bash
    git clone https://github.com/prathmeshshendarkar/Projects.git or Download the zip file of the Projects folder
    ```

2. **Install Dependencies**:
    ```bash
    cd PlacementCellApplication/backend
    npm install
    ```

3. **Set up Environment Variables**:
    - Create a `.env` file in the root directory.
    - Add the following variables:
        ```
        DB_URL=mongodb://localhost:27017/placement_cell
        ```

## Getting Started
1. **Start the Server**:
    ```bash
    npm test
    ```

2. **Access the Application**:
    Open a web browser and navigate to `http://localhost:3000`.

## Folder Structure
- `config/`: Configuration files
- `errorHandler/`: Custom error handling
- `features/`: Application features (students, interviews, results, users)
- `middlewares/`: Custom middleware functions
- `index.js`: Main server file
- `package.json`: Project dependencies
- `.env`: Environment variables

## Contributing
We welcome contributions! Feel free to submit issues or pull requests to help improve this project.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
