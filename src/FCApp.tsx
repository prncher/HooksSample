import * as React from "react"
import { useState } from "react";

interface IProduct {
    ID: number;
    Name: string;
    Description: string;
    ReleaseDate: string;
    DiscontinuedDate?: string;
    Rating: number;
    Price: number;
}

const fetchProducts = async (): Promise<[]> => {
    const r = await fetch('http://localhost:4000/products');
    return new Promise(resolve => {
        r.text().then(s => resolve(JSON.parse(s)));
    });
}

const FCApp: React.FC<{}> = () => {
    const [products, setProducts] = useState([]);
    React.useEffect(() => {
        fetchProducts().then(p => setProducts(p));
    }, []);

    return (<div>
        {products.map((p: IProduct, index) => {
            return (
                <li style={{
                    color: '#00aabb',
                    listStyleType: 'none',
                    border: '0.5rem outset pink',
                    outline: '0.5rem solid khaki',
                    boxShadow: '0 0 0 2rem skyblue',
                    borderRadius: '12px',
                    font: 'bold 1rem sans-serif',
                    margin: '2rem',
                    padding: '1rem',
                    outlineOffset: '0.5rem'
                }} key={index}>
                    <div>ID : {p.ID}</div>
                    <div>Name: {p.Name}</div>
                    <div>Description: {p.Description}</div>
                    <div>ReleaseDate: {new Date(p.ReleaseDate).toLocaleDateString()}</div>
                    <div>DiscontinuedDate: {p.DiscontinuedDate ? new Date(p.DiscontinuedDate!).toLocaleDateString() : ''}</div>
                    <div>Rating: {p.Rating}</div>
                    <div>Price : {p.Price}</div>
                </li>)
        })}
    </div>);
}

export default FCApp;