# Contact_App

# What to do 

Develop a sample "Contacts" mobile app in React Native, which does the following:
1.	When the app is launched, showing the contacts of the phone (name and number)
2.	Show a Search box at the top, where we can search contacts. For example if we type Arjun, all Arjuns must get listed
3.	If a contact is clicked on, show their name and number in a dismissable popup


# React Native Contacts App

## Features

- Fetches and displays the list of contacts from the device's contact list
- Allows searching for contacts based on their name
- Displays contact details in a modal when a contact is selected
- Enables sending text messages and making phone calls to the contacts

## Installation

1. Clone the repository:

  ```bash
  git clone <repository_url>

2. Install the dependencies:
  
  cd react-native-contacts-app  
  npm install

3. Run the application:
  
  npx react-native run-android
  npx react-native run-ios


## Usage

Upon launching the application, it will request permission to access your contacts. Grant the permission to proceed.
The contacts will be fetched and displayed in a list.
You can search for a specific contact by typing their name in the search bar at the top.
Tap on a contact to view their details in a modal.
In the contact details modal, you can tap on the "Text" button to send a text message to the contact or tap on the "Call" button to make a phone call.  

## Dependencies

react: ^16.13.1
react-native: ^0.63.3
react-native-contacts: ^7.7.0
react-native-communications: ^3.1.1


# react - 
This is the core library for building user interfaces in React. It provides the necessary functionality and components for creating interactive UIs.

# react-native - 
This is the framework for building native mobile apps using React. It allows you to write JavaScript code and render it as native components on iOS and Android devices.

# react-native-contacts - 
This package provides a simple way to access and manage the device's contact list. It allows you to fetch, create, update, and delete contacts using a set of convenient methods. In the app, it is used to fetch and display the list of contacts.

# react-native-communications - 
This package provides a set of communication-related functions for React Native apps. It includes methods for sending text messages, making phone calls, sending emails, and opening URLs. In the app, it is used to send text messages and make phone calls to the selected contacts.


These dependencies are essential for the functionality of the React Native Contacts App. They handle various aspects of the app, such as UI rendering, contact list management, and communication capabilities. Make sure to install and configure these dependencies properly to ensure the app works as expected.