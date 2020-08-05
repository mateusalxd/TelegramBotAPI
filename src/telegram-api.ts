import * as TP from './telegram-types';
import Requisicao from './requisicao';

export default class TelegramAPI {
  constructor(private token: string) {
    if (!token) {
      throw new Error('É necessário informar o token do bot');
    }
  }

  /**
   * Use this method to receive incoming updates using long polling (wiki). An Array of Update objects is returned.
   */
  getUpdates(parametros: TP.GetUpdatesParams): Promise<any> {
    return new Requisicao(this.token, 'getUpdates').post(parametros);
  }

  /**
   * Use this method to specify a url and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified url, containing a JSON-serialized Update. In case of an unsuccessful request, we will give up after a reasonable amount of attempts. Returns True on success.
   * If you'd like to make sure that the Webhook request comes from Telegram, we recommend using a secret path in the URL, e.g. https://www.example.com/<token>. Since nobody else knows your bot's token, you can be pretty sure it's us.
   */
  setWebhook(parametros: TP.SetWebhookParams): Promise<boolean> {
    return new Requisicao(this.token, 'setWebhook').post(parametros);
  }

  /**
   * Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. Requires no parameters.
   */
  deleteWebhook(): Promise<boolean> {
    return new Requisicao(this.token, 'deleteWebhook').get();
  }

  /**
   * Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty.
   */
  getWebhookInfo(): Promise<TP.WebhookInfo> {
    return new Requisicao(this.token, 'getWebhookInfo').get();
  }

  /**
   * A simple method for testing your bot's auth token. Requires no parameters. Returns basic information about the bot in form of a User object.
   */
  getMe(): Promise<TP.User> {
    return new Requisicao(this.token, 'getMe').get();
  }

  /**
   * Use this method to send text messages. On success, the sent Message is returned.
   */
  sendMessage(parametros: TP.SendMessageParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendMessage').post(parametros);
  }

