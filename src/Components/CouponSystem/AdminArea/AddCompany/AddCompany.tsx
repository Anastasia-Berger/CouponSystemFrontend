import "./AddCompany.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CompanyModel } from "../../../../Models/BeansModel/CompanyModel";
import axios from "axios";

function AddCompany(): JSX.Element {

    const schema = yup.object().shape({
        name:
            yup.string()
                .required("Company Name is required"),

        email:
            yup.string()
                .required("Email is required"),

        password:
            yup.string()
                .required("Password is required"),

        // image:
        //     yup.mixed()
        //         .test('required', "You need to provide a file", (value) => {
        //             return value && value.length
        //         })
        //         .test("fileSize", "The file is too large", (value, context) => {
        //             return value && value[0] && value[0].size <= 200000;
        //         })
        //         .test("type", "We only support png", function (value) {
        //             return value && value[0] && value[0].type === "image/png";
        //         })

    });

    const { register, handleSubmit, formState: { errors, isDirty, isValid } } =
        useForm<CompanyModel>({ mode: "all", resolver: yupResolver(schema) });


    const addCompany = async (company: CompanyModel) => {

        const formData = new FormData();

        formData.append("name", company.name as string);
        formData.append("email", company.email as string);
        formData.append("password", company.password as string);

        // formData.append("image", coupon.imageUrl?.item(0) as any);


        // sending post request to spring boot
        console.log(formData);
        await axios.post<CompanyModel>('http://localhost:8080/admin/companies/', formData)
            .then(res => { alert(JSON.stringify(res.data)) })
            .catch(err => { console.log(err); });

    }

    return (
        <div className="AddCompany">
            <h2>Add Company</h2>


            <form onSubmit={handleSubmit(addCompany)} >




                {
                    errors.name?.message ?
                        <><span>{errors?.name?.message}</span></> :
                        <><label htmlFor="name">name</label></>
                }

                <input
                    {...register("name")}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="name"
                />


                {
                    errors.email?.message ?
                        <><span>{errors?.email?.message}</span></> :
                        <><label htmlFor="email">email</label></>
                }

                <input
                    {...register("email")}
                    id="email"
                    name="email"
                    type="text"
                    placeholder="email"
                />

                {
                    errors.password?.message ?
                        <><span>{errors?.password?.message}</span></> :
                        <><label htmlFor="password">email</label></>
                }

                <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="text"
                    placeholder="password"
                />
                {/* 
                {
                    errors.image?.message ?
                        <><span>{errors?.image?.message}</span></> :
                        <><label htmlFor="image">Image</label></>
                }
                <input
                    {...register("image", { onChange: (e) => { handleChangeImage(e) } })}
                    id="image"
                    name="image"
                    type="file"
                    placeholder="Cat Image..." />
                <div className="wrap-box">
                    {image ? <img src={image} alt=""></img> : 'no image yet!'}
                </div> */}


                <button disabled={!isValid}>ADD</button>

            </form>
        </div>
    );
}

export default AddCompany;
