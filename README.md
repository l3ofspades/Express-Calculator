
#  Express Stats Calculator API

A simple RESTful API built with **Express.js** that calculates **mean**, **median**, and **mode** of numbers provided via query parameters.  
Includes error handling, testing with **Jest + Supertest**, and optional JSON result saving.

---

##  Features

- Calculate **Mean**, **Median**, **Mode**, or **All three** for a list of numbers.
- Optional `save=true` query parameter to write results to `results.json`.
- Supports both **JSON** and **HTML** responses (based on the `Accept` header).
- Built-in **error handling** middleware for clean responses.
- Includes **automated tests** for key routes.

---

##  Project Structure

```
.
├── app.js              # Main Express application (routes + logic)
├── server.js           # Starts the Express server
├── helpers.js          # Math utility functions (mean, median, mode)
├── errors.js           # Custom error class
├── app.test.js         # Jest + Supertest test suite
└── results.json        # Optional output file (auto-created when ?save=true)
```

---

##  Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the server
```bash
node server.js
```

The server will start on **http://localhost:3000**

---

##  API Endpoints

| Endpoint | Description | Example |
|-----------|--------------|----------|
| `/mean?nums=1,2,3,4,5` | Calculates the **mean** | `{ "response": { "operation": "mean", "value": 3 } }` |
| `/median?nums=1,3,3,6,7,8,9` | Calculates the **median** | `{ "response": { "operation": "median", "value": 6 } }` |
| `/mode?nums=1,2,2,3,4` | Calculates the **mode** | `{ "response": { "operation": "mode", "value": 2 } }` |
| `/all?nums=1,2,2,3,4` | Returns **mean, median, and mode** | `{ "response": { "operation": "all", "mean": 2.4, "median": 2, "mode": 2 } }` |

### Optional Parameters
- **`save=true`** → Saves the result to `results.json`
- **`Accept: text/html`** → Returns formatted HTML output

---

##  Testing

This project includes **unit and integration tests** using Jest and Supertest.

Run all tests:
```bash
npm test
```

Example tested routes:
- Mean (`/mean`)
- Median (`/median`)
- All (`/all`)
- Invalid input error handling

---

##  Technologies Used

- **Node.js**  
- **Express.js**  
- **Jest** & **Supertest** (for testing)  
- **fs module** (for optional result saving)

---

##  Example Usage

**Request:**
```
GET /all?nums=1,2,2,3,4
```

**Response:**
```json
{
  "response": {
    "operation": "all",
    "mean": 2.4,
    "median": 2,
    "mode": 2
  }
}
```

---

##  Error Handling

If invalid input is provided, a structured error response is returned:
```json
{
  "error": {
    "message": "Invalid input.",
    "status": 400
  }
}
```

---

##  Author

**Jonathan Federico Martinez**  
Full-Stack MERN Developer  
[LinkedIn](https://www.linkedin.com/in/jonathan-martinez-a9970b1a6) · [GitHub](https://github.com/l3ofspades)
