import Card from "../components/Card";

function Home({
    items, 
    searchValue, 
    onChangeSearchInput, 
    setSearchValue, 
    onAddFavorite, 
    onAddToCart,
    isLoading
}) {
    const renderItems = () => {
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading 
                ? [...Array(12)].map((_, index) => <Card key={index} loading={true} />) 
                : filteredItems.map((item) => (
                    <Card 
                        key={item.id} 
                        id={item.id}
                        productId={item.productId}
                        name={item.name} 
                        price={item.price} 
                        imageUrl={item.imageUrl}
                        onPlus={(obj) => onAddToCart(obj)} 
                        onFavorite={(obj) => onAddFavorite(obj)}
                        loading={false}
                    />
                ))
        );
    }
    
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
            <h1>{searchValue ? `Пошук по запиту: "${searchValue}"` : "Всі кросівки"}</h1>
            <div className="search-block d-flex">
                <img src="/img/search.svg" alt="Search"/>
                {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" width={40} height={40} src="/img/btn-remove.svg" alt="Clear"/>}
                <input onChange={onChangeSearchInput} value={searchValue} placeholder="Пошук..." type="text"/>
            </div>
            </div>
            <div className="d-flex flex-wrap">
            {renderItems()}
            </div>
        </div>
    )
}

export default Home