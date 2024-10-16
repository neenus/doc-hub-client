export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string;
};

export interface Task {
  _id: string;
  title: string;
  description: string;
  frequency: string;
  dueDate: string;
  completed: boolean;
  dateCompleted: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
  assignedTo: User;
  notes: string;
}