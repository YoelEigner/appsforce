const isValidEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
}

const emailExists = (users, newEmail) => {
    for (const user of users) {
        if (user.email === newEmail) {
            return true;
        }
    }
    return false;
}

export const emailValidation = (newEmail, users) => {
    if (isValidEmail(newEmail) && !emailExists(users, newEmail)) {
        return true;
    }
    return false;
}

export function filterUsers(users, searchName, searchEmail, searchId, searchLocation) {
    return users.filter((usr) => {
        const name = `${usr.name.first} ${usr.name.last}`.toLowerCase();
        const email = usr?.email?.toLowerCase();
        const id = usr.id?.value?.toLowerCase();
        const location = `${usr?.location?.city}, ${usr?.location?.country},${usr?.location?.street?.name}, ${usr?.location?.street?.number}`.toLowerCase();

        return (
            name?.includes(searchName.toLowerCase()) &&
            email?.includes(searchEmail.toLowerCase()) &&
            id?.includes(searchId.toLowerCase()) &&
            location?.includes(searchLocation.toLowerCase())
        );
    });
}



export const validateUser = (name, value, setlNameErr, setfNameErr, setEmailErr, setCityErr, setStreetErr, setCountryErr, users) => {
    if (name === 'street') {
        if (value === '') {
            setStreetErr(true)
        }
        else {
            setStreetErr(false)
        }
    }
    else if (name === 'city') {
        if (value === '') {
            setCityErr(true)
        }
        else {
            setCityErr(false)
        }
    }
    else if (name === 'country') {
        if (value === '') {
            setCountryErr(true)
        }
        else {
            setCountryErr(false)
        }
    }
    else if (name === 'email') {
        if (!emailValidation(value, users)) {
            setEmailErr(true)
        }
        else {
            setEmailErr(false)
        }
    }
    else if (name === 'fname') {
        if (value !== '' && value.length >= 3) {
            setfNameErr(false)
        }
        else {
            setfNameErr(true)
        }
    }
    else if (name === 'lname') {
        if (value !== '' && value.length >= 3) {
            setlNameErr(false)
        }
        else {
            setlNameErr(true)
        }
    }
}