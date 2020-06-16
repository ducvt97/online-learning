import React, { useState } from 'react';

const createNewAccount = (id, username, email, fullName, password) => {
    return {
        id: id,
        username: username,
        password: password,
        email: email,
        fullName: fullName,
        activity: {
            activeDays: 1,
            activeTimeOfDay: "10:00 AM",
            mostViewSubject: "Software Development"
        }
    }
}

const accountsData = [{
    id: 1,
    username: "admin",
    password: "123456",
    email: "admin@mail.com",
    fullName: "Administrator",
    activity: {
        activeDays: 10,
        activeTimeOfDay: "4:00 PM",
        mostViewSubject: "Software Development"
    }
}]

const AccountsContext = React.createContext();

const AccountsProvider = (props) => {
    const [accounts, setAccounts] = useState(accountsData);

    const getAccountById = (accountId) => {
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].id === accountId)
                return accounts[i];
        }
        return null;
    }

    const getAccountByUsernameOrEmail = (usernameOrEmail) => {
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].username === usernameOrEmail || accounts[i].email === usernameOrEmail)
                return accounts[i];
        }
        return null;
    }

    const isUsernameExist = (username) => {
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].username === username)
                return true;
        }
        return false;
    }

    const isEmailExist = (email) => {
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].email === email)
                return true;
        }
        return false;
    }

    const registerNewAccount = (username, email, fullName, password) => {
        let errorMessage = "";
        if (isUsernameExist(username))
            errorMessage += "Username already exists.\n";
        if (isEmailExist(email))
            errorMessage += "Email already exists.\n";
        if (errorMessage === "") {
            const newAccount = createNewAccount(accounts.length + 1, username, email, fullName, password);
            const temp = [...accounts];
            temp.push(newAccount);
            setAccounts(temp);
            return {status: 200, message: "Register successfully."};
        }
        return {status: 404, message: errorMessage}
    }

    const changeAccountPassword = (accountId, newPassword) => {
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].id === accountId){
                if (accounts[i].password === newPassword)
                    return {status: 404, message: "New password cannot be the same with old password."};
                else {
                    const temp = [...accounts];
                    temp[i].password = newPassword;
                    setAccounts(temp);
                    return {status: 200, message: "Password changed successfully."};
                }
            }
        }
        return {status: 404, message: "User not found."};
    }

    const changeAccountFullname = (accountId, newFullName) => {
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].id === accountId){
                const temp = [...accounts];
                temp[i].fullName = newFullName;
                setAccounts(temp);
                return {status: 200, message: "Fullname changed successfully."};
            }
        }
        return {status: 404, message: "User not found."};
    }

    const changeAccountEmail = (accountId, newEmail) => {
        if (isEmailExist(newEmail))
            return {status: 404, message: "Email already exist."};
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].id === accountId){
                const temp = [...accounts];
                temp[i].email = newEmail;
                setAccounts(temp);
                return {status: 200, message: "Email changed successfully."};
            }
        }
        return {status: 404, message: "User not found."};
    }

    return <AccountsContext.Provider value={{accounts, getAccountById, getAccountByUsernameOrEmail, registerNewAccount,
            changeAccountPassword, changeAccountFullname, changeAccountEmail}}>
        {props.children}
    </AccountsContext.Provider>
}

export {AccountsProvider, AccountsContext}
