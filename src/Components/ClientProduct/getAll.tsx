// 'use client';

// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { GetActiveProducts, AddToCart } from '@/lib/productActions';
// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';

// interface CrudForm {
//     productname: string;
//     price: number;
//     quantity: number;
// }

// interface CartItem {
//     _id: string;
//     productname: string;
//     price: number;
//     quantity: number;
// }

// const AllPage: React.FC = () => {
//     const { watch } = useForm<CrudForm>();
//     const [crudData, setCrudData] = useState<any[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [cart, setCart] = useState<CartItem[]>([]);
//     const [searchQuery, setSearchQuery] = useState(""); 

//     useEffect(() => {
//         const savedCart = localStorage.getItem('cart');
//         if (savedCart) {
//             setCart(JSON.parse(savedCart));
//         }
//         fetchData();
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('cart', JSON.stringify(cart));
//     }, [cart]);

//     const fetchData = async () => {
//         setLoading(true);
//         try {
//             const response = await GetActiveProducts();
//             if (response.success) {
//                 setCrudData(response.data);
//             } else {
//                 toast.error("Error fetching products");
//             }
//         } catch (error) {
//             toast.error("Error fetching products");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddToCart = async (item: any) => {
//         const response = await AddToCart(item._id);
//         if (response.success) {
//             const existingItem = cart.find(cartItem => cartItem._id === item._id);
//             if (existingItem) {
//                 setCart(prev => 
//                     prev.map(cartItem => 
//                         cartItem._id === item._id
//                         ? { ...cartItem, quantity: cartItem.quantity + 1 }
//                         : cartItem
//                     )
//                 );
//             } else {
//                 setCart(prev => [...prev, { ...item, quantity: 1 }]);
//             }
//             toast.success(`${item.productname} added to cart!`);
//         } else {
//             toast.error(`Failed to add ${item.productname} to cart`);
//         }
//     };

//     const filteredProducts = crudData.filter(product =>
//         product.productname.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//     return (
//         <div className=" flex flex-col w-[80%] m-auto items-center justify-center">
//             <h1 className="text-3xl font-bold my-5 text-center">All Products</h1>

           
//             <div className="w-full flex justify-center my-5">
//                 <input
//                     type="text"
//                     placeholder="Search by product name"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="border-2 border-orange-400 rounded-[10px] p-2 w-[50%] text-center"
//                 />
//             </div>

//             {loading ? (
//                 <p className="text-xl text-center">Loading...</p>
//             ) : (
//                 <div className="w-full flex flex-wrap  justify-center gap-8">
//                     {filteredProducts.map(item => {
//                         const total = (item.quantity * item.price).toFixed(2);

//                         return (
//                             <div className="bg-blue-100  flex flex-col w-64 p-5 shadow-lg rounded-lg" key={item._id}>
//                                 <div className="w-full h-32 flex justify-center items-center mb-3">
//                                     <div className="w-48 h-32 border-2 rounded-lg border-gray-400 flex justify-center items-center">
//                                         <img src="item.png" alt={item.productname} className="max-h-full max-w-full" />
//                                     </div>
//                                 </div>
//                                 <p className="text-lg font-semibold mb-1">Product: {item.productname}</p>
//                                 <p className="text-sm">Price: ₹{item.price}</p>
//                                 <p className="text-sm">Total: ₹{total}</p>
                                
//                                 <Link href={`/products/${item._id}`}>
//                                     <Button className="bg-blue-400 w-full rounded-lg mt-3">View Details</Button>
//                                 </Link>

//                                 <Button onClick={() => handleAddToCart(item)} className="bg-yellow-400 w-full rounded-lg mt-3">
//                                     Add to Cart
//                                 </Button>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AllPage;
