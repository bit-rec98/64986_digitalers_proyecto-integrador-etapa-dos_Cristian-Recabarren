import { saveUserLocalStorage } from "./handleUsersLs";

export function buildUser(userInfo){ //* Getting register formData
    class User {
        constructor(name, email, password, id){
            this.name = name;
            this.email = email;
            this.password = password;
            this.id = id;
        };
    };
    let newUser = new User(userInfo.name, userInfo.email, userInfo.password, userInfo.id);
    saveUserLocalStorage(newUser);
};