export interface IdCardOption {
  id: string;
  name: string;
  description?: string;
  icon: string;
  type: 'physical' | 'mobile';
}

export interface BankOption {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  type: 'question' | 'answer';
  content: string;
  timestamp: Date;
  selectedOption?: IdCardOption;
} 