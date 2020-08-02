export type Recurso =
  | 'setWebhook'
  | 'getWebhookInfo'
  | 'deleteWebhook'
  | 'getMe'
  | 'sendMessage'
  | 'forwardMessage'
  | 'sendMediaGroup'
  | 'leaveChat'
  | 'getChat'
  | 'getChatAdministrators'
  | 'getChatMembersCount'
  | 'getChatMember'
  | 'editMessageText'
  | 'editMessageCaption'
  | 'editMessageMedia'
  | 'deleteMessage';

export type User = {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  can_join_groups?: boolean;
  can_read_all_group_messages?: boolean;
  supports_inline_queries?: boolean;
};

export type ResponseParameters = {
  migrate_to_chat_id?: number;
  retry_after?: number;
};

export type APIResponse = {
  ok: boolean;
  error_code?: number;
  description?: string;
  result?: any;
  parameters?: ResponseParameters;
};
