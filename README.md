# 📱 React Native ToDo App

A simple and efficient **ToDo List App** built with **React Native (0.82.1)**, following a clean architecture and using modern state management, offline support, push notifications, and Firebase integration.

---

## 🚀 Project Overview

### ✅ Interview Requirements Completed

Below are the requirements provided by the interviewer and their completion status:

#### **1. Authentication**

* ✔ Sign Up & Login using Firebase Authentication (email/password)
* ✔ User session is persisted using Firebase Auth + Redux Persist

#### **2. Task Management**

* ✔ Add, edit, delete tasks
* ✔ Mark tasks as complete/incomplete
* ✔ Tasks stored locally using **Redux Persist** instead of Realm/SQLite due to time constraints
* ✔ Tasks sync to Firebase Firestore when device is online

#### **3. Offline Support**

* ❌ Local DB (Realm or SQLite) was not added

  * → Instead, **Redux Persist** is used for local storage
* ✔ Sync changes made offline when connectivity is restored

  * → Achieved through **Firestore offline persistence**

#### **4. Push Notifications**

* ✔ Local push notifications using Notifee
* ✔ Bonus: Server push notifications supported via Firebase Cloud Messaging

#### **5. Multi-Environment Config**

* ✔ Supports dev, staging, and production environments using `react-native-dotenv`

#### **6. Theming**

* ✔ Light and Dark mode implemented

#### **7. State Management**

* ✔ Redux Toolkit used for global state

#### **8. Navigation**

* ✔ Proper navigation flow using React Navigation (Auth Stack + App Stack)
  This app allows users to:
* Create, update, and delete tasks
* Sync data with Firebase Firestore
* Work offline with persistence
* Receive scheduled task reminders
* Maintain authentication state with Firebase Auth

---

## 🏗️ Architecture Choice

The project follows a **Modular + Feature-Based Architecture**, ensuring scalability and clean code.

### **Key Architecture Decisions**

* **Feature-Based Folder Structure** for scalability
* **Redux Toolkit** for predictable state management
* **Redux Persist** for offline state caching
* **Firebase (Auth + Firestore)** as backend
* **Notifee** for background & scheduled notifications
* **React Navigation** for screen management
* **AsyncStorage** for local storage

---

## 📦 Libraries Used

### **Core Dependencies**

* **react-native**: App UI development
* **react** 19: Core framework
* **@react-navigation/native** & **stack**: Navigation
* **@reduxjs/toolkit**, **react-redux**: Global state management
* **redux-persist**: Offline state local storage
* **@react-native-community/netinfo**: Network detection for syncing
* **@react-native-async-storage/async-storage**: Local key/value storage
* **axios**: API calls (if needed)
* **moment**: Date formatting

### **Firebase**

* **@react-native-firebase/app**
* **@react-native-firebase/auth**
* **@react-native-firebase/firestore**
* **@react-native-firebase/messaging**

Used for authentication, Firestore DB, messaging & notifications.

### **Notifications**

* **@notifee/react-native**: Local scheduled notifications

### **UI / Utilities**

* **react-native-reanimated**
* **react-native-gesture-handler**
* **react-native-screens**
* **react-native-safe-area-context**
* **react-native-snackbar**
* **react-native-dotenv**: Environment variables

---

## ▶️ How to Run the App

### **1️⃣ Install Dependencies**

```bash
npm install
# or
yarn install
```

### **2️⃣ Setup Environment Variables**

Create a `.env` file:

```
BASE_URL=xxxx
BUCKET_URL=xxxx
```

Make sure the values match your Firebase configuration.

---

## 🟦 Running on Android

### **Step 1: Start Metro Bundler**

```bash
npm start
```

### **Step 2: Run on Android**

```bash
npm run android
```

Make sure an emulator or USB device is connected.

---

## 🍏 Running on iOS (Mac Only)

### **Step 1: Install Pods**

```bash
cd ios
pod install
```

### **Step 2: Start the App**

```bash
cd ..
npm run ios
```

---

## 🔥 Firebase Setup

### **Android**

* Place `google-services.json` in `android/app/`

### **iOS**

* Place `GoogleService-Info.plist` in `ios/` directory
* Enable Push Notifications & Background Modes

---

## 🔔 Notifications Setup

* Notifee requires additional steps for Android channels & permissions
* Foreground, background, scheduled notifications supported

---

## ⚠️ Known Limitations

* iOS push notifications require Apple Developer Program
* Offline-first Firestore sync may delay updates if reconnecting after long offline periods
* Notifications may behave differently across Android OEMs (battery optimization)
* Some animations may require enabling Reanimated Babel plugin
* Firestore batch writes for very large datasets are not yet optimized

---

## 📌 Final Notes

This project showcases:

* Clean architecture
* Offline-first design
* Firebase integration
* Scheduling reminders with Notifee

Feel free to extend the project or integrate more features like:

* Task categories
* Cloud backup restore
* Dark mode

---

### 👨‍💻 Author

**Ankan Roy** — React Native Developer
