import apiClient from "./api-client";

export interface User {
    id: number;
    name: string;
}

/** @deprecated */
class DeprecatedUserService {
    getAllusers() {
        const controller = new AbortController();
        const request = apiClient.get<User[]>("/users", {
            signal: controller.signal,
        });
        return { request, cancel: () => controller.abort };
    }

    deleteUser(id: number) {
        return apiClient.delete("/users/" + id);
    }

    addUser(newUser: User) {
        return apiClient.post("/users", newUser);
    }

    updateUser(id: number, updatedUser: User) {
        // Put -> replace whole
        // Patch -> update single property
        return apiClient.patch("/users/" + id, updatedUser);
    }
}

export default new DeprecatedUserService();
