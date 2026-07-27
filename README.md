# 🦺 Smart Safety Vest - Monitoring System

A comprehensive real-time monitoring system for safety vests equipped with multiple sensors. This web-based admin dashboard provides real-time alerts, sensor data tracking, worker monitoring, and safety analytics for industrial and hazardous environments.

## 🌟 Features

### Core Functionality
- **Real-Time Monitoring**: Live sensor data streaming from safety vests via Firebase
- **Alert Management**: Instant critical alerts with audio notifications and visual popups
- **GPS Tracking**: Real-time location tracking of workers on interactive Leaflet maps
- **Sensor History**: Comprehensive historical data logging of all sensor readings
- **Safety Analytics**: Automated PDF report generation with worker safety analysis
- **User Management**: Admin panel for managing workers and emergency contacts

### Sensor Integration
- **Temperature Monitoring**: Real-time temperature tracking with threshold alerts
- **Humidity Detection**: Environmental humidity level monitoring
- **Gas Level Sensors**: Hazardous gas detection (PPM readings)
- **Heart Rate Monitoring**: Worker vital signs with abnormal rate detection
- **Fall Detection**: Automatic fall alert system for worker safety
- **GPS Location**: Precise worker location tracking

### Admin Dashboard
- **Live Status Indicators**: Connection status, worker status, and safety conditions
- **Interactive Charts**: Real-time visualization of sensor trends (Chart.js)
- **Alert Counter**: Badge notifications for new alerts
- **Responsive Design**: Mobile-friendly interface for on-the-go monitoring

