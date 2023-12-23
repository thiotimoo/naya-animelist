import prisma from "@/app/libs/prisma";
import React from "react";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const CommentBox = async ({ anime_mal_id }) => {
    let commentsData;
    let commentsError;
    try {
        commentsData = await prisma.comment.findMany({
            where: { anime_mal_id },
        });
    } catch (error) {
        commentsError =
            "Error connecting to the database: " + error.message.toString();
    }
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {commentsData && commentsData.map((comment) => {
                return (
                    <div
                        key={comment.id}
                        className="rounded-xl bg-zinc-900 p-6"
                    >
                        <p className="text-xs font-bold">{comment.username}</p>
                        <p className="text-lg font-bold text-ellipsis overflow-hidden">{comment.comment}</p>
                        <p className="text-xs">
                            {comment?.createdAt && timeAgo.format(comment.createdAt)}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default CommentBox;
