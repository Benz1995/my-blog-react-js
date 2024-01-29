import axios from "axios";
import { useEffect, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
  } from "@material-tailwind/react";
const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random()
        * (max - min + 1)) + min;
};
export default function Blog({callApiBlog}){
    const baseUrl = "http://localhost:1337/api";
    const [blogs , setBlogs ] = useState(null)
    const [pageCount , setPageCount] = useState(null)

    const callApi = function(pageNumber = 1){
        console.log(`${baseUrl}/blogs`)
            axios.get(`${baseUrl}/blogs/${callApiBlog}?populate=*`).then((Response) => {
                setBlogs(Response.data.data);
            });
    }
    useEffect(() => {
        callApi();
    },[]);
    if(!blogs) return "No Blog"
    let dataBlog = blogs.attributes;
    let dataAthor = dataBlog.author.data ? dataBlog.author.data.attributes : null;
    let randomNumber = randomNumberInRange(1,999);
    let baseUrlImg = 'https://source.unsplash.com/random?'+randomNumber
    let thumbnail = dataBlog.thumbnail.attributes ? dataBlog.thumbnail.data.attributes.url : baseUrlImg;
    let formattedDate = ""
    if(dataAthor != null){
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          };
        const date = new Date(dataAthor.createdAt);
        formattedDate = date.toLocaleDateString('th-TH',options);
    }
    return(
        <>
        <div className="container m-auto">
            {
                <div className="mb-4 m-10 w-full">
                    <Card className="mt-6 w-full">
                        <CardHeader color="blue-gray" className="relative h-[500px]">
                        <figure className="h-[500px] w-full">
                            <img
                                className="h-full w-full rounded-xl object-cover object-center"
                                src={thumbnail}
                                alt="nature image"
                            />
                            { dataBlog.author.data != null ? 
                            <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
                                <div>
                                <Typography variant="h5" color="blue-gray" className="text-left">
                                    {dataBlog.author.data.attributes.name}
                                </Typography>
                                <Typography color="gray" className="mt-2 font-normal">
                                    {formattedDate}
                                </Typography>
                                </div>
                                <Typography variant="h5" color="blue-gray">
                                    {dataBlog.author.data.attributes.publisher}
                                </Typography>
                            </figcaption>
                            : ""}
                            </figure>
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                            {dataBlog.title}
                            </Typography>
                            <Typography className="h-[200px]">
                            {dataBlog.detail[0].children[0].text}
                            </Typography>
                        </CardBody>
                        <CardFooter className="pt-0">
                          
                        </CardFooter>
                    </Card>
                    </div>
            }
            </div>
          
        </>
    )
}