export type classes_type = {
    id: number,
    className: string
}

export type JWTToken = {
    name: string,
    className: string,
    createdAt: Date,
    profilePic: string,
    exp: number,
    sub: string,
    iat: number,
}

export type post_type = {
    id: string,
    coverUrl: string,
    content: string,
    createdAt: Date,
    user: {
        userClass: string,
        name: string,
        profilePic: string,
        id: string
    },
    likes: number,
    comments: number,
    likedByUser: boolean,
    fullComments: comment_type[]
}

export type comment_type = {
    id: string,
    user: {
        className: string,
        name: string,
        profilePic: string,
        id: string
    },
    content: string,
    createdAt: Date
}

export type user_type = {
    id: string,
    preferences: {
        id: number,
        title: string,
        icon: string
    }[],
    profilePic: string,
    followers: number,
    following: number,
    name: string,
    description: string,
    followedByUser: boolean,
    posts: {
        coverUrl: string,
        id: string
    }[],
    className: { 
        id: number, className: string 
    }
}
export type user_to_update_type = {
    id: string,
    preferences: {
        id: number,
        title: string,
        icon: string
    }[],
    profilePic: string,
    name: string,
    description: string,
    classId: number,
}
export type resumed_user_type = {
    id: string,
    profilePic: string,
    name: string,
    userClass: string,
    followedByUser: boolean
}