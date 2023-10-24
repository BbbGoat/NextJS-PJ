import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify";

const initialState = {
    cartItems: typeof window !== undefined ? 
    localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousURL: ""
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        ADD_TO_CART: (state, action) => {
            // 중복 확인
            const productIndex = state.cartItems.findIndex(
                (item)=>item.id === action.payload.id
            )
            
            const increaseCount = action.payload.quantity ? action.payload.quantity : 1;
            
            // 확인 결과
            if (productIndex >= 0) {
                // 1. 중복일 경우 기존 개수에 수량만큼 더하기
                state.cartItems[productIndex].cartQuantity += increaseCount

                toast.success(`${action.payload.name} 상품이 하나 추가되었습니다.`);
            }
            else {
                // 2. 중복 아닐경우 새로 추가
                const tempProduct = {...action.payload, cartQuantity: increaseCount}
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} 상품이 추가되었습니다.`);
            }

            // 로컬스토리지 추가
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        CALCULATE_TOTAL_QUANTITY: (state, action) => {
            // 아이템 총 개수 구하기
            const array = [];
            state.cartItems.map((item)=>{
                const {cartQuantity} = item;
                const quantity = cartQuantity
                return array.push(quantity);
            })

            const totalQuantity = array.reduce((a,b) => {
                return a + b;
            }, 0); // 시작은 0 부터

            state.cartTotalQuantity = totalQuantity;
        },
        CALCULATE_SUBTOTAL: (state, action) => {
            const array = [];

            state.cartItems.map((item)=>{
                const { price, cartQuantity } = item;
                const cartItemAmount = price * cartQuantity;
                return array.push(cartItemAmount);
            })

            const totalAmount = array.reduce((a,b)=>{
                return a + b;
            }, 0);

            state.cartTotalAmount = totalAmount;
        },
        SAVE_URL: (state, action) => {
            // URL 저장
            state.previousURL = action.payload;
        },
        DECREASE_CART: (state, action) => {
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )

            // 상품개수가 1개 초과일 때만 빼기 가능
            if (state.cartItems[productIndex].cartQuantity > 1) {
                state.cartItems[productIndex].cartQuantity -= 1;
                toast.success(`${action.payload.name} 개수 -1`)
            }
            // 상품개수가 1개일 경우 아예 지우기
            else if (state.cartItems[productIndex].cartQuantity === 1) {
                // 해당 상품 제외한 나머지 상품들 새배열에 담기
                const newCartItem = state.cartItems.filter((item)=>item.id !== action.payload.id)

                state.cartItems = newCartItem;
                toast.success(`${action.payload.name}이 장바구니에서 삭제되었습니다.`);
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        REMOVE_FROM_CART: (state, action) => {
            const newCartItem = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            )

            state.cartItems = newCartItem;
            toast.success(`${action.payload.name}이 장바구니에서 삭제되었습니다.`);

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        CLEAR_CART: (state, action) => {
            state.cartItems = [];
            toast.success('장바구니가 비었습니다.');

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        // 내가 임의로 추가한 장바구니 +1 기능 함수
        INCREASE_CART: (state, action) => {
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )
            state.cartItems[productIndex].cartQuantity += 1;
            toast.success(`${action.payload.name} 개수 +1`)

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
    }
})

export const { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY, CALCULATE_SUBTOTAL, SAVE_URL, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, INCREASE_CART } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;

export default cartSlice.reducer;