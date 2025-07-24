import { Timestamp } from 'firebase/firestore';

export interface UserData {
  id: string;
  uid: string;
  email: string | null;
  role: 'admin' | 'staff' | 'pending' | 'rejected';
  createdAt: Timestamp;
}
