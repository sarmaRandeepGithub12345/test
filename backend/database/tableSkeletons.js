export const users = `
    CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password TEXT NOT NULL,
        img TEXT,
        coverpicture TEXT,
        followers int default 0,
        following int default 0,
        cart integer [],
        description TEXT,
        isOrganization BOOLEAN DEFAULT FALSE,
        location text DEFAULT '',
        created_at TIMESTAMP DEFAULT now(),
    );
    `;
export const otp = `
    create table if not exists otpValidation (
     id uuid default uuid_generate_v4() not null primary key,
     email text not null,
     otp integer not null,
     date_of_expiry int not null,
     validationCheck boolean default false
    );`;
export const news = `
    create table if not exists news (
        id uuid default uuid_generate_v4() not null primary key,
        userid uuid default uuid_generate_v4() not null references users(id),
        heading varchar(50) not null,
        description text not null,
        image text [] not null,
        likes integer default 0,
        dislikes integer default 0,
        comments text [],
        gamerrating int check(value between 0 and 5) default 5,
        posted_at TIMESTAMP default now() ,
    )
    `;
const tournament = `
    create table if not exists tournaments (
        id uuid default uuid_generate_v4() not null primary key,
        creatorid uuid default uuid_generate_v4() not null references users(id),
        participationfee integer not null,
        img text not null,
        description varchar(50) not null,
        participants integer[] ,

        firstposition uuid default uuid_generate_v4() references users(id),
        firstprize integer default 0,
        
        secondposition uuid default uuid_generate_v4() references users(id),
        secondprize integer default 0,
        
        created_at TIMESTAMP now(),
        started_at TIMESTAMP ,
        ended_at TIMESTAMP,
    )
    `;
