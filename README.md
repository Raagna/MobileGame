# Raining Fish: A Mobile Game
## Table of contents
- [Description](#description)
- [Screen shots](#screen-shots)
- [Technologies](#technologies)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Backend Setup (Spring Boot)](#backend-setup-(spring-boot))
  - [Frontend Setup (React Native with Expo)](frontend-setup-(react-native-with-expo))
  - [Running the Application](running-the-application)
  - [Troubleshooting](#troubleshoot)

## Description
Concept: The main concept of the game is to move the barrel left and right to catch as many fish as you can without touching the sharks. You get 3 lives; every time you hit a shark, you lose a life. The higher your score the faster they start to drop.


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

Java Development Kit (JDK) 17+
Node.js (v16+) and npm
Git
Maven 
Expo CLI

### Backend Setup (Spring Boot)

Clone the repository
bashCopygit clone https://github.com/yourusername/your-project-name.git
cd your-project-name/backend

Configure the database
Open src/main/resources/application.properties or application.yml and update database configurations:
propertiesCopyspring.datasource.url=jdbc:mysql://localhost:3306/yourdbname
spring.datasource.username=your_username
spring.datasource.password=your_password

Build the application
With Maven:
bashCopymvn clean install
With Gradle:
bashCopy./gradlew build

Run the application
With Maven:
bashCopymvn spring-boot:run
With Gradle:
bashCopy./gradlew bootRun
The backend server should now be running on http://localhost:8080















