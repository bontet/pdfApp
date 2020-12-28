import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    public fakeLogin = {
        username: 'abul.fatah',
        password: 'abul123*#',
        name: 'Abul Fatah',
        empID: 'KCG-01149'
    };

    constructor(
        private router: Router
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('_users')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    // get random string
    randomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('_users');
        // localStorage.clear();
        this.userSubject.next(null);
        this.router.navigate(['/']);
    }

    getLoginID() {
        const users = this.userSubject.value;
        return users === null ? null : users._sid;
    }

    getEmail() {
        const users = this.userSubject.value;
        return users === null ? null : users.email;
    }

    getPhone() {
        const users = this.userSubject.value;
        return users === null ? null : users.phone;
    }

    getFirstName() {
        const users = this.userSubject.value;
        return users === null ? null : users.fname;
    }

    getLastName() {
        const users = this.userSubject.value;
        return users === null ? null : users.lname ;
    }

    getName() {
        const users = this.userSubject.value;
        return users === null ? null : users.fname + ' ' + users.lname ;
    }

    getUserID() {
        const users = this.userSubject.value;
        return users === null ? null : users.user;
    }

    getAddress() {
        const users = this.userSubject.value;
        return users === null ? null : users.address;
    }

    getNewsletter() {
        const users = this.userSubject.value;
        return users === null ? null : users.newsletter;
    }

    getID() {
        const users = this.userSubject.value;
        // console.log(users);
        return users === null ? null : users.id;
    }
}
