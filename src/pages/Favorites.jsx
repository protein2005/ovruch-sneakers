import { useContext } from "react";
import Card from "../components/Card";
import AppContext from "../context";
import Info from "../components/Info";
import { Link } from "react-router-dom";

function Favorites() {
    const {favorites, onAddFavorite} = useContext(AppContext)

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
            <h1 className="titleBody">
                <Link to="/">
                    <button className="backHome mr-10"><img src="/img/arrow-back.svg" alt="Back Home"/></button>
                </Link> 
                Мої вподобання
            </h1>
            </div>
            {favorites.length > 0 ? (
                <div className="d-flex flex-wrap">
                {favorites.map((item) => <Card 
                    key={item.id}  
                    name={item.name} 
                    productId={item.productId}
                    price={item.price} 
                    imageUrl={item.imageUrl}
                    id={item.id}
                    favorited={true}
                    onFavorite={onAddFavorite}/>)}
                </div>
            ):(<Info
                width={70}
                title={"Вподобаних кросівок немає :("} 
                description={"Ви нічого не додавали до вподобаних"}
                image={"/img/tired.jpg"}
            />)}
        </div>
    )
}

export default Favorites