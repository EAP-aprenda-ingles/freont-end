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

export type resumed_article_type = {
    id: string;
    description: string;
    title: string;
    coverUrl: string;
    user: {
        name: string;
        profilePic: string;
        id: string;
    };
    createdAt: Date;
    comments: {
        id: number;
        user: {
            id: string;
            createdAt: Date;
            name: string;
            profilePic: string;
        };
        content: string;
        happenedAt: Date;
    }[];
    category: {
        id: string,
        name: string
    };
}

export type comment_type = {
    id: number;
    content: string;
    happenedAt: string;
    user: {
        id: string;
        name: string;
        createdAt: string;
        profilePic: string;
    };
}

export type user_type = {
    id: string,
    preferences: {
        id: number,
        name: string,
        icon: string
    }[],
    profilePic: string,
    followers: number,
    following: number,
    name: string,
    description: string,
    followedByUser: boolean,
    articles: {
        coverUrl: string,
        id: string,
        articleCover: string
    }[],
    school: { 
        id: number, name: string 
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

export type file_type = {
    id: string,
    file: string[],
    description: string,
    title: string,
    coverUrl: string,
    user: {
        name: string,
        profilePic: string,
        id: string,
        school: string
    },
    createdAt: string,
    actions: word_type[],
    category: {
        id: number,
        name: string
    }
}

export type word_type = {
    word: string,
    category: {
        category: string,
        color: string,
        id: number
    }
};

export type category_type = {
    id: number,
    category: string,
    color: string,
    description: string,
    resumedDescription: string
  }