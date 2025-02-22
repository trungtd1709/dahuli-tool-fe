import { OrderTableNote } from "./components/OrderTableNote";
import { ShippingTableNote } from "./components/ShippingTableNote";

const PaymentFeeNote = () => {
  return (
    <>
      <span>Phí thanh toán thì để tên là Payment fee</span>
      <span>Subtotal thì để tên là SUBTOTAL và để ở hàng trước Payment fee</span>
    </>
  );
};

export const NotePage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <PaymentFeeNote />
      <OrderTableNote />
      <ShippingTableNote />
    </div>
  );
};
