import React, { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* useRef method */
/* const Form = () => {
    const nameRef = useRef<HTMLInputElement>(null)
    const ageRef = useRef<HTMLInputElement>(null)
    const person = {
        name: "",
        age: 0
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (nameRef.current) {
            person.name = nameRef.current.value
        }
        if (ageRef.current) {
            person.age = parseInt(ageRef.current.value)
        }
        console.log(person);
    }

    return (
        <form
            style={{ margin: '5rem' }}
            onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input ref={nameRef} id="name" type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input ref={ageRef} id='age' type="number" className="form-control" />
            </div>
            <button className="btn btn-primary" type='submit'>Submit</button>
        </form>
    )
}
 */

/* useState method */
/* const Form = () => {
    const [person, setPerson] = useState({
        name: '',
        age: 0
    })

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        console.log(person);
    }

    return (
        <form
            style={{ margin: '5rem' }}
            onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input value={person.name} onChange={(event) => setPerson({ ...person, name: event.target.value })} id="name" type="text" className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input value={person.age} onChange={(event) => setPerson({ ...person, age: parseInt(event.target.value) })} id='age' type="number" className="form-control" />
            </div>
            <button className="btn btn-primary" type='submit'>Submit</button>
        </form>
    )
} */

/* useForm library */
/* interface FormData {
    name: string;
    age: number;
}

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FieldValues) => console.log(data);

    return (
        <form style={{ margin: "5rem" }} onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    {...register("name", { required: true, minLength: 3 })}
                    id="name"
                    type="text"
                    className="form-control"
                />
                {errors.name?.type === "required" && (
                    <p className="text-danger">The name field is empty</p>
                )}
                {errors.name?.type === "minLength" && (
                    <p className="text-danger">
                        The name must be at least 3 chars
                    </p>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">
                    Age
                </label>
                <input
                    {...register("age")}
                    id="age"
                    type="number"
                    className="form-control"
                />
            </div>
            <button className="btn btn-primary" type="submit">
                Submit
            </button>
        </form>
    );
}; */

/* ZOD */
const schema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 chars" }),
    age: z
        .number({ invalid_type_error: "Age field is required" })
        .positive("Enter a valid age")
        .min(18, { message: "Age must be at least 18" })
        .max(120, { message: "Enter a valid age" }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({ resolver: zodResolver(schema) });

    const onSubmit = (data: FieldValues) => console.log(data);

    return (
        <form style={{ margin: "5rem" }} onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    {...register("name")}
                    id="name"
                    type="text"
                    className="form-control"
                />
                {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">
                    Age
                </label>
                <input
                    {...register("age", { valueAsNumber: true })}
                    id="age"
                    type="number"
                    className="form-control"
                />
                {errors.age && (
                    <p className="text-danger">{errors.age.message}</p>
                )}
            </div>
            <button
                disabled={!isValid}
                className="btn btn-primary"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};

export default Form;
