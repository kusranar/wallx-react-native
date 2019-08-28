export default class BackOffice {
    constructor(idBackOffice, firstName, lastName, phoneNumber, address, openDate, countIdBackoffice, idUser){
        this.idBackOffice = idBackOffice;
        this.firstname = firstName;
        this.lastname = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.openDate = openDate;
        this.countIdBackoffice = countIdBackoffice;
        this.idUser = idUser;
    }
}