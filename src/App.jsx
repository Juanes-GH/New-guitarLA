import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

    const initialCart = () =>{
        const loccalStorageCart = localStorage.getItem('cart')
        return loccalStorageCart ? JSON.parse(loccalStorageCart) : []
    }

    const [data, setData] = useState([])
    const [cart, setCart] = useState(initialCart)

    const MAX_ITEMS = 5
    const MIN_ITEMS = 1

    useEffect(() => {
        setData(db)
    },[])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    },[cart])


    function addTocart(item){

        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)
        if(itemExist >= 0){// Ya existe este producto
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        }else{ // Es un nuevo producto
           item.quantity = 1
            setCart(prevCart => [...prevCart, item])
        }
    }

    function removeFromCart(id){
        setCart(prevCart => prevCart.filter(guitarClicked => guitarClicked.id !== id)) 
    }

    function increaseQuantity(id){
       const updatedCart = cart.map( item => {
        if(item.id === id && item.quantity < MAX_ITEMS){
            return {
                ...item,
                quantity: item.quantity + 1
            }
        }
        return item
       })
       setCart(updatedCart)
    }

    function decreaseQuantity(id){
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
           })
           setCart(updatedCart)
    }

    function clearCart(){
        setCart([])
    }

  return (
    <>
        <Header 
            cart={cart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
        />
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map((guitar)=>(
                    <Guitar 
                        key={guitar.id}
                        guitar={guitar}
                        addTocart={addTocart}
                        setCart={setCart}
                    />
                    
                ))}
            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
    </>
  )
}

export default App
