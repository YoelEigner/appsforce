const appReducer = (state = {
    users: []

}, action) => {
    switch (action.type) {
        case "SET_USERS":
            return { ...state, users: action.userArr };
        case "UPDATE_USER":
            const { fname, lname, email, number, street, city, country, index } = action.updatedUser;
            const updatedUser = {
                ...state.users[index],
                email,
                location: { ...state.users[index].location, street: { number: number, name: street }, city, country },
                name: { ...state.users[index].name, first: fname, last: lname }
            };
            const updatedUsers = [
                ...state.users.slice(0, index),
                updatedUser,
                ...state.users.slice(index + 1)
            ];
            return { ...state, users: updatedUsers };
        case "DELETE_USER":
            let temp = [...state.users]
            const deleteUser = [
                ...temp.splice(action.delIndex, 1)
            ];
            return { ...state, users: temp };
        case "ADD_USER":
            let tempState = [...state.users]
            const tempUser = {
                id: { name: "", value: action.newUser.id },
                email: action.newUser.email,
                location: { ...action.newUser.location, street: { number: action.newUser.number, name: action.newUser.street }, city: action.newUser.city, country: action.newUser.country },
                name: { title: action.newUser.title, first: action.newUser.fname, last: action.newUser.lname }
            };
            tempState.push(tempUser)
            return { ...state, users: tempState };
        case "RESET":
            return state = {};
        default:
            return state;
    }
};

export default appReducer;
