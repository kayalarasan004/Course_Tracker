# MySQL Setup Guide for LMS Project

Follow these steps to install MySQL and connect it to your LMS Backend.

## 1. Download & Install MySQL

1.  **Download**:
    *   Go to the official download page: [MySQL Community Downloads](https://dev.mysql.com/downloads/installer/)
    *   Select **"Windows (x86, 32-bit), MSI Installer"** (there is usually a larger file approx. 300MB+).
    *   Click **Download**. You can skip the login by clicking **"No thanks, just start my download"** at the bottom.

2.  **Run Installer**:
    *   Open the downloaded `.msi` file.
    *   **Setup Type**: Choose **"Developer Default"** (this installs MySQL Server, Workbench, and Shell).
    *   Click **Next** and then **Execute** to install the packages.

3.  **Configuration (CRITICAL)**:
    *   Click **Next** until you reach the **"Type and Networking"** screen. Default settings (Port 3306) are fine.
    *   **Accounts and Roles**:
        *   **Root Password**: Set this to **`password`** (all lowercase).
        *   *Why?* The backend project is currently configured to use this password. If you choose a different one, you must update `backend/src/main/resources/application.properties`.
    *   **Windows Service**: Keep defaults (Standard System Account) and click **Next**.
    *   Click **Execute** to apply settings.

## 2. Verify Installation

1.  Open the **Windows Start Menu**.
2.  Type **"MySQL Command Line Client"** and open it.
3.  Enter the password you set (e.g., `password`).
4.  You should see the `mysql>` prompt.

## 3. Create the Database

Run these commands inside the **MySQL Command Line Client**:

```sql
-- 1. Create the database
CREATE DATABASE lms_db;

-- 2. Select the database
USE lms_db;

-- 3. Copy-paste the content of your schema.sql file here.
-- (Located at: c:/Users/Lenovo/New/backend/schema.sql)
```

**Alternative: Using MySQL Workbench**
1.  Open **MySQL Workbench**.
2.  Connect to your Local instance.
3.  Click the **"Create a new schema"** icon (database symbol with a +) and name it `lms_db`.
4.  File -> Open SQL Script -> Select `backend/schema.sql`.
5.  Click the **Lightning Bolt** icon to run the script.

## 4. Run the Backend

**Prerequisite**: You need **Java 17+** and **Maven** installed.
1.  **Check Java**: `java -version`
2.  **Check Maven**: `mvn -version`
    *   *If command not found*: [Download Apache Maven](https://maven.apache.org/download.cgi), unzip it, and add the `bin` folder to your Windows System PATH variables.

### Running the App
1.  Open a new terminal in VS Code.
2.  Navigate to the backend folder:
    ```powershell
    cd backend
    ```
3.  Run the application:
    ```powershell
    mvn spring-boot:run
    ```
    *(Note: The first time you run this, it will download dependencies which may take a few minutes).*

**Success Indicator**:
When you see a line like this, you are connected!
`Started BackendApplication in 3.452 seconds (JVM running for 4.123)`

## 5. Connecting Frontend

Once the backend is running on `localhost:8080`:
1.  The frontend is already configured to talk to `/api`.
2.  You can verify the connection by checking if the network requests in your browser Developer Tools (F12) are succeeding.
