// import { useEffect, useState } from "react"
// import { Button } from "react-bootstrap"
// import { useDispatch, useSelector } from "react-redux"
// import { UserDataRequest } from "../Network/UserDataRequest"
// import { onGetUsers } from "../Utils/User.action"
// import { User } from "./User"
// import Select from 'react-select'


// export const Home = () => {
//     const dispatch = useDispatch()
//     const { users } = useSelector(state => state)
//     const [filtered, setFIltered] = useState([])

//     const getUser = async () => {
//         await dispatch(onGetUsers())
//         setFIltered(users)
//     }

//     useEffect(() => {
//         getUser()
//     }, [])



//     const options = users.map(x => {
//         return { value: `${x.name.first} ${x.name.last}`, label: `${x.name.first} ${x.name.last}` }
//     })
//     const onSelectChange = (e) => {

//     }
//     return (
//         <div>
//             <br />
//             <div className="dropdown"><Select options={options} onChange={(e) => onSelectChange(e)} /></div>
//             <br />
//             {filtered.map((usr, index) => {
//                 return (
//                     <User
//                         key={index}
//                         index={index}
//                         title={usr?.name?.title}
//                         firstName={usr?.name?.first}
//                         lastName={usr?.name?.last}
//                         email={usr.email}
//                         imageSrc={usr?.picture?.thumbnail}
//                         country={usr?.location?.country}
//                         city={usr?.location?.city}
//                         street={usr?.location?.street?.name}
//                         streetNum={usr?.location?.street?.number}
//                         id={usr?.id?.value}
//                     />)
//             })}

//         </div>
//     )
// }
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { UserDataRequest } from "../Network/UserDataRequest";
import { onGetUsers } from "../Utils/User.action";
import { User } from "./User";
import Select from "react-select";
import { filterUsers } from "../Utils/Utils";

export const Home = () => {
    const dispatch = useDispatch();
    const { users } = useSelector((state) => state);
    const [filtered, setFiltered] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [searchId, setSearchId] = useState("");
    const [searchLocation, setSearchLocation] = useState("");

    const getUser = async () => {
        await dispatch(onGetUsers())

    };
    useEffect(() => { setFiltered(users); }, [users])

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        setFiltered(filterUsers(users, searchName, searchEmail, searchId, searchLocation));
    }, [searchName, searchEmail, searchId, searchLocation, users]);

    return (
        <div>
            <br />
            <div className="filters">
                <Form.Control
                    type="text"
                    placeholder="Filter by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <Form.Control
                    type="text"
                    placeholder="Filter by email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                />
                <Form.Control
                    type="text"
                    placeholder="Filter by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <Form.Control
                    type="text"
                    placeholder="Filter by location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                />
            </div>
            <br />
            {filtered.map((usr, index) => {
                return (
                    <User
                        key={index}
                        index={index}
                        title={usr?.name?.title}
                        firstName={usr?.name?.first}
                        lastName={usr?.name?.last}
                        email={usr.email}
                        imageSrc={usr?.picture?.thumbnail}
                        country={usr?.location?.country}
                        city={usr?.location?.city}
                        street={usr?.location?.street?.name}
                        streetNum={usr?.location?.street?.number}
                        id={usr?.id?.value}
                    />
                );
            })}
        </div>
    );
};
