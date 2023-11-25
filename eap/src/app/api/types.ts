export type school_type = {
    id: number,
    name: string
}

export type prefernce_type = {
    id: number,
    name: string,
    icon: string
}

export type JWTToken = {
    name: string,
    school: string,
    createdAt: Date,
    profilePic: string,
    preferences: {
        id: number,
        name: string,
        icon: string
    }[],
    exp: number,
    sub: string,
    iat: number,
}

export type select_type = {
    label: string;
    value: number;
  };

export type article_type = {
    id: string,
    coverUrl: string,
    articleCover: string,
    description: string,
    content: string,
    title: string,
    category: number,
    createdAt: Date,
    author: {
        id: string,
        name: string,
        createdAt: Date,
        profilePic: string,
        School: {
            id: number,
            name: string,
        };
    },
    likes: number,
    comments: number,
    likedByUser: boolean,
    fullComments: comment_type[],
    interactions: number
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