export type UserDTO = {
    id;
    email;
    first_name;
    last_name;
    avatar;
};

export type CreateUserDTO = Omit<UserDTO, "id" | "avatar">;

export type UpdateUserDTO = Omit<UserDTO, "avatar">;
