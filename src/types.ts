export interface Job {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
  description: string;
  tags: string[];
  posted: string;
}

export interface CareerAdvice {
  advice: string;
}
