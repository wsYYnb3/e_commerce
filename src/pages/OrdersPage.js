import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaBox,
  FaCalendarAlt,
  FaShoppingCart,
  FaTruck,
  FaCreditCard,
  FaMoneyBill,
} from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/clerk-react";
import { getCurrencySymbol } from "../utils/utils";
import { BiLoaderCircle } from "react-icons/bi";
import { BsSignpost } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import {
  HeaderContainer,
  OrderCard,
  IconText,
} from "../styles/OrdersPageStyles";
import { fetchOrders } from "../services/ordersSlice";
import LoadingIndicator from "../components/LoadingIndicator";

const OrdersPage = () => {
  const fade = useSpring({ from: { opacity: 0 }, opacity: 1 });
  const orders = useSelector((state) => state.orders.ordersItems);
  const dispatch = useDispatch();
  const { language } = useParams();
  const { t } = useTranslation();
  const { user } = useUser();
  const customerId = user?.id;

  useEffect(() => {
    if (customerId) {
      dispatch(fetchOrders(customerId));
    }
  }, [dispatch, language, customerId]);
  if (!orders || orders.length === 0) {
    return <p>No previous orders.</p>;
  }

  const getStatusIcon = (status) => {
    if (status === "Delivered") return <FaTruck />;
    if (status === "Paid") return <FaCreditCard />;
    if (status === "Sent") return <BsSignpost />;
    if (status === "Canceled") return <ImCancelCircle />;
    if (status === "processing") return <BiLoaderCircle />;
    return null;
  };
  if (!orders || orders.length === 0) {
    return <p>No previous orders.</p>;
  }
  if (!Array.isArray(orders)) {
    return <LoadingIndicator />;
  }
  return (
    <animated.div style={fade}>
      <Container fluid>
        <HeaderContainer className='px-3 py-3'>
          <h4>Your Orders</h4>
        </HeaderContainer>
        {orders.map((order) => {
          const date = new Date(order.createdAt).toISOString().slice(0, 10);
          return (
            <OrderCard key={order.id}>
              <Row>
                <Col md={4}>
                  <IconText>
                    <FaBox />
                    <h5>Order: {order.id}</h5>
                  </IconText>
                  <IconText>
                    <FaCalendarAlt />
                    <p>Date: {date}</p>
                  </IconText>
                </Col>
                <Col md={4}>
                  <IconText>
                    <FaShoppingCart />
                    <h6>Items:</h6>
                  </IconText>
                  <ul>
                    {order.ordersitems.map((item) => (
                      <li key={item.id}>
                        {t(item.product.name_key)} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                </Col>
                <Col md={4}>
                  <IconText>
                    <FaMoneyBill />
                    <h5>
                      Total: {order.total}{" "}
                      {getCurrencySymbol(order.currency_id)}
                    </h5>
                  </IconText>
                  <IconText>
                    {getStatusIcon(order.status)}
                    <h5>Status: {order.status}</h5>
                  </IconText>
                </Col>
              </Row>
            </OrderCard>
          );
        })}
      </Container>
    </animated.div>
  );
};

export default OrdersPage;
