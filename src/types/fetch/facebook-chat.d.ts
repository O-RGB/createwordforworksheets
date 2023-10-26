interface IFacebookChat {
  data: Conversation[];
}

interface AttachmentData {
  image_data?: {
    width?: number;
    height?: number;
    max_width?: number;
    max_height?: number;
    url?: string;
    preview_url?: string;
    image_type?: number;
    render_as_sticker?: boolean;
  };

  file_url?: string;
  mime_type?: string;
  name?: string;
  id: string;
}

interface Participant {
  name: string;
  email: string;
  id: string;
}

interface Message {
  message: string;
  attachments: {
    data: AttachmentData[];
  };
  from: Participant;
  id: string;
}

interface Conversation {
  participants: {
    data: Participant[];
  };
  messages: {
    data: Message[];
  };
  id: string;
}

interface ConversationsResponse {
  data: Conversation[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
}
