export interface ChatMessage {
  role: 'user' | 'aeon';
  text: string;
}

export interface VideoRecommendationRequest {
  topic: string;
  awareness: string;
  context: string;
}

export interface VideoRecommendationResponse {
  title: string;
  url?: string;
  channel: string;
  why: string;
  searchTerms?: string;
  mustCover?: string;
  quizQuestion?: string;
  quizHint?: string;
}
