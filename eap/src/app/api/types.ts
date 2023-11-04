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
    exp: number,
    sub: string,
    iat: number,
}

// {
//     name: 'Otávio João Maldaner',
//     school: 'IFRS - Instituto Federal do Rio Grande do Sul',
//     createdAt: '2023-11-04T14:24:57.375Z',
//     profilePic: 
//       'http://192.168.2.17:3333/uploads/profilePics/94888cdc-b320-4969-add7-b77259b6c277.jpg',
//     preferences: [
//       {
//         id: 1,
//         name: 'Esportes',
//         icon: 
//           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFAUlEQVR4nO2Za4iVRRjHf2u62ZW1C+vaxZKuYAhKdI/CLlttH5XCIsqspNuH1CgSS2qjiKAo06SgG0klUW1BZSFUhEFEitspuxCmFq2267ratuueeOA/MAzzvu+8u+fkRv1hPpx3Zp55nnnuc+B//DdxGHAL8DrwNdAH7AbWA28A84HDGYUwpp4B/gSqBaMfWAEcwSjB5cD2BMarwdgBtO1r5ucCAwFjX2RoYg+wLvg2CMwbzsHHAI3AfsBnwLfAk/qeikvFgGPmR+AKzZ0NfAD0arwPnKk5W/ODt28v0FqG+YuAP4D79Huq1GnEuoHzE2i0BGbzJTCxBA/N2uP2bxfNQhwnJp1KT9H304BN+t6TQOzpwBTs9qeXEKABeC6gsSxl41ORg4/XXKOcaqGn7hhaFElCG/+khACXRPb/BRxVtNHdsj+6gBuAcYmH35wRVUxzPiYAVwN3AGcEcwsyaFieyEXs5tzYBrwMtAOP5dB4K2P/d96aGcCWYH65N39tBo13Um7QbvpEha91CcyE6MzY86jmxwCVjDWmEefEfZF521cac4BdAaEnctbvyBC4SfMn5Wj5FY/OnZH5nUXMHg38DHwO3AWM1/dzPfMyBo9NFOA9CWs3SkkBDLNEI1kAw0zlAduwAZis74vF3AUF+zd6B56aESIrGQJcFVk/zZv/hkRMVuY11a/VoYdIQ0V42zvQolcMM4BfEuP8jd6aDv4B+GHUTDELTbpxC6On56z7tEwYrQValHTcoRYSHwfeBB4CpuTsnaC1m1UjdXh0BlISWQgr5s4DbgKWKlO3KxtfCRyZWEr4wxoYi2whJsrGs/ZZP5GMKapFunIIumFx/x5gkre/2QsEsdGv+srHCznru1OLwbHAIwUZOWsMigmn5tagnA7H/cHZW3PoXpbC/IFBBHHjJ+B5YAlwK3B3gYC7pJExcugsIZYABwEHKDfEzGcw1XEbIjXMh8BHYsicz8eDMpEHgNlqToaC/e/KKVsLzKmaYzZJN2+4xttojNyr770lMmBPhImK/KFZcd6PTtWMMSCHTW6AwsxoEcShXULYjTs8nKGVpRIi1IZ1VodqzSQ9q3TI+V1L2alv84cTKqd7h+30DstCilauD5r51dQR87yDXi245TJauS4wDSvM6oIF3iHmlFm3bJXpWcD+JbSy0qO9xatua4rFEQFit/yx1qwpoZUw3C6iDpiTU4/7cM8klp1T4LQSlhEnUGNM9Q7okha6I/bfpoLMPU6l+IrReTYQwjRpka9msIz5feS2UmJ/qq9srbcpLQwO6E+M/am+siFSIsyspQCW8n8NfMFXc5mMHPOVbREN/17QW5fG7OAAF5HKZuTQV072aPYEwlRS3zxTEdbky1Rix5CqleUevZfUD/d63zqDV4sRYVzwjFFVY9+rWocErfhrZ+l53NGyl29Da1BqbEx8MCC1L1gdsdk93hNLFtwDmBPCZ36zWlMbc2VmPn3zwQtrJUSDSuqwGdmrZ5YX9Ubkym7UmIRMlR1DKj9uj7Scw8I0LyxmjT7vP4VajzUKCparRoQ21et5PW5sDCrSrJVZrtSzyQrgNfnbVwn/XlbUK5h5jwjWbNymZ/ZNwcG7ddAqmcA56nlTMFbr814mXO4o9X9ZChoTmqAy71CLgN9yhLAnyVGP8YpU6yMCdNW6GKwnGoCL5StDMlnr9P6VaAIO3tdM1Ax/A3Do9uAI9x7zAAAAAElFTkSuQmCC'
//       },
//       {
//         id: 5,
//         name: 'Tecnologia',
//         icon: 
//           'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABHElEQVR4nO2ZbwrCMAzF36fdST2fTq/VIuI9Nq8RESrM4lib/u/yg3wppMtr9rrAgB3zBPAosB4dMpF7PToipLaONMcA4AbgtTilUjEDGE1N3lwrEEBWXDhCZpN8QHmOi854U5vpiFuPCEkEuXREW6ZyTswI/amNTO1dCFE+iTVAYnbsqCP3iF/tH9NyhXDNHnsEKXZrxXr9QoSo2JuHkPRZJEL8kY7YtGx23YsQFXvzEMQjLkhHSh6abtjsupehUW3kOW1uH0BIbBWUdNbKCYkQNNgRzTR7TijlrZUTSnlr5YTE7OikI7NJ/PxkKc3J1DJxkscEI0honDlCBiPm25mSMRkRrJ+h3UMrpku9Hh0RUltH9MpYkHodu+ANSkYsKecABh8AAAAASUVORK5CYII='
//       }
//     ],
//     description: 'Descrição',
//     sub: '7e86457e-3c41-44a2-9dab-ad7a9fc86a63',
//     iat: 1699108087,
//     exp: 1700404087
//   }

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