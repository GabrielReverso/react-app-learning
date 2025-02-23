import { useEffect, useState } from "react";
import userService, { User } from "../../services/user-service";
import { CanceledError } from "../../services/api-client";

/** @deprecated */
function Fetchusers_OLD() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    // then().catch()
    /* useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        axios
            .get<User[]>("https://jsonplaceholder.typicode.com/users", {
                signal: controller.signal,
            })
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });

        return () => controller.abort();
    }, []); */

    // Async / await
    /*     useEffect(() => {
        const fetchUsers = async () => {
            const controller = new AbortController();
            setLoading(true);
            try {
                const res = await axios.get<User[]>(
                    "https://jsonplaceholder.typicode.com/users", {
                signal: controller.signal,
            });
                setUsers(res.data);
            } catch (err) {
                if (err instanceof CanceledError) return;
                setError((err as AxiosError).message);
            } finally {
                setLoading(false)
            }
        };

        fetchUsers();

        return () => controller.abort();
    }, []); */

    // API
    useEffect(() => {
        setLoading(true);

        const { request, cancel } = userService.getAllusers();

        request
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message);
                setLoading(false);
            });

        return () => {
            cancel();
        };
    }, []);

    /* Optimistic: update UI first hoping for succes and handle possible errors after request
    Pessimistic: send a resquest first, then update UI accordingly to the response */

    //Optimistic delete
    const deleteUser = (user: User) => {
        const originalusers = [...users];
        setUsers(users.filter((u) => u.id !== user.id));

        userService.deleteUser(user.id).catch((err) => {
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
            .addUser(newUser)
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

        userService.updateUser(user.id, updatedUser).catch((err) => {
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

export default Fetchusers_OLD;