  /**
   * Use this method to forward messages of any kind. On success, the sent Message is returned.
   */
  forwardMessage(parametros: TP.ForwardMessageParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'forwardMessage').post(parametros);
  }

  /**
   * Use this method to send photos. On success, the sent Message is returned.
   */
  sendPhoto(parametros: TP.SendPhotoParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendPhoto').post(parametros);
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   * For sending voice messages, use the sendVoice method instead.
   */
  sendAudio(parametros: TP.SendAudioParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendAudio').post(parametros);
  }

  /**
   * Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   */
  sendDocument(parametros: TP.SendDocumentParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendDocument').post(parametros);
  }

  /**
   * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVideo(parametros: TP.SendVideoParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendVideo').post(parametros);
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendAnimation(parametros: TP.SendAnimationParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendAnimation').post(parametros);
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVoice(parametros: TP.SendVoiceParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendVoice').post(parametros);
  }

  /**
   * As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long. Use this method to send video messages. On success, the sent Message is returned.
   */
  sendVideoNote(parametros: TP.SendVideoNoteParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendVideoNote').post(parametros);
  }

  /**
   * Use this method to send a group of photos or videos as an album. On success, an array of the sent Messages is returned.
   */
  sendMediaGroup(parametros: TP.SendMediaGroupParams): Promise<TP.Message[]> {
    return new Requisicao(this.token, 'sendMediaGroup').post(parametros);
  }

  /**
   * Use this method to send point on the map. On success, the sent Message is returned.
   */
  sendLocation(parametros: TP.SendLocationParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendLocation').post(parametros);
  }

  /**
   * Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageLiveLocation(parametros: TP.EditMessageLiveLocationParams): Promise<TP.Message | boolean> {
    return new Requisicao(this.token, 'editMessageLiveLocation').post(parametros);
  }

  /**
   * Use this method to stop updating a live location message before live_period expires. On success, if the message was sent by the bot, the sent Message is returned, otherwise True is returned.
   */
  stopMessageLiveLocation(parametros: TP.StopMessageLiveLocationParams): Promise<TP.Message | boolean> {
    return new Requisicao(this.token, 'stopMessageLiveLocation').post(parametros);
  }

  /**
   * Use this method to send information about a venue. On success, the sent Message is returned.
   */
  sendVenue(parametros: TP.SendVenueParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendVenue').post(parametros);
  }

  /**
   * Use this method to send phone contacts. On success, the sent Message is returned.
   */
  sendContact(parametros: TP.SendContactParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendContact').post(parametros);
  }

  /**
   * Use this method to send a native poll. On success, the sent Message is returned.
   */
  sendPoll(parametros: TP.SendPollParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendPoll').post(parametros);
  }

  /**
   * Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned.
   */
  sendDice(parametros: TP.SendDiceParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendDice').post(parametros);
  }

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success.
   * Example: The ImageBot needs some time to process a request and upload the image. Instead of sending a text message along the lines of "Retrieving image, please wait...", the bot may use sendChatAction with action = upload_photo. The user will see a "sending photo" status for the bot.
   * We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive.
   */
  sendChatAction(parametros: TP.SendChatActionParams): Promise<boolean> {
    return new Requisicao(this.token, 'sendChatAction').post(parametros);
  }

  /**
   * Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object.
   */
  getUserProfilePhotos(parametros: TP.GetUserProfilePhotosParams): Promise<TP.UserProfilePhotos> {
    return new Requisicao(this.token, 'getUserProfilePhotos').post(parametros);
  }

  /**
   * Use this method to get basic info about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again.
   */
  getFile(parametros: TP.GetFileParams): Promise<TP.File> {
    return new Requisicao(this.token, 'getFile').post(parametros);
  }

  /**
   * Use this method to kick a user from a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the group on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
   */
  kickChatMember(parametros: TP.KickChatMemberParams): Promise<boolean> {
    return new Requisicao(this.token, 'kickChatMember').post(parametros);
  }

  /**
   * Use this method to unban a previously kicked user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. Returns True on success.
   */
  unbanChatMember(parametros: TP.UnbanChatMemberParams): Promise<boolean> {
    return new Requisicao(this.token, 'unbanChatMember').post(parametros);
  }

  /**
   * Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate admin rights. Pass True for all permissions to lift restrictions from a user. Returns True on success.
   */
  restrictChatMember(parametros: TP.RestrictChatMemberParams): Promise<boolean> {
    return new Requisicao(this.token, 'restrictChatMember').post(parametros);
  }

  /**
   * Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Pass False for all boolean parameters to demote a user. Returns True on success.
   */
  promoteChatMember(parametros: TP.PromoteChatMemberParams): Promise<boolean> {
    return new Requisicao(this.token, 'promoteChatMember').post(parametros);
  }

  /**
   * Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success.
   */
  setChatAdministratorCustomTitle(parametros: TP.SetChatAdministratorCustomTitleParams): Promise<boolean> {
    return new Requisicao(this.token, 'setChatAdministratorCustomTitle').post(parametros);
  }

  /**
   * Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members admin rights. Returns True on success.
   */
  setChatPermissions(parametros: TP.SetChatPermissionsParams): Promise<boolean> {
    return new Requisicao(this.token, 'setChatPermissions').post(parametros);
  }

  /**
   * Use this method to generate a new invite link for a chat; any previously generated link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns the new invite link as String on success.
   */
  exportChatInviteLink(parametros: TP.ExportChatInviteLinkParams): Promise<string> {
    return new Requisicao(this.token, 'exportChatInviteLink').post(parametros);
  }

  /**
   * Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
   */
  setChatPhoto(parametros: TP.SetChatPhotoParams): Promise<boolean> {
    return new Requisicao(this.token, 'setChatPhoto').post(parametros);
  }

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
   */
  deleteChatPhoto(parametros: TP.DeleteChatPhotoParams): Promise<boolean> {
    return new Requisicao(this.token, 'deleteChatPhoto').post(parametros);
  }

  /**
   * Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
   */
  setChatTitle(parametros: TP.SetChatTitleParams): Promise<boolean> {
    return new Requisicao(this.token, 'setChatTitle').post(parametros);
  }

  /**
   * Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
   */
  setChatDescription(parametros: TP.SetChatDescriptionParams): Promise<boolean> {
    return new Requisicao(this.token, 'setChatDescription').post(parametros);
  }

  /**
   * Use this method to pin a message in a group, a supergroup, or a channel. The bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in the supergroup or 'can_edit_messages' admin right in the channel. Returns True on success.
   */
  pinChatMessage(parametros: TP.PinChatMessageParams): Promise<boolean> {
    return new Requisicao(this.token, 'pinChatMessage').post(parametros);
  }

  /**
   * Use this method to unpin a message in a group, a supergroup, or a channel. The bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in the supergroup or 'can_edit_messages' admin right in the channel. Returns True on success.
   */
  unpinChatMessage(parametros: TP.UnpinChatMessageParams): Promise<boolean> {
    return new Requisicao(this.token, 'unpinChatMessage').post(parametros);
  }

  /**
   * Use this method for your bot to leave a group, supergroup or channel. Returns True on success.
   */
  leaveChat(parametros: TP.LeaveChatParams): Promise<boolean> {
    return new Requisicao(this.token, 'leaveChat').post(parametros);
  }

  /**
   * Use this method to get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.). Returns a Chat object on success.
   */
  getChat(parametros: TP.GetChatParams): Promise<TP.Chat> {
    return new Requisicao(this.token, 'getChat').post(parametros);
  }

  /**
   * Use this method to get a list of administrators in a chat. On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots. If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned.
   */
  getChatAdministrators(parametros: TP.GetChatAdministratorsParams): Promise<TP.ChatMember[]> {
    return new Requisicao(this.token, 'getChatAdministrators').post(parametros);
  }

  /**
   * Use this method to get the number of members in a chat. Returns Int on success.
   */
  getChatMembersCount(parametros: TP.GetChatMembersCountParams): Promise<number> {
    return new Requisicao(this.token, 'getChatMembersCount').post(parametros);
  }

  /**
   * Use this method to get information about a member of a chat. Returns a ChatMember object on success.
   */
  getChatMember(parametros: TP.GetChatMemberParams): Promise<TP.ChatMember> {
    return new Requisicao(this.token, 'getChatMember').post(parametros);
  }

  /**
   * Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
   */
  setChatStickerSet(parametros: TP.SetChatStickerSetParams): Promise<boolean> {
    return new Requisicao(this.token, 'setChatStickerSet').post(parametros);
  }

  /**
   * Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success.
   */
  deleteChatStickerSet(parametros: TP.DeleteChatStickerSetParams): Promise<boolean> {
    return new Requisicao(this.token, 'deleteChatStickerSet').post(parametros);
  }

  /**
   * Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned.
   * Alternatively, the user can be redirected to the specified Game URL. For this option to work, you must first create a game for your bot via @Botfather and accept the terms. Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter.
   */
  answerCallbackQuery(parametros: TP.AnswerCallbackQueryParams): Promise<boolean> {
    return new Requisicao(this.token, 'answerCallbackQuery').post(parametros);
  }

  /**
   * Use this method to change the list of the bot's commands. Returns True on success.
   */
  setMyCommands(parametros: TP.SetMyCommandsParams): Promise<boolean> {
    return new Requisicao(this.token, 'setMyCommands').post(parametros);
  }

  /**
   * Use this method to get the current list of the bot's commands. Requires no parameters. Returns Array of BotCommand on success.
   */
  getMyCommands(): Promise<TP.BotCommand[]> {
    return new Requisicao(this.token, 'getMyCommands').get();
  }

  /**
   * Use this method to edit text and game messages. On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageText(parametros: TP.EditMessageTextParams): Promise<TP.Message | boolean> {
    return new Requisicao(this.token, 'editMessageText').post(parametros);
  }

  /**
   * Use this method to edit captions of messages. On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageCaption(parametros: TP.EditMessageCaptionParams): Promise<TP.Message | boolean> {
    return new Requisicao(this.token, 'editMessageCaption').post(parametros);
  }

  /**
   * Use this method to edit animation, audio, document, photo, or video messages. If a message is a part of a message album, then it can be edited only to a photo or a video. Otherwise, message type can be changed arbitrarily. When inline message is edited, new file can't be uploaded. Use previously uploaded file via its file_id or specify a URL. On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageMedia(parametros: TP.EditMessageMediaParams): Promise<TP.Message | boolean> {
    return new Requisicao(this.token, 'editMessageMedia').post(parametros);
  }

  /**
   * Use this method to edit only the reply markup of messages. On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageReplyMarkup(parametros: TP.EditMessageReplyMarkupParams): Promise<TP.Message | boolean> {
    return new Requisicao(this.token, 'editMessageReplyMarkup').post(parametros);
  }

  /**
   * Use this method to stop a poll which was sent by the bot. On success, the stopped Poll with the final results is returned.
   */
  stopPoll(parametros: TP.StopPollParams): Promise<TP.Poll> {
    return new Requisicao(this.token, 'stopPoll').post(parametros);
  }

  /**
   * Use this method to delete a message, including service messages, with the following limitations:- A message can only be deleted if it was sent less than 48 hours ago.- A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.- Bots can delete outgoing messages in private chats, groups, and supergroups.- Bots can delete incoming messages in private chats.- Bots granted can_post_messages permissions can delete outgoing messages in channels.- If the bot is an administrator of a group, it can delete any message there.- If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.Returns True on success.
   */
  deleteMessage(parametros: TP.DeleteMessageParams): Promise<boolean> {
    return new Requisicao(this.token, 'deleteMessage').post(parametros);
  }

  /**
   * Use this method to send static .WEBP or animated .TGS stickers. On success, the sent Message is returned.
   */
  sendSticker(parametros: TP.SendStickerParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendSticker').post(parametros);
  }

  /**
   * Use this method to get a sticker set. On success, a StickerSet object is returned.
   */
  getStickerSet(parametros: TP.GetStickerSetParams): Promise<TP.StickerSet> {
    return new Requisicao(this.token, 'getStickerSet').post(parametros);
  }

  /**
   * Use this method to upload a .PNG file with a sticker for later use in createNewStickerSet and addStickerToSet methods (can be used multiple times). Returns the uploaded File on success.
   */
  uploadStickerFile(parametros: TP.UploadStickerFileParams): Promise<TP.File> {
    return new Requisicao(this.token, 'uploadStickerFile').post(parametros);
  }

  /**
   * Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. You must use exactly one of the fields png_sticker or tgs_sticker. Returns True on success.
   */
  createNewStickerSet(parametros: TP.CreateNewStickerSetParams): Promise<boolean> {
    return new Requisicao(this.token, 'createNewStickerSet').post(parametros);
  }

  /**
   * Use this method to add a new sticker to a set created by the bot. You must use exactly one of the fields png_sticker or tgs_sticker. Animated stickers can be added to animated sticker sets and only to them. Animated sticker sets can have up to 50 stickers. Static sticker sets can have up to 120 stickers. Returns True on success.
   */
  addStickerToSet(parametros: TP.AddStickerToSetParams): Promise<boolean> {
    return new Requisicao(this.token, 'addStickerToSet').post(parametros);
  }

  /**
   * Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success.
   */
  setStickerPositionInSet(parametros: TP.SetStickerPositionInSetParams): Promise<boolean> {
    return new Requisicao(this.token, 'setStickerPositionInSet').post(parametros);
  }

  /**
   * Use this method to delete a sticker from a set created by the bot. Returns True on success.
   */
  deleteStickerFromSet(parametros: TP.DeleteStickerFromSetParams): Promise<boolean> {
    return new Requisicao(this.token, 'deleteStickerFromSet').post(parametros);
  }

  /**
   * Use this method to set the thumbnail of a sticker set. Animated thumbnails can be set for animated sticker sets only. Returns True on success.
   */
  setStickerSetThumb(parametros: TP.SetStickerSetThumbParams): Promise<boolean> {
    return new Requisicao(this.token, 'setStickerSetThumb').post(parametros);
  }

  /**
   * Use this method to send answers to an inline query. On success, True is returned.No more than 50 results per query are allowed.
   */
  answerInlineQuery(parametros: TP.AnswerInlineQueryParams): Promise<boolean> {
    return new Requisicao(this.token, 'answerInlineQuery').post(parametros);
  }

  /**
   * Use this method to send invoices. On success, the sent Message is returned.
   */
  sendInvoice(parametros: TP.SendInvoiceParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendInvoice').post(parametros);
  }

  /**
   * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned.
   */
  answerShippingQuery(parametros: TP.AnswerShippingQueryParams): Promise<boolean> {
    return new Requisicao(this.token, 'answerShippingQuery').post(parametros);
  }

  /**
   * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
   */
  answerPreCheckoutQuery(parametros: TP.AnswerPreCheckoutQueryParams): Promise<boolean> {
    return new Requisicao(this.token, 'answerPreCheckoutQuery').post(parametros);
  }

  /**
   * Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success.
   * Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues.
   */
  setPassportDataErrors(parametros: TP.SetPassportDataErrorsParams): Promise<boolean> {
    return new Requisicao(this.token, 'setPassportDataErrors').post(parametros);
  }

  /**
   * Use this method to send a game. On success, the sent Message is returned.
   */
  sendGame(parametros: TP.SendGameParams): Promise<TP.Message> {
    return new Requisicao(this.token, 'sendGame').post(parametros);
  }

  /**
   * Use this method to set the score of the specified user in a game. On success, if the message was sent by the bot, returns the edited Message, otherwise returns True. Returns an error, if the new score is not greater than the user's current score in the chat and force is False.
   */
  setGameScore(parametros: TP.SetGameScoreParams): Promise<TP.Message | boolean> {
    return new Requisicao(this.token, 'setGameScore').post(parametros);
  }

  /**
   * Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. On success, returns an Array of GameHighScore objects.
   * This method will currently return scores for the target user, plus two of their closest neighbors on each side. Will also return the top three users if the user and his neighbors are not among them. Please note that this behavior is subject to change.
   */
  getGameHighScores(parametros: TP.GetGameHighScoresParams): Promise<TP.GameHighScore[]> {
    return new Requisicao(this.token, 'getGameHighScores').post(parametros);
  }
}
