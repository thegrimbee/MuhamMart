// filepath: /c:/Users/LE TU QUOC DAT/Documents/GitHub/MuhamMart/muham-mart/src/utils/cart.js
import{addDoc, collection} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

const AddToCart = async (userId, product, quantity) => {
  try {
    const cartRef = collection(db, 'Carts');
    console.log(product);
    const q = query(cartRef, where('user', '==', userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        console.log('User already has a cart');
        // Get the document ID of the existing cart
        const cartDocId = querySnapshot.docs[0].id;
        const cartDocRef = doc(db, 'Carts', cartDocId);
  
        // Update the existing cart document by adding a new field for the product
        await updateDoc(cartDocRef, {
          [product.name]: quantity
        });
    }
    else {
        await addDoc(cartRef, {
            user: userId,
            [product.name]: quantity
        });
        console.log('Item added to cart');
    }
    
  } catch (error) {
    console.error('Error adding item to cart: ', error);
  }
};

export default AddToCart;