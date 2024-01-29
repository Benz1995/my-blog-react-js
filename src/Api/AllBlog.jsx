import axios from "axios";
import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import  DefaultPagination  from "../components/Pagination";
const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
};
export default function AllBlogs({levelUser="user",pageSize=8}){
    const token = localStorage.getItem('accessToken');
    const users = JSON.parse(localStorage.getItem('user'));
    const baseUrl = "http://localhost:1337/api";
    const [blogs , setBlogs ] = useState(null)
    const [pageCount , setPageCount] = useState(null)
    let filtersData = ""
    if(users && levelUser == "Admin"){
        // filtersData = `&filters[author_eq]=${users.id}`
    }
    const callApi = function(pageNumber = 1){
        console.log(`${baseUrl}/blogs`)
            axios.get(`${baseUrl}/blogs/?pagination[pageSize]=${pageSize}&pagination[page]=${pageNumber}&populate=*${filtersData}`,{
                headers: {
                     'Content-Type' : 'application/json',
                     'Authorization': `Bearer ${token}`
                }
             }).then((Response) => {
                setBlogs(Response.data.data);
                setPageCount(Response.data.meta.pagination.pageCount)
            });
    }
    useEffect(() => {
        callApi();
    },[]);

    if(!blogs) return "No Blog"

    return(
        <>
        <div className="flex flex-wrap justify-center">
            {blogs.map(function(cValue, index){
                let dataBlog = cValue.attributes;
                let blogID = cValue.id;
                let randomNumber = randomNumberInRange(1,999);
                let baseUrlImg = 'https://source.unsplash.com/random?'+randomNumber
                let thumbnail = cValue.attributes.thumbnail.attributes ? cValue.attributes.thumbnail.data.attributes.url : baseUrlImg;
                return (   
                        <div className="mb-4 m-10 basis-1/5" key={blogID}>
                            <Card className="mt-6 w-96">
                                <CardHeader color="blue-gray" className="relative h-56">
                                    <img
                                    src={thumbnail}
                                    alt="card-image"
                                    />
                                </CardHeader>
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {dataBlog.title}
                                    </Typography>
                                    <Typography className="h-[200px]">
                                    {dataBlog.description}
                                    </Typography>
                                </CardBody>
                                <CardFooter className="pt-0">
                                    <a href={"/blogs/"+blogID}>
                                        <Button>Read More</Button>
                                    </a>
                                </CardFooter>
                            </Card>
                            </div>
                )
            })}
            </div>
            <div className="flex justify-center mt-5 mb-5"><DefaultPagination callApiBlog={callApi} totalData={pageCount}/></div>
        </>
    )
}