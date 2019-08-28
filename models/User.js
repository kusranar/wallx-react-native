export default class User{
    constructor(idUser, username, password, registerDate, idRoleType){
        this.idUser = idUser;
        this.username = username;
        this.password = password;
        this.registerDate = registerDate;
        this.idRoleType = idRoleType;
    }
}