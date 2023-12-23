import prisma from "@/app/libs/prisma";

export async function POST(request) {
    const {anime_mal_id, user_email, anime_image, anime_title} = await request.json()
    const data = {anime_mal_id, user_email, anime_image, anime_title}

    const createCollection = await prisma.collection.create({data})
    if (!createCollection) return Response.json({status: 500, isCreated: false})
    else return Response.json({status: 200, isCreated: true, data: createCollection})
}

export async function DELETE(request) {
    const {anime_mal_id, user_email} = await request.json()
    const deleteCollection = await prisma.collection.delete({ where: { user_email_anime_mal_id: {anime_mal_id, user_email} } })
    
    if (!deleteCollection) return Response.json({status: 500, isDeleted: false})
    else return Response.json({status: 200, isDeleted: true})
}