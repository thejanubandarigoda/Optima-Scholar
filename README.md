# 🎓 Student Registration Portal



A modern, responsive, and beautifully designed Student Registration System featuring a stunning glassmorphism UI. This project uses a vanilla web frontend connected to a robust Node.js backend, with data securely stored in a Dockerized MySQL database.

## ✨ Features

* **Modern Glassmorphism UI:** A visually appealing interface with smooth animations and hover effects.
* **Real-time Form Validation:** Comprehensive client-side validation for all input fields, including email and 10-digit phone numbers.
* **Full CRUD Functionality:** Register new students, view the complete list, and delete records seamlessly.
* **Live Search:** Instantly filter students by name, ID, grade, or phone number.
* **Interactive Overlays & Toasts:** Beautiful bottom-sheet style modal for viewing records and animated toast notifications for user feedback.
* **Dockerized Database:** Zero-hassle database setup using a Docker container.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3 (Glassmorphism), Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Infrastructure:** Docker
* **Libraries:** `mysql2`, `cors`

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [Docker Desktop](https://www.docker.com/products/docker-desktop)

### 1. Set up the Database (Docker)

Open your terminal and run the following command to spin up a MySQL container. It will automatically create a database named `mydb`.

```bash
docker run --name my-mysql -e MYSQL_ROOT_PASSWORD=password123 -e MYSQL_DATABASE=mydb -p 3306:3306 -d mysql


📁 student-registration-portal/
│
├── index.html       # The main UI with HTML, CSS, and Frontend JS logic
├── server.js        # Node.js backend handling API routes and DB connection
├── package.json     # Node.js dependencies
└── README.md        # Project documentation