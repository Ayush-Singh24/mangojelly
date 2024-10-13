export interface User {
  id: number;
  name: string;
}

export interface Message {
  id: number;
  text: string;
  user: User;
}

export interface ChatState {
  messages: Message[];
  currentUser: User;
  isLoading: boolean;
  error: string | null;
}
