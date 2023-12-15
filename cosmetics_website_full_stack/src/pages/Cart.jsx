import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { updateQuantity } from "../redux/cartRedux"; // Replace with the actual path to your Redux slice

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "mediumvioletred" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductBrand = styled.div`
`;

const ProductProducer = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: mediumvioletred;
  border-radius:5%;
  border-color:mediumvioletred;
  color: white;
  font-weight: 600;
`;
const ButtonIcon = styled.button`
  cursor: pointer;
  background: none;
  border: none;
`;
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  };

  
  const handleContinueShopping = () => {
    // Navigate to the home page
    history.push("/");
  };

  const handleQuantityChange = (productId, newQuantity) => {
    dispatch(updateQuantity(productId, newQuantity));
  };
  
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {data:res.data});
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Кошик</Title>
        <Top>
          <TopButton onClick={handleContinueShopping}>Продовжити покупку</TopButton>
          <TopTexts>
            <TopText>Кошик({cart.quantity})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product=>(
            <Product>
              <ProductDetail>
                <Image src= {product.img}/>
                <Details>
                  <ProductName>
                    <b>Товар:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductBrand>
                    {/* <b>Бренд:</b> {product.brand} */}
                  </ProductBrand>
                  <ProductProducer>
                    {/* <b>Країна-виробник:</b> {product.producer} */}
                  </ProductProducer>
                </Details>
              </ProductDetail>
              <PriceDetail>
              <ProductAmountContainer>
                <ButtonIcon onClick={() => handleQuantityChange(product._id, product.quantity + 1)}>
                  <Add />
                </ButtonIcon>
                <ProductAmount>{product.quantity}</ProductAmount>
                <ButtonIcon onClick={() => handleQuantityChange(product._id, product.quantity - 1)}>
                  <Remove />
                </ButtonIcon>
              </ProductAmountContainer>
                <ProductPrice> UAH {product.price*product.quantity}</ProductPrice>
              </PriceDetail>
            </Product>))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Деталі замовлення</SummaryTitle>
            <SummaryItem type="total">
              <SummaryItemText>Загальна сума</SummaryItemText>
              <SummaryItemPrice>UAH {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Bloomique"
              billingAddress
              shippingAddress
              description={`Загальна сума оплати UAH ${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
              currency="UAH"
            >
            <Button>Оплатити</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