## 📋 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Features in Detail](#features-in-detail)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Firebase project account
- Node.js (optional, for local development)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/SPDSamarakkodi/SafetyVest-Web.git
   cd SafetyVest-Web
   ```

2. **Configure Firebase credentials**
   - Update `js/firebase.js` with your Firebase project credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     databaseURL: "YOUR_DATABASE_URL",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

3. **Set up Firebase Database**
   - Create Firebase Realtime Database with the following structure:
   ```
   /
   ├── sensor/
   │   ├── temperature
   │   ├── humidity
   │   ├── gas
   │   ├── heartRate
   │   └── fall
   ├── gps/
   │   ├── latitude
   │   └── longitude
   ├── history/
   │   └── [timestamp data...]
   ├── alerts/
   │   └── [alert entries...]
   └── users/
       └── [user profiles...]
   ```

4. **Deploy**
   - Option A: Use Firebase Hosting
     ```bash
     npm install -g firebase-tools
     firebase login
     firebase init hosting
     firebase deploy
     ```
   - Option B: Deploy to any static web hosting (Vercel, Netlify, GitHub Pages, etc.)

## ⚙️ Configuration

### Firebase Rules (Security)
Set up proper Firebase Realtime Database rules in your Firebase Console:

```json
{
  "rules": {
    "sensor": {
      ".read": "auth != null",
      ".write": false
    },
    "gps": {
      ".read": "auth != null",
      ".write": false
    },
    "history": {
      ".read": "auth != null",
      ".write": false
    },
    "alerts": {
      ".read": "auth != null",
      ".write": false
    },
    "users": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

### Audio Alert Configuration
- Replace `assets/alarm.mp3` with your preferred alert sound
- Audio file should be in MP3 format for maximum compatibility

## 📖 Usage

### Admin Login
1. Navigate to the application home page
2. Enter your Firebase-authenticated email and password
3. Click "Sign In"

### Dashboard Navigation
- **Dashboard**: Main real-time monitoring view
- **History**: View historical sensor data with search functionality
- **Alerts**: Manage and acknowledge critical alerts
- **Users**: Manage worker profiles and emergency contacts

### Generating Safety Reports
1. Go to **History** page
2. Click "Generate Safety Report" button
3. PDF will automatically download with:
   - Worker information
   - Sensor statistics (averages, maximums)
   - Historical sensor data table
   - GPS information
   - Alert summary
   - Overall safety status

## 📁 Project Structure

```
SafetyVest-Web/
├── index.html                 # Login page
├── dashboard.html             # Main dashboard
├── css/
│   ├── dashboard.css         # Dashboard styling
│   └── login.css             # Login page styling
├── js/
│   ├── firebase.js           # Firebase configuration
│   ├── auth.js               # Authentication logic
│   ├── dashboard.js          # Dashboard functionality
│   ├── charts.js             # Chart.js integration
│   ├── map.js                # Leaflet map integration
│   ├── alerts.js             # Alert management
│   ├── history.js            # History data handling
│   ├── reports.js            # PDF report generation
│   ├── users.js              # User management
│   └── logo.js               # Logo base64 encoding
├── pages/
│   ├── history.html          # Sensor history page
│   ├── alerts.html           # Alert management page
│   └── users.html            # User management page
├── assets/
│   └── alarm.mp3             # Alert sound
├── screenshots/              # Screenshot images
└── .gitignore
```

## 📸 Screenshots

### 1. Login Page
Admin authentication interface with email and password fields.

![Login Page](https://raw.githubusercontent.com/SPDSamarakkodi/SafetyVest-Web/main/screenshots/01-login.png)

---

### 2. Dashboard - Real-Time Monitoring
Main dashboard displaying real-time sensor data and worker status.

![Dashboard Overview](https://raw.githubusercontent.com/SPDSamarakkodi/SafetyVest-Web/main/screenshots/02-dashboard-overview.png)

---

### 3. Sensor Cards Detail
Live sensor data cards showing temperature, humidity, gas levels, and heart rate.

![Sensor Cards](https://raw.githubusercontent.com/SPDSamarakkodi/SafetyVest-Web/main/screenshots/03-sensor-cards.png)

---

### 4. Live GPS Map
Interactive map showing real-time worker location tracking.

![GPS Tracking Map](https://raw.githubusercontent.com/SPDSamarakkodi/SafetyVest-Web/main/screenshots/04-gps-map.png)

---

### 5. Alert Notification Popup
Real-time alert notification with critical information and actions.

![Alert Notification](https://raw.githubusercontent.com/SPDSamarakkodi/SafetyVest-Web/main/screenshots/05-alert-popup.png)

---

### 6. Alerts Management Page
Complete alert history with filtering and acknowledgment controls.

![Alerts Management](https://raw.githubusercontent.com/SPDSamarakkodi/SafetyVest-Web/main/screenshots/06-alerts-page.png)

---

### 7. Sensor History Page
Historical sensor data table with search and report generation.

![Sensor History](https://raw.githubusercontent.com/SPDSamarakkodi/SafetyVest-Web/main/screenshots/07-history-page.png)

---

### 8. User Management Page
Worker profile management with role assignment and emergency contacts.

![User Management](https://raw.githubusercontent.com/SPDSamarakkodi/SafetyVest-Web/main/screenshots/08-users-page.png)

---

### 9. PDF Safety Report
Generated PDF report with comprehensive worker safety analysis.

![Safety Report PDF](https://raw.githubusercontent.com/SPDSamarakkodi/SafetyVest-Web/main/screenshots/09-safety-report.png)

---

### 10. Mobile Responsive View
Responsive design adapting to mobile and tablet devices.

![Mobile View](https://raw.githubusercontent.com/SPDSamarakkodi/SafetyVest-Web/main/screenshots/10-mobile-responsive.png)

---

## 🛠 Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with custom properties and animations
- **Bootstrap 5**: Responsive grid and components
- **Bootstrap Icons**: Icon library for UI elements

### JavaScript Libraries
- **Firebase SDK**: Real-time database and authentication
- **Chart.js**: Data visualization and trend charts
- **Leaflet**: Interactive mapping and GPS tracking
- **jsPDF**: PDF document generation
- **jsPDF-AutoTable**: Table formatting in PDF reports

### Backend/Database
- **Firebase Realtime Database**: Real-time data synchronization
- **Firebase Authentication**: Secure admin login
- **Firebase Hosting**: Optional deployment platform

### Development Tools
- Git & GitHub
- Firebase Console

## ✨ Features in Detail

### Real-Time Alerts
- **Multi-level Severity**: Critical, Warning, Info levels
- **Audio Notifications**: Automatic alarm sound for critical alerts
- **Visual Indicators**: Color-coded alert types
- **Smart Acknowledgment**: Mark alerts as checked to dismiss
- **Alert Counting**: Live badge counter showing new alerts

### Data Analytics
- **Sensor Trends**: Multi-line charts showing temperature, gas, heart rate, humidity
- **Statistical Analysis**: Average and maximum values in reports
- **Time-Series Data**: Historical data with timestamps
- **Search Functionality**: Filter history by any parameter

### Worker Safety
- **Vital Monitoring**: Heart rate with abnormal detection (60-120 BPM range)
- **Fall Detection**: Instant alerts for fall events
- **Environmental Hazards**: Gas level and temperature monitoring
- **Emergency Contacts**: Quick access to worker emergency information

### Admin Controls
- **User Management**: Add, edit, delete worker profiles
- **Role-Based Access**: Worker, Supervisor, Admin roles
- **Report Generation**: One-click safety report PDF download
- **Real-Time Status**: Firebase connection and worker online status

## 🔐 Security Features

- **Firebase Authentication**: Secure email/password login
- **Auth Protection**: Automatic redirect for unauthenticated users
- **Database Rules**: Row-level security with Firebase rules
- **Session Management**: Local storage for admin session tracking
- **HTTPS**: Secure data transmission

## 📊 Data Flow

```
Safety Vest Sensors 
    ↓
Firebase Realtime Database
    ↓
Web Dashboard
    ├── Real-time Updates (WebSockets)
    ├── Alert Notifications
    ├── Chart Visualization
    └── GPS Mapping
    ↓
Admin Actions (Acknowledge, Report Generation)
```

## 🎨 Customization

### Color Scheme
Modify CSS variables in the style blocks:
```css
:root {
  --primary: #1a56db;
  --danger: #ef4444;
  --success: #10b981;
  --warning: #f59e0b;
  /* ... customize colors */
}
```

### Sensor Thresholds
Update thresholds in `js/dashboard.js`:
```javascript
// Temperature threshold
if(data.temperature > 40) { /* alert */ }

// Heart rate threshold
if(data.heartRate < 60 || data.heartRate > 120) { /* alert */ }

// Gas threshold
if(data.gas >= 950) { /* alert */ }
```

### Alert Sound
Replace the audio file path:
```javascript
let alertAudio = new Audio("assets/your-alarm.mp3");
```

## 🚨 Troubleshooting

### Firebase Connection Issues
- Verify Firebase credentials in `js/firebase.js`
- Check Firebase Realtime Database is enabled
- Ensure database rules allow read access for authenticated users
- Check browser console for Firebase errors

### Alerts Not Appearing
- Verify alert data structure in Firebase console
- Check that alert status is "NEW" or null
- Ensure audio file exists at `assets/alarm.mp3`
- Check browser autoplay permissions for audio

### Map Not Loading
- Verify Leaflet CSS and JS are loaded
- Check that GPS data exists in Firebase at `gps/latitude` and `gps/longitude`
- Ensure map container has height defined

### PDF Generation Fails
- Verify jsPDF and jsPDF-AutoTable libraries are loaded
- Check that logoBase64 is defined in `js/logo.js`
- Ensure history data exists in Firebase

### Screenshots Not Displaying
- Verify all image files are in `screenshots/` folder with correct names
- Ensure filenames match exactly (case-sensitive):
  - `01-login.png`
  - `02-dashboard-overview.png`
  - `03-sensor-cards.png`
  - `04-gps-map.png`
  - `05-alert-popup.png`
  - `06-alerts-page.png`
  - `07-history-page.png`
  - `08-users-page.png`
  - `09-safety-report.png`
  - `10-mobile-responsive.png`
- Images should be in PNG format (recommended)
- File sizes should be < 5MB per image

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, email: pavansamarakkodi@gmail.com or open an issue on GitHub.

## 🙏 Acknowledgments

- Bootstrap for responsive UI framework
- Firebase for real-time database and authentication
- Chart.js for data visualization
- Leaflet for mapping functionality
- Bootstrap Icons for icon library

---

**Last Updated**: July 2026
**Version**: 1.0.0
**Status**: Active Development
**Repository**: [SafetyVest-Web](https://github.com/SPDSamarakkodi/SafetyVest-Web)
