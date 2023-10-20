'use client'
import { db } from '@/firebase/firebase';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react'

const useFetchDocuments = (collectionName, arg) => {

  const [documents, setDocuments] = useState([]);

  const getDocuments = useCallback( async ()=>{
    // DB에서 정보 가져오기
    const q = query(collection(db, collectionName), where(arg[0], arg[1], arg[2]));
    const querySnapshot = await getDocs(q);
    // 가져온 데이터 Array에 담기
    let documentsArray = [];
    querySnapshot.forEach(doc=>{
      documentsArray.push(doc.data());
    })

    setDocuments(documentsArray);

  }, [collectionName, arg[0], arg[1], arg[2]])
  
  // 호출하기
  useEffect(()=>{
    getDocuments()
  }, [getDocuments])
  
  return { documents }
}

export default useFetchDocuments