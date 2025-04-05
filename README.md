
# DisneyShield.AI

An AI-powered web application for detecting and acting on potential Disney IP piracy online.
Open This Code in Vs Code Editor 

## Demo Video :-
Link : https://drive.google.com/file/d/1TWzf73QfBqE9PQwgfc1hyWKio163ZGfo/view?usp=sharing

## Features

- **Authentication**: Secure login with Google Firebase Auth
- **Dashboard**: Real-time monitoring of IP protection activities
- **Content Analysis**: AI-powered detection of potential IP violations
- **DMCA Generator**: Create legal takedown notices automatically
- **Dark Mode**: Full support for light/dark theme

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Context API, TanStack Query
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Backend**: Firebase Cloud Functions with Google Gemini AI
- **Animations**: Framer Motion

## Setup Instructions

### Prerequisites

- Node.js & npm
- Firebase account
- Google Cloud account (for Gemini API access)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/disneyshield-ai.git
   cd disneyshield-ai
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure Firebase:
   - Create a new Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Authentication with Google Sign-in
   - Set up Firestore database
   - Create two collections: `alerts` and `dmca_requests`
   - Get your Firebase config and update `src/firebase/config.ts`

4. Configure Gemini API:
   - Create a Google Cloud project
   - Enable Gemini API
   - Generate an API key
   - Add the key to your Firebase Functions environment

5. Deploy Firebase Functions:
   - Set up Firebase CLI: `npm install -g firebase-tools`
   - Log in: `firebase login`
   - Deploy: `firebase deploy --only functions`

6. Start the development server:
   ```
   npm run dev
   ```

## Firebase Functions Setup

The application uses two main Firebase functions:

### 1. analyzeContent

This function uses Gemini AI to analyze content for potential IP violations:

```javascript
exports.analyzeContent = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  // Call Gemini API
  const response = await genAI.generateContent(`
    Analyze this content for Disney IP violations: ${data.url}
    ${data.description || ''}
  `);

  // Process response and store in Firestore
  // ...

  return {
    // Analysis results
  };
});
```

### 2. generateDMCA

This function generates DMCA takedown notices based on violation details:

```javascript
exports.generateDMCA = functions.https.onCall(async (data, context) => {
  // Verify authentication
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  // Call Gemini API
  const response = await genAI.generateContent(`
    Generate a DMCA takedown notice for:
    URL: ${data.infringingUrl}
    IP Description: ${data.ipDescription}
    Owner: ${data.ownerName}
    Contact: ${data.ownerEmail}
  `);

  // Process response and store in Firestore
  // ...

  return {
    // DMCA notice content
  };
});
```

## Deployment

To deploy the full application:

1. Build the React app:
   ```
   npm run build
   ```

2. Deploy to Firebase Hosting:
   ```
   firebase deploy --only hosting
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
