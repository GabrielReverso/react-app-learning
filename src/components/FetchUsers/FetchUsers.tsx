import userService, { User } from "../../services/user-service";
import useUsers from "../../hooks/useUsers";

function FetchUsers() {
    const { users, error, isLoading, setUsers, setError } = useUsers();

    /* Optimistic: update UI first hoping for succes and handle possible errors after request
    Pessimistic: send a resquest first, then update UI accordingly to the response */

    //Optimistic delete
    const deleteUser = (user: User) => {
        const originalusers = [...users];
        setUsers(users.filter((u) => u.id !== user.id));

        userService.delete(user.id).catch((err) => {
            setError(err.message);
            setUsers(originalusers);
        });
    };

    //Optimistic create
    const addUser = () => {
        const originalusers = [...users];
        const newUser = { id: 0, name: "Gabriel" };
        setUsers([newUser, ...users]);

        userService
            .create<User>(newUser)
            .then(({ data: savedUser }) => setUsers([savedUser, ...users]))
            .catch((err) => {
                setError(err.message);
                setUsers(originalusers);
            });
    };

    //Optimistic update
    const updateUser = (user: User) => {
        const originalusers = [...users];
        const updatedUser = { ...user, name: user.name + "!" };
        setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

        userService.update<User>(updatedUser).catch((err) => {
            setError(err.message);
            setUsers(originalusers);
        });
    };

    return (
        <>
            {error && <p>{error}</p>}
            {isLoading && <div className="spinner-border"></div>}
            <button className="btn btn-primary mb-3" onClick={addUser}>
                Add
            </button>
            <ul className="list-group">
                {users.map((user) => (
                    <li
                        key={user.id}
                        className="list-group-item d-flex justify-content-between"
                    >
                        {user.name}
                        <div>
                            <button
                                onClick={() => updateUser(user)}
                                className="btn btn-outline-secondary mx-3"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => deleteUser(user)}
                                className="btn btn-outline-danger"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default FetchUsers;
