# Raining Fish: A Mobile Game
## Table of contents
- [Description](#description)
- [Screen shots](#screen-shots)
- [Technologies](#technologies)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
  - [Frontend Setup (React Native with Expo)](#frontend-setup-react-native-with-expo)
  - [Running the Application](running-the-application)

## Description
The concept of the game is to move the barrel left and right to catch as many fish as you can without touching the sharks. You get 3 lives; every time you hit a shark, you lose a life. The higher your score the faster they start to drop.


## Screen shots 

|Title Screen                                                      |   Countdown                                                          |    Game                                                           |   Lose Screen |  
|:----------------------------------------------------------------:|:--------------------------------------------------------------------:|:-----------------------------------------------------------------:|:-------------:| 
|<img src="\assets\TitleIMG.png" alt="Title screen" width="200"/>  | <img src="\assets\CountdownIMG.png" alt="Title screen" width="200"/> | <img src="\assets\GameIMG.png" alt="Title screen" width="200"/>  | <img src="\assets\LostScreenIMG.png" alt="Title screen" width="200"/>|                                                                            


## Technologies 
### Frontend:
Made with React, React-Native, React-Native Reanimated, React-Native Game Engine, Expo and matter.js.
### Backend:
Spring Boot and PostgreSQL


## Installation

### Prerequisites
Ensure you have the following installed:

- **Java Development Kit (JDK) 17+**
- **Node.js (v16+) and npm**
- **Git**
- **Maven**
- **Expo CLI**
  
### Backend Setup (Spring Boot)

1. **Clone the repository**

    ```bash
   git clone https://github.com/raagna/MobileGame.git
   cd MobileGame/backend

2. **Configure the database**
Open src/main/resources/application.properties or application.yml and update the database configurations:

    ```properties
    propertiesCopyspring.datasource.url=jdbc:mysql://localhost:yourport/yourdbname
    spring.datasource.username=your_username
    spring.datasource.password=your_password

3. **Build the application With Maven**
  
    ```bash
    mvn clean install


4. **Run the application**
    ```bash
    mvn spring-boot:run
The backend server should now be running on http://localhost:8080

### Frontend Setup (React Native with Expo)
1. **Navigate to the frontend directory**
    ````bash
    cd ../frontend

2. **Install dependencies**
    ```bash
    npm install

4. **Configure API endpoint**
Edit the highScoreService.tsx file and change the API URL:
    ```tsx
    API_URL=http://localhost:8080/api
**Note: For actual device testing, you'll need to use your machine's IP address or a public URL.**

5. **Install specific packages for Matter.js, Axios, and Expo**
    ```bash
    npm install matter-js axios expo-cli
    npm install @types/matter-js --save-dev

### Running the Application

1. Start the backend server (if not already running)
    ```bash 
    cd ../backend
    mvn spring-boot:run

2. Start the React Native Expo development server
    ```bash
    cd ../frontend
    npx expo start

3. Run the application

For iOS simulator: Press i
For Android emulator: Press a
For web browser: Press w
To run on a physical device: Scan the QR code using the Expo Go app












