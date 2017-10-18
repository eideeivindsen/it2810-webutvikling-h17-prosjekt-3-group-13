#  Group 13 - Personal Information Manager

This repository is containing two parts.
The first part is a webpage application located in the [website](Website/) folder. The second part is a matching mobile application located in the [native](Native/) folder.

The page is also hosted at the [server][]

# Webpage Application

The website is created using [create-react-app][].<br />
[Material UI][] is used to give the site an aesthetic and well-designed look.

### 1. Getting Started

To run this project on your local computer, you will need to have [Node.js][] installed. Once you have Node.js installed, go to step 2.

### 2. Installation

Clone this repository, then using a terminal, navigate to the [website](Website/) directory and run the following:

```bash
$ npm install
```

### 3. Usage

To start the server, run this command in the folder:

```bash
$ npm start
```

If the server is able to start with your configuration, you will see this in
your terminal:

```bash
Starting the development server...
```

The browser will now open a new window and the application will be running on [http://localhost:3000](http://localhost:3000).

# Mobile Application

The mobile app is created using [create-react-native-app][].<br />
We followed the setup here to create a react native project similar to the way to create an react app for web. We have used NOT [Material UI][] because this is not available for native yet, so we just used simple, prebuilt react-native components and styled them with CSS.

### 1. Getting Started

To run this project on your local computer, you will need to have [Node.js][] installed. Once you have Node.js installed, go to step 2.

### 2. Installation

Clone this repository, then using a terminal, navigate to the [native](Native/) directory and run the following:

```bash
$ npm install
```

### 3. Usage

To start the app, choose the platform you want to run on. Android og IOS. To run this app you need to have an emulator (either android og ios) or an actual device plugged into your computer. Once you have this setup, run the following command

```bash
$ react-native run-andoroid
or
$ react-natice run-ios
```

This will (hopefully) be enough for you to start the application.
If not, please try to google a solution, and feel free to email us.


```bash
Andorid: BUILD SUCCESSFUL
IOS: ** BUILD SUCCEEDED **
```

The app will automatically start in your emulator or real device.

[Node.js]: https://nodejs.org
[create-react-app]: https://github.com/facebookincubator/create-react-app
[Material UI]: http://www.material-ui.com/#/
[create-react-native-app]: https://facebook.github.io/react-native/docs/getting-started.html
[server]: http://it2810-13.idi.ntnu.no:8082/