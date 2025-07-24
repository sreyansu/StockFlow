# InventoryPro - Real-time Inventory Management System

A comprehensive, enterprise-grade inventory management system built with React, Firebase, and modern web technologies. This system provides real-time stock monitoring, role-based access control, and advanced analytics for businesses of all sizes.

## 🚀 Features

### Core Functionality
- **Real-time Product Management**: Add, edit, and track products with live updates
- **Category Management**: Organize products into categories with dedicated managers
- **Stock Monitoring**: Live stock level tracking with automated alerts
- **Role-based Access Control**: Admin and Staff roles with category-specific permissions
- **Inventory Movement Tracking**: Complete audit trail of all stock operations
- **Smart Alerts**: Automated notifications for low stock and reorder triggers

### Advanced Features
- **Dashboard Analytics**: Interactive charts and real-time statistics
- **Search & Filtering**: Advanced product search with multiple filter options
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Live data synchronization across all users
- **Professional UI**: Clean, modern interface with smooth animations

## 🛠 Tech Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase Firestore (NoSQL Database)
- **Authentication**: Firebase Auth
- **Real-time**: Firestore real-time listeners
- **Icons**: Heroicons
- **Charts**: Chart.js with React integration
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM

## 📋 Prerequisites

Before running this application, ensure you have:

1. **Node.js** (v16 or higher)
2. **Firebase Project** with Firestore and Authentication enabled
3. **Firebase Configuration** keys

## ⚙️ Setup Instructions

### 1. Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Firestore Database** in test mode
3. Enable **Authentication** with Email/Password provider
4. Get your Firebase configuration from Project Settings

### 2. Configure Firebase

Update the Firebase configuration in `src/config/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 3. Create Initial Data

#### Users Collection
Create a `users` collection in Firestore with sample users:

```javascript
// Document ID: user-admin-id
{
  uid: "user-admin-id",
  email: "admin@inventory.com",
  role: "admin",
  createdAt: new Date(),
  lastLogin: new Date()
}

// Document ID: user-staff-id
{
  uid: "user-staff-id",
  email: "staff@inventory.com",
  role: "staff",
  assignedCategories: ["category-1-id"],
  createdAt: new Date(),
  lastLogin: new Date()
}
```

#### Categories Collection
Create sample categories:

```javascript
// Document ID: category-1-id
{
  name: "Electronics",
  description: "Electronic devices and accessories",
  managerId: "user-staff-id",
  createdAt: new Date(),
  updatedAt: new Date()
}
```

#### Products Collection
Create sample products:

```javascript
{
  name: "Laptop",
  description: "High-performance laptop",
  sku: "LAP-001",
  categoryId: "category-1-id",
  currentStock: 50,
  minThreshold: 10,
  maxThreshold: 100,
  unitPrice: 999.99,
  supplier: "Tech Corp",
  createdAt: new Date(),
  updatedAt: new Date(),
  lastRestocked: new Date()
}
```

### 4. Authentication Setup

In Firebase Authentication, create user accounts:
- **Admin**: admin@inventory.com / admin123
- **Staff**: staff@inventory.com / staff123

## 🚀 Running the Application

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the Application**:
   Open http://localhost:5173 in your browser

## 👥 User Roles & Permissions

### Admin Users
- Full system access
- Manage all products and categories
- User management capabilities
- System settings access
- Complete analytics dashboard

### Staff Users (Category Managers)
- Access only to assigned categories
- Manage products within assigned categories
- View category-specific analytics
- Limited system access

## 📊 Key Features Explanation

### Real-time Dashboard
- Live stock statistics
- Low stock alerts
- Recent inventory movements
- Quick action buttons
- Category-wise analytics

### Product Management
- Advanced search and filtering
- Bulk operations support
- Stock level indicators
- Category assignment
- Supplier tracking

### Inventory Tracking
- Complete movement history
- Automated logging
- User attribution
- Timestamp tracking
- Reason codes

### Alert System
- Low stock notifications
- Out of stock alerts
- Reorder triggers
- Real-time browser notifications
- Email integration ready

## 🔧 Customization

### Adding New Features
The system is built with modularity in mind. Key areas for extension:

- **src/components/**: Add new UI components
- **src/types/**: Define new data structures  
- **src/contexts/**: Add new context providers
- **Firebase Rules**: Update security rules for new collections

### Styling Customization
- Modify **tailwind.config.js** for theme changes
- Update color schemes in component files
- Customize animations and transitions

## 📈 Production Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Security Considerations
- Enable Firestore security rules
- Configure proper CORS settings
- Set up user authentication rules
- Enable audit logging
- Regular security updates

## 🛡️ Security Features

- **Authentication**: Firebase Auth with secure token management
- **Authorization**: Role-based access control
- **Data Protection**: Firestore security rules
- **Input Validation**: Client and server-side validation
- **Audit Trail**: Complete operation logging

## 📱 Responsive Design

The application is fully responsive with optimized layouts for:
- **Desktop**: Full-featured dashboard
- **Tablet**: Adapted navigation and content
- **Mobile**: Touch-optimized interface

## 🎯 Performance Optimizations

- **Real-time Updates**: Efficient Firestore listeners
- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Compressed assets
- **Caching**: Browser and Firebase caching
- **Bundle Optimization**: Tree shaking and minification

## 📞 Support & Documentation

For additional support or custom development:
- Review component documentation in code
- Check Firebase documentation for backend features
- Refer to React and TypeScript docs for frontend development

## 🔄 Future Enhancements

Planned features for upcoming versions:
- **Advanced Analytics**: Predictive analytics and forecasting
- **Multi-location Support**: Warehouse management
- **Barcode Scanning**: Mobile barcode integration
- **API Integration**: Third-party system connections
- **Advanced Reporting**: Custom report generation
- **Mobile App**: React Native companion app

---

This system provides a solid foundation for enterprise inventory management with room for extensive customization and scaling.