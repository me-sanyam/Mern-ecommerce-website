import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import {
    productreducer,
    productdetailsreducer,
    HomeProductsreducer,
    NewReviewReducer,
    Adminproductreducer,
    NewProductreducer,
    AdminProductReducer
} from "./reducers/productsreducer";

import {
    UserReducer,
    UpdateProfileReducer,
    ForgotPasswordReducer,
    AllUsersReducer,
    UserDetailsReducer,
    UserUpdateReducer,
    UserdeleteReducer
} from "./reducers/UserReducer";

import { CartReducer } from './reducers/CartReducer';

import {
    NewOrderReducer,
    MyOrdersReducer,
    OrdersDetailsReducer,
    AllOrdersReducer,
    ProcessOrderReducer,
    DeleteOrderReducer
} from './reducers/orderReducer';

const reducer = combineReducers({
    HomeProducts: HomeProductsreducer,
    products: productreducer,
    productdetails: productdetailsreducer,
    user: UserReducer,
    UpdatedUser: UpdateProfileReducer,
    ForgotPassword: ForgotPasswordReducer,
    cart: CartReducer,
    NewOrder: NewOrderReducer,
    MyOrders: MyOrdersReducer,
    Orderdetails: OrdersDetailsReducer,
    NewReview: NewReviewReducer,
    AdminProducts: Adminproductreducer,
    NewProduct: NewProductreducer,
    AdminProductCredential: AdminProductReducer,
    AllOrders: AllOrdersReducer,
    ProcessOrder: ProcessOrderReducer,
    DeleteOrder: DeleteOrderReducer,
    AllUsers: AllUsersReducer,
    UserDetails: UserDetailsReducer,
    ChangedUser: UserUpdateReducer,
    DeleteUser: UserdeleteReducer
})

let initialState = {
    cart: {
        cartItems: (localStorage.getItem('cartItems')) ? JSON.parse(localStorage.getItem('cartItems')) : [],
    }
}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
export default store;