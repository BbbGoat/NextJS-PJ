'use client'
import { db } from '@/firebase/firebase';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';
import styles from './ChangeOrderStatus.module.scss'
import Button from '../button/Button';

const ChangeOrderStatus = ({order, id}) => {

  const router = useRouter();
  
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 주문 상태 수정 함수
  const editOrder = (e, id) => {
    e.preventDefault();

    const orderData = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate()
    }
  
    try {
      // 도큐먼트 수정
      setDoc(doc(db, "orders", id), orderData);
      setIsLoading(false);
      toast.success("주문 상태가 변경되었습니다.");
      router.push(`/admin/orders`);

    } catch(error) {
      toast.error(error.message)
      setIsLoading(false);
    }
  }
  
  return (
    <>
      {isLoading && <Loader basic />}
      <div className={styles.status}>
        <div className={styles.card}>
          <h4>주문 상태 업데이트</h4>

          <form onSubmit={(e)=>editOrder(e, id)}>
            <select value={status} onChange={e=>setStatus(e.target.value)}>
              <option disabled value="">
                -- 선택 --
              </option>
              <option value="주문수락">
                주문수락
              </option>
              <option value="주문처리중">
                주문처리중
              </option>
              <option value="배송중">
                배송중
              </option>
              <option value="배송완료">
                배송완료
              </option>
            </select>
            <div>
              <Button type='submit'>
                업데이트
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChangeOrderStatus