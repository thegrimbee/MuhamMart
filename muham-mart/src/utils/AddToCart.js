// filepath: /c:/Users/LE TU QUOC DAT/Documents/GitHub/MuhamMart/muham-mart/src/utils/cart.js
import{addDoc, collection, deleteField} from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

//Each customer has one cart doc, each cart doc contains the uid and quantity of each product
const AddToCart = async (userId, product, quantity) => {
  if (!userId) {
    alert('Please log in to add items to cart');
    return;
  }
  try {
    const cartRef = collection(db, 'Carts');
    const q = query(cartRef, where('user', '==', userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        console.log('Updating existing cart');
        // Get the document ID of the existing cart
        const cartDocId = querySnapshot.docs[0].id;
        const cartDocRef = doc(db, 'Carts', cartDocId);
        if (quantity === 0) {
          console.log('Deleting product from cart');
          const data = {
            [product.id]: deleteField()
        };
        
        updateDoc(cartDocRef, data)
        .then(() => {
            console.log("Code Field has been deleted successfully");
        })
          
        }
        else {
          // Update the existing cart document by adding a new field for the product
          await updateDoc(cartDocRef, {
            [product.id]: quantity,
          });
        }

    }
    else {
      await addDoc(cartRef, {
        user: userId,
        [product.id]: quantity,
      });

    }
    
    
  } catch (error) {
    console.error('Error adding item to cart: ', error);
  }
};

export default AddToCart;