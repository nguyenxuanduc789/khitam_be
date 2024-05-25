var cron = require('node-cron');
const { findBoxById, findAndUpdateStatusBox, isBoxOfUser } = require("../models/repositories/search_box.repository")
const search_box = require("../models/search_box")
const stranger_chat_recent = require("../models/stranger_chat_recent")
const stranger_chat_conversation = require("../models/stranger_chat_conversation")
const queue = require("../models/queue")
cron.schedule('*/5 * * * * *', () => {
  ['study', 'community'].forEach(async element => {
    const randomFindUserInQueue = await queue.findOne({ find_type: element }, {}, { sort: { createAt: 1 } });
    if (!randomFindUserInQueue) {
      return true;
    }
    const randomSelectedStrangerInQueue = await queue.findOne({ find_type: randomFindUserInQueue.find_type, user_id: { $ne: String(randomFindUserInQueue.user_id) } });
    console.log({ randomFindUserInQueue, randomSelectedStrangerInQueue })
    if (randomSelectedStrangerInQueue) {
      const foundBoxUser = await findAndUpdateStatusBox({ box_id: randomFindUserInQueue.box_id, user_id: randomFindUserInQueue.user_id, status: 'found' });
      const foundBoxStranger = await findAndUpdateStatusBox({ box_id: randomSelectedStrangerInQueue.box_id, user_id: randomSelectedStrangerInQueue.user_id, status: 'found' });
      console.log({ foundBoxUser, foundBoxStranger })
      if (foundBoxUser && foundBoxStranger) {

        const foundChatRecentExists = await search_box.count({
          $or: [
            { from_box_id: foundBoxStranger._id, to_box_id: foundBoxUser._id },
            { from_box_id: foundBoxUser._id, to_box_id: foundBoxStranger._id },
          ]
        })
        const onlineUsers = global._onlineUsers;
        const io = global._io;
        //tìm xong r thì xóa trong queue
        const removeUserAndStrangerInQueue = await queue.deleteMany({
          $or: [
            { _id: randomFindUserInQueue._id },
            { _id: randomSelectedStrangerInQueue._id }
          ]
        })
        //


        if (!foundChatRecentExists) {
          const data = {
            from_id: foundBoxUser.user_id,
            to_id: foundBoxStranger.user_id,
            from_box_id: foundBoxUser._id,
            to_box_id: foundBoxStranger._id,
            channel: "chat_with_stranger"
          }
          const new_conversation_chat = await stranger_chat_recent.create(data).then(async (new_recent_chat) => {
            return await stranger_chat_recent.findById(new_recent_chat._id).populate({
              path: 'from_id',
              select: 'name',
            }).populate({
              path: 'to_id',
              select: 'name',
            }).lean()
          });
          onlineUsers.forEach((u_id, sket_id) => {
            if (String(new_conversation_chat.from_id._id) == u_id || String(new_conversation_chat.to_id._id) == u_id) {
              io.to(sket_id).emit('ready-to-chat', new_conversation_chat)
            }
          });
          return new_conversation_chat;
        } else {
          const update_data = {
            from_id: foundBoxUser.user_id,
            to_id: foundBoxStranger.user_id,
            from_box_id: foundBoxUser._id,
            to_box_id: foundBoxStranger._id,
            channel: "chat_with_stranger"
          }
          const update_conversation_chat = await stranger_chat_recent.findOneAndUpdate({
            $or: [
              { from_box_id: foundBoxStranger._id, to_box_id: foundBoxUser._id },
              { from_box_id: foundBoxUser._id, to_box_id: foundBoxStranger._id },
            ]
          }, update_data, {
            new: true
          }).populate({
            path: 'from_id',
            select: 'name',
          }).populate({
            path: 'to_id',
            select: 'name',
          }).lean();
          onlineUsers.forEach((u_id, sket_id) => {
            if (String(update_conversation_chat.from_id._id) == u_id || String(update_conversation_chat.to_id._id) == u_id) {
              io.to(sket_id).emit('ready-to-chat', update_conversation_chat)
            }
          });
          return update_conversation_chat;
        }


      }
      return false;
    }
  });

});

